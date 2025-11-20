using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
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

        public async Task<PagedResult<Recommendation>> GetUserRecommendationsPagedAsync(Guid userId, int page, int pageSize)
        {
            var query = _context.Recommendations
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt);

            var count = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedResult<Recommendation>(items, count, page, pageSize);
        }
    }
}