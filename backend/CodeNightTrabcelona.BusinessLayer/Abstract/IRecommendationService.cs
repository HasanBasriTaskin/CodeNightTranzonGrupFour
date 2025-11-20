using CodeNightTrabcelona.BusinessLayer.DTOs.RecommendationDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IRecommendationService
    {
        Task<Response<List<RecommendationDto>>> GetUserRecommendationsAsync(Guid userId);
        Task<Response<PagedResult<RecommendationDto>>> GetUserRecommendationsPagedAsync(Guid userId, int page, int pageSize);
    }
}
