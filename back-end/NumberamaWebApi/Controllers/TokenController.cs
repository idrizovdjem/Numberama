using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using NumberamaWebApi.Models.Token;
using NumberamaWebApi.Models.Response;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TokenController : Controller
    {
        private readonly IUtilitiesService utilitiesService;
        private readonly ITokenService tokenService;
        private readonly IUsersService usersService;

        public TokenController(IUtilitiesService utilitiesService, ITokenService tokenService, IUsersService usersService)
        {
            this.utilitiesService = utilitiesService;
            this.tokenService = tokenService;
            this.usersService = usersService;
        }

        [HttpPost]
        public async Task<IActionResult> Refresh(RefreshTokenInputModel input)
        {
            var headerToken = this.utilitiesService.GetAccessTokenHeader(HttpContext);
            if(headerToken == null)
            {
                return Json(new UnauthorizedResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "Missing access tokne header"
                    }
                });
            }

            var accessToken = this.tokenService.GetAccessToken(headerToken, input.RefreshToken);
            if(accessToken == null)
            {
                return Json(new UnauthorizedResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "Invalid refresh token"
                    }
                });
            }

            if(accessToken.RefreshExpirationDate < DateTime.UtcNow)
            {
                return Json(new UnauthorizedResponseModel()
                {
                    ErrorMessages = new List<string>()
                    {
                        "Refresh token expired"
                    }
                });
            }
            var user = this.usersService.GetById(accessToken.UserId);

            var tokens = await this.tokenService.GenerateTokensAsync(user);

            return Json(new OkResponseModel()
            {
                Data = tokens
            });
        }
    }
}
