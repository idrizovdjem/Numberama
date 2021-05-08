using System;

namespace NumberamaWebApi.Models.Score
{
    public class ScoreRankingViewModel
    {
        public string Username { get; set; }

        public int Score { get; set; }

        public DateTime SubmitedAt { get; set; }

        public int Position { get; set; }
    }
}
