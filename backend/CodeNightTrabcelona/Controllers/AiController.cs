using CodeNightTrabcelona.API.Controllers;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.AiDtos;
using Microsoft.AspNetCore.Mvc;

namespace CodeNightTrabcelona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : CustomBaseController
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("analyze-story")]
        public async Task<IActionResult> AnalyzeStory([FromBody] UserStoryDto storyDto)
        {
            var result = await _aiService.AnalyzeStoryAsync(storyDto);
            return CreateActionResult(result);
        }
    }
}

