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

    // PATCH /api/depot/batch-orders/{id}/cancel — Hủy lô (chỉ khi chưa có nhà máy xác nhận)
    [HttpPatch("{id}/cancel")]
    public async Task<IActionResult> CancelBatch(Guid id)
    {
        var userIdClaim = User.FindFirst("sub")?.Value
                       ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var depot = await _db.Depots.FirstOrDefaultAsync(d => d.UserId == userId);
        if (depot is null) return NotFound("Không tìm thấy thông tin kho");

        var batch = await _db.InventoryBatches.FirstOrDefaultAsync(b => b.Id == id && b.DepotId == depot.Id);
        if (batch is null) return NotFound("Không tìm thấy lô hàng");

        // Chỉ hủy được khi chưa có nhà máy xác nhận (DRAFT, LISTED, BIDDING)
        if (batch.Status == BatchStatus.ACCEPTED || batch.Status == BatchStatus.READY_FOR_PICKUP
            || batch.Status == BatchStatus.IN_PROGRESS || batch.Status == BatchStatus.DELIVERED
            || batch.Status == BatchStatus.VERIFIED)
            return BadRequest("Không thể hủy lô đã được nhà máy xác nhận hoặc đang vận chuyển");

        batch.Status = BatchStatus.CANCELLED;
        batch.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã hủy lô hàng thành công" });
    }

    // PATCH /api/depot/batch-orders/{id}/transport — Chọn vận chuyển sau khi nhà máy xác nhận
    [HttpPatch("{id}/transport")]
    public async Task<IActionResult> SetTransport(Guid id, [FromBody] SetTransportDto dto)
    {
        var userIdClaim = User.FindFirst("sub")?.Value
                       ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var depot = await _db.Depots.FirstOrDefaultAsync(d => d.UserId == userId);
        if (depot is null) return NotFound("Không tìm thấy thông tin kho");

        var batch = await _db.InventoryBatches.FirstOrDefaultAsync(b => b.Id == id && b.DepotId == depot.Id);
        if (batch is null) return NotFound("Không tìm thấy lô hàng");

        // Chỉ được chọn vận chuyển khi nhà máy đã xác nhận
        if (batch.Status != BatchStatus.ACCEPTED)
            return BadRequest("Chỉ được chọn vận chuyển sau khi nhà máy xác nhận lô hàng");

        if (!Enum.TryParse<TransportType>(dto.TransportType, ignoreCase: true, out var tt))
            return BadRequest("Phương thức vận chuyển không hợp lệ");

        batch.TransportType = tt;
        batch.Status = BatchStatus.READY_FOR_PICKUP;
        batch.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Đã cập nhật phương thức vận chuyển" });
    }

    public class SetTransportDto
    {
        public string TransportType { get; set; } = string.Empty; // DEPOT_SHIPPED | FACTORY_PICKUP
    }

    // GET /api/depot/batch-orders/active-material-types — Lấy danh sách loại vật liệu đang có lô hoạt động
    [HttpGet("active-material-types")]
    public async Task<IActionResult> GetActiveMaterialTypes()
    {
        var userIdClaim = User.FindFirst("sub")?.Value
                       ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var userId)) return Unauthorized();

        var depot = await _db.Depots.FirstOrDefaultAsync(d => d.UserId == userId);
        if (depot is null) return Ok(new List<string>());

        // Những trạng thái đang hoạt động (chưa bị hủy/chưa xong)
        var activeStatuses = new[] { BatchStatus.DRAFT, BatchStatus.LISTED, BatchStatus.BIDDING, BatchStatus.ACCEPTED, BatchStatus.READY_FOR_PICKUP, BatchStatus.IN_PROGRESS };
        var activeTypes = await _db.InventoryBatches
            .Where(b => b.DepotId == depot.Id && activeStatuses.Contains(b.Status))
            .Select(b => b.MaterialType.ToString())
            .Distinct()
            .ToListAsync();

        return Ok(activeTypes);
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
