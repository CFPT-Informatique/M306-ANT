using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet("ping")]
    [Authorize]
    public IActionResult Ping() => Ok("🏓 Pong depuis route protégée !");
}
