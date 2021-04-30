using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<ScoreRankingViewModel> GetTopTen()
        {
            return this.dbContext.GameResults
                .OrderByDescending(gr => gr.Score)
                .Take(10)
                .Select(gr => new ScoreRankingViewModel()
                {
                    Username = gr.User.Username,
                    Score = gr.Score,
                    SubmitedAt = gr.SubmitedAt
                })
                .ToList();
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
