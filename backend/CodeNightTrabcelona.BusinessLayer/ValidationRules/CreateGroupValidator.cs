using CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.ValidationRules
{
    public class CreateGroupValidator : AbstractValidator<CreateGroupDto>
    {
        public CreateGroupValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Grup adı boş geçilemez.")
                .MinimumLength(3).WithMessage("Grup adı en az 3 karakter olmalıdır.")
                .MaximumLength(50).WithMessage("Grup adı en fazla 50 karakter olabilir.");
        }
    }
}
