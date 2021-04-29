using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.User
{
    public class UserRegisterInputModel
    {
        [Required(ErrorMessage = "Email is requried")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [MinLength(4, ErrorMessage = "Username must be at least 4 symbols")]
        [MaxLength(100, ErrorMessage = "Username must be at most 100 symbols")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(5, ErrorMessage = "Password must be at least 5 symbols")]
        [MaxLength(200, ErrorMessage = "Password must be at most 200 symbols")]
        public string Password { get; set; }
    }
}
