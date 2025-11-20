using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CodeNightTrabcelona.BusinessLayer.Security
{
    public class TokenHandler
    {
        private readonly TokenOptions _tokenOptions;

        public TokenHandler(IOptions<TokenOptions> tokenOptions)
        {
            _tokenOptions = tokenOptions.Value;
        }

        public AccessToken CreateAccessToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenOptions.SecurityKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName),
                // Gerekirse rol veya grup bilgisi eklenebilir
                new Claim("GroupId", user.GroupId?.ToString() ?? "")
            };

            var expiration = DateTime.Now.AddMinutes(_tokenOptions.AccessTokenExpiration);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _tokenOptions.Issuer,
                audience: _tokenOptions.Audience,
                claims: claims,
                expires: expiration,
                signingCredentials: credentials);

            var handler = new JwtSecurityTokenHandler();
            var tokenString = handler.WriteToken(jwtSecurityToken);

            return new AccessToken
            {
                Token = tokenString,
                Expiration = expiration
            };
        }
    }
}
