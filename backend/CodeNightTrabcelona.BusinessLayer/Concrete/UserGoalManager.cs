using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class UserGoalManager : IUserGoalService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<UpdateUserGoalDto> _validator;

        public UserGoalManager(IUnitOfWork unitOfWork, IMapper mapper, IValidator<UpdateUserGoalDto> validator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<UserGoalDto>> GetUserGoalAsync(Guid userId)
        {
            var userGoal = await _unitOfWork.UserGoals.GetGoalByUserIdAsync(userId);
            
            // Eğer henüz hedef belirlenmemişse boş bir DTO dönebiliriz veya 404
            if (userGoal == null)
            {
                // Varsayılan boş hedef
                return Response<UserGoalDto>.Success(200, new UserGoalDto());
            }

            var dto = _mapper.Map<UserGoalDto>(userGoal);
            return Response<UserGoalDto>.Success(200, dto);
        }

        public async Task<Response<NoContentDto>> UpdateUserGoalAsync(Guid userId, UpdateUserGoalDto updateDto)
        {
            // 1. Validasyon
            var validationResult = await _validator.ValidateAsync(updateDto);
            if (!validationResult.IsValid)
            {
                return Response<NoContentDto>.Fail(400, validationResult.Errors.Select(x => x.ErrorMessage).ToList());
            }

            // 2. Mevcut hedefi getir veya yeni oluştur
            var userGoal = await _unitOfWork.UserGoals.GetGoalByUserIdAsync(userId);
            bool isNew = false;

            if (userGoal == null)
            {
                isNew = true;
                userGoal = new UserGoal { UserId = userId };
            }

            // 3. Verileri güncelle
            _mapper.Map(updateDto, userGoal);

            // 4. Haftalık Karbon Hedefini Hesapla
            // Günlük Hedef * 7 * (Katsayılar)
            decimal dailyCarbon = (updateDto.DailyInternetGoalGb * 55) +
                                  (updateDto.DailyGameGoalHours * 75) +
                                  (updateDto.DailyMusicGoalMinutes * 0.2m) +
                                  (updateDto.DailyVideoGoalMinutes * 0.4m);
            
            userGoal.CalculatedWeeklyCarbonGoal = dailyCarbon * 7;

            // 5. Kaydet
            if (isNew)
            {
                await _unitOfWork.UserGoals.InsertAsync(userGoal);
            }
            else
            {
                _unitOfWork.UserGoals.Update(userGoal);
            }

            // 6. User tablosundaki ana hedefi de güncelle (Senkronizasyon)
            var user = await _unitOfWork.Users.GetByIDAsync(userId);
            if (user != null)
            {
                user.WeeklyGoalCarbon = userGoal.CalculatedWeeklyCarbonGoal;
                _unitOfWork.Users.Update(user);
            }

            await _unitOfWork.SaveAsync();

            return Response<NoContentDto>.Success(200);
        }
    }
}
