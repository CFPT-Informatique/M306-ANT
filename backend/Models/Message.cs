using backend.Models;

public class Message
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public User Sender { get; set; } = null!;
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}
