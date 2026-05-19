using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Repositories.Interfaces;

public interface ISellerRepository
{
    Task<Seller?> GetByIdAsync(Guid id);
    Task<Seller?> GetByUserIdAsync(Guid userId);
    Task UpdateAsync(Seller seller);
}

public interface IPickupRequestRepository
{
    Task<List<PickupRequest>> GetBySellerIdAsync(Guid sellerId, PickupRequestStatus? status);
    Task<PickupRequest?> GetByIdWithDetailsAsync(Guid id);
    Task<int> CountBySellerIdAsync(Guid sellerId);
    Task AddAsync(PickupRequest request);
    Task UpdateAsync(PickupRequest request);
}
