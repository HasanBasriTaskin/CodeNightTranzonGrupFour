using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfDailyUsageDal : GenericRepository<DailyUsage>, IDailyUsageDal
    {
        public EfDailyUsageDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<DailyUsage> GetUsageByDateAsync(Guid userId, DateTime date)
        {
            return await _context.DailyUsages
                .FirstOrDefaultAsync(x => x.UserId == userId && x.Date.Date == date.Date);
        }

        public async Task<List<DailyUsage>> GetUsageByDateRangeAsync(Guid userId, DateTime startDate, DateTime endDate)
        {
            return await _context.DailyUsages
                .Where(x => x.UserId == userId && x.Date.Date >= startDate.Date && x.Date.Date <= endDate.Date)
                .OrderBy(x => x.Date)
                .ToListAsync();
        }
    }
}