using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using CodeNightTrabcelona.BusinessLayer.Security;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using FluentValidation;
using Microsoft.Extensions.Logging;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class AuthManager : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly TokenHandler _tokenHandler;
        private readonly ILogger<AuthManager> _logger;
        private readonly IValidator<UserRegisterDto> _registerValidator;
        private readonly IValidator<UserLoginDto> _loginValidator;

        public AuthManager(IUnitOfWork unitOfWork, IMapper mapper, TokenHandler tokenHandler, ILogger<AuthManager> logger, IValidator<UserRegisterDto> registerValidator, IValidator<UserLoginDto> loginValidator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _tokenHandler = tokenHandler;
            _logger = logger;
            _registerValidator = registerValidator;
            _loginValidator = loginValidator;
        }

        public async Task<Response<AccessToken>> LoginAsync(UserLoginDto loginDto)
        {
            // 1. Validation
            var validationResult = await _loginValidator.ValidateAsync(loginDto);
            if (!validationResult.IsValid)
            {
                return Response<AccessToken>.Fail(400, validationResult.Errors.Select(x => x.ErrorMessage).ToList());
            }

            // 2. Check User
            var user = await _unitOfWork.Users.GetUserByEmailAsync(loginDto.Email);
            if (user == null)
            {
                _logger.LogWarning($"Failed login attempt for email: {loginDto.Email}");
                return Response<AccessToken>.Fail(404, "Kullanıcı bulunamadı veya şifre hatalı.");
            }

            // 3. Verify Password
            if (!HashingHelper.VerifyPasswordHash(loginDto.Password, user.PasswordHash))
            {
                _logger.LogWarning($"Invalid password for user: {user.Id}");
                return Response<AccessToken>.Fail(404, "Kullanıcı bulunamadı veya şifre hatalı.");
            }

            // 4. Generate Token
            var token = _tokenHandler.CreateAccessToken(user);
            
            _logger.LogInformation($"User logged in: {user.Id}");
            return Response<AccessToken>.Success(200, token);
        }

        public async Task<Response<NoContentDto>> RegisterAsync(UserRegisterDto registerDto)
        {
            // 1. Validation
            var validationResult = await _registerValidator.ValidateAsync(registerDto);
            if (!validationResult.IsValid)
            {
                return Response<NoContentDto>.Fail(400, validationResult.Errors.Select(x => x.ErrorMessage).ToList());
            }

            // 2. Check if email exists
            var existingUser = await _unitOfWork.Users.GetUserByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return Response<NoContentDto>.Fail(400, "Bu email adresi zaten kullanımda.");
            }

            // 3. Map & Hash
            var user = _mapper.Map<User>(registerDto);
            user.PasswordHash = HashingHelper.CreatePasswordHash(registerDto.Password);
            
            // Varsayılan değerler
            user.CurrentBalance = 0;
            user.EcoLevel = EntityLayer.Enums.EcoLevel.GreenHero; // Başlangıç seviyesi (veya null)
            user.WeeklyGoal = 0; // Kullanıcı sonra belirleyecek

            // 4. Save
            await _unitOfWork.Users.InsertAsync(user);
            await _unitOfWork.SaveAsync();

            _logger.LogInformation($"New user registered: {user.Id}");
            return Response<NoContentDto>.Success(201);
        }
    }
}
