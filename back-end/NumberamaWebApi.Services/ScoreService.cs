using System;
using System.Threading.Tasks;

using NumberamaWebApi.Data;
using NumberamaWebApi.Data.Models;
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
