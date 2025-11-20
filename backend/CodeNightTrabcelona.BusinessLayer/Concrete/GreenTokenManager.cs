using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.TransactionDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class GreenTokenManager : IGreenTokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GreenTokenManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<decimal>> GetUserBalanceAsync(Guid userId)
        {
            var balance = await _unitOfWork.GreenTokenTransactions.GetUserTotalBalanceAsync(userId);
            return Response<decimal>.Success(200, balance);
        }

        public async Task<Response<PagedResult<GreenTokenTransactionDto>>> GetUserTransactionsPagedAsync(Guid userId, int page, int pageSize)
        {
            var pagedResult = await _unitOfWork.GreenTokenTransactions.GetUserTransactionsPagedAsync(userId, page, pageSize);
            var dtos = _mapper.Map<List<GreenTokenTransactionDto>>(pagedResult.Items);
            
            var pagedDto = new PagedResult<GreenTokenTransactionDto>(dtos, pagedResult.TotalCount, page, pageSize);

            return Response<PagedResult<GreenTokenTransactionDto>>.Success(200, pagedDto);
        }

        public async Task<Response<NoContentDto>> RedeemTokensAsync(Guid userId, decimal amount, string reason)
        {
            if (amount <= 0) return Response<NoContentDto>.Fail(400, "Miktar 0'dan büyük olmalıdır.");

            // Bakiye kontrolü
            var currentBalance = await _unitOfWork.GreenTokenTransactions.GetUserTotalBalanceAsync(userId);
            if (currentBalance < amount)
            {
                return Response<NoContentDto>.Fail(400, "Yetersiz bakiye.");
            }

            // İşlemi kaydet (Eksi bakiye olarak)
            var transaction = new GreenTokenTransaction
            {
                UserId = userId,
                Amount = -amount, // Harcama olduğu için negatif
                Reason = reason,
                TransactionDate = DateTime.Now
            };

            await _unitOfWork.GreenTokenTransactions.InsertAsync(transaction);
            
            // User tablosundaki cache bakiyeyi de güncelle
            var user = await _unitOfWork.Users.GetByIDAsync(userId);
            if (user != null)
            {
                user.GreenTokenBalance = (int)(currentBalance - amount);
                _unitOfWork.Users.Update(user);
            }

            await _unitOfWork.SaveAsync();

            return Response<NoContentDto>.Success(200);
        }
    }
}
