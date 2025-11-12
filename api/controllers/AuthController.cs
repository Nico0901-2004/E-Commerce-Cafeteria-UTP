using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // DTOs (Data Transfer Objects)
    public record UserDto(string FullName, string Email, string? Phone, string Password, int RoleId);
    public record LoginDto(string Email, string Password);

    private readonly CafeUtpContext _context;
    private readonly IConfiguration _config;

    public AuthController(CafeUtpContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(UserDto request)
    {
        // 1. Validar si el email ya existe
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (existingUser != null)
        {
            return BadRequest("El email ya está registrado.");
        }

        // 2. Hashear la contraseña
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        // 3. Crear el nuevo usuario
        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = passwordHash,
            
            // --- ¡LA SOLUCIÓN DEFINITIVA ESTÁ AQUÍ! ---
            // Si el RoleId que llega del frontend es 0 (porque no lo envía),
            // lo forzamos a ser 1 (Cliente).
            // Si llega un 2 (Admin), usará 2.
            RoleId = request.RoleId == 0 ? 1 : request.RoleId,
            
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        // 4. Guardar en la BD
        _context.Users.Add(user);
        await _context.SaveChangesAsync(); // La línea 62 que daba error

        return Ok(new { message = "Usuario registrado exitosamente" });
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginDto request)
    {
        // 1. Buscar al usuario por email
        var user = await _context.Users
            .Include(u => u.Role) // ¡Importante! Incluir el Rol para el token
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
        {
            return BadRequest("Email o contraseña incorrecta.");
        }

        // 2. Verificar la contraseña
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return BadRequest("Email o contraseña incorrecta.");
        }

        // 3. Crear el Token JWT
        string token = CreateToken(user);

        return Ok(token);
    }
    
    private string CreateToken(User user)
    {
        // Claims (Información que va dentro del token)
        var claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), 
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role?.Name ?? "Cliente") 
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _config.GetSection("Jwt:Key").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                claims: claims,
                expires: DateTime.Now.AddDays(1), // Token dura 1 día
                signingCredentials: creds
            );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}