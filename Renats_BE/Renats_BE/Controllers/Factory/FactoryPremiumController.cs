using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;

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
    public async Task<IActionResult> GetStatus([FromQuery] Guid factoryId)
    {
        var factory = await _db.Factories.FindAsync(factoryId);
        if (factory is null) return NotFound("Factory not found");

        bool isPremium = factory.IsPremium && factory.PremiumExpiresAt > DateTime.UtcNow;

        return Ok(new
        {
            isPremium,
            expiresAt = factory.PremiumExpiresAt
        });
    }

    public class SubscribeDto
    {
        public Guid FactoryId { get; set; }
        public string Plan { get; set; } = "week";
    }
}
