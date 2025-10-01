namespace api.Models;

public class Roles
{
    public int RoleId { get; set; }
    public string Name { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
