using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Controllers.Factory;

[ApiController]
[Route("api/factory/premium")]
[Authorize(Roles = "FACTORY")]
public class FactoryPremiumController : ControllerBase
{
    private readonly AppDbContext _db;
    public FactoryPremiumController(AppDbContext db) => _db = db;

    // POST /api/factory/premium/subscribe
    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromBody] SubscribeDto dto)
    {
        var factory = await _db.Factories.FindAsync(dto.FactoryId);
        if (factory is null) return NotFound("Factory not found");

        var now = DateTime.UtcNow;
        var baseDate = factory.IsPremium && factory.PremiumExpiresAt > now 
            ? factory.PremiumExpiresAt.Value 
            : now;

        DateTime expiresAt = dto.Plan.ToLower() switch
        {
            "week" => baseDate.AddDays(7),
            "month" => baseDate.AddMonths(1),
            "year" => baseDate.AddYears(1),
            _ => baseDate.AddDays(7) // default to 1 week
        };

        factory.IsPremium = true;
        factory.PremiumExpiresAt = expiresAt;
        
        await _db.SaveChangesAsync();

        return Ok(new
        {
            isPremium = factory.IsPremium,
            expiresAt = factory.PremiumExpiresAt,
            message = $"Successfully subscribed to plan: {dto.Plan}"
        });
    }

    // GET /api/factory/premium/status
    [HttpGet("status")]
    public async Task<IActionResult> GetStatus([FromQuery] Guid? factoryId)
    {
        Guid actualFactoryId = Guid.Empty;

        if (factoryId.HasValue && factoryId.Value != Guid.Empty)
        {
            actualFactoryId = factoryId.Value;
        }
        else
        {
            // Trích xuất từ JWT token tự động
            var userIdClaim = User.FindFirst("sub")?.Value
                           ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (Guid.TryParse(userIdClaim, out var userId))
            {
                var factory = await _db.Factories.FirstOrDefaultAsync(f => f.UserId == userId);
                if (factory == null)
                {
                    // Tự động tạo Factory để tránh lỗi hệ thống
                    var user = await _db.Users.FindAsync(userId);
                    if (user != null && user.Role == UserRole.FACTORY)
                    {
                        factory = new Renats_BE.Models.Factory
                        {
                            UserId = user.Id,
                            CompanyName = user.FullName ?? "Nhà máy tái chế Re-Nats",
                            ContactPerson = user.FullName ?? "Người đại diện",
                            ContactPhone = user.Phone ?? "0987654321",
                            Address = "Hà Nội",
                            CreatedAt = DateTime.UtcNow
                        };
                        _db.Factories.Add(factory);
                        await _db.SaveChangesAsync();
                    }
                }
                if (factory != null)
                {
                    actualFactoryId = factory.Id;
                }
            }
        }

        var factoryObj = await _db.Factories.FindAsync(actualFactoryId);
        if (factoryObj is null) return NotFound("Không tìm thấy thông tin nhà máy");

        bool isPremium = factoryObj.IsPremium && factoryObj.PremiumExpiresAt > DateTime.UtcNow;

        return Ok(new
        {
            isPremium,
            expiresAt = factoryObj.PremiumExpiresAt
        });
    }

    public class SubscribeDto
    {
        public Guid FactoryId { get; set; }
        public string Plan { get; set; } = "week";
    }
}
