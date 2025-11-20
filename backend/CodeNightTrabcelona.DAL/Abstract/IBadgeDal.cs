using CodeNightTrabcelona.EntityLayer.Concrete;
using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IBadgeDal : IGenericDal<Badge>
    {
        Task<List<Badge>> GetUserBadgesAsync(Guid userId);
        Task<bool> HasBadgeAsync(Guid userId, BadgeType badgeType, EcoLevel level);
    }
}