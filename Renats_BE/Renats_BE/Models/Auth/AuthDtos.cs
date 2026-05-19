namespace Renats_BE.Models.Auth;

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Role { get; set; } = string.Empty; // ADMIN | DEPOT | FACTORY | DRIVER | SELLER

    // Extra fields for company roles (DEPOT, FACTORY)
    public string? CompanyName { get; set; }
    public string? TaxCode { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? ContactPerson { get; set; }
    public string? ContactPhone { get; set; }

    // Driver-specific
    public string? LicenseNumber { get; set; }
    public string? VehiclePlate { get; set; }
    public string? VehicleType { get; set; }
    public decimal? MaxCapacityKg { get; set; }

    // Seller-specific
    public string? DefaultAddress { get; set; }
    public string? Bio { get; set; }
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
