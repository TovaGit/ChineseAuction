using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChineseOction.BLL
{
    public class LoginServer: ILoginService
    {
        private readonly ILoginDal loginDal;

        public LoginServer(ILoginDal loginDal)
        {
            this.loginDal = loginDal;
        }
        public async Task<string> Generate(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("bd1a1ccf8095037f361a4d351e7c0de65f0776bfc2f478ea8d312c763bb6caca");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                 new Claim(ClaimTypes.Role, user.IsManager.ToString()),
                 new Claim("Id", JsonConvert.SerializeObject(user.Id)),
                 new Claim("FullName", user.FullName)

                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "http://localhost:5015",
                Audience = "http://localhost:5015",

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }
        public async Task<Users> Authenticate(DtoUserLogin userLogin)
        {
            return await loginDal.Authenticate(userLogin);

        }
    }
}
