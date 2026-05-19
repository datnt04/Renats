namespace Renats_BE.DTOs.Seller;

// ── Profile ──────────────────────────────────────────────────────────────────

public class SellerProfileDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? DefaultAddress { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? Bio { get; set; }
    public int TotalRequests { get; set; }
    public int CompletedRequests { get; set; }
    public decimal? AverageRating { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateProfileDto
{
    public string? Name { get; set; }
    public string? Phone { get; set; }
    public string? DefaultAddress { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? Bio { get; set; }
}

public class ChangePasswordDto
{
    public string OldPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}

public class SellerStatsDto
{
    public int TotalRequests { get; set; }
    public int CompletedRequests { get; set; }
    public int PendingCount { get; set; }
    public int InProgressCount { get; set; }
    public int DoneCount { get; set; }
    public decimal TotalEarned { get; set; }
}

// ── Pickup Request ────────────────────────────────────────────────────────────

public class PickupRequestSummaryDto
{
    public Guid Id { get; set; }
    public string RequestCode { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string PickupAddress { get; set; } = string.Empty;
    public string PickupDate { get; set; } = string.Empty;
    public string PickupSlot { get; set; } = string.Empty;
    public List<MaterialTagDto> Types { get; set; } = [];
    public string? DepotName { get; set; }
    public string? Note { get; set; }
    public decimal? TotalKg { get; set; }
    public decimal? TotalMoney { get; set; }
    public List<PickupResultDto> ResultWeights { get; set; } = [];
    public DateTime CreatedAt { get; set; }
}

public class PickupRequestDetailDto : PickupRequestSummaryDto
{
    public string? Description { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public DateTime? WeighedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public List<string> Images { get; set; } = [];
    public DepotInfoDto? Depot { get; set; }
}

public class MaterialTagDto
{
    public string? Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string? Emoji { get; set; }
}

public class PickupResultDto
{
    public string Label { get; set; } = string.Empty;
    public decimal Kg { get; set; }
    public decimal PricePerKg { get; set; }
    public decimal Total { get; set; }
}

public class DepotInfoDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
}

public class CreatePickupRequestDto
{
    public Guid SellerId { get; set; }
    public string PickupAddress { get; set; } = string.Empty;
    public DateTime PickupDate { get; set; }
    public string PickupSlot { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<MaterialItemDto> Items { get; set; } = [];
    public List<string>? ImageUrls { get; set; }
}

public class MaterialItemDto
{
    public string MaterialId { get; set; } = string.Empty;
    public string MaterialLabel { get; set; } = string.Empty;
    public string? MaterialEmoji { get; set; }
}

public class CreateRequestResultDto
{
    public Guid RequestId { get; set; }
    public string RequestCode { get; set; } = string.Empty;
}
