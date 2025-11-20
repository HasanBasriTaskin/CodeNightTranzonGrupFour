using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfGroupDal : GenericRepository<Group>, IGroupDal
    {
        public EfGroupDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<List<Group>> GetLeaderboardAsync(int topCount)
        {
            return await _context.Groups
                .OrderBy(x => x.AverageEmission) // Düşük karbon daha iyi
                .Take(topCount)
                .Include(x => x.Members) // Üye sayılarını vs. göstermek gerekebilir
                .ToListAsync();
        }
    }
}