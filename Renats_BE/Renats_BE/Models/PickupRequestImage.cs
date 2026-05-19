namespace Renats_BE.Models;

/// <summary>
/// Ảnh đính kèm trong yêu cầu thu gom
/// </summary>
public class PickupRequestImage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PickupRequestId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public PickupRequest PickupRequest { get; set; } = null!;
}
