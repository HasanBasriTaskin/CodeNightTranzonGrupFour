using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfUserGoalDal : GenericRepository<UserGoal>, IUserGoalDal
    {
        public EfUserGoalDal(CodeNightConnectContext context) : base(context)
        {
        }
    }
}
