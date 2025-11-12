using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly CafeUtpContext _context;

        public RolesController(CafeUtpContext context)
        {
            _context = context;
        }

        // POST: api/Roles
        [HttpPost]
        public async Task<ActionResult<Roles>> PostRole(Roles role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return Ok(role);
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roles>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}