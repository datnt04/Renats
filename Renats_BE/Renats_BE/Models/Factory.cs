using Renats_BE.Models.Enums;

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
    public string? IndustrialZone { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }

    // ── Profile: Loại vật liệu tái chế ──────────────────────────────────────
    // Loại vật liệu chính (bắt buộc, 1 loại duy nhất)
    public MaterialType? PrimaryMaterialType { get; set; }
    // Các loại phụ chấp nhận, lưu dạng chuỗi phân tách bằng "," (ví dụ: "PET,HDPE")
    public string? AcceptedMaterialTypes { get; set; }
    // Công suất tái chế tối đa / tháng (tấn)
    public decimal? CapacityPerMonthTon { get; set; }
    // Yêu cầu độ tinh khiết tối thiểu (%)
    public decimal? MinPurityRequired { get; set; }

    // ── Giấy tờ / Chứng nhận ─────────────────────────────────────────────────
    // URL Cloudinary của giấy phép kinh doanh
    public string? BusinessLicenseUrl { get; set; }
    // URL Cloudinary của giấy phép môi trường (nếu có)
    public string? EnvironmentLicenseUrl { get; set; }

    // ── Trạng thái hồ sơ ─────────────────────────────────────────────────────
    // true = đã upload đủ giấy tờ và chọn vật liệu → được phép vào hệ thống
    public bool IsProfileComplete { get; set; } = false;

    // Premium subscription (thêm mới qua migration)
    public bool IsPremium { get; set; } = false;
    public DateTime? PremiumExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<BatchBid> Bids { get; set; } = [];
    public ICollection<BatchOrder> Orders { get; set; } = [];
}

