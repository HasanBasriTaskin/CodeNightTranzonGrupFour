using CodeNightTrabcelona.BusinessLayer.DTOs.AiDtos;
using CodeNightTrabcelona.EntityLayer.Commons;
using System.Threading.Tasks;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IAiService
    {
        Task<Response<AiAnalysisResultDto>> AnalyzeStoryAsync(UserStoryDto storyDto);
    }
}

