using System.Collections.Generic; // Agregado
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Order
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = "Pendiente";

    // Relación con Usuario
    public int UserId { get; set; }
    // --- CORREGIDO: De 'Users' a 'User' (singular) ---
    public virtual User? User { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}