using System;
using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Data.Models
{
    public class AccessToken
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public string RefreshToken { get; set; }

        public DateTime RefreshExpirationDate { get; set; }
    }
}
