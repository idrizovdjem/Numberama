using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.Score
{
    public class SubmitScoreInputModel
    {
        [Range(0, int.MaxValue, ErrorMessage = "Invalid points value")]
        public int Points { get; set; }
    }
}
