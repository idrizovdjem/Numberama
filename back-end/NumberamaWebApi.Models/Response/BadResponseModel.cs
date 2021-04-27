namespace NumberamaWebApi.Models.Response
{
    public class BadResponseModel : ResponseModel
    {
        public BadResponseModel()
            : base(false, 400)
        {
        }
    }
}
