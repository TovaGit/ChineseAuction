using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.DAL
{
    public interface IUserDal
    {
        public Task<Users> Add(Users user);
        public Task<Users> Update(DtoUserLogin user, int id);

        public Task<int> GetUserIdByEmail(string email);

    }
}
