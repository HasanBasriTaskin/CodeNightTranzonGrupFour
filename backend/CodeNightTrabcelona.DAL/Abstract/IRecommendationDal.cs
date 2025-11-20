using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IRecommendationDal : IGenericDal<Recommendation>
    {
        Task<List<Recommendation>> GetUserRecommendationsAsync(Guid userId);
    }
}