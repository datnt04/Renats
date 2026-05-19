using Renats_BE.DTOs.Seller;
using Renats_BE.Models;
using Renats_BE.Models.Enums;
using Renats_BE.Repositories.Interfaces;
using Renats_BE.Services.Interfaces;

namespace Renats_BE.Services;

public class SellerService : ISellerService
{
    private readonly ISellerRepository _sellerRepo;

    public SellerService(ISellerRepository sellerRepo) => _sellerRepo = sellerRepo;

    public async Task<SellerProfileDto?> GetProfileAsync(Guid sellerId)
    {
        var seller = await _sellerRepo.GetByIdAsync(sellerId);
        if (seller is null) return null;

        return MapToProfileDto(seller);
    }

    public async Task<bool> UpdateProfileAsync(Guid sellerId, UpdateProfileDto dto)
    {
        var seller = await _sellerRepo.GetByIdAsync(sellerId);
        if (seller is null) return false;

        if (dto.Name is not null) seller.User.FullName = dto.Name;
        if (dto.Phone is not null) seller.User.Phone = dto.Phone;
        if (dto.DefaultAddress is not null) seller.DefaultAddress = dto.DefaultAddress;
        if (dto.City is not null) seller.City = dto.City;
        if (dto.Province is not null) seller.Province = dto.Province;
        if (dto.Bio is not null) seller.Bio = dto.Bio;
        seller.User.UpdatedAt = DateTime.UtcNow;

        await _sellerRepo.UpdateAsync(seller);
        return true;
    }

    public async Task<bool> ChangePasswordAsync(Guid sellerId, string oldPassword, string newPassword)
    {
        var seller = await _sellerRepo.GetByIdAsync(sellerId);
        if (seller is null) return false;

        // TODO: replace with BCrypt.Verify in production
        if (seller.User.PasswordHash != oldPassword) return false;

        seller.User.PasswordHash = newPassword;
        seller.User.UpdatedAt = DateTime.UtcNow;
        await _sellerRepo.UpdateAsync(seller);
        return true;
    }

    public async Task<SellerStatsDto> GetStatsAsync(Guid sellerId)
    {
        var seller = await _sellerRepo.GetByIdAsync(sellerId);
        if (seller is null) return new();

        // Stats are cached on Seller entity; detailed breakdown done via request repo
        return new SellerStatsDto
        {
            TotalRequests = seller.TotalRequests,
            CompletedRequests = seller.CompletedRequests
        };
    }

    public async Task<bool> DeleteAccountAsync(Guid sellerId)
    {
        var seller = await _sellerRepo.GetByIdAsync(sellerId);
        if (seller is null) return false;

        seller.User.IsActive = false;
        seller.User.UpdatedAt = DateTime.UtcNow;
        await _sellerRepo.UpdateAsync(seller);
        return true;
    }

    private static SellerProfileDto MapToProfileDto(Seller s) => new()
    {
        Id = s.Id,
        UserId = s.UserId,
        Name = s.User.FullName,
        Phone = s.User.Phone,
        Email = s.User.Email,
        DefaultAddress = s.DefaultAddress,
        City = s.City,
        Province = s.Province,
        Bio = s.Bio,
        TotalRequests = s.TotalRequests,
        CompletedRequests = s.CompletedRequests,
        AverageRating = s.AverageRating,
        CreatedAt = s.CreatedAt
    };
}

public class PickupRequestService : IPickupRequestService
{
    private readonly IPickupRequestRepository _requestRepo;
    private readonly ISellerRepository _sellerRepo;

    public PickupRequestService(IPickupRequestRepository requestRepo, ISellerRepository sellerRepo)
    {
        _requestRepo = requestRepo;
        _sellerRepo = sellerRepo;
    }

    public async Task<List<PickupRequestSummaryDto>> GetRequestsAsync(Guid sellerId, string? status)
    {
        PickupRequestStatus? parsed = null;
        if (!string.IsNullOrEmpty(status) &&
            Enum.TryParse<PickupRequestStatus>(status, ignoreCase: true, out var s))
            parsed = s;

        var requests = await _requestRepo.GetBySellerIdAsync(sellerId, parsed);
        return requests.Select(MapToSummaryDto).ToList();
    }

    public async Task<PickupRequestDetailDto?> GetRequestDetailAsync(Guid id)
    {
        var r = await _requestRepo.GetByIdWithDetailsAsync(id);
        if (r is null) return null;
        return MapToDetailDto(r);
    }

