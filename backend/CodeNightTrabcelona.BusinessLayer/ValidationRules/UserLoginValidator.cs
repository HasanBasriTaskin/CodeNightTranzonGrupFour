using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.ValidationRules
{
    public class UserLoginValidator : AbstractValidator<UserLoginDto>
    {
        public UserLoginValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email adresi boş geçilemez.")
                .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Şifre boş geçilemez.");
        }
    }
}
