using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Controllers.Depot;

/// <summary>
/// Tạo và quản lý lô xuất hàng của DEPOT
/// </summary>
[ApiController]
[Route("api/depot/batch-orders")]
[Authorize(Roles = "DEPOT")]
public class DepotBatchOrderController : ControllerBase
{
    private readonly AppDbContext _db;
    public DepotBatchOrderController(AppDbContext db) => _db = db;

    // GET /api/depot/batch-orders — Lịch sử lô xuất
    [HttpGet]
    public async Task<IActionResult> GetBatchOrders()
    {
        var userIdClaim = User.FindFirst("sub")?.Value
                       ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var depot = await _db.Depots.FirstOrDefaultAsync(d => d.UserId == userId);
        if (depot is null)
        {
            var user = await _db.Users.FindAsync(userId);
            if (user != null && user.Role == UserRole.DEPOT)
            {
                depot = new Renats_BE.Models.Depot
                {
                    UserId = user.Id,
                    CompanyName = user.FullName ?? "Điểm thu gom Re-Nats",
                    ContactPerson = user.FullName ?? "Người đại diện",
                    ContactPhone = user.Phone ?? "0987654321",
                    Address = "Hà Tĩnh",
                    CreatedAt = DateTime.UtcNow
                };
                _db.Depots.Add(depot);
                await _db.SaveChangesAsync();
            }
            else
            {
                return NotFound("Không tìm thấy thông tin kho hợp lệ");
            }
        }

        var batches = await _db.InventoryBatches
            .Where(b => b.DepotId == depot.Id)
            .Include(b => b.Order).ThenInclude(o => o != null ? o.Factory : null)
            .OrderByDescending(b => b.CreatedAt)
            .Select(b => new
            {
                id            = b.Id,
                batchCode     = b.BatchCode,
                materialType  = b.MaterialType.ToString(),
                estimatedKg   = b.EstimatedWeightKg,
                actualKg      = b.ActualWeightKg,
                status        = b.Status.ToString(),
                createdAt     = b.CreatedAt,
                deliveredAt   = b.DeliveredAt,
                buyer         = b.Order != null ? b.Order.Factory.CompanyName : null,
                totalAmount   = b.Order != null ? b.Order.TotalAmount : null,
                unitPrice     = b.UnitPrice,
            })
            .ToListAsync();

        return Ok(batches);
    }

    // POST /api/depot/batch-orders — Tạo lô xuất mới
    [HttpPost]
    public async Task<IActionResult> CreateBatchOrder([FromBody] CreateBatchDto dto)
    {
        var userIdClaim = User.FindFirst("sub")?.Value
                       ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var depot = await _db.Depots.FirstOrDefaultAsync(d => d.UserId == userId);
        if (depot is null)
        {
            var user = await _db.Users.FindAsync(userId);
            if (user != null && user.Role == UserRole.DEPOT)
            {
                depot = new Renats_BE.Models.Depot
                {
                    UserId = user.Id,
                    CompanyName = user.FullName ?? "Điểm thu gom Re-Nats",
                    ContactPerson = user.FullName ?? "Người đại diện",
                    ContactPhone = user.Phone ?? "0987654321",
                    Address = "Hà Tĩnh",
                    CreatedAt = DateTime.UtcNow
                };
                _db.Depots.Add(depot);
                await _db.SaveChangesAsync();
            }
            else
            {
                return NotFound("Không tìm thấy thông tin kho hợp lệ");
            }
        }

        // Parse MaterialType từ label
        if (!Enum.TryParse<MaterialType>(dto.MaterialTypeKey ?? "OTHER", ignoreCase: true, out var materialType))
            materialType = MaterialType.OTHER;

        // Tạo batch code tự động
        var count = await _db.InventoryBatches.CountAsync(b => b.DepotId == depot.Id);
        var batchCode = $"LO-{DateTime.UtcNow:yyMM}-{(count + 1):D3}";

        var batch = new InventoryBatch
        {
            DepotId             = depot.Id,
            BatchCode           = batchCode,
            MaterialType        = materialType,
            EstimatedWeightKg   = dto.TotalKg,
            Description         = dto.Note,
            Status              = BatchStatus.LISTED,
            ListedAt            = DateTime.UtcNow,
            UnitPrice           = dto.UnitPrice,
            TransportType       = dto.TransportType != null
                ? Enum.TryParse<TransportType>(dto.TransportType, ignoreCase: true, out var tt) ? tt : (TransportType?)null
                : null,
        };

        _db.InventoryBatches.Add(batch);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            message   = "Tạo lô hàng thành công",
            batchId   = batch.Id,
            batchCode = batch.BatchCode,
        });
    }

    public class CreateBatchDto
    {
        public string WasteType       { get; set; } = string.Empty;
        public string? MaterialTypeKey { get; set; }   // Enum key: IRON, COPPER...
        public decimal TotalKg        { get; set; }
        public string Unit            { get; set; } = "kg";
        public string? Location       { get; set; }
        public string? Note           { get; set; }
        public string? CarrierId      { get; set; }
        public string? Buyer          { get; set; }
        public string? DeliveryDate   { get; set; }
        public string? TransportType  { get; set; }
        public decimal? UnitPrice     { get; set; }
        // nguồn gốc
        public Dictionary<string, decimal>? SourceRatio { get; set; }
    }
}
