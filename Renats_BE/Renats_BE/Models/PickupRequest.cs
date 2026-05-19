using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

/// <summary>
/// Yêu cầu thu gom phế liệu từ người bán cá nhân
/// </summary>
public class PickupRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string RequestCode { get; set; } = string.Empty; // VD: YC-001

    public Guid SellerId { get; set; }

    // Depot được chỉ định xử lý (null = chưa assign)
    public Guid? AssignedDepotId { get; set; }

    public string PickupAddress { get; set; } = string.Empty;
    public string? City { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    public DateTime PickupDate { get; set; }
    public string PickupSlot { get; set; } = string.Empty; // VD: "08:00 – 10:00"

    public string? Description { get; set; }
    public string? Note { get; set; } // Ghi chú từ depot sau khi cân

    public PickupRequestStatus Status { get; set; } = PickupRequestStatus.PENDING;

    public DateTime? ScheduledAt { get; set; }  // Khi depot xác nhận lịch
    public DateTime? WeighedAt { get; set; }     // Khi hoàn tất cân
    public DateTime? CompletedAt { get; set; }   // Khi hoàn tất toàn bộ

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Seller Seller { get; set; } = null!;
    public Depot? AssignedDepot { get; set; }
    public ICollection<PickupRequestItem> Items { get; set; } = [];
    public ICollection<PickupRequestImage> Images { get; set; } = [];
    public ICollection<PickupResult> Results { get; set; } = [];
}
