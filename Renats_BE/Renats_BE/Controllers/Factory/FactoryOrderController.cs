using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Controllers.Factory;

[ApiController]
[Route("api/factory/orders")]
[Authorize(Roles = "FACTORY")]
public class FactoryOrderController : ControllerBase
{
    private readonly AppDbContext _db;
    public FactoryOrderController(AppDbContext db) => _db = db;

    // POST /api/factory/orders/bid  – Chốt mua/đặt thầu lô hàng trực tiếp (Mua Ngay)
    [HttpPost("bid")]
    public async Task<IActionResult> PlaceBid([FromBody] PlaceBidDto dto)
    {
        var batch = await _db.InventoryBatches
            .Include(b => b.Depot)
            .FirstOrDefaultAsync(b => b.Id == dto.BatchId);
            
        if (batch is null) return NotFound("Batch not found");
        if (batch.Status != BatchStatus.LISTED && batch.Status != BatchStatus.BIDDING && batch.Status != BatchStatus.DRAFT)
            return BadRequest("Batch is not available for purchase");

        var factory = await _db.Factories.FindAsync(dto.FactoryId);
        if (factory is null) return NotFound("Factory not found");

        // 1. Tạo thầu được chấp nhận luôn (ACCEPTED)
        var bid = new BatchBid
        {
            BatchId = dto.BatchId,
            FactoryId = dto.FactoryId,
            BidPrice = dto.BidPrice,
            Note = dto.Note,
            Status = BidStatus.ACCEPTED // Trực tiếp ACCEPTED luôn
        };
        _db.BatchBids.Add(bid);
        await _db.SaveChangesAsync();

        // 2. Chuyển trạng thái lô sang ACCEPTED luôn
        batch.Status = BatchStatus.ACCEPTED;
        batch.AcceptedAt = DateTime.UtcNow;
        batch.UpdatedAt = DateTime.UtcNow;

        // 3. Tạo Đơn hàng chính thức luôn (ACCEPTED)
        var order = new BatchOrder
        {
            Id = Guid.NewGuid(),
            BatchId = batch.Id,
            FactoryId = dto.FactoryId,
            AcceptedBidId = bid.Id,
            AgreedPrice = dto.BidPrice,
            TotalAmount = batch.EstimatedWeightKg * dto.BidPrice,
            Status = BatchStatus.ACCEPTED,
            CreatedAt = DateTime.UtcNow
        };
        _db.BatchOrders.Add(order);
        await _db.SaveChangesAsync();

        // 4. Tạo TransportJob tự động gán tài xế để chạy simulator
        var driver = await _db.Drivers.FirstOrDefaultAsync();
        var transport = new TransportJob
        {
            Id = Guid.NewGuid(),
            BatchOrderId = order.Id,
            DriverId = driver?.Id ?? Guid.Parse("44444444-0000-0000-0000-000000000001"),
            PickupAddress = "Điểm tập kết phế liệu Quận 9, TP.HCM",
            DeliveryAddress = batch.Depot?.Address ?? "Kho trung chuyển Re-Nats",
            PickupLatitude = 10.7876m,
            PickupLongitude = 106.6346m,
            DeliveryLatitude = batch.Depot?.Latitude ?? 10.8231m,
            DeliveryLongitude = batch.Depot?.Longitude ?? 106.6297m,
            EstimatedDistanceKm = 15.2m,
            TransportFee = 250000m,
            Status = TransportStatus.ASSIGNED,
            CreatedAt = DateTime.UtcNow
        };
        _db.TransportJobs.Add(transport);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderDetail), new { id = order.Id }, new { orderId = order.Id });
    }

    // POST /api/factory/orders/confirm  – Xác nhận đơn (sau khi bid được chấp nhận)
    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmOrder([FromBody] ConfirmOrderDto dto)
    {
        var bid = await _db.BatchBids
            .Include(b => b.Batch)
            .FirstOrDefaultAsync(b => b.Id == dto.BidId);

        if (bid is null) return NotFound("Bid not found");
        if (bid.Status != BidStatus.ACCEPTED) return BadRequest("Bid has not been accepted");

        // Guard: tránh tạo duplicate order nếu API bị gọi 2 lần
        var existingOrder = await _db.BatchOrders
            .AnyAsync(o => o.AcceptedBidId == dto.BidId);
        if (existingOrder)
            return Conflict(new { message = "Order already created for this bid" });

        var order = new BatchOrder
        {
            BatchId = bid.BatchId,
            FactoryId = bid.FactoryId,
            AcceptedBidId = bid.Id,
            AgreedPrice = bid.BidPrice,
            Status = BatchStatus.ACCEPTED
        };

        bid.Batch.Status = BatchStatus.ACCEPTED;
        bid.Batch.AcceptedAt = DateTime.UtcNow;

        _db.BatchOrders.Add(order);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderDetail), new { id = order.Id }, new { orderId = order.Id });
    }

    // GET /api/factory/orders?factoryId=&status=
    [HttpGet]
    public async Task<IActionResult> GetOrders([FromQuery] Guid factoryId, [FromQuery] string? status)
    {
        var query = _db.BatchOrders
            .Where(o => o.FactoryId == factoryId)
            .Include(o => o.Batch).ThenInclude(b => b.Depot)
            .Include(o => o.TransportJob)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status) &&
            Enum.TryParse<BatchStatus>(status, ignoreCase: true, out var s))
            query = query.Where(o => o.Status == s);

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Select(o => new
            {
                id = o.Id,
                batchCode = o.Batch.BatchCode,
                materialType = o.Batch.MaterialType.ToString(),
                depotName = o.Batch.Depot.CompanyName,
                agreedPrice = o.AgreedPrice,
                totalAmount = o.TotalAmount,
                status = o.Status.ToString(),
                transportStatus = o.TransportJob != null ? o.TransportJob.Status.ToString() : null,
                createdAt = o.CreatedAt
            })
            .ToListAsync();

        return Ok(orders);
    }

    // GET /api/factory/orders/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderDetail(Guid id)
    {
        var order = await _db.BatchOrders
            .Where(o => o.Id == id)
            .Include(o => o.Batch).ThenInclude(b => b.Depot)
            .Include(o => o.Batch).ThenInclude(b => b.Images)
            .Include(o => o.TransportJob).ThenInclude(t => t!.Driver).ThenInclude(d => d!.User)
            .Include(o => o.TransportJob).ThenInclude(t => t!.TrackingLogs)
            .Include(o => o.WeightTicket)
            .Include(o => o.WeightVerification)
            .Include(o => o.Invoice)
            .FirstOrDefaultAsync();

        if (order is null) return NotFound();

        return Ok(new
        {
            id = order.Id,
            status = order.Status.ToString(),
            agreedPrice = order.AgreedPrice,
            totalAmount = order.TotalAmount,
            createdAt = order.CreatedAt,
            batch = new
            {
                id = order.Batch.Id,
                batchCode = order.Batch.BatchCode,
                materialType = order.Batch.MaterialType.ToString(),
                estimatedWeightKg = order.Batch.EstimatedWeightKg,
                actualWeightKg = order.Batch.ActualWeightKg,
                unitPrice = order.Batch.UnitPrice,
                description = order.Batch.Description,
                thumbnailImageUrl = order.Batch.ThumbnailImageUrl,
                images = order.Batch.Images.Select(i => i.ImageUrl).ToList(),
                depot = new
                {
                    id = order.Batch.Depot.Id,
                    companyName = order.Batch.Depot.CompanyName,
                    address = order.Batch.Depot.Address,
                    city = order.Batch.Depot.City,
                    reputationScore = order.Batch.Depot.ReputationScore
                }
            },
            transport = order.TransportJob is null ? null : new
            {
                id = order.TransportJob.Id,
                status = order.TransportJob.Status.ToString(),
                pickupAddress = order.TransportJob.PickupAddress,
                deliveryAddress = order.TransportJob.DeliveryAddress,
                vehiclePlate = order.TransportJob.Driver?.VehiclePlate,
                driverName = order.TransportJob.Driver?.User?.FullName,
                trackingLogs = order.TransportJob.TrackingLogs
                    .OrderBy(l => l.CreatedAt)
                    .Select(l => new {
                        id = l.Id,
                        latitude = l.Latitude,
                        longitude = l.Longitude,
                        note = l.Note,
                        createdAt = l.CreatedAt
                    }).ToList()
            },
            weightTicket = order.WeightTicket is null ? null : new
            {
                grossWeightKg = order.WeightTicket.GrossWeightKg,
                tareWeightKg = order.WeightTicket.TareWeightKg,
                netWeightKg = order.WeightTicket.NetWeightKg,
                ticketNumber = order.WeightTicket.TicketNumber
            },
            weightVerification = order.WeightVerification is null ? null : new
            {
                depotWeightKg = order.WeightVerification.DepotWeightKg,
                factoryWeightKg = order.WeightVerification.FactoryWeightKg,
                differenceKg = order.WeightVerification.DifferenceKg,
                differencePercentage = order.WeightVerification.DifferencePercentage,
                isVerified = order.WeightVerification.IsVerified
            }
        });
    }

    // POST /api/factory/orders/{id}/simulate-step
    [HttpPost("{id}/simulate-step")]
    public async Task<IActionResult> SimulateTrackingStep(Guid id, [FromBody] SimulateStepDto dto)
    {
        var order = await _db.BatchOrders
            .Include(o => o.Batch).ThenInclude(b => b.Depot)
            .Include(o => o.TransportJob).ThenInclude(t => t!.TrackingLogs)
            .FirstOrDefaultAsync(o => o.Id == id);
            
        if (order is null) return NotFound("Order not found");
        
        if (order.TransportJob is null)
        {
            var driver = await _db.Drivers.Include(d => d.User).FirstOrDefaultAsync();
            order.TransportJob = new TransportJob
            {
                BatchOrderId = order.Id,
                DriverId = driver?.Id,
                PickupAddress = "Trạm trung chuyển phế liệu liên kết",
                DeliveryAddress = order.Batch.Depot.Address,
                Status = TransportStatus.ASSIGNED,
                CreatedAt = DateTime.UtcNow
            };
            _db.TransportJobs.Add(order.TransportJob);
            await _db.SaveChangesAsync();
        }
        
        var transport = order.TransportJob;
        
        var log = new TransportTrackingLog
        {
            TransportJobId = transport.Id,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            Note = dto.Note,
            CreatedAt = DateTime.UtcNow
        };
        _db.TransportTrackingLogs.Add(log);
        
        if (dto.Step == "checkin_shopee")
        {
            transport.Status = TransportStatus.PICKED_UP;
            order.Status = BatchStatus.IN_PROGRESS;
        }
        else if (dto.Step == "checkout_shopee")
        {
            transport.Status = TransportStatus.ON_THE_WAY;
            order.Status = BatchStatus.IN_PROGRESS;
        }
        else if (dto.Step == "checkin_depot")
        {
            transport.Status = TransportStatus.DELIVERED;
            order.Status = BatchStatus.READY_FOR_PICKUP;
        }
        else if (dto.Step == "checkout_depot")
        {
            transport.Status = TransportStatus.ON_THE_WAY;
            order.Status = BatchStatus.IN_PROGRESS;
        }
        else if (dto.Step == "checkin_factory")
        {
            transport.Status = TransportStatus.DELIVERED;
            order.Status = BatchStatus.DELIVERED;
        }
        
        order.Batch.Status = order.Status;
        order.Batch.UpdatedAt = DateTime.UtcNow;
        
        await _db.SaveChangesAsync();
        return Ok(new { success = true, currentStatus = order.Status.ToString() });
    }

    public class PlaceBidDto
    {
        public Guid BatchId { get; set; }
        public Guid FactoryId { get; set; }
        public decimal BidPrice { get; set; }
        public string? Note { get; set; }
    }

    public class ConfirmOrderDto
    {
        public Guid BidId { get; set; }
    }

    public class SimulateStepDto
    {
        public string Step { get; set; } = string.Empty;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}
