using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class EfGreenTokenTransactionDal : GenericRepository<GreenTokenTransaction>, IGreenTokenTransactionDal
    {
        public EfGreenTokenTransactionDal(CodeNightConnectContext context) : base(context)
        {
        }
    }
}
