﻿using System.ComponentModel.DataAnnotations;

namespace NumberamaWebApi.Models.User
{
    public class UserRegisterInputModel
    {
        public string Email { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}
