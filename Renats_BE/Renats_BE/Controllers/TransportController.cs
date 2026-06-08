using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Renats_BE.Controllers.Transport
{
    [ApiController]
    [Route("api/transport")]
    [Authorize]
    public class TransportController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TransportController(AppDbContext db)
        {
            _db = db;
        }

        // GET /api/transport/depots-with-jobs — Driver lấy danh sách kho có đơn cần vận chuyển
        [HttpGet("depots-with-jobs")]
        public async Task<IActionResult> GetDepotsWithJobs()
        {
            // Lấy danh sách các kho của các đơn vận chuyển PENDING và chưa gán Driver
            var depots = await _db.TransportJobs
                .Where(t => t.Status == TransportStatus.PENDING && t.DriverId == null)
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch).ThenInclude(b => b.Depot)
                .Select(t => t.BatchOrder.Batch.Depot)
                .Distinct()
                .ToListAsync();

            var result = depots.Select(d => {
                var pendingCount = _db.TransportJobs
                    .Count(t => t.BatchOrder.Batch.DepotId == d.Id && t.Status == TransportStatus.PENDING && t.DriverId == null);
                
                return new
                {
                    id = d.Id,
                    companyName = d.CompanyName,
                    address = d.Address,
                    city = d.City ?? d.Province ?? "TP.HCM",
                    pendingJobCount = pendingCount,
                    distanceKm = 4.8m // Khoảng cách giả lập
                };
            }).ToList();

            return Ok(result);
        }

        // GET /api/transport/jobs/available — Lấy đơn vận chuyển khả dụng theo kho
        [HttpGet("jobs/available")]
        public async Task<IActionResult> GetAvailableJobs([FromQuery] Guid depotId)
        {
            var jobs = await _db.TransportJobs
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch).ThenInclude(b => b.Depot)
                .Include(t => t.BatchOrder).ThenInclude(o => o.Factory)
                .Where(t => t.BatchOrder.Batch.DepotId == depotId && t.Status == TransportStatus.PENDING && t.DriverId == null)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            var result = jobs.Select(t => new
            {
                id = t.Id,
                status = t.Status.ToString(),
                createdAtFormatted = GetTimeAgo(t.CreatedAt),
                depotName = t.BatchOrder.Batch.Depot.CompanyName,
                factoryName = t.BatchOrder.Factory.CompanyName,
                distanceKm = t.EstimatedDistanceKm ?? 15.2m,
                materialType = t.BatchOrder.Batch.MaterialType.ToString(),
                totalKg = t.BatchOrder.Batch.ActualWeightKg ?? t.BatchOrder.Batch.EstimatedWeightKg,
                vehicleType = GetVehicleTypeForWeight(t.BatchOrder.Batch.ActualWeightKg ?? t.BatchOrder.Batch.EstimatedWeightKg),
                transportFee = t.TransportFee ?? 250000m
            }).ToList();

            return Ok(result);
        }

        // POST /api/transport/jobs/{jobId}/accept — Tài xế nhận đơn vận chuyển
        [HttpPost("jobs/{jobId}/accept")]
        public async Task<IActionResult> AcceptJob(Guid jobId)
        {
            var userIdClaim = User.FindFirst("sub")?.Value
                           ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var driver = await _db.Drivers.FirstOrDefaultAsync(d => d.UserId == userId);
            if (driver is null)
            {
                // Tự động tạo driver nếu User có role DRIVER nhưng chưa có bản ghi Driver
                var user = await _db.Users.FindAsync(userId);
                if (user != null && user.Role == UserRole.DRIVER)
                {
                    driver = new Driver
                    {
                        UserId = userId,
                        VehiclePlate = "59-X1 999.99",
                        VehicleType = "Xe tải 3.5 Tấn",
                        MaxCapacityKg = 3500,
                        IsAvailable = true,
                        CreatedAt = DateTime.UtcNow
                    };
                    _db.Drivers.Add(driver);
                    await _db.SaveChangesAsync();
                }
                else
                {
                    return NotFound("Không tìm thấy thông tin tài xế hoặc vai trò không hợp lệ");
                }
            }

            var job = await _db.TransportJobs
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch)
                .FirstOrDefaultAsync(t => t.Id == jobId);

            if (job is null)
                return NotFound("Không tìm thấy đơn vận chuyển");

            if (job.DriverId != null || job.Status != TransportStatus.PENDING)
                return BadRequest("Đơn vận chuyển đã được nhận bởi tài xế khác");

            job.DriverId = driver.Id;
            job.Status = TransportStatus.ASSIGNED;
            job.BatchOrder.Status = BatchStatus.IN_PROGRESS;
            job.BatchOrder.Batch.Status = BatchStatus.IN_PROGRESS;
            job.BatchOrder.Batch.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Nhận đơn thành công" });
        }

        // GET /api/transport/jobs/my — Lấy danh sách chuyến của tài xế đang đăng nhập
        [HttpGet("jobs/my")]
        public async Task<IActionResult> GetMyJobs()
        {
            var userIdClaim = User.FindFirst("sub")?.Value
                           ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var driver = await _db.Drivers.FirstOrDefaultAsync(d => d.UserId == userId);
            if (driver is null)
                return Ok(new List<object>());

            var jobs = await _db.TransportJobs
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch).ThenInclude(b => b.Depot)
                .Include(t => t.BatchOrder).ThenInclude(o => o.Factory)
                .Where(t => t.DriverId == driver.Id)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            var result = jobs.Select(t => new
            {
                id = t.Id,
                status = t.Status.ToString(),
                createdAtFormatted = GetTimeAgo(t.CreatedAt),
                depotName = t.BatchOrder.Batch.Depot.CompanyName,
                factoryName = t.BatchOrder.Factory.CompanyName,
                distanceKm = t.EstimatedDistanceKm ?? 15.2m,
                materialType = t.BatchOrder.Batch.MaterialType.ToString(),
                totalKg = t.BatchOrder.Batch.ActualWeightKg ?? t.BatchOrder.Batch.EstimatedWeightKg,
                vehicleType = GetVehicleTypeForWeight(t.BatchOrder.Batch.ActualWeightKg ?? t.BatchOrder.Batch.EstimatedWeightKg),
                transportFee = t.TransportFee ?? 250000m
            }).ToList();

            return Ok(result);
        }

        // PUT /api/transport/jobs/{jobId}/status — Cập nhật trạng thái chuyến (đang chạy, đã giao...)
        [HttpPut("jobs/{jobId}/status")]
        public async Task<IActionResult> UpdateJobStatus(Guid jobId, [FromBody] UpdateStatusDto dto)
        {
            var job = await _db.TransportJobs
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch)
                .FirstOrDefaultAsync(t => t.Id == jobId);
            if (job is null)
                return NotFound("Không tìm thấy đơn vận chuyển");

            if (!Enum.TryParse<TransportStatus>(dto.Status, ignoreCase: true, out var ts))
                return BadRequest("Trạng thái không hợp lệ");

            job.Status = ts;

            if (ts == TransportStatus.PICKED_UP || ts == TransportStatus.ON_THE_WAY)
            {
                job.BatchOrder.Status = BatchStatus.IN_PROGRESS;
                job.BatchOrder.Batch.Status = BatchStatus.IN_PROGRESS;
            }
            else if (ts == TransportStatus.DELIVERED)
            {
                job.DeliveredTime = DateTime.UtcNow;
                job.BatchOrder.Status = BatchStatus.DELIVERED;
                job.BatchOrder.Batch.Status = BatchStatus.DELIVERED;
                job.BatchOrder.Batch.DeliveredAt = DateTime.UtcNow;
            }
            else if (ts == TransportStatus.CANCELLED)
            {
                job.BatchOrder.Status = BatchStatus.ACCEPTED;
                job.BatchOrder.Batch.Status = BatchStatus.ACCEPTED;
            }

            job.BatchOrder.Batch.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { success = true });
        }

        // POST /api/transport/jobs/{jobId}/checkin — Check-in tại điểm đón/giao
        [HttpPost("jobs/{jobId}/checkin")]
        public async Task<IActionResult> Checkin(Guid jobId, [FromBody] CheckinDto dto)
        {
            var job = await _db.TransportJobs.FindAsync(jobId);
            if (job is null)
                return NotFound("Không tìm thấy đơn vận chuyển");

            var log = new TransportTrackingLog
            {
                Id = Guid.NewGuid(),
                TransportJobId = jobId,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                Note = $"[Checkin {dto.Type}] {dto.Note}",
                CreatedAt = DateTime.UtcNow
            };
            _db.TransportTrackingLogs.Add(log);
            await _db.SaveChangesAsync();

            return Ok(new { success = true });
        }

        // POST /api/transport/jobs/{jobId}/reject — Từ chối / huỷ đơn
        [HttpPost("jobs/{jobId}/reject")]
        public async Task<IActionResult> RejectJob(Guid jobId, [FromBody] TransportRejectDto dto)
        {
            var job = await _db.TransportJobs
                .Include(t => t.BatchOrder).ThenInclude(o => o.Batch)
                .FirstOrDefaultAsync(t => t.Id == jobId);
            if (job is null)
                return NotFound("Không tìm thấy đơn vận chuyển");

            job.DriverId = null;
            job.Status = TransportStatus.PENDING;
            job.BatchOrder.Status = BatchStatus.ACCEPTED;
            job.BatchOrder.Batch.Status = BatchStatus.ACCEPTED;
            job.BatchOrder.Batch.UpdatedAt = DateTime.UtcNow;

            var log = new TransportTrackingLog
            {
                Id = Guid.NewGuid(),
                TransportJobId = jobId,
                Note = $"[Huỷ đơn] Lý do: {dto.Reason}",
                CreatedAt = DateTime.UtcNow
            };
            _db.TransportTrackingLogs.Add(log);

            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // Helpers
        private static string GetTimeAgo(DateTime dt)
        {
            var span = DateTime.UtcNow - dt.ToUniversalTime();
            if (span.TotalMinutes < 1) return "Vừa xong";
            if (span.TotalMinutes < 60) return $"{(int)span.TotalMinutes} phút trước";
            if (span.TotalHours < 24) return $"{(int)span.TotalHours} giờ trước";
            return $"{(int)span.TotalDays} ngày trước";
        }

        private static string GetVehicleTypeForWeight(decimal weightKg)
        {
            if (weightKg <= 1000) return "Xe bán tải";
            if (weightKg <= 3500) return "Xe tải 3.5 Tấn";
            if (weightKg <= 5000) return "Xe tải 5 Tấn";
            return "Xe tải 8 Tấn";
        }
    }

    public class UpdateStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }

    public class CheckinDto
    {
        public string Type { get; set; } = string.Empty;
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Note { get; set; }
    }

    public class TransportRejectDto
    {
        public string Reason { get; set; } = string.Empty;
    }
}
