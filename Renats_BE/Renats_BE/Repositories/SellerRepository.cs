using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;
using Renats_BE.Repositories.Interfaces;

namespace Renats_BE.Repositories;

public class SellerRepository : ISellerRepository
{
    private readonly AppDbContext _db;
    public SellerRepository(AppDbContext db) => _db = db;

    public async Task<Seller?> GetByIdAsync(Guid id) =>
        await _db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id);

    public async Task<Seller?> GetByUserIdAsync(Guid userId) =>
        await _db.Sellers.Include(s => s.User).FirstOrDefaultAsync(s => s.UserId == userId);

    public async Task UpdateAsync(Seller seller)
    {
        _db.Sellers.Update(seller);
        await _db.SaveChangesAsync();
    }
}

public class PickupRequestRepository : IPickupRequestRepository
{
    private readonly AppDbContext _db;
    public PickupRequestRepository(AppDbContext db) => _db = db;

    public async Task<List<PickupRequest>> GetBySellerIdAsync(Guid sellerId, PickupRequestStatus? status)
    {
        var query = _db.PickupRequests
            .Where(r => r.SellerId == sellerId)
            .Include(r => r.Items)
            .Include(r => r.Results)
            .Include(r => r.AssignedDepot)
            .AsQueryable();

        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);

        return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<PickupRequest?> GetByIdWithDetailsAsync(Guid id) =>
        await _db.PickupRequests
            .Where(r => r.Id == id)
            .Include(r => r.Items)
            .Include(r => r.Images)
            .Include(r => r.Results)
            .Include(r => r.Seller).ThenInclude(s => s.User)
            .Include(r => r.AssignedDepot)
            .FirstOrDefaultAsync();

    public async Task<int> CountBySellerIdAsync(Guid sellerId) =>
        await _db.PickupRequests.CountAsync(r => r.SellerId == sellerId);

    public async Task AddAsync(PickupRequest request)
    {
        _db.PickupRequests.Add(request);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(PickupRequest request)
    {
        _db.PickupRequests.Update(request);
        await _db.SaveChangesAsync();
    }
}
