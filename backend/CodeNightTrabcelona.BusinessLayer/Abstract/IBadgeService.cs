using CodeNightTrabcelona.BusinessLayer.DTOs.BadgeDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IBadgeService
    {
        Task<Response<List<BadgeDto>>> GetUserBadgesAsync(Guid userId);
    }
}
