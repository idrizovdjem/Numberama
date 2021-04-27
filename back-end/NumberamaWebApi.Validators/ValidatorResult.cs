using System.Collections.Generic;

namespace NumberamaWebApi.Validators
{
    public class ValidatorResult
    {
        public ValidatorResult()
        {
            this.IsValid = true;
            this.ErrorMessages = new List<string>();
        }

        public bool IsValid { get; set; }

        public List<string> ErrorMessages { get; set; }

        public void AddErrorMessage(string message)
        {
            this.IsValid = false;
            this.ErrorMessages.Add(message);
        }
    }
}
