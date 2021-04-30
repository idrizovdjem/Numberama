using System.Threading.Tasks;
using System.Collections.Generic;

using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Score;

namespace NumberamaWebApi.Services.Contracts
{
    public interface IScoreService
    {
        Task<GameResult> SubmitAsync(string userId, int points);

        IEnumerable<ScoreRankingViewModel> GetTopTen();
    }
}
