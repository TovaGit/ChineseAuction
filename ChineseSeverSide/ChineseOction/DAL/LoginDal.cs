using ChineseOction.Models.DTO;
using ChineseOction.Models;

namespace ChineseOction.DAL
{
    public class LoginDal: ILoginDal
    {
        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<LoginDal> _logger;
        public LoginDal(ChineseCondex chineseCondex, ILogger<LoginDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Users> Authenticate(DtoUserLogin userLogin)
        {
            try
            {
                Users currentUser = chineseCondex.Users.FirstOrDefault(p =>
                            p.UserName.ToLower() == userLogin.UserName.ToLower() &&
                            p.Pwd == userLogin.Pwd.ToLower());
                if (currentUser != null)
                {
                    return currentUser;
                }
                return null;
            }
            catch
            {
                _logger.LogInformation("Authenticate error ");
                return null;
            }

        }
    }
}
