using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.DAL.Concrete;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class GenericRepository<T> : IGenericDal<T> where T : class
    {
        protected readonly CodeNightConnectContext _context;

        public GenericRepository(CodeNightConnectContext context)
        {
            _context = context;
        }

        public void Delete(T t)
        {
            _context.Remove(t);
        }

        public T GetByFilter(Expression<Func<T, bool>> filter)
        {
            return _context.Set<T>().SingleOrDefault(filter);
        }

        public async Task<T> GetByFilterAsync(Expression<Func<T, bool>> filter)
        {
            return await _context.Set<T>().SingleOrDefaultAsync(filter);
        }

        public T GetByID(Guid id)
        {
            return _context.Set<T>().Find(id);
        }

        public async Task<T> GetByIDAsync(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public List<T> GetListAll()
        {
            return _context.Set<T>().ToList();
        }

        public async Task<List<T>> GetListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public List<T> GetListByFilter(Expression<Func<T, bool>> filter)
        {
            return _context.Set<T>().Where(filter).ToList();
        }

        public async Task<List<T>> GetListByFilterAsync(Expression<Func<T, bool>> filter)
        {
            return await _context.Set<T>().Where(filter).ToListAsync();
        }

        public void Insert(T t)
        {
            _context.Add(t);
        }

        public async Task InsertAsync(T t)
        {
            await _context.AddAsync(t);
        }

        public void Update(T t)
        {
            _context.Update(t);
        }
    }
}