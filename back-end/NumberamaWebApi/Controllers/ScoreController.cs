using System.Threading.Tasks; 

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using NumberamaWebApi.Models.Score;
using NumberamaWebApi.Models.Response;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ScoreController : Controller
    {
        private readonly IUtilitiesService utilitiesService;
        private readonly IScoreService scoreService;

        public ScoreController(IUtilitiesService utilitiesService, IScoreService scoreService)
        {
            this.utilitiesService = utilitiesService;
            this.scoreService = scoreService;
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Submit(SubmitScoreInputModel input)
        {
            if(!ModelState.IsValid)
            {
                return Json(new BadResponseModel()
                {
                    ErrorMessages = this.utilitiesService.GetModelStateErorrs(ModelState)
                });
            }

            var userId = User.FindFirst("id").Value;
            var result = await this.scoreService.SubmitAsync(userId, input.Points);

            return Json(new CreatedResponseModel()
            {
                Data = new
                {
                    SubmitedAt = result.SubmitedAt,
                    Score = result.Score
                }
            });
        }
    }
}
