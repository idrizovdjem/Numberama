using System;
using System.Linq;
using System.Threading.Tasks;

using NumberamaWebApi.Data;
using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.Score;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Services
{
    public class ScoreService : IScoreService
    {
        private readonly ApplicationDbContext dbContext;

        public ScoreService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public RankingsViewModel GetRankings(string userId)
        {
            var rankingModel = new RankingsViewModel();

            rankingModel.TopTen = this.dbContext.GameResults
                .OrderByDescending(gr => gr.Score)
                .Take(10)
                .Select(gr => new ScoreRankingViewModel()
                {
                    Username = gr.User.Username,
                    Score = gr.Score,
                    SubmitedAt = gr.SubmitedAt,
                    Position = this.dbContext.GameResults
                        .Count(x => x.Score > gr.Score) + 1
                }) 
                .ToList();

            if(userId != null)
            {
                var username = this.dbContext.Users
                    .First(u => u.Id == userId).Username;

                if(rankingModel.TopTen.Any(r => r.Username == username))
                {
                    return rankingModel;
                }

                var userBestScore = this.dbContext.GameResults
                    .Where(gr => gr.UserId == userId)
                    .OrderByDescending(gr => gr.Score)
                    .Select(gr => new ScoreRankingViewModel()
                    {
                        Username = username,
                        Score = gr.Score,
                        SubmitedAt = gr.SubmitedAt,
                        Position = this.dbContext.GameResults
                            .Count(x => x.Score > gr.Score)
                    })
                    .FirstOrDefault();

                rankingModel.UserRank = userBestScore;
            }

            return rankingModel;
        }

        public async Task<GameResult> SubmitAsync(string userId, int points)
        {
            var gameResult = new GameResult()
            {
                UserId = userId,
                Score = points,
                SubmitedAt = DateTime.UtcNow
            };

            await dbContext.GameResults.AddAsync(gameResult);
            await dbContext.SaveChangesAsync();

            return gameResult;
        }
    }
}
