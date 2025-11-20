using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IRecommendationDal : IGenericDal<Recommendation>
    {
        Task<List<Recommendation>> GetUserRecommendationsAsync(Guid userId);
        Task<PagedResult<Recommendation>> GetUserRecommendationsPagedAsync(Guid userId, int page, int pageSize);
    }
}