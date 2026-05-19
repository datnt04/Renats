using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

public class TransportJob
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BatchOrderId { get; set; }
    public Guid? DriverId { get; set; }
    public string PickupAddress { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public decimal? PickupLatitude { get; set; }
    public decimal? PickupLongitude { get; set; }
    public decimal? DeliveryLatitude { get; set; }
    public decimal? DeliveryLongitude { get; set; }
    public decimal? EstimatedDistanceKm { get; set; }
    public decimal? TransportFee { get; set; }
    public TransportStatus Status { get; set; } = TransportStatus.PENDING;
    public DateTime? PickupTime { get; set; }
    public DateTime? DeliveredTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public BatchOrder BatchOrder { get; set; } = null!;
    public Driver? Driver { get; set; }
    public ICollection<TransportTrackingLog> TrackingLogs { get; set; } = [];
}
