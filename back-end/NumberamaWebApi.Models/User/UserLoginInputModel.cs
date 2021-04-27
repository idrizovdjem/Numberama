using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.User
{
    public class UserLoginInputModel
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
