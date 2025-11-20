using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.RecommendationDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class RecommendationManager : IRecommendationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RecommendationManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<List<RecommendationDto>>> GetUserRecommendationsAsync(Guid userId)
        {
            var recommendations = await _unitOfWork.Recommendations.GetUserRecommendationsAsync(userId);
            var dtos = _mapper.Map<List<RecommendationDto>>(recommendations);
            
            return Response<List<RecommendationDto>>.Success(200, dtos);
        }

        public async Task<Response<PagedResult<RecommendationDto>>> GetUserRecommendationsPagedAsync(Guid userId, int page, int pageSize)
        {
            var pagedResult = await _unitOfWork.Recommendations.GetUserRecommendationsPagedAsync(userId, page, pageSize);
            var dtos = _mapper.Map<List<RecommendationDto>>(pagedResult.Items);

            var pagedDto = new PagedResult<RecommendationDto>(dtos, pagedResult.TotalCount, page, pageSize);
            
            return Response<PagedResult<RecommendationDto>>.Success(200, pagedDto);
        }
    }
}
