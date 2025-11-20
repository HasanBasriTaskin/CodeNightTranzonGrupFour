using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using CodeNightTrabcelona.EntityLayer.Enums;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfBadgeDal : GenericRepository<Badge>, IBadgeDal
    {
        public EfBadgeDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<List<Badge>> GetUserBadgesAsync(Guid userId)
        {
            return await _context.Badges
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.EarnedDate)
                .ToListAsync();
        }

        public async Task<bool> HasBadgeAsync(Guid userId, BadgeType badgeType, EcoLevel level)
        {
            return await _context.Badges
                .AnyAsync(x => x.UserId == userId && x.BadgeType == badgeType && x.Level == level);
        }
    }
}