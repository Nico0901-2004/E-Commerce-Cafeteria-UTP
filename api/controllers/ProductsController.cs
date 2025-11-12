using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CafeUtpContext _context;

        // Esto "inyecta" tu base de datos (CafeUtpContext) en el controlador
        public ProductsController(CafeUtpContext context)
        {
            _context = context;
        }

        // --- Endpoint para OBTENER TODOS los productos ---
        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // Simplemente va a la base de datos y trae todos los productos
            return await _context.Products.ToListAsync();
        }

        // --- Endpoint para OBTENER UN SOLO producto por ID ---
        // GET: api/Products/5 
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // --- Endpoint para CREAR un nuevo producto ---
        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Agrega el producto que enviaste a la base de datos
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Devuelve un "201 Created" (éxito)
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }
    }
}