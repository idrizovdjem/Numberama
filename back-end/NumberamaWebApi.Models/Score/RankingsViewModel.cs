using System.Collections.Generic;

namespace NumberamaWebApi.Models.Score
{
    public class RankingsViewModel
    {
        public IEnumerable<ScoreRankingViewModel> TopTen { get; set; }

        public ScoreRankingViewModel UserRank { get; set; }
    }
}
