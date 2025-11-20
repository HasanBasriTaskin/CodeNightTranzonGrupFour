using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IGroupDal : IGenericDal<Group>
    {
        Task<List<Group>> GetLeaderboardAsync(int topCount);
    }
}