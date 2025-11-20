using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IDailyUsageDal : IGenericDal<DailyUsage>
    {
        Task<List<DailyUsage>> GetUsageByDateRangeAsync(Guid userId, DateTime startDate, DateTime endDate);
        Task<DailyUsage> GetUsageByDateAsync(Guid userId, DateTime date);
    }
}