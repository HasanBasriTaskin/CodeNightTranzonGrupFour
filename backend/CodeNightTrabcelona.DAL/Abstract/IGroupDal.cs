using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IGroupDal : IGenericDal<Group>
    {
        Task<List<Group>> GetLeaderboardAsync(int topCount);
        Task<PagedResult<Group>> GetLeaderboardPagedAsync(int page, int pageSize);
        Task<Group> GetGroupWithMembersAsync(Guid groupId);
    }
}