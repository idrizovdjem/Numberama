﻿using System.Linq;
using System.Threading.Tasks;

using NumberamaWebApi.Data;
using NumberamaWebApi.Data.Models;
using NumberamaWebApi.Models.User;
using NumberamaWebApi.Services.Contracts;

namespace NumberamaWebApi.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUtilitiesService utilitiesService;

        public UsersService(ApplicationDbContext dbContext, IUtilitiesService utilitiesService)
        {
            this.dbContext = dbContext;
            this.utilitiesService = utilitiesService;
        }

        public async Task<ApplicationUser> RegisterAsync(UserRegisterInputModel input)
        {
            var hashedPassword = this.utilitiesService.HashPassword(input.Password);

            var user = new ApplicationUser()
            {
                Email = input.Email,
                Password = hashedPassword
            };

            await this.dbContext.Users.AddAsync(user);
            await this.dbContext.SaveChangesAsync();

            return user;
        }

        public bool IsEmailAvailable(string email)
        {
            return this.dbContext.Users
                .All(u => u.Email != email);
        }
    }
}
