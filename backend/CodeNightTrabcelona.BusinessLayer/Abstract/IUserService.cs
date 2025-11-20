using CodeNightTrabcelona.BusinessLayer.DTOs.UserDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IUserService
    {
        Task<Response<UserDashboardDto>> GetDashboardAsync(Guid userId);
        Task<Response<UserDto>> GetUserProfileAsync(Guid userId);
    }
}
