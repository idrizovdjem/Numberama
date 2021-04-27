namespace NumberamaWebApi.Validators
{
    public static class ValidationConstants
    {
        public const string EmailRegex = @"^\A(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z$";

        public const byte MinPasswordLength = 5;

        public const byte MaxPasswordLength = 200;

        public const byte MinUsernameLength = 4;

        public const byte MaxUsernameLength = 100;
    }
}
