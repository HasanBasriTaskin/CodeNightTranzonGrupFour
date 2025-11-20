using CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IUserGoalService
    {
        Task<Response<UserGoalDto>> GetUserGoalAsync(Guid userId);
        Task<Response<NoContentDto>> UpdateUserGoalAsync(Guid userId, UpdateUserGoalDto updateDto);
    }
}
