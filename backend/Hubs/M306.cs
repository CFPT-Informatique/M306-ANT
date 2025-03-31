using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class M306 : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
