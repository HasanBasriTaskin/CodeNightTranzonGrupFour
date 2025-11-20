using System.Linq.Expressions;

namespace CodeNightTrabcelona.DAL.Abstract
{
    public interface IGenericDal<T> where T : class
    {
        void Insert(T t);
        Task InsertAsync(T t);
        
        void Delete(T t);
        
        void Update(T t);
        
        List<T> GetListAll();
        Task<List<T>> GetListAllAsync();
        
        T GetByID(Guid id);
        Task<T> GetByIDAsync(Guid id);
        
        List<T> GetListByFilter(Expression<Func<T, bool>> filter);
        Task<List<T>> GetListByFilterAsync(Expression<Func<T, bool>> filter);
        
        T GetByFilter(Expression<Func<T, bool>> filter);
        Task<T> GetByFilterAsync(Expression<Func<T, bool>> filter);
    }
}