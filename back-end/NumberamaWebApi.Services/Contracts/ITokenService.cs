using System.Threading.Tasks;

using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Token;

namespace NumberamaWebApi.Services.Contracts
{
    public interface ITokenService
    {
        Task<TokenResult> GenerateTokensAsync(ApplicationUser user);

        AccessToken GetAccessToken(string token, string refreshToken);
    }
}
