using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfGreenTokenTransactionDal : GenericRepository<GreenTokenTransaction>, IGreenTokenTransactionDal
    {
        public EfGreenTokenTransactionDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<decimal> GetUserTotalBalanceAsync(Guid userId)
        {
            return await _context.GreenTokenTransactions
                .Where(x => x.UserId == userId)
                .SumAsync(x => x.Amount);
        }

        public async Task<List<GreenTokenTransaction>> GetUserTransactionsAsync(Guid userId)
        {
            return await _context.GreenTokenTransactions
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.TransactionDate)
                .ToListAsync();
        }

        public async Task<PagedResult<GreenTokenTransaction>> GetUserTransactionsPagedAsync(Guid userId, int page, int pageSize)
        {
            var query = _context.GreenTokenTransactions
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.TransactionDate);

            var count = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedResult<GreenTokenTransaction>(items, count, page, pageSize);
        }
    }
}