using Renats_BE.DTOs.Seller;

namespace Renats_BE.Services.Interfaces;

public interface ISellerService
{
    Task<SellerProfileDto?> GetProfileAsync(Guid sellerId);
    Task<bool> UpdateProfileAsync(Guid sellerId, UpdateProfileDto dto);
    Task<bool> ChangePasswordAsync(Guid sellerId, string oldPassword, string newPassword);
    Task<SellerStatsDto> GetStatsAsync(Guid sellerId);
    Task<bool> DeleteAccountAsync(Guid sellerId);
}

public interface IPickupRequestService
{
    Task<List<PickupRequestSummaryDto>> GetRequestsAsync(Guid sellerId, string? status);
    Task<PickupRequestDetailDto?> GetRequestDetailAsync(Guid id);
    Task<CreateRequestResultDto> CreateRequestAsync(CreatePickupRequestDto dto);
    Task<bool> CancelRequestAsync(Guid id);
}
