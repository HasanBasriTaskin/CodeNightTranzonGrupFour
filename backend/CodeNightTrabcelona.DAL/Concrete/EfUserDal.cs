using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfUserDal : GenericRepository<User>, IUserDal
    {
        public EfUserDal(CodeNightConnectContext context) : base(context)
        {
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetUserWithFullDetailsAsync(Guid id)
        {
            return await _context.Users
                .Include(x => x.Group)
                .Include(x => x.Badges)
                .Include(x => x.UserGoal)
                .Include(x => x.Recommendations)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}