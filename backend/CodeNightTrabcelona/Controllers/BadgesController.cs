using CodeNightTrabcelona.BusinessLayer.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CodeNightTrabcelona.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BadgesController : CustomBaseController
    {
        private readonly IBadgeService _badgeService;

        public BadgesController(IBadgeService badgeService)
        {
            _badgeService = badgeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyBadges()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _badgeService.GetUserBadgesAsync(userId);
            return CreateActionResult(response);
        }
    }
}
