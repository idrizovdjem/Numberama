using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using NumberamaWebApi.Models.User;
using NumberamaWebApi.Models.Response;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly IUsersService usersService;
        private readonly IUtilitiesService utilitiesService;
        private readonly ITokenAuthService tokenAuthService;

        public UsersController(IUsersService usersService, ITokenAuthService tokenAuthService, IUtilitiesService utilitiesService)
        {
            this.usersService = usersService;
            this.tokenAuthService = tokenAuthService;
            this.utilitiesService = utilitiesService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterInputModel input)
        {
            if (!ModelState.IsValid)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = this.utilitiesService.GetModelStateErorrs(ModelState)
                });
            }

            var isEmailAvailable = this.usersService.IsEmailAvailable(input.Email);

            if(isEmailAvailable == false)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "This email is already taken"
                    }
                });
            }

            var isUsernameAvailable = this.usersService.IsUsernameAvailable(input.Username);

            if (isUsernameAvailable == false)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "This username is already taken"
                    }
                });
            }

            var user = await this.usersService.RegisterAsync(input);
            var tokens = await this.tokenAuthService.GenerateTokensAsync(user);

            return Json(new OkResponseModel()
            {
                Data = tokens
            });
        }


        [HttpPost]
        public async Task<IActionResult> Login(UserLoginInputModel input)
        {
            if(!ModelState.IsValid)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = this.utilitiesService.GetModelStateErorrs(ModelState)
                });
            }

            var user = this.usersService.Login(input);
            if (user == null)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "Invalid login information"
                    }
                });
            }

            var tokens = await this.tokenAuthService.GenerateTokensAsync(user);
            return Json(new OkResponseModel()
            {
                Data = tokens
            });
        }
    }
}
