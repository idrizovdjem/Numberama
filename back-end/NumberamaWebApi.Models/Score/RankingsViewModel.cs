using System.Collections.Generic;

namespace NumberamaWebApi.Models.Score
{
    public class RankingsViewModel
    {
        public IList<ScoreRankingViewModel> TopTen { get; set; }

        public ScoreRankingViewModel UserRank { get; set; }

        public byte? UserRankIndex { get; set; }
    }
}
