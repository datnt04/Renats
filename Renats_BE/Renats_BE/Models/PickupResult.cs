namespace Renats_BE.Models;

/// <summary>
/// Kết quả cân từng loại phế liệu sau khi depot đến thu gom
/// </summary>
public class PickupResult
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PickupRequestId { get; set; }

    public string MaterialLabel { get; set; } = string.Empty;
    public decimal WeightKg { get; set; }
    public decimal PricePerKg { get; set; }
    public decimal TotalAmount => WeightKg * PricePerKg;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public PickupRequest PickupRequest { get; set; } = null!;
}
