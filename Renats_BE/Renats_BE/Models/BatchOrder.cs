using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

public class BatchOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BatchId { get; set; }
    public Guid FactoryId { get; set; }
    public Guid? AcceptedBidId { get; set; }
    public decimal AgreedPrice { get; set; }
    public decimal? TotalAmount { get; set; }
    public BatchStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public InventoryBatch Batch { get; set; } = null!;
    public Factory Factory { get; set; } = null!;
    public BatchBid? AcceptedBid { get; set; }
    public TransportJob? TransportJob { get; set; }
    public WeightTicket? WeightTicket { get; set; }
    public WeightVerification? WeightVerification { get; set; }
    public Invoice? Invoice { get; set; }
}
