using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using NumberamaWebApi.Models.User;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly IUsersService usersService;
        private readonly ITokenAuthService tokenAuthService;

        public UsersController(IUsersService usersService, ITokenAuthService tokenAuthService)
        {
            this.usersService = usersService;
            this.tokenAuthService = tokenAuthService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterInputModel input)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isEmailAvailable = this.usersService.IsEmailAvailable(input.Email);

            if(isEmailAvailable == false)
            {
                return BadRequest(ModelState);
            }

            var user = await this.usersService.RegisterAsync(input);
            var tokens = await this.tokenAuthService.GenerateTokensAsync(user);

            return Json(tokens);
        }


        [HttpPost]
        public async Task<IActionResult> Login(UserLoginInputModel input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(input);
            }

            var user = this.usersService.Login(input);
            if(user == null)
            {
                return BadRequest();
            }

            var tokens = await this.tokenAuthService.GenerateTokensAsync(user);
            return Json(tokens);
        }
    }
}
