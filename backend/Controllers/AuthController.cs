using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserDto dto)
        {
            try
            {
                var user = _authService.Register(dto);

                return Ok(new
                {
                    username = user.Username
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new
                {
                    error = ex.Message
                });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDto dto)
        {
            try
            {
                var user = _authService.Login(dto);
                return Ok(new
                {
                    username = user.Username
                });
            }
            catch (InvalidOperationException ex)
            {
                // Возвращаем ключ ошибки (для локализации на фронте)
                return BadRequest(new
                {
                    error = ex.Message
                });
            }
        }
    }
};