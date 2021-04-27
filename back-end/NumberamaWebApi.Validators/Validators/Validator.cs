using System.Text.RegularExpressions;

namespace NumberamaWebApi.Validators.Validators
{
    public static class Validator
    {
        public static bool ValidateEmail(string email)
        {
            var regex = new Regex(ValidationConstants.EmailRegex);
            return regex.IsMatch(email);
        }

        public static bool ValidatePassword(string password)
        {
            if(string.IsNullOrWhiteSpace(password))
            {
                return false;
            }

            if(password.Length < ValidationConstants.MinPasswordLength || ValidationConstants.MaxPasswordLength < password.Length)
            {
                return false;
            }

            return true;
        }

        public static bool ValidateUsername(string username)
        {
            if(string.IsNullOrWhiteSpace(username))
            {
                return false;
            }

            if(username.Length < ValidationConstants.MinUsernameLength || ValidationConstants.MaxUsernameLength< username.Length)
            {
                return false;
            }

            return true;
        }
    }
}
