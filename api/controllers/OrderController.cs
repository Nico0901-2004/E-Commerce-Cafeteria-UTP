using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // ¡Solo usuarios logueados pueden comprar!
    public class OrderController : ControllerBase
    {
        private readonly CafeUtpContext _context;

        public OrderController(CafeUtpContext context)
        {
            _context = context;
        }

        // --- Helper: Obtiene el UserId desde el token JWT ---
        private int GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                throw new Exception("No se pudo identificar al usuario desde el token.");
            }
            return userId;
        }

        // --- Endpoint para OBTENER MI HISTORIAL DE PEDIDOS ---
        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetMyOrders()
        {
            try
            {
                int userId = GetUserIdFromToken();
                
                var orders = await _context.Orders
                    .Where(o => o.UserId == userId)
                    .Include(o => o.OrderDetails) // Incluimos los detalles
                        .ThenInclude(od => od.Product) // Y los productos de esos detalles
                    .OrderByDescending(o => o.OrderDate) // Pedidos más recientes primero
                    .ToListAsync();
                
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

       // --- Endpoint para CREAR UN NUEVO PEDIDO (CHECKOUT) ---
        // POST: api/Order/checkout
        [HttpPost("checkout")]
        public async Task<ActionResult<Order>> Checkout()
        {
            try
            {
                int userId = GetUserIdFromToken();

                // 1. Encontrar el carrito del usuario (con todos los items y productos)
                var cart = await _context.Carts
                    .Include(c => c.CartItems)
                        .ThenInclude(ci => ci.Product) // ¡Importante incluir el producto para saber el precio!
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (cart == null || !cart.CartItems.Any())
                {
                    return BadRequest(new { message = "Tu carrito está vacío." });
                }

                // 2. Crear el nuevo Pedido (Order)
                var newOrder = new Order
                {
                    UserId = userId,
                    OrderDate = DateTime.UtcNow,
                    Status = "Pendiente",
                    OrderDetails = new List<OrderDetail>()
                };

                decimal totalAmount = 0;

                // 3. Convertir CartItems en OrderDetails
                foreach (var cartItem in cart.CartItems)
                {
                    // --- ¡CORRECCIÓN AQUÍ! ---
                    // Verificamos si el producto todavía existe antes de usarlo
                    if (cartItem.Product == null)
                    {
                        // Si el producto fue eliminado de la BD, simplemente no lo agregamos al pedido.
                        continue; // Salta a la siguiente iteración del loop
                    }
                    // --- FIN DE LA CORRECCIÓN ---


                    var orderDetail = new OrderDetail
                    {
                        ProductId = cartItem.ProductId,
                        Quantity = cartItem.Quantity,
                        // ¡IMPORTANTE! Guardamos el precio del producto AL MOMENTO de la compra
                        UnitPrice = cartItem.Product.Price // Ahora C# sabe que esto es seguro
                    };
                    
                    newOrder.OrderDetails.Add(orderDetail);
                    totalAmount += (cartItem.Product.Price * cartItem.Quantity);
                }

                // (Opcional) Si todos los productos del carrito fueron borrados
                if (!newOrder.OrderDetails.Any())
                {
                    return BadRequest(new { message = "Los productos en tu carrito ya no están disponibles." });
                }

                newOrder.TotalAmount = totalAmount;

                // 4. Guardar el pedido en la base de datos
                _context.Orders.Add(newOrder);

                // 5. Vaciar el carrito
                _context.CartItems.RemoveRange(cart.CartItems);

                // 6. Guardar todos los cambios (Pedido nuevo y Carrito vacío)
                await _context.SaveChangesAsync();

                return Ok(newOrder); // Devolvemos el pedido recién creado
            }
            catch (Exception ex)
            {
                // Captura errores si, por ejemplo, el token es inválido
                return Unauthorized(new { message = $"Error al procesar el pedido: {ex.Message}" });
            }
        }
    }
}