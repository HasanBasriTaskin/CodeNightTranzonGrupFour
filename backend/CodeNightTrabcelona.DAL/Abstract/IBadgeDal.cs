using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IBadgeDal : IGenericDal<Badge>
    {
        Task<List<Badge>> GetUserBadgesAsync(Guid userId);
    }
}