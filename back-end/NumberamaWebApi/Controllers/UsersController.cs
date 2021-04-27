﻿using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using NumberamaWebApi.Models.Response;
using NumberamaWebApi.Models.User;
using NumberamaWebApi.Services.Contracts;
using NumberamaWebApi.Validators.Validators;

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
            var validationResult = UsersValidator.ValidateRegister(input);
            if (validationResult.IsValid == false)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = validationResult.ErrorMessages
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
            var tokens = this.tokenAuthService.GenerateTokens(user);

            return Json(new OkResponseModel()
            {
                Data = tokens
            });
        }


        [HttpPost]
        public IActionResult Login(UserLoginInputModel input)
        {
            var validationResult = UsersValidator.ValidateLogin(input);
            if (validationResult.IsValid == false)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = validationResult.ErrorMessages
                });
            }

            var user = this.usersService.Login(input);
            if(user == null)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "Invalid login information"
                    }
                });
            }

            var tokens = this.tokenAuthService.GenerateTokens(user);
            return Json(new OkResponseModel()
            {
                Data = tokens
            });
        }
    }
}