    public async Task<CreateRequestResultDto> CreateRequestAsync(CreatePickupRequestDto dto)
    {
        var seller = await _sellerRepo.GetByIdAsync(dto.SellerId)
            ?? throw new KeyNotFoundException("Seller not found");

        var count = await _requestRepo.CountBySellerIdAsync(dto.SellerId);
        var code = $"YC-{(count + 1):D3}";

        var request = new PickupRequest
        {
            RequestCode = code,
            SellerId = dto.SellerId,
            PickupAddress = dto.PickupAddress,
            PickupDate = DateTime.SpecifyKind(dto.PickupDate, DateTimeKind.Utc),
            PickupSlot = dto.PickupSlot,
            Description = dto.Description,
            Status = PickupRequestStatus.PENDING
        };

        foreach (var item in dto.Items)
            request.Items.Add(new PickupRequestItem
            {
                MaterialId = item.MaterialId,
                MaterialLabel = item.MaterialLabel,
                MaterialEmoji = item.MaterialEmoji
            });

        if (dto.ImageUrls is not null)
            foreach (var url in dto.ImageUrls)
                request.Images.Add(new PickupRequestImage { ImageUrl = url });

        seller.TotalRequests++;
        await _sellerRepo.UpdateAsync(seller);
        await _requestRepo.AddAsync(request);

        return new CreateRequestResultDto { RequestId = request.Id, RequestCode = request.RequestCode };
    }

    public async Task<bool> CancelRequestAsync(Guid id)
    {
        var request = await _requestRepo.GetByIdWithDetailsAsync(id);
        if (request is null) return false;
        if (request.Status != PickupRequestStatus.PENDING) return false;

        request.Status = PickupRequestStatus.CANCELLED;
        request.UpdatedAt = DateTime.UtcNow;
        await _requestRepo.UpdateAsync(request);
        return true;
    }

    // ── Mappers ──────────────────────────────────────────────────────────────

    private static PickupRequestSummaryDto MapToSummaryDto(PickupRequest r) => new()
    {
        Id = r.Id,
        RequestCode = r.RequestCode,
        Status = r.Status.ToString().ToLower(),
        PickupAddress = r.PickupAddress,
        PickupDate = r.PickupDate.ToString("dd/MM/yyyy"),
        PickupSlot = r.PickupSlot,
        Types = r.Items.Select(i => new MaterialTagDto { Id = i.MaterialId, Label = i.MaterialLabel, Emoji = i.MaterialEmoji }).ToList(),
        DepotName = r.AssignedDepot?.CompanyName,
        Note = r.Note,
        TotalKg = r.Results.Any() ? r.Results.Sum(res => res.WeightKg) : null,
        TotalMoney = r.Results.Any() ? r.Results.Sum(res => res.WeightKg * res.PricePerKg) : null,
        ResultWeights = r.Results.Select(res => new PickupResultDto
        {
            Label = res.MaterialLabel,
            Kg = res.WeightKg,
            PricePerKg = res.PricePerKg,
            Total = res.WeightKg * res.PricePerKg
        }).ToList(),
        CreatedAt = r.CreatedAt
    };

    private static PickupRequestDetailDto MapToDetailDto(PickupRequest r) => new()
    {
        Id = r.Id,
        RequestCode = r.RequestCode,
        Status = r.Status.ToString().ToLower(),
        PickupAddress = r.PickupAddress,
        PickupDate = r.PickupDate.ToString("dd/MM/yyyy"),
        PickupSlot = r.PickupSlot,
        Description = r.Description,
        Note = r.Note,
        ScheduledAt = r.ScheduledAt,
        WeighedAt = r.WeighedAt,
        CompletedAt = r.CompletedAt,
        CreatedAt = r.CreatedAt,
        Types = r.Items.Select(i => new MaterialTagDto { Id = i.MaterialId, Label = i.MaterialLabel, Emoji = i.MaterialEmoji }).ToList(),
        Images = r.Images.Select(i => i.ImageUrl).ToList(),
        Depot = r.AssignedDepot is null ? null : new DepotInfoDto
        {
            Id = r.AssignedDepot.Id,
            Name = r.AssignedDepot.CompanyName,
            Phone = r.AssignedDepot.ContactPhone
        },
        ResultWeights = r.Results.Select(res => new PickupResultDto
        {
            Label = res.MaterialLabel,
            Kg = res.WeightKg,
            PricePerKg = res.PricePerKg,
            Total = res.WeightKg * res.PricePerKg
        }).ToList(),
        TotalKg = r.Results.Any() ? r.Results.Sum(res => res.WeightKg) : null,
        TotalMoney = r.Results.Any() ? r.Results.Sum(res => res.WeightKg * res.PricePerKg) : null
    };
}
