using System.Threading.Tasks;

using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Token;

namespace NumberamaWebApi.Services.Contracts
{
    public interface ITokenAuthService
    {
        Task<TokenResult> GenerateTokens(ApplicationUser user);
    }
}
