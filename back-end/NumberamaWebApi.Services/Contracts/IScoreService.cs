using System.Threading.Tasks;

using NumberamaWebApi.Data.Models;

namespace NumberamaWebApi.Services.Contracts
{
    public interface IScoreService
    {
        Task<GameResult> SubmitAsync(string userId, int points);
    }
}
