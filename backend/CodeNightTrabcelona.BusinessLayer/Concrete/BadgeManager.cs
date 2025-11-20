using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.BadgeDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class BadgeManager : IBadgeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BadgeManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<List<BadgeDto>>> GetUserBadgesAsync(Guid userId)
        {
            var badges = await _unitOfWork.Badges.GetUserBadgesAsync(userId);
            var dtos = _mapper.Map<List<BadgeDto>>(badges);

            return Response<List<BadgeDto>>.Success(200, dtos);
        }
    }
}
