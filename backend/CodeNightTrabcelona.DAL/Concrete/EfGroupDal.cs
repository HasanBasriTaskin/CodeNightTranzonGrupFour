using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfGroupDal : GenericRepository<Group>, IGroupDal
    {
        public EfGroupDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<Group> GetGroupWithMembersAsync(Guid groupId)
        {
            return await _context.Groups
                .Include(x => x.Members)
                .FirstOrDefaultAsync(x => x.Id == groupId);
        }

        public async Task<List<Group>> GetLeaderboardAsync(int topCount)
        {
            return await _context.Groups
                .OrderBy(x => x.AverageEmission) // Düşük karbon daha iyi
                .Take(topCount)
                .Include(x => x.Members) 
                .ToListAsync();
        }

        public async Task<PagedResult<Group>> GetLeaderboardPagedAsync(int page, int pageSize)
        {
            var query = _context.Groups
                .OrderBy(x => x.AverageEmission)
                .Include(x => x.Members); // Üye sayılarını göstermek gerekebilir

            var count = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedResult<Group>(items, count, page, pageSize);
        }
    }
}