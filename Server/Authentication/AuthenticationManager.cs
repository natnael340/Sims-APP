using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Duapp.Configuration;
using Duapp.Models;
using Duapp.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

namespace Duapp.Authentication
{
    public class AuthenticationManager : IAuthentication
    {
        
        private readonly JwtConfig _jwtConfig;
        private readonly IRefreshTokenGenerator _refreshTokenGenerator;

        public AuthenticationManager(IOptionsMonitor<JwtConfig> optionMonitor, IRefreshTokenGenerator refreshTokenGenerator)
        {
            _jwtConfig = optionMonitor.CurrentValue;
            _refreshTokenGenerator = refreshTokenGenerator;
        }
        public TokenModel GetToken(IdentityUser user, string role)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new []{
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = _refreshTokenGenerator.GenerateToken();
            return new TokenModel(){Token = jwtToken};
        }

        public TokenModel RefreshToken(TokenModel token)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validateToken;
            var principal = jwtTokenHandler.ValidateToken(token.Token, new TokenValidationParameters{
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtConfig.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    RequireExpirationTime = false,

            }, out validateToken);
            var jwtToken = validateToken as JwtSecurityToken;
            if(jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
                throw new SecurityTokenException("Invalid Token Passed");

            var username = principal.Identity.Name;
            return token;
        }
    }
}