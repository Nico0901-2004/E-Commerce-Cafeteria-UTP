using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization; 

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // NOTA: Probablemente quieras proteger esto para que SOLO los admins lo usen
    // [Authorize(Roles = "Admin")] // <-- Necesitarías configurar roles en tu AuthController
    public class UsersController : ControllerBase
    {
        private readonly CafeUtpContext _context;

        public UsersController(CafeUtpContext context)
        {
            _context = context;
        }

        // --- Endpoint para OBTENER TODOS los usuarios ---
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            // Incluimos el Rol para saber si es "Admin" o "Cliente"
            return await _context.Users.Include(u => u.Role).ToListAsync();
        }

        // --- Endpoint para OBTENER UN SOLO usuario por ID ---
        // GET: api/Users/5 
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // --- Endpoint para ELIMINAR un usuario ---
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent(); // Respuesta estándar para un DELETE exitoso
        }
    }
}