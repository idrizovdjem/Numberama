using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Token;

namespace NumberamaWebApi.Services.Contracts
{
    public interface ITokenAuthService
    {
        TokenResult GenerateTokens(ApplicationUser user);
    }
}
