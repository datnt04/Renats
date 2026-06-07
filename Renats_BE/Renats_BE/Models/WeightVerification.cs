namespace Renats_BE.Models;

public class WeightVerification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BatchOrderId { get; set; }
    public decimal? DepotWeightKg { get; set; }
    public decimal? FactoryWeightKg { get; set; }
    public decimal? DifferenceKg { get; set; }
    public decimal? DifferencePercentage { get; set; }
    public bool IsVerified { get; set; } = false;
    public string? VerificationNote { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public BatchOrder BatchOrder { get; set; } = null!;
}
