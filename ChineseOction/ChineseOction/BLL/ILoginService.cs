using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.BLL
{
    public interface ILoginService
    {
        public Task<string> Generate(Users user);
        public Task<Users> Authenticate(DtoUserLogin userLogin);

    }
}
