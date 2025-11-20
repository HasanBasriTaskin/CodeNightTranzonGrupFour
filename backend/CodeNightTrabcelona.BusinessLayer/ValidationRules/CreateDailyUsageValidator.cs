using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.ValidationRules
{
    public class CreateDailyUsageValidator : AbstractValidator<CreateDailyUsageDto>
    {
        public CreateDailyUsageValidator()
        {
            RuleFor(x => x.Date)
                .NotEmpty().WithMessage("Tarih seçimi zorunludur.");

            RuleFor(x => x.InternetUsageGb)
                .GreaterThanOrEqualTo(0).WithMessage("İnternet kullanımı 0'dan küçük olamaz.");

            RuleFor(x => x.GameTimeHours)
                .GreaterThanOrEqualTo(0).WithMessage("Oyun süresi 0'dan küçük olamaz.");

            RuleFor(x => x.MusicTimeMinutes)
                .GreaterThanOrEqualTo(0).WithMessage("Müzik dinleme süresi 0'dan küçük olamaz.");

            RuleFor(x => x.VideoTimeMinutes)
                .GreaterThanOrEqualTo(0).WithMessage("Video izleme süresi 0'dan küçük olamaz.");
        }
    }
}
