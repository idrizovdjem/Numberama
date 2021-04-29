using System;
using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Data.Models
{
    public class GameResult
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public int Score { get; set; }

        public DateTime SubmitedAt { get; set; }
    }
}
