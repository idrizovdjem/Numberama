using System;
using System.Text;
using System.Security.Cryptography;

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
    }
}
