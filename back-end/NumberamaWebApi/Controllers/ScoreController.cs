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
            var response = new ResponseModel();

            if(!ModelState.IsValid)
            {
                var errorMessages = this.utilitiesService.GetModelStateErorrs(ModelState);

                foreach(var message in errorMessages)
                {
                    response.AddErrorMessage(message);
                }

                response.StatusCode = 400;
                return Json(response);
            }

            var userId = User.FindFirst("id").Value;
            var result = await this.scoreService.SubmitAsync(userId, input.Points);

            response.StatusCode = 201;
            response.Data = new
            {
                result.SubmitedAt,
                result.Score
            };

            return Json(response);
        }

        [HttpGet]
        public IActionResult Rankings()
        {
            var userId = User.FindFirst("id")?.Value;
            var rankingsResult = this.scoreService.GetRankings(userId);

            var response = new ResponseModel();
            response.Data = rankingsResult;
            return Json(response);
        }
    }
}
