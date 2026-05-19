namespace Renats_BE.Models;

public class Factory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string? TaxCode { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }

    // Premium subscription (thêm mới qua migration)
    public bool IsPremium { get; set; } = false;
    public DateTime? PremiumExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<BatchBid> Bids { get; set; } = [];
    public ICollection<BatchOrder> Orders { get; set; } = [];
}
