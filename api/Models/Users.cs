namespace api.Models;

public class Users
{
    public int UserId { get; set; }
    public string Email { get; set; } = null!;
    public byte[]? PasswordHash { get; set; }
    public string FullName { get; set; } = null!;
    public string? Phone { get; set; }
    public int RoleId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public Roles? Role { get; set; }
}
