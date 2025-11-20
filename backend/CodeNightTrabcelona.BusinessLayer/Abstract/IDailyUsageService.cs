using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IDailyUsageService
    {
        Task<Response<NoContentDto>> AddUsageAsync(CreateDailyUsageDto createDto);
        Task<Response<List<DailyUsageDto>>> GetHistoryAsync(Guid userId, DateTime startDate, DateTime endDate);
    }
}
