namespace Renats_BE.Models;

public class WeightTicket
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BatchOrderId { get; set; }
    public string? TicketNumber { get; set; }
    public decimal? GrossWeightKg { get; set; }
    public decimal? TareWeightKg { get; set; }
    public decimal? NetWeightKg { get; set; }
    public string? WeighingStation { get; set; }
    public string? TicketImageUrl { get; set; }
    public Guid? UploadedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public BatchOrder BatchOrder { get; set; } = null!;
    public User? Uploader { get; set; }
}
