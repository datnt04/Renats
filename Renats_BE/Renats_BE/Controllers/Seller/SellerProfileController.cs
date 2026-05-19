using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;

namespace Renats_BE.Controllers.Seller;

[ApiController]
[Route("api/seller/profile")]
public class SellerProfileController : ControllerBase
{
    private readonly AppDbContext _db;
    public SellerProfileController(AppDbContext db) => _db = db;

    // GET /api/seller/profile/{sellerId}
    [HttpGet("{sellerId}")]
    public async Task<IActionResult> GetProfile(Guid sellerId)
    {
        var seller = await _db.Sellers
            .Where(s => s.Id == sellerId)
            .Include(s => s.User)
            .FirstOrDefaultAsync();

        if (seller is null) return NotFound();

        return Ok(new
        {
            id = seller.Id,
            userId = seller.UserId,
            name = seller.User.FullName,
            phone = seller.User.Phone,
            email = seller.User.Email,
            defaultAddress = seller.DefaultAddress,
            city = seller.City,
            province = seller.Province,
            bio = seller.Bio,
            totalRequests = seller.TotalRequests,
            completedRequests = seller.CompletedRequests,
            averageRating = seller.AverageRating,
            createdAt = seller.CreatedAt
        });
    }

    // PUT /api/seller/profile/{sellerId}  – Cập nhật hồ sơ
    [HttpPut("{sellerId}")]
    public async Task<IActionResult> UpdateProfile(Guid sellerId, [FromBody] UpdateProfileDto dto)
    {
        var seller = await _db.Sellers
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.Id == sellerId);

        if (seller is null) return NotFound();

        // Cập nhật User
        if (dto.Name is not null) seller.User.FullName = dto.Name;
        if (dto.Phone is not null) seller.User.Phone = dto.Phone;
        seller.User.UpdatedAt = DateTime.UtcNow;

        // Cập nhật Seller
        if (dto.DefaultAddress is not null) seller.DefaultAddress = dto.DefaultAddress;
        if (dto.City is not null) seller.City = dto.City;
        if (dto.Province is not null) seller.Province = dto.Province;
        if (dto.Bio is not null) seller.Bio = dto.Bio;

        await _db.SaveChangesAsync();

        return Ok(new { message = "Cập nhật hồ sơ thành công" });
    }

    // PATCH /api/seller/profile/{sellerId}/change-password
    [HttpPatch("{sellerId}/change-password")]
    public async Task<IActionResult> ChangePassword(Guid sellerId, [FromBody] ChangePasswordDto dto)
    {
        var seller = await _db.Sellers
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.Id == sellerId);

        if (seller is null) return NotFound();

        // TODO: Verify old password hash before updating
        // For now, we just update the password hash directly
        if (string.IsNullOrEmpty(dto.NewPassword) || dto.NewPassword.Length < 6)
            return BadRequest("Mật khẩu mới phải có ít nhất 6 ký tự");

        // In production: BCrypt.HashPassword(dto.NewPassword)
        seller.User.PasswordHash = dto.NewPassword;
        seller.User.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đổi mật khẩu thành công" });
    }

    // DELETE /api/seller/profile/{sellerId}  – Xóa tài khoản
    [HttpDelete("{sellerId}")]
    public async Task<IActionResult> DeleteAccount(Guid sellerId)
    {
        var seller = await _db.Sellers
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.Id == sellerId);

        if (seller is null) return NotFound();

        // Soft delete: deactivate user instead of hard delete
        seller.User.IsActive = false;
        seller.User.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Tài khoản đã được vô hiệu hóa" });
    }

    // GET /api/seller/profile/{sellerId}/stats
    [HttpGet("{sellerId}/stats")]
    public async Task<IActionResult> GetStats(Guid sellerId)
    {
        var stats = await _db.PickupRequests
            .Where(r => r.SellerId == sellerId)
            .GroupBy(r => r.Status)
            .Select(g => new { status = g.Key.ToString(), count = g.Count() })
            .ToListAsync();

        var totalEarned = await _db.PickupResults
            .Where(r => r.PickupRequest.SellerId == sellerId)
            .SumAsync(r => (decimal?)(r.WeightKg * r.PricePerKg)) ?? 0;

        return Ok(new
        {
            stats,
            totalEarned,
            totalRequests = stats.Sum(s => s.count)
        });
    }

    public class UpdateProfileDto
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? DefaultAddress { get; set; }
        public string? City { get; set; }
        public string? Province { get; set; }
        public string? Bio { get; set; }
    }

    public class ChangePasswordDto
    {
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
