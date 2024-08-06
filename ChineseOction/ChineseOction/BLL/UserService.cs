using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
namespace ChineseOction.BLL
{
    public class UserService:IUserService
    {
        private readonly IUserDal userDal;

        public UserService(IUserDal userDal)
        {
            this.userDal = userDal;
        }
        public async Task<Users> Add(Users user)
        {
            return await userDal.Add(user);
        }
        public async Task<Users> Update(DtoUserLogin user, int id)
        {
            return await userDal.Update(user, id);

        }
        public async Task<int> GetUserIdByEmail(string email)
        {
            return await userDal.GetUserIdByEmail(email);
        }


    }
}

