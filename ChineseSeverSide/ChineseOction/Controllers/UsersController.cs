using AutoMapper;
using ChineseOction.BLL;
using Microsoft.AspNetCore.Mvc;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController
    {


        private readonly IUserService userService;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;
        public UsersController(IUserService userService, IMapper mapper, IConfiguration configuration)
        {
            this.userService = userService;
            this.mapper = mapper;
            this.configuration = configuration;
        }
        [AllowAnonymous]
        [HttpPost]

        public async Task<ActionResult<Users>> Add(DtoUser user)
        {
            var u = mapper.Map<Users>(user);
            return await userService.Add(u);
        }
        [AllowAnonymous]
        [HttpPut("Update/{id}")]
        public async Task<ActionResult<Users>> Update(DtoUserLogin user, int id)
        {
            return await userService.Update(user, id);
        }
        [AllowAnonymous]
        [HttpGet("/GetUserIdByEmail/{email}")]
        public async Task<int> GetUserIdByEmail(string email)
        {

            return await userService.GetUserIdByEmail(email);





        }
    }
}
