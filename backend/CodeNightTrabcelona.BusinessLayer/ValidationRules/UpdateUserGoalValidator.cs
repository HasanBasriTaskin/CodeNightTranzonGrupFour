using CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.ValidationRules
{
    public class UpdateUserGoalValidator : AbstractValidator<UpdateUserGoalDto>
    {
        public UpdateUserGoalValidator()
        {
            RuleFor(x => x.DailyInternetGoalGb)
                .GreaterThanOrEqualTo(0).WithMessage("Hedef negatif olamaz.");

            RuleFor(x => x.DailyGameGoalHours)
                .GreaterThanOrEqualTo(0).WithMessage("Hedef negatif olamaz.");

            RuleFor(x => x.DailyMusicGoalMinutes)
                .GreaterThanOrEqualTo(0).WithMessage("Hedef negatif olamaz.");

            RuleFor(x => x.DailyVideoGoalMinutes)
                .GreaterThanOrEqualTo(0).WithMessage("Hedef negatif olamaz.");
        }
    }
}
