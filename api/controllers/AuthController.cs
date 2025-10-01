using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers;

// DTOs
public record RegisterDto(string FullName, string Email, string? Phone, string Password);
public record LoginDto(string Email, string Password);

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly CafeUtpContext _db;
    public AuthController(CafeUtpContext db) => _db = db;

    /// <summary>
    /// Registro de usuario (hash con BCrypt, correo único).
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        // Validaciones simples
        if (string.IsNullOrWhiteSpace(dto.FullName) ||
            string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new { message = "Faltan datos obligatorios." });
        }

        // Email único
        var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
        if (exists)
            return Conflict(new { message = "El correo ya está registrado" });

        // Hash de contraseña
        var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Phone = dto.Phone,
            PasswordHash = hash,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // Respuesta mínima (sin exponer hash)
        return Created("", new
        {
            user.UserId,
            user.FullName,
            user.Email
        });
    }

    /// <summary>
    /// Login simple (sin JWT). Verifica con BCrypt y devuelve un token genérico.
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest(new { message = "Email y contraseña son obligatorios." });

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.IsActive);
        if (user is null)
            return Unauthorized(new { message = "Usuario no encontrado o inactivo" });

        var ok = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        if (!ok)
            return Unauthorized(new { message = "Contraseña incorrecta" });

        // Token simple para que el frontend lo guarde (puedes cambiar a JWT luego)
        var token = Guid.NewGuid().ToString("N");

        return Ok(new
        {
            token,
            user = new
            {
                user.UserId,
                user.FullName,
                user.Email
            }
        });
    }
}
