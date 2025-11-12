using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;

    // Relación con Categoría
    public int CategoryId { get; set; }
    public virtual Category? Category { get; set; }
}