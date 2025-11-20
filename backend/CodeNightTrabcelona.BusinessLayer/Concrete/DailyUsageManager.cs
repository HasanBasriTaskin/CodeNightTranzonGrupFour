using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class DailyUsageManager : IDailyUsageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateDailyUsageDto> _validator;

        public DailyUsageManager(IUnitOfWork unitOfWork, IMapper mapper, IValidator<CreateDailyUsageDto> validator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<NoContentDto>> AddUsageAsync(CreateDailyUsageDto createDto)
        {
            var validationResult = await _validator.ValidateAsync(createDto);
            if (!validationResult.IsValid)
            {
                return Response<NoContentDto>.Fail(400, validationResult.Errors.Select(x => x.ErrorMessage).ToList());
            }

            // Aynı gün için kayıt var mı kontrolü yapılabilir
            // Şimdilik birden fazla girişe izin veriyoruz, dashboard'da toplanarak gösteriliyor.

            var usage = _mapper.Map<DailyUsage>(createDto);

            // Karbon Hesabı
            usage.TotalCarbonEmission = CalculateCarbonEmission(usage);

            await _unitOfWork.DailyUsages.InsertAsync(usage);
            await _unitOfWork.SaveAsync();

            // TODO: Kural bazlı öneri sistemini tetikle (Rule Engine)
            // CheckAndCreateRecommendations(usage);

            return Response<NoContentDto>.Success(201);
        }

        public async Task<Response<List<DailyUsageDto>>> GetHistoryAsync(Guid userId, DateTime startDate, DateTime endDate)
        {
            var usages = await _unitOfWork.DailyUsages.GetUsageByDateRangeAsync(userId, startDate, endDate);
            var dtos = _mapper.Map<List<DailyUsageDto>>(usages);

            return Response<List<DailyUsageDto>>.Success(200, dtos);
        }

        private decimal CalculateCarbonEmission(DailyUsage usage)
        {
            // Formül: (InternetGB * 55) + (OyunSaat * 75) + (MüzikDk * 0.2) + (FilmDk * 0.4)
            return (usage.InternetUsageGb * 55) +
                   (usage.GameTimeHours * 75) +
                   (usage.MusicTimeMinutes * 0.2m) +
                   (usage.VideoTimeMinutes * 0.4m);
        }
    }
}
