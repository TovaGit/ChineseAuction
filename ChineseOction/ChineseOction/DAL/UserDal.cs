using ChineseOction.Models;
using ChineseOction.Models.DTO;
using MailKit.Search;
using Microsoft.EntityFrameworkCore;

namespace ChineseOction.DAL
{
    public class UserDal:IUserDal
    {
        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<UserDal> _logger;

        public UserDal(ChineseCondex chineseCondex, ILogger<UserDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Users> Add(Users user)
        {
            try
            {
                 await chineseCondex.Users.AddAsync(user);
                 chineseCondex.SaveChanges();
                 return user;
               
            }
            catch 
            {
                _logger.LogInformation("error ADD");
                return null;
            }

        }
        public async Task<Users> Update(DtoUserLogin user, int id)
        {
            try
            {
                Users newUser = chineseCondex.Users.FirstOrDefault(u => u.Id == id);
                if (newUser!=null)
                {
                    newUser.Pwd = user.Pwd;
                    newUser.UserName = user.UserName;

                    chineseCondex.Users.Update(newUser);
                    chineseCondex.SaveChanges();
                    return newUser;
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Update");
                return null;
            }
        }
        public async Task<int> GetUserIdByEmail(string email)
        {
            try
            {
                var userId =await chineseCondex.Users.FirstOrDefaultAsync(u => u.Email == email);
                if(userId!=null)
                  return userId.Id;
                return 0;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetUserIdByEmail");
                return 0;
            }

        }



    }
}
