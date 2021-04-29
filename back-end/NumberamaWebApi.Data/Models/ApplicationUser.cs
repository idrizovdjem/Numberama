using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Data.Models
{
    public class ApplicationUser
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Results = new HashSet<GameResult>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MaxLength(200)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public virtual ICollection<GameResult> Results { get; set; }
    }
}
