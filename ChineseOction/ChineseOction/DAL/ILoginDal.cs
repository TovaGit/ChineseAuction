using ChineseOction.Models.DTO;
using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public interface ILoginDal
    {
        public Task<Users> Authenticate(DtoUserLogin userLogin);
        
    }
}
