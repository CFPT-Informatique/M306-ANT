using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

public static class ChatController
{
    public static void Map(WebApplication app)
    {
        app.MapGet("/api/chat/messages", async (AppDbContext db) =>
        {
            var messages = await db.Messages
                .Include(m => m.Sender)
                .OrderByDescending(m => m.CreatedAt)
                .Take(50)
                .ToListAsync();

            return Results.Ok(messages.Select(m => new {
                id = m.Id,
                content = m.Content,
                sender = m.Sender.Username,
                createdAt = m.CreatedAt
            }));
        });

        app.MapPost("/api/chat/messages", async (
            AppDbContext db,
            MessageDto messageDto
        ) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == messageDto.Sender);
            if (user is null)
                return Results.BadRequest("Utilisateur non trouvé.");

            var msg = new Message
            {
                SenderId = user.Id,
                Content = messageDto.Content,
                CreatedAt = DateTime.UtcNow
            };

            db.Messages.Add(msg);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                id = msg.Id,
                content = msg.Content,
                sender = user.Username,
                createdAt = msg.CreatedAt
            });
        });

        app.MapGet("/api/chat/users", async (AppDbContext db) =>
        {
            var users = await db.Users
                .Select(u => new { u.Id, u.Username })
                .ToListAsync();

            return Results.Ok(users);
        });
    }
}
