using CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IGroupService
    {
        Task<Response<List<GroupDto>>> GetLeaderboardAsync(int topCount = 10);
        Task<Response<PagedResult<GroupDto>>> GetLeaderboardPagedAsync(int page, int pageSize);
        Task<Response<NoContentDto>> CreateGroupAsync(CreateGroupDto createDto, Guid creatorUserId);
        Task<Response<GroupDto>> GetGroupDetailsAsync(Guid groupId);
    }
}
