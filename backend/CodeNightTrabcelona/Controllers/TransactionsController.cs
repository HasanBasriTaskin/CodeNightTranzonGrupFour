using CodeNightTrabcelona.BusinessLayer.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CodeNightTrabcelona.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : CustomBaseController
    {
        private readonly IGreenTokenService _tokenService;

        public TransactionsController(IGreenTokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactions([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _tokenService.GetUserTransactionsPagedAsync(userId, page, pageSize);
            return CreateActionResult(response);
        }

        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _tokenService.GetUserBalanceAsync(userId);
            return CreateActionResult(response);
        }

        [HttpPost("redeem")]
        public async Task<IActionResult> RedeemToken([FromQuery] decimal amount, [FromQuery] string reason)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _tokenService.RedeemTokensAsync(userId, amount, reason);
            return CreateActionResult(response);
        }
    }
}
