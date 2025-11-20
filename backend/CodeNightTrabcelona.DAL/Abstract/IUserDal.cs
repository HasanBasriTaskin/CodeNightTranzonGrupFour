using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IUserDal : IGenericDal<User>
    {
        Task<User> GetUserWithFullDetailsAsync(Guid id);
        Task<User> GetUserByEmailAsync(string email);
    }
}