using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Cryptography;

using Microsoft.AspNetCore.Mvc.ModelBinding;

using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Services
{
    public class UtilitiesService : IUtilitiesService
    {
        public string HashPassword(string password)
        {
            using SHA512 sha512Hash = SHA512.Create();
            byte[] sourceBytes = Encoding.UTF8.GetBytes(password);
            byte[] hashBytes = sha512Hash.ComputeHash(sourceBytes);
            string hash = BitConverter.ToString(hashBytes).Replace("-", String.Empty);
            return hash;
        }

        public List<string> GetModelStateErorrs(ModelStateDictionary modelState)
        {
            var modelErrors = new List<string>();
            foreach (var currentModelState in modelState.Values)
            {
                foreach (var modelError in currentModelState.Errors)
                {
                    modelErrors.Add(modelError.ErrorMessage);
                }
            }
            return modelErrors;
        }
    }
}
