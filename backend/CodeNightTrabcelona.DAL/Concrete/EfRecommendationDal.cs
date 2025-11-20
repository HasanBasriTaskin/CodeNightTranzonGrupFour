using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfRecommendationDal : GenericRepository<Recommendation>, IRecommendationDal
    {
        public EfRecommendationDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<List<Recommendation>> GetUserRecommendationsAsync(Guid userId)
        {
            return await _context.Recommendations
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}