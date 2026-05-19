namespace Renats_BE.Models;

/// <summary>
/// Profile của người bán cá nhân (hộ gia đình, cá nhân bán phế liệu nhỏ lẻ)
/// </summary>
public class Seller
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }

    public string? DefaultAddress { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }

    public string? Bio { get; set; }

    // Stats (calculated / cached)
    public int TotalRequests { get; set; } = 0;
    public int CompletedRequests { get; set; } = 0;
    public decimal? AverageRating { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<PickupRequest> PickupRequests { get; set; } = [];
}
