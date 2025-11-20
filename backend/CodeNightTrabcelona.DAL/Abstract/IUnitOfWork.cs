namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IUnitOfWork : IAsyncDisposable
    {
        IUserDal Users { get; }
        IGroupDal Groups { get; }
        IDailyUsageDal DailyUsages { get; }
        IBadgeDal Badges { get; }
        IRecommendationDal Recommendations { get; }
        IGreenTokenTransactionDal GreenTokenTransactions { get; }
        IUserGoalDal UserGoals { get; }
        
        Task<int> SaveAsync();
    }
}
