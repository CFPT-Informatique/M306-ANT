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
                .OrderByDescending(m => m.CreatedAt)
                .Take(50)
                .ToListAsync();

            return Results.Ok(messages);
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
