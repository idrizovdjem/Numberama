namespace NumberamaWebApi.Models.Response
{
    public class UnauthorizedResponseModel : ResponseModel
    {
        public UnauthorizedResponseModel()
            : base(false, 401)
        {
        }
    }
}
