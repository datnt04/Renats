using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;

namespace Renats_BE.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        // Add SELLER to user_role enum if it doesn't exist yet
        var alterEnumSql = @"
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'SELLER' AND enumtypid = 'user_role'::regtype) THEN
                    ALTER TYPE user_role ADD VALUE 'SELLER';
                END IF; 
            END $$;
        ";
        await db.Database.ExecuteSqlRawAsync(alterEnumSql);
        
        var conn = (Npgsql.NpgsqlConnection)db.Database.GetDbConnection();
        await conn.OpenAsync();
        await conn.ReloadTypesAsync();

        // Chỉ seed nếu chưa có user test
        if (await db.Users.AnyAsync(u => u.Email == "giango9981@gmail.com"))
            return;

        // ── 1. Tạo User (Dùng Raw SQL để tránh lỗi cache Enum của Npgsql) ──
        var userId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var sellerId = Guid.Parse("22222222-2222-2222-2222-222222222222");

        var insertUserSql = $@"
            INSERT INTO users (id, email, password_hash, role, full_name, phone, is_active, created_at, updated_at)
            VALUES (
                '{userId}', 
                'giango9981@gmail.com', 
                'Renats@2025', 
                'SELLER'::user_role, 
                'Ngô Sỹ Giá', 
                '0912345678', 
                true, 
                CURRENT_TIMESTAMP, 
                CURRENT_TIMESTAMP
            );
        ";
        await db.Database.ExecuteSqlRawAsync(insertUserSql);

        // ── 2. Tạo Seller profile ─────────────────────────────────────────────
        var seller = new Seller
        {
            Id = sellerId,
            UserId = userId,
            DefaultAddress = "123 Đường Lê Văn Việt, Quận 9",
            City = "Hồ Chí Minh",
            Province = "TP. Hồ Chí Minh",
            Bio = "Chuyên thu gom phế liệu gia đình khu vực Quận 9",
            TotalRequests = 0,
            CompletedRequests = 0,
            CreatedAt = DateTime.UtcNow
        };

        db.Sellers.Add(seller);

        // ── 3. Seed một vài PickupRequest mẫu để test UI ─────────────────────
        var req1Id = Guid.NewGuid();
        var req1 = new PickupRequest
        {
            Id = req1Id,
            RequestCode = "YC-001",
            SellerId = sellerId,
            PickupAddress = "123 Đường Lê Văn Việt, Quận 9, TP.HCM",
            PickupDate = DateTime.UtcNow.AddDays(-5),
            PickupSlot = "08:00 – 10:00",
            Description = "Hàng sạch, đã phân loại sẵn",
            Status = PickupRequestStatus.DONE,
            ScheduledAt = DateTime.UtcNow.AddDays(-6),
            WeighedAt = DateTime.UtcNow.AddDays(-5),
            CompletedAt = DateTime.UtcNow.AddDays(-5),
            Note = "Hàng sạch, đã phân loại sẵn",
            CreatedAt = DateTime.UtcNow.AddDays(-7),
            UpdatedAt = DateTime.UtcNow.AddDays(-5)
        };
        req1.Items.Add(new PickupRequestItem { PickupRequestId = req1Id, MaterialId = "dong_cap_1", MaterialLabel = "Đồng cáp", MaterialEmoji = "🔶" });
        req1.Items.Add(new PickupRequestItem { PickupRequestId = req1Id, MaterialId = "sat", MaterialLabel = "Sắt vụn", MaterialEmoji = "⚙️" });
        req1.Results.Add(new PickupResult { PickupRequestId = req1Id, MaterialLabel = "Đồng cáp", WeightKg = 12.5m, PricePerKg = 95000m });
        req1.Results.Add(new PickupResult { PickupRequestId = req1Id, MaterialLabel = "Sắt vụn", WeightKg = 48.0m, PricePerKg = 10000m });

        var req2 = new PickupRequest
        {
            RequestCode = "YC-002",
            SellerId = sellerId,
            PickupAddress = "123 Đường Lê Văn Việt, Quận 9, TP.HCM",
            PickupDate = DateTime.UtcNow.AddDays(1),
            PickupSlot = "13:00 – 15:00",
            Status = PickupRequestStatus.SCHEDULED,
            ScheduledAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow.AddDays(-1),
            UpdatedAt = DateTime.UtcNow
        };
        req2.Items.Add(new PickupRequestItem { MaterialId = "giay_carton", MaterialLabel = "Giấy Carton", MaterialEmoji = "📦" });

        var req3 = new PickupRequest
        {
            RequestCode = "YC-003",
            SellerId = sellerId,
            PickupAddress = "123 Đường Lê Văn Việt, Quận 9, TP.HCM",
            PickupDate = DateTime.UtcNow.AddDays(3),
            PickupSlot = "09:00 – 11:00",
            Status = PickupRequestStatus.PENDING,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        req3.Items.Add(new PickupRequestItem { MaterialId = "nhua_cung", MaterialLabel = "Nhựa cứng", MaterialEmoji = "🪣" });
        req3.Items.Add(new PickupRequestItem { MaterialId = "nhua_mem", MaterialLabel = "Nhựa mềm", MaterialEmoji = "🛍️" });
        req3.Items.Add(new PickupRequestItem { MaterialId = "thiec", MaterialLabel = "Thiếc", MaterialEmoji = "🥫" });

        db.PickupRequests.AddRange(req1, req2, req3);

        // Cập nhật stats cho seller
        seller.TotalRequests = 3;
        seller.CompletedRequests = 1;

        await db.SaveChangesAsync();
        Console.WriteLine("✅ Seed data: Ngô Sỹ Giá (giango9981@gmail.com) - sellerId: " + sellerId);
    }
}
