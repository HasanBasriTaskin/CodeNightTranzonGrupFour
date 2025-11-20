using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using CodeNightTrabcelona.BusinessLayer.Security;
using CodeNightTrabcelona.EntityLayer.Commons;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IAuthService
    {
        Task<Response<AccessToken>> LoginAsync(UserLoginDto loginDto);
        Task<Response<NoContentDto>> RegisterAsync(UserRegisterDto registerDto);
    }
}
