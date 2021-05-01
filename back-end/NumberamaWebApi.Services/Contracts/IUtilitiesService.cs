using System.Collections.Generic;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace NumberamaWebApi.Services.Contracts
{
    public interface IUtilitiesService
    {
        List<string> GetModelStateErorrs(ModelStateDictionary modelState);

        string HashPassword(string password);

        string GetAccessTokenHeader(HttpContext httpContext);
    }
}
