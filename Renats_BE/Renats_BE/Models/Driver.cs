namespace Renats_BE.Models;

public class Driver
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string? LicenseNumber { get; set; }
    public string? VehiclePlate { get; set; }
    public string? VehicleType { get; set; }
    public decimal? MaxCapacityKg { get; set; }
    public bool IsAvailable { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<TransportJob> TransportJobs { get; set; } = [];
}
