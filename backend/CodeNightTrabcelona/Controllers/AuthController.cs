using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using Microsoft.AspNetCore.Mvc;

namespace CodeNightTrabcelona.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : CustomBaseController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);
            return CreateActionResult(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto registerDto)
        {
            var response = await _authService.RegisterAsync(registerDto);
            return CreateActionResult(response);
        }
    }
}
