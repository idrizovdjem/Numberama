using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.User
{
    public class UserRegisterInputModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(4), MaxLength(100)]
        public string Username { get; set; }

        [Required]
        [MinLength(5), MaxLength(200)]
        public string Password { get; set; }
    }
}
