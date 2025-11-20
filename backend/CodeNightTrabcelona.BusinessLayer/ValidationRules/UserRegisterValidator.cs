using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.ValidationRules
{
    public class UserRegisterValidator : AbstractValidator<UserRegisterDto>
    {
        public UserRegisterValidator()
        {
            RuleFor(x => x.FullName)
                .NotEmpty().WithMessage("Ad Soyad alanı boş geçilemez.")
                .MinimumLength(2).WithMessage("Ad Soyad en az 2 karakter olmalıdır.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email adresi boş geçilemez.")
                .EmailAddress().WithMessage("Geçerli bir email adresi giriniz.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Şifre boş geçilemez.")
                .MinimumLength(6).WithMessage("Şifre en az 6 karakter olmalıdır.");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("Şehir bilgisi boş geçilemez.");
        }
    }
}
