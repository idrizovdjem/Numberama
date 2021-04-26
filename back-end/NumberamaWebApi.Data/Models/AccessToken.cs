using System;
using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Data.Models
{
    public class AccessToken
    {
        public AccessToken()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public string UserId { get; set; }

        public DateTime IssuedAt { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}
