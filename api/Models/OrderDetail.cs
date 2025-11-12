using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class OrderDetail
{
    public int OrderDetailId { get; set; }
    public int Quantity { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal UnitPrice { get; set; }

    // Relaciones
    public int OrderId { get; set; }
    public virtual Order? Order { get; set; }

    public int ProductId { get; set; }
    public virtual Product? Product { get; set; }
}