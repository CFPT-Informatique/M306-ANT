using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Models;
using backend.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers;

public static class AuthController
{
    public static void Map(WebApplication app)
    {
        app.MapPost("/api/auth/register", async (RegisterDto dto, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Username))
                return Results.BadRequest("Le nom d'utilisateur est requis");
            if (string.IsNullOrWhiteSpace(dto.Email))
                return Results.BadRequest("L'adresse e-mail est requise");
            if (string.IsNullOrWhiteSpace(dto.Password))
                return Results.BadRequest("Le mot de passe est requis");

            string username = dto.Username.Trim();

            if (await db.Users.AnyAsync(u => u.Username == username))
                return Results.BadRequest("Nom d'utilisateur déjà utilisé");

            var user = new User
            {
                Username = username,
                Email = dto.Email.Trim(),
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password.Trim())
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Inscription réussie" });
        });

        app.MapPost("/api/auth/login", async (LoginDto dto, AppDbContext db, IConfiguration config) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Results.Unauthorized();

            var key = Encoding.UTF8.GetBytes(config["Jwt:Key"]!);
            var token = new JwtSecurityTokenHandler().CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Username) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            });

            return Results.Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        });
    }
}
