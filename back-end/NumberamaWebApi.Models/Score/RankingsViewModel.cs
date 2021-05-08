using System.Collections.Generic;

namespace NumberamaWebApi.Models.Score
{
    public class RankingsViewModel
    {
        public IList<ScoreRankingViewModel> UsersRanks { get; set; }

        public int? UserRankIndex { get; set; }
    }
}
