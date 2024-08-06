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
    public class GiftController: ControllerBase
    {
        private readonly IGiftService giftService;
        private readonly IMapper mapper;

        public GiftController(IGiftService giftService, IMapper mapper)
        {
            this.giftService = giftService;
            this.mapper = mapper;
        }
        [Authorize(Roles = "True")]
        [HttpPost]
        public async Task<ActionResult<Gifts>> Add(DtoGifts gift)
        {
            var g = mapper.Map<Gifts>(gift);
            return await giftService.Add(g);
        }
        [Authorize(Roles = "True")]
        [HttpDelete("/DeleteById/{id}")]
        public async Task Delete(int id)
        {
            await giftService.Delete(id);
        }
        [Authorize(Roles = "True")]
        [HttpPut("edit/{id}")]
        public async Task<ActionResult<Gifts>> Update(DtoGifts gift, int id)
        {
            var g = mapper.Map<Gifts>(gift);
            return await giftService.Update(g, id);
        }
        [AllowAnonymous]
        [HttpGet()]
        public async Task<ActionResult<Gifts>> Get()
        {
            var gifts = await giftService.GetGifts();
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);
        }
        [AllowAnonymous]
        [HttpGet("/GetGiftsByName/{searchText}")]
        public async Task<ActionResult<Gifts>> GetGiftsByName(string searchText)
        {
            var gifts = await giftService.GetGiftsByName(searchText);
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }
        [Authorize(Roles = "True")]
        [HttpGet("/GetGiftsByDonorName/{searchText}")]
        public async Task<ActionResult<Gifts>> GetGiftsByDonorName(string searchText)
        {
            var gifts = await giftService.GetGiftsByDonorName(searchText);
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }
        [Authorize(Roles = "True")]
        [HttpGet("/GetGiftsByAmountOfBuyers/{amount}")]
        public async Task<ActionResult<Gifts>> GetGiftsByAmountOfBuyers(int amount)
        {
            var gifts = await giftService.GetGiftsByAmountOfBuyers(amount);
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }
        [AllowAnonymous]
        [HttpGet("/GetGiftsByCategory/{category}")]
        public async Task<ActionResult<Gifts>> GetGiftsByCategory(string category)
        {
            var gifts = await giftService.GetGiftsByCategory(category);
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }
        [AllowAnonymous]
        [HttpGet("/SortByPriceLowToHigh")]
         public async Task<ActionResult<Gifts>> SortByPriceLowToHigh()
        {
            var gifts = await giftService.SortByPriceLowToHigh();
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }
        [AllowAnonymous]
        [HttpGet("/SortByPriceHighToLow")]

        public async Task<ActionResult<Gifts>> SortByPriceHighToLow()
        {
            var gifts =await giftService.SortByPriceHighToLow();
            if (gifts == null)
            {
                return NotFound("No Gifts Found");
            }
            return Ok(gifts);

        }

    }
}
