using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization; // 1. Necesario para [Authorize]
using System.Security.Claims; // 2. Necesario para leer el token

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // ¡IMPORTANTE! Solo usuarios logueados pueden usar este controlador
    public class CartController : ControllerBase
    {
        private readonly CafeUtpContext _context;

        public CartController(CafeUtpContext context)
        {
            _context = context;
        }

        // --- Helper: Obtiene el UserId desde el token JWT ---
        private int GetUserIdFromToken()
        {
            // User.FindFirst(ClaimTypes.NameIdentifier) busca el ID de usuario guardado en el token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            
            // Si no se encuentra (algo raro), se devuelve -1. Si se encuentra, se convierte a int.
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                // Esto no debería pasar si [Authorize] está activo, pero es una buena práctica
                throw new Exception("No se pudo identificar al usuario desde el token.");
            }
            return userId;
        }

        // --- Helper: Obtiene o crea un carrito para el usuario ---
        private async Task<Cart> GetOrCreateCart(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems) // Incluimos los items que ya tiene
                .FirstOrDefaultAsync(c => c.UserId == userId);

            // Si el usuario no tiene carrito, le creamos uno nuevo
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }

        // --- Endpoint para OBTENER MI CARRITO ---
        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<Cart>> GetMyCart()
        {
            try
            {
                int userId = GetUserIdFromToken();
                var cart = await _context.Carts
                    .Include(c => c.CartItems) // Incluimos los items
                        .ThenInclude(ci => ci.Product) // E incluimos el detalle del Producto en cada item
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (cart == null)
                {
                    // Si no tiene carrito (porque nunca ha agregado nada), le devolvemos uno vacío
                    return Ok(new Cart { UserId = userId, CartItems = new List<CartItem>() });
                }
                
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // --- DTO simple para recibir datos al añadir al carrito ---
        public class AddToCartDto
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }

        // --- Endpoint para AÑADIR AL CARRITO ---
        // POST: api/Cart/add
        [HttpPost("add")]
        public async Task<ActionResult> AddToCart([FromBody] AddToCartDto itemDto)
        {
            try
            {
                int userId = GetUserIdFromToken();
                var cart = await GetOrCreateCart(userId);

                // Verificamos si el producto ya existe en el carrito
                var existingItem = cart.CartItems
                    .FirstOrDefault(ci => ci.ProductId == itemDto.ProductId);

                if (existingItem != null)
                {
                    // Si existe, solo actualizamos la cantidad
                    existingItem.Quantity += itemDto.Quantity;
                }
                else
                {
                    // Si no existe, creamos un nuevo CartItem
                    var newItem = new CartItem
                    {
                        CartId = cart.CartId,
                        ProductId = itemDto.ProductId,
                        Quantity = itemDto.Quantity
                    };
                    _context.CartItems.Add(newItem);
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Producto añadido al carrito" });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
        
        // --- Endpoint para QUITAR DEL CARRITO ---
        // DELETE: api/Cart/remove/{productId}
        [HttpDelete("remove/{productId}")]
        public async Task<ActionResult> RemoveFromCart(int productId)
        {
            try
            {
                int userId = GetUserIdFromToken();
                var cart = await GetOrCreateCart(userId);

                var itemToRemove = cart.CartItems
                    .FirstOrDefault(ci => ci.ProductId == productId);

                if (itemToRemove != null)
                {
                    _context.CartItems.Remove(itemToRemove);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Producto eliminado del carrito" });
                }

                return NotFound(new { message = "Producto no encontrado en el carrito" });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}