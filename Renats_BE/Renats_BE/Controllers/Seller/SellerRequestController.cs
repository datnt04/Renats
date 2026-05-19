using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Controllers.Seller;

[ApiController]
[Route("api/seller/requests")]
public class SellerRequestController : ControllerBase
{
    private readonly AppDbContext _db;
    public SellerRequestController(AppDbContext db) => _db = db;

    // GET /api/seller/requests?sellerId=&status=
    [HttpGet]
    public async Task<IActionResult> GetRequests([FromQuery] Guid sellerId, [FromQuery] string? status)
    {
        var query = _db.PickupRequests
            .Where(r => r.SellerId == sellerId)
            .Include(r => r.Items)
            .Include(r => r.Results)
            .Include(r => r.AssignedDepot)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status) &&
            Enum.TryParse<PickupRequestStatus>(status, ignoreCase: true, out var s))
            query = query.Where(r => r.Status == s);

        var requests = await query
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new
            {
                id = r.Id,
                requestCode = r.RequestCode,
                status = r.Status.ToString(),
                pickupAddress = r.PickupAddress,
                pickupDate = r.PickupDate.ToString("dd/MM/yyyy"),
                pickupSlot = r.PickupSlot,
                types = r.Items.Select(i => new { label = i.MaterialLabel, emoji = i.MaterialEmoji }).ToList(),
                depotName = r.AssignedDepot != null ? r.AssignedDepot.CompanyName : null,
                note = r.Note,
                totalKg = r.Results.Any() ? r.Results.Sum(res => res.WeightKg) : (decimal?)null,
                totalMoney = r.Results.Any() ? r.Results.Sum(res => res.WeightKg * res.PricePerKg) : (decimal?)null,
                resultWeights = r.Results.Select(res => new
                {
                    label = res.MaterialLabel,
                    kg = res.WeightKg,
                    pricePerKg = res.PricePerKg
                }).ToList(),
                createdAt = r.CreatedAt
            })
            .ToListAsync();

        return Ok(requests);
    }

    // GET /api/seller/requests/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRequestDetail(Guid id)
    {
        var request = await _db.PickupRequests
            .Where(r => r.Id == id)
            .Include(r => r.Items)
            .Include(r => r.Images)
            .Include(r => r.Results)
            .Include(r => r.AssignedDepot)
            .FirstOrDefaultAsync();

        if (request is null) return NotFound();

        return Ok(new
        {
            id = request.Id,
            requestCode = request.RequestCode,
            status = request.Status.ToString(),
            pickupAddress = request.PickupAddress,
            pickupDate = request.PickupDate.ToString("dd/MM/yyyy"),
            pickupSlot = request.PickupSlot,
            description = request.Description,
            note = request.Note,
            scheduledAt = request.ScheduledAt,
            weighedAt = request.WeighedAt,
            completedAt = request.CompletedAt,
            createdAt = request.CreatedAt,
            types = request.Items.Select(i => new { id = i.MaterialId, label = i.MaterialLabel, emoji = i.MaterialEmoji }),
            images = request.Images.Select(i => i.ImageUrl).ToList(),
            depot = request.AssignedDepot is null ? null : new
            {
                id = request.AssignedDepot.Id,
                name = request.AssignedDepot.CompanyName,
                phone = request.AssignedDepot.ContactPhone
            },
            results = request.Results.Select(r => new
            {
                label = r.MaterialLabel,
                kg = r.WeightKg,
                pricePerKg = r.PricePerKg,
                total = r.WeightKg * r.PricePerKg
            }).ToList(),
            totalKg = request.Results.Sum(r => r.WeightKg),
            totalMoney = request.Results.Sum(r => r.WeightKg * r.PricePerKg)
        });
    }

    // POST /api/seller/requests  – Tạo yêu cầu thu gom mới
    [HttpPost]
    public async Task<IActionResult> CreateRequest([FromBody] CreateRequestDto dto)
    {
        var seller = await _db.Sellers.FindAsync(dto.SellerId);
        if (seller is null) return NotFound("Seller not found");

        // Sinh mã yêu cầu tự động: YC-{number:D3}
        var count = await _db.PickupRequests.CountAsync(r => r.SellerId == dto.SellerId);
        var code = $"YC-{(count + 1):D3}";

        var request = new PickupRequest
        {
            RequestCode = code,
            SellerId = dto.SellerId,
            PickupAddress = dto.PickupAddress,
            PickupDate = dto.PickupDate,
            PickupSlot = dto.PickupSlot,
            Description = dto.Description,
            Status = PickupRequestStatus.PENDING
        };

        // Thêm các loại phế liệu
        foreach (var item in dto.Items)
        {
            request.Items.Add(new PickupRequestItem
            {
                MaterialId = item.MaterialId,
                MaterialLabel = item.MaterialLabel,
                MaterialEmoji = item.MaterialEmoji
            });
        }

        // Thêm ảnh nếu có
        if (dto.ImageUrls is not null)
        {
            foreach (var url in dto.ImageUrls)
            {
                request.Images.Add(new PickupRequestImage { ImageUrl = url });
            }
        }

        // Tăng đếm cho seller
        seller.TotalRequests++;

        _db.PickupRequests.Add(request);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRequestDetail), new { id = request.Id },
            new { requestId = request.Id, requestCode = request.RequestCode });
    }

    // PATCH /api/seller/requests/{id}/cancel  – Hủy yêu cầu
    [HttpPatch("{id}/cancel")]
    public async Task<IActionResult> CancelRequest(Guid id)
    {
        var request = await _db.PickupRequests.FindAsync(id);
        if (request is null) return NotFound();
        if (request.Status != PickupRequestStatus.PENDING)
            return BadRequest("Chỉ có thể hủy yêu cầu đang chờ xác nhận");

        request.Status = PickupRequestStatus.CANCELLED;
        request.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return Ok(new { message = "Yêu cầu đã được hủy" });
    }

    public class CreateRequestDto
    {
        public Guid SellerId { get; set; }
        public string PickupAddress { get; set; } = string.Empty;
        public DateTime PickupDate { get; set; }
        public string PickupSlot { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<ItemDto> Items { get; set; } = [];
        public List<string>? ImageUrls { get; set; }

        public class ItemDto
        {
            public string MaterialId { get; set; } = string.Empty;
            public string MaterialLabel { get; set; } = string.Empty;
            public string? MaterialEmoji { get; set; }
        }
    }
}
