using Renats_BE.Models.Enums;

namespace Renats_BE.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Factory? Factory { get; set; }
    public Depot? Depot { get; set; }
    public Driver? Driver { get; set; }
    public Seller? Seller { get; set; }
    public ICollection<Notification> Notifications { get; set; } = [];
}
