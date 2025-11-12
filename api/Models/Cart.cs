using System.Collections.Generic; // Agregado

namespace api.Models;

public class Cart
{
    public int CartId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Relación con Usuario
    public int UserId { get; set; }
    // --- CORREGIDO: De 'Users' a 'User' (singular) ---
    public virtual User? User { get; set; } 
    
    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}