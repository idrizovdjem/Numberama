using System.Collections.Generic;

namespace NumberamaWebApi.Models.Response
{
    public abstract class ResponseModel
    {
        public ResponseModel(bool successfull, int statusCode)
        {
            this.Successfull = successfull;
            this.StatusCode = statusCode;
            this.ErrorMessages = new List<string>();
        }

        public bool Successfull { get; set; }

        public int StatusCode { get; set; }

        public List<string> ErrorMessages { get; set; }

        public object Data { get; set; }
    }
}
