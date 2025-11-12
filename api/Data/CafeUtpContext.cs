using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data;

public class CafeUtpContext : DbContext
{
    public CafeUtpContext(DbContextOptions<CafeUtpContext> options) : base(options) { }

    // --- MODIFICADO: Ahora usamos tu clase User (singular) ---
    public DbSet<User> Users => Set<User>(); 
    // --- Y agregamos la tabla Roles ---
    public DbSet<Roles> Roles => Set<Roles>();

    // --- AGREGAMOS LAS NUEVAS TABLAS ---
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // Tu configuración de User existente
        mb.Entity<User>(e =>
        {
            e.ToTable("Users");
            e.HasKey(x => x.UserId);
            e.Property(x => x.FullName).HasMaxLength(120).IsRequired();
            e.Property(x => x.Email).HasMaxLength(120).IsRequired();
            e.Property(x => x.Phone).HasMaxLength(30);
            e.Property(x => x.PasswordHash).HasMaxLength(200).IsRequired();
            e.Property(x => x.IsActive).HasDefaultValue(true);
            e.HasIndex(x => x.Email).IsUnique();

            // --- AGREGAMOS LA RELACIÓN CON ROLES ---
            e.HasOne(u => u.Role)
             .WithMany()
             .HasForeignKey(u => u.RoleId)
             .IsRequired(false); // Opcional: poner 'true' si todo usuario DEBE tener un rol
        });

        // Configuración para Roles
        mb.Entity<Roles>(e =>
        {
            e.ToTable("Roles");
            e.HasKey(r => r.RoleId);
            e.Property(r => r.Name).HasMaxLength(100).IsRequired();
        });

        // --- AGREGAMOS CONFIGURACIÓN PARA EVITAR PROBLEMAS CON 'Order' ---
        mb.Entity<Order>(e =>
        {
            e.ToTable("Order"); // Le decimos que la tabla se llama 'Order'
        });
    }
}