using System.Threading.Tasks;

using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.User;

namespace NumberamaWebApi.Services.Contracts
{
    public interface IUsersService
    {
        bool IsEmailAvailable(string email);

        Task<ApplicationUser> RegisterAsync(UserRegisterInputModel input);
    }
}
