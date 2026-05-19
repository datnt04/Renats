namespace Renats_BE.Models;

/// <summary>
/// Các loại phế liệu trong một yêu cầu thu gom
/// </summary>
public class PickupRequestItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PickupRequestId { get; set; }

    // Loại vật liệu dạng string (flexible hơn enum cho seller cá nhân)
    // VD: "dong_cap_1", "sat", "giay_carton", ...
    public string MaterialId { get; set; } = string.Empty;
    public string MaterialLabel { get; set; } = string.Empty;
    public string? MaterialEmoji { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public PickupRequest PickupRequest { get; set; } = null!;
}
