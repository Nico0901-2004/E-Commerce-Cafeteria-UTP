using System.Collections.Generic; // Agregado

namespace api.Models;

public class User
{
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Phone { get; set; }
    public string PasswordHash { get; set; } = null!;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // --- AGREGADO PARA RELACIÓN CON ROLES ---
    public int? RoleId { get; set; }
    public virtual Roles? Role { get; set; }
}