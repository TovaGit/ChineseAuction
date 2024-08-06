using AutoMapper;
using ChineseOction.DAL;
using ChineseOction.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ChineseOction.Models.DTO;
using System.Text.Json;
using Newtonsoft.Json;
using System.Linq;
using ChineseOction.BLL;

namespace ChineseOction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService loginService;

        private IConfiguration _config;
        private readonly ChineseCondex chineseCondex;
        private readonly IMapper _mapper;

        public LoginController(ILoginService loginService,IConfiguration config, ChineseCondex chineseCondex, IMapper mapper)
        {
            this.loginService = loginService;

            _config = config;
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.chineseCondex = chineseCondex ?? throw new ArgumentNullException(nameof(chineseCondex));

        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<object>> Login( DtoUserLogin userLogin)
        {
            var user =await loginService.Authenticate(userLogin);
            if (user != null)
            {
                var token =await loginService.Generate((user));
                var jsonToken = JsonConvert.SerializeObject(new { token });
                return jsonToken;
            }
            return null;
        }


        //private string Generate(Users user)
        //{

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.UTF8.GetBytes("bd1a1ccf8095037f361a4d351e7c0de65f0776bfc2f478ea8d312c763bb6caca");
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //         new Claim(ClaimTypes.Role, user.IsManager.ToString()),
        //         new Claim("Id", JsonConvert.SerializeObject(user.Id)),
        //         new Claim("FullName", user.FullName)

        //        }),
        //        Expires = DateTime.UtcNow.AddHours(1),
        //        Issuer = "http://localhost:5015",
        //        Audience = "http://localhost:5015",

        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    var tokenString = tokenHandler.WriteToken(token);
        //    return tokenString;
        //}


        //private Users Authenticate(DtoUserLogin userLogin)
        //{
        //    Users currentUser = chineseCondex.Users.FirstOrDefault(p =>
        //    p.UserName.ToLower() == userLogin.UserName.ToLower() &&
        //    p.Pwd == userLogin.Pwd.ToLower());
        //    if (currentUser != null)
        //    {
        //        return currentUser;
        //    }
        //    return null;
        //}
    }
}
