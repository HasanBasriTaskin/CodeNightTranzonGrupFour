using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IGreenTokenTransactionDal : IGenericDal<GreenTokenTransaction>
    {
        Task<List<GreenTokenTransaction>> GetUserTransactionsAsync(Guid userId); // Eski metod (tam liste)
        Task<PagedResult<GreenTokenTransaction>> GetUserTransactionsPagedAsync(Guid userId, int page, int pageSize); // Yeni metod (sayfalı)
        Task<decimal> GetUserTotalBalanceAsync(Guid userId);
    }
}