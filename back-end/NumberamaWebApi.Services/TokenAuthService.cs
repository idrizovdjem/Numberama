using System;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.IdentityModel.Tokens;

using NumberamaWebApi.Data;
using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Token;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Services
{
    public class TokenAuthService : ITokenAuthService
    {
        private readonly TokenConfig tokenConfig;
        private readonly ApplicationDbContext dbContext;

        public TokenAuthService(TokenConfig jwtTokenConfig, ApplicationDbContext dbContext)
        {
            this.tokenConfig = jwtTokenConfig;
            this.dbContext = dbContext;
        }

        public string BuildToken(Claim[] claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfig.Secret));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: tokenConfig.Issuer,
                    audience: tokenConfig.Audience,
                    notBefore: DateTime.Now,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(tokenConfig.AccessTokenExpiration),
                    signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string BuildRefreshToken()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            JwtSecurityTokenHandler tokenValidator = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfig.Secret));

            var parameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateLifetime = false
            };

            try
            {
                var principal = tokenValidator.ValidateToken(token, parameters, out var securityToken);

                if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    return null;
                }

                return principal;
            }
            catch
            {
                return null;
            }
        }

        public async Task<TokenResult> GenerateTokens(ApplicationUser user)
        {
            var result = new TokenResult();

            if (user != null)
            {
                var claims = BuildClaims(user);
                result.AccessToken = BuildToken(claims);
                result.RefreshToken = BuildRefreshToken();

                dbContext.AccessTokens.Add(new AccessToken
                {
                    UserId = user.Id,
                    Token = result.RefreshToken,
                    IssuedAt = DateTime.Now,
                    ExpiresAt = DateTime.Now.AddMinutes(tokenConfig.RefreshTokenExpiration)
                });

                await dbContext.SaveChangesAsync();
            };

            return result;
        }

        private static Claim[] BuildClaims(ApplicationUser user)
        {
            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email)
            };

            return claims;
        }
    }
}
