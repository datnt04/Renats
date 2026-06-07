using Microsoft.EntityFrameworkCore;
using Renats_BE.Data;
using Renats_BE.Models;
using Renats_BE.Models.Enums;
using System.Security.Cryptography;
using System.Text;

namespace Renats_BE.Data;

public static class DbSeeder
{
    // ── Thông tin tài khoản Admin ──────────────────────────────
    private const string AdminEmail    = "admin@renats.vn";
    private const string AdminPassword = "Admin@123";
    private const string AdminFullName = "Quản trị viên Re-Nats";
    private const string AdminPhone    = "0909000001";
    // ──────────────────────────────────────────────────────────

    public static async Task SeedAsync(AppDbContext db)
    {
        // Chạy migration nếu chưa chạy
        await db.Database.MigrateAsync();

        // Kiểm tra admin đã tồn tại chưa
        if (await db.Users.AnyAsync(u => u.Email == AdminEmail))
        {
            Console.WriteLine("✅ [Seeder] Tài khoản admin đã tồn tại, bỏ qua seed.");
            return;
        }

        var admin = new User
        {
            Email        = AdminEmail,
            PasswordHash = HashPassword(AdminPassword),
            FullName     = AdminFullName,
            Phone        = AdminPhone,
            Role         = UserRole.ADMIN,
            IsActive     = true,
            CreatedAt    = DateTime.UtcNow,
            UpdatedAt    = DateTime.UtcNow,
        };

        db.Users.Add(admin);
        await db.SaveChangesAsync();

        Console.WriteLine("🌱 [Seeder] Đã tạo tài khoản admin thành công!");
        Console.WriteLine($"   📧 Email   : {AdminEmail}");
        Console.WriteLine($"   🔑 Password: {AdminPassword}");
        Console.WriteLine($"   👤 Tên     : {AdminFullName}");
    }

    private static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password + "renats_salt_2025"));
        return Convert.ToBase64String(bytes);
    }
}
