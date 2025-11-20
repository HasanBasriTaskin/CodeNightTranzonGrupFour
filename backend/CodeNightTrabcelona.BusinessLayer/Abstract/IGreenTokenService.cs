using CodeNightTrabcelona.BusinessLayer.DTOs.TransactionDtos;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IGreenTokenService
    {
        Task<Response<PagedResult<GreenTokenTransactionDto>>> GetUserTransactionsPagedAsync(Guid userId, int page, int pageSize);
        Task<Response<decimal>> GetUserBalanceAsync(Guid userId);
        // Mock: Jeton harcama/kullanma
        Task<Response<NoContentDto>> RedeemTokensAsync(Guid userId, decimal amount, string reason);
    }
}
