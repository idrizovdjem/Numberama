using System.Threading.Tasks;

using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.User;

namespace NumberamaWebApi.Services.Contracts
{
    public interface IUsersService
    {
        bool IsEmailAvailable(string email);

        bool IsUsernameAvailable(string username);

        ApplicationUser GetById(string userId);

        ApplicationUser Login(UserLoginInputModel input);

        Task<ApplicationUser> RegisterAsync(UserRegisterInputModel input);
    }
}
