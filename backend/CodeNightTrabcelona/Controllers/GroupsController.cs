using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CodeNightTrabcelona.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : CustomBaseController
    {
        private readonly IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard([FromQuery] int topCount = 10)
        {
            var response = await _groupService.GetLeaderboardAsync(topCount);
            return CreateActionResult(response);
        }
        
        [HttpGet("leaderboard/paged")]
        public async Task<IActionResult> GetLeaderboardPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var response = await _groupService.GetLeaderboardPagedAsync(page, pageSize);
            return CreateActionResult(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupDetails(Guid id)
        {
            var response = await _groupService.GetGroupDetailsAsync(id);
            return CreateActionResult(response);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateGroup(CreateGroupDto createDto)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _groupService.CreateGroupAsync(createDto, userId);
            return CreateActionResult(response);
        }
    }
}
