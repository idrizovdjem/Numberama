using NumberamaWebApi.Models.User;

namespace NumberamaWebApi.Validators.Validators
{
    public static class UsersValidator
    {
        public static ValidatorResult ValidateRegister(UserRegisterInputModel input)
        {
            var result = new ValidatorResult();

            if(!Validator.ValidateEmail(input.Email))
            {
                result.AddErrorMessage("Invalid email");
            }

            if(!Validator.ValidateUsername(input.Username))
            {
                result.AddErrorMessage("Invalid username");
            }

            if(!Validator.ValidatePassword(input.Password))
            {
                result.AddErrorMessage("Invalid password");
            }

            return result;
        }

        public static ValidatorResult ValidateLogin(UserLoginInputModel input)
        {
            var result = new ValidatorResult();

            if (!Validator.ValidateEmail(input.Email))
            {
                result.AddErrorMessage("Invalid email");
            }

            if (!Validator.ValidatePassword(input.Password))
            {
                result.AddErrorMessage("Invalid password");
            }

            return result;
        }
    }
}
