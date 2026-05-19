using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models.Auth;
using Renats_BE.Models.Enums;
using System.Security.Cryptography;
using System.Text;
using ModelUser = Renats_BE.Models.User;
using ModelSeller = Renats_BE.Models.Seller;
using ModelDepot = Renats_BE.Models.Depot;
using ModelFactory = Renats_BE.Models.Factory;
using ModelDriver = Renats_BE.Models.Driver;

namespace Renats_BE.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // ── POST /api/auth/register ──
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { message = "Email và mật khẩu không được để trống." });

        if (await _db.Users.AnyAsync(u => u.Email == req.Email.ToLower()))
            return Conflict(new { message = "Email đã được sử dụng." });

        if (!Enum.TryParse<UserRole>(req.Role.ToUpper(), out var role))
            return BadRequest(new { message = "Vai trò không hợp lệ. Chọn: ADMIN, DEPOT, FACTORY, DRIVER, SELLER." });

        var user = new ModelUser
        {
            Email = req.Email.ToLower(),
            PasswordHash = HashPassword(req.Password),
            FullName = req.FullName,
            Phone = req.Phone,
            Role = role,
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // Create role-specific profile
        switch (role)
        {
            case UserRole.SELLER:
                _db.Sellers.Add(new ModelSeller
                {
                    UserId = user.Id,
                    DefaultAddress = req.DefaultAddress,
                    City = req.City,
                    Province = req.Province,
                    Bio = req.Bio,
                });
                break;

            case UserRole.DEPOT:
                if (string.IsNullOrWhiteSpace(req.CompanyName))
                    return BadRequest(new { message = "Tên công ty là bắt buộc với vai trò DEPOT." });
                _db.Depots.Add(new ModelDepot
                {
                    UserId = user.Id,
                    CompanyName = req.CompanyName!,
                    TaxCode = req.TaxCode,
                    Address = req.Address,
                    City = req.City,
                    Province = req.Province,
                    ContactPerson = req.ContactPerson,
                    ContactPhone = req.ContactPhone,
                });
                break;

            case UserRole.FACTORY:
                if (string.IsNullOrWhiteSpace(req.CompanyName))
                    return BadRequest(new { message = "Tên công ty là bắt buộc với vai trò FACTORY." });
                _db.Factories.Add(new ModelFactory
                {
                    UserId = user.Id,
                    CompanyName = req.CompanyName!,
                    TaxCode = req.TaxCode,
                    Address = req.Address,
                    City = req.City,
                    Province = req.Province,
                    ContactPerson = req.ContactPerson,
                    ContactPhone = req.ContactPhone,
                });
                break;

            case UserRole.DRIVER:
                _db.Drivers.Add(new ModelDriver
                {
                    UserId = user.Id,
                    LicenseNumber = req.LicenseNumber,
                    VehiclePlate = req.VehiclePlate,
                    VehicleType = req.VehicleType,
                    MaxCapacityKg = req.MaxCapacityKg,
                });
                break;
        }

        await _db.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Token = GenerateSimpleToken(user),
            Role = user.Role.ToString(),
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
        });
    }

    // ── POST /api/auth/login ──
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { message = "Email và mật khẩu không được để trống." });

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == req.Email.ToLower());
        if (user == null || !VerifyPassword(req.Password, user.PasswordHash))
            return Unauthorized(new { message = "Email hoặc mật khẩu không đúng." });

        if (!user.IsActive)
            return Forbid();

        return Ok(new AuthResponse
        {
            Token = GenerateSimpleToken(user),
            Role = user.Role.ToString(),
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
        });
    }

    // ── GET /api/auth/me  (verify token from localStorage) ──
    [HttpGet("me")]
    public async Task<IActionResult> Me([FromHeader(Name = "Authorization")] string? authHeader)
    {
        var userId = ExtractUserIdFromToken(authHeader);
        if (userId == null) return Unauthorized(new { message = "Token không hợp lệ." });

        var user = await _db.Users.FindAsync(userId);
        if (user == null || !user.IsActive) return Unauthorized();

        return Ok(new AuthResponse
        {
            Token = GenerateSimpleToken(user),
            Role = user.Role.ToString(),
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
        });
    }

    // ────────────────────────── Helpers ──────────────────────────

    private static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password + "renats_salt_2025"));
        return Convert.ToBase64String(bytes);
    }

    private static bool VerifyPassword(string password, string hash)
        => HashPassword(password) == hash;

    /// <summary>
    /// Simple Base64 token: userId|role|timestamp (not JWT, but works for prototype)
    /// Replace with proper JWT in production using Microsoft.AspNetCore.Authentication.JwtBearer
    /// </summary>
    private static string GenerateSimpleToken(ModelUser user)
    {
        var payload = $"{user.Id}|{user.Role}|{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(payload));
    }

    private static Guid? ExtractUserIdFromToken(string? authHeader)
    {
        try
        {
            var token = authHeader?.Replace("Bearer ", "");
            if (string.IsNullOrEmpty(token)) return null;
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(token));
            var parts = decoded.Split('|');
            return Guid.TryParse(parts[0], out var id) ? id : null;
        }
        catch { return null; }
    }
}
