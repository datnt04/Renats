using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

public class InventoryBatch
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DepotId { get; set; }
    public string BatchCode { get; set; } = string.Empty;
    public MaterialType MaterialType { get; set; }
    public decimal EstimatedWeightKg { get; set; }
    public decimal? ActualWeightKg { get; set; }
    public decimal? MoisturePercentage { get; set; }
    public decimal? PurityPercentage { get; set; }
    public decimal? UnitPrice { get; set; }
    public string? Description { get; set; }
    public string? ThumbnailImageUrl { get; set; }
    public BatchStatus Status { get; set; } = BatchStatus.DRAFT;
    public TransportType? TransportType { get; set; }
    public DateTime? ListedAt { get; set; }
    public DateTime? AcceptedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? VerifiedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Depot Depot { get; set; } = null!;
    public ICollection<BatchImage> Images { get; set; } = [];
    public ICollection<BatchBid> Bids { get; set; } = [];
    public BatchOrder? Order { get; set; }
}
