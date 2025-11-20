using CodeNightTrabcelona.DAL.Abstract;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CodeNightConnectContext _context;
        
        private EfUserDal _userDal;
        private EfGroupDal _groupDal;
        private EfDailyUsageDal _dailyUsageDal;
        private EfBadgeDal _badgeDal;
        private EfRecommendationDal _recommendationDal;
        private EfGreenTokenTransactionDal _greenTokenTransactionDal;
        private EfUserGoalDal _userGoalDal;

        public UnitOfWork(CodeNightConnectContext context)
        {
            _context = context;
        }

        public IUserDal Users => _userDal ??= new EfUserDal(_context);
        public IGroupDal Groups => _groupDal ??= new EfGroupDal(_context);
        public IDailyUsageDal DailyUsages => _dailyUsageDal ??= new EfDailyUsageDal(_context);
        public IBadgeDal Badges => _badgeDal ??= new EfBadgeDal(_context);
        public IRecommendationDal Recommendations => _recommendationDal ??= new EfRecommendationDal(_context);
        public IGreenTokenTransactionDal GreenTokenTransactions => _greenTokenTransactionDal ??= new EfGreenTokenTransactionDal(_context);
        public IUserGoalDal UserGoals => _userGoalDal ??= new EfUserGoalDal(_context);

        public async ValueTask DisposeAsync()
        {
            await _context.DisposeAsync();
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
