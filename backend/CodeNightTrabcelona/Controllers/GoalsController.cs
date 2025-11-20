using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CodeNightTrabcelona.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : CustomBaseController
    {
        private readonly IUserGoalService _userGoalService;

        public GoalsController(IUserGoalService userGoalService)
        {
            _userGoalService = userGoalService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyGoal()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _userGoalService.GetUserGoalAsync(userId);
            return CreateActionResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGoal(UpdateUserGoalDto updateDto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _userGoalService.UpdateUserGoalAsync(userId, updateDto);
            return CreateActionResult(response);
        }
    }
}
