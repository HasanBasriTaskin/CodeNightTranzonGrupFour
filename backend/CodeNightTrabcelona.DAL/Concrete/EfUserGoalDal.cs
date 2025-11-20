using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfUserGoalDal : GenericRepository<UserGoal>, IUserGoalDal
    {
        public EfUserGoalDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<UserGoal> GetGoalByUserIdAsync(Guid userId)
        {
            return await _context.UserGoals
                .FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }
}