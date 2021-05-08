﻿using System;
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
            rankingModel.UsersRanks = this.dbContext.GameResults
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
                
                // check if the user is in top ten
                if(rankingModel.UsersRanks.Any(r => r.Username == username))
                {
                    var userModel = rankingModel.UsersRanks
                        .First(r => r.Username == username);
                    var index = rankingModel.UsersRanks.IndexOf(userModel);
                    rankingModel.UserRankIndex = index;
                }
                else
                {
                    var userModel = this.dbContext.GameResults
                        .Where(gr => gr.UserId == userId)
                        .OrderByDescending(gr => gr.Score)
                        .Select(gr => new ScoreRankingViewModel()
                        {
                            Score = gr.Score,
                            Position = this.dbContext.GameResults
                                .Count(x => x.Score > gr.Score) + 1,
                            SubmitedAt = gr.SubmitedAt,
                            Username = username
                        })
                        .FirstOrDefault();

                    if(userModel != null)
                    {
                        rankingModel.UsersRanks.Add(userModel);
                        rankingModel.UserRankIndex = rankingModel.UsersRanks.Count - 1;
                    }
                }
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
