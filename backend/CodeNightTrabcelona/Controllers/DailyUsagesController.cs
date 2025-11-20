using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CodeNightTrabcelona.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DailyUsagesController : CustomBaseController
    {
        private readonly IDailyUsageService _dailyUsageService;

        public DailyUsagesController(IDailyUsageService dailyUsageService)
        {
            _dailyUsageService = dailyUsageService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUsage(CreateDailyUsageDto createDto)
        {
            // Token'dan userId'yi alıp DTO'ya set edelim (Güvenlik için)
            createDto.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            var response = await _dailyUsageService.AddUsageAsync(createDto);
            return CreateActionResult(response);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var response = await _dailyUsageService.GetHistoryAsync(userId, startDate, endDate);
            return CreateActionResult(response);
        }
    }
}
