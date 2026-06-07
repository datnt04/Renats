using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

public class BatchBid
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BatchId { get; set; }
    public Guid FactoryId { get; set; }
    public decimal BidPrice { get; set; }
    public string? Note { get; set; }
    public BidStatus Status { get; set; } = BidStatus.PENDING;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public InventoryBatch Batch { get; set; } = null!;
    public Factory Factory { get; set; } = null!;
}
