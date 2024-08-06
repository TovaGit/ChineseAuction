using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models.DTO;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace ChineseOction.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ReffleController : Controller
    {

        private readonly IWinnersService winnerService;
        public ReffleController(IWinnersService winnerService)
        {
            this.winnerService = winnerService;
        }

        [Authorize(Roles = "True")]
        [HttpPost("RaffleForEeahGiftById/{GiftId}")]

        public async Task<ActionResult<Winners>> RaffleForEeahGiftById(int GiftId)
        {
            var Winner = await winnerService.RaffleForEeahGiftById(GiftId);
            if (Winner == null)
            {
                return null;
            }
            return Ok(Winner);
        }
        [AllowAnonymous]
        [HttpGet("AllWinners")]

        public async Task<ActionResult<List<DtoWinner>>> GetAllWinners()
        {
            var Winners = await winnerService.GetAllWinners();
            if (Winners==null)
            {
                return NotFound("no winners found");
            }
            return Ok(Winners);
        }
        [Authorize(Roles = "True")]
        [HttpPost("CheckIfDrawn/{giftId}")]
        public async Task<bool> CheckIfDrawn(int giftId)
        {
            return await winnerService.CheckIfDrawn(giftId);
        }

    }
}
