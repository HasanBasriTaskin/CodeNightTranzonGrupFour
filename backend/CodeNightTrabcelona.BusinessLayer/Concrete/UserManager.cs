using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.UserDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using Microsoft.Extensions.Logging;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class UserManager : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<UserManager> _logger;

        public UserManager(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UserManager> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Response<UserDashboardDto>> GetDashboardAsync(Guid userId)
        {
            var user = await _unitOfWork.Users.GetUserWithFullDetailsAsync(userId);
            if (user == null) return Response<UserDashboardDto>.Fail(404, "Kullanıcı bulunamadı.");

            var dashboardDto = _mapper.Map<UserDashboardDto>(user);

            // Bu hafta yapılan toplam harcamayı hesapla
            var startOfWeek = DateTime.Now.Date.AddDays(-(int)DateTime.Now.DayOfWeek + 1); // Pazartesi
            var endOfWeek = startOfWeek.AddDays(6);

            var weeklyUsages = await _unitOfWork.DailyUsages.GetUsageByDateRangeAsync(userId, startOfWeek, endOfWeek);
            var currentUsage = weeklyUsages.Sum(x => x.TotalCarbonEmission);

            dashboardDto.CurrentCarbonUsage = currentUsage;
            dashboardDto.WeeklyGoal = user.WeeklyGoal;

            // İlerleme Yüzdesi
            if (user.WeeklyGoal > 0)
            {
                var percentage = (int)((currentUsage / user.WeeklyGoal) * 100);
                dashboardDto.GoalProgressPercentage = percentage > 100 ? 100 : percentage;
            }
            else
            {
                dashboardDto.GoalProgressPercentage = 0;
            }

            // Aktif Öneriler (Son 3 tane)
            dashboardDto.ActiveRecommendations = user.Recommendations
                .OrderByDescending(r => r.CreatedAt)
                .Take(3)
                .Select(r => r.Message)
                .ToList();

            return Response<UserDashboardDto>.Success(200, dashboardDto);
        }

        public async Task<Response<UserDto>> GetUserProfileAsync(Guid userId)
        {
            var user = await _unitOfWork.Users.GetUserWithFullDetailsAsync(userId);
            if (user == null) return Response<UserDto>.Fail(404, "Kullanıcı bulunamadı.");

            var userDto = _mapper.Map<UserDto>(user);
            return Response<UserDto>.Success(200, userDto);
        }
    }
}
