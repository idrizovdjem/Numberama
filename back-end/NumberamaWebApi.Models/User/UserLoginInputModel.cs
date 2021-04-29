using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.User
{
    public class UserLoginInputModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is requried")]
        [MinLength(5, ErrorMessage = "Password must be at least 5 symbols")]
        [MaxLength(200, ErrorMessage = "Password must be at most 200 symbols")]
        public string Password { get; set; }
    }
}
