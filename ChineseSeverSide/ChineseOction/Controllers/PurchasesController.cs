using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models.DTO;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using ChineseOction.DAL;

namespace ChineseOction.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PurchasesController : ControllerBase
    {
        private readonly IPurchasesService purchasService;
        private readonly IMapper mapper;
        public PurchasesController(IPurchasesService purchasService, IMapper mapper)
        {
            this.purchasService = purchasService;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpPost("Add")]
        public async Task<ActionResult<Purchases>> Add(DtoPurchases purchas)
        {
            var p = mapper.Map<Purchases>(purchas);
            return await purchasService.Add(p);
        }
        [AllowAnonymous]
        [HttpDelete("Delete/{purchaseNumber}")]
        public async Task Delete(int purchaseNumber)
        {
            await purchasService.Delete(purchaseNumber);
        }
        [AllowAnonymous]
        [HttpPut("Update/{userId}/{giftId}")]
        public async Task<ActionResult<Purchases>> Update(int userId, int giftId)
        {
            return await purchasService.Update(userId, giftId);
        }
        [AllowAnonymous]
        [HttpPut("UpdateMinus/{userId}/{giftId}")]
        public async Task<ActionResult<Purchases>> UpdateMinus(int userId, int giftId)
        {
            var purchas = await purchasService.UpdateMinus(userId, giftId);
            if (purchas == null)
            {
                return NotFound("NO purchases Found");

            }
            return Ok(purchas);
        }

        [AllowAnonymous]
        [HttpGet("GetPuchasesByUserId/{id}")]
        public async Task<ActionResult<List<PurchaseWithGift>>> GetPuchasesByUserId(int id)
        {
            var purchas = await purchasService.GetPuchasesByUserId(id);
            if (purchas == null)
            {
                return NotFound("NO Gifts Found");

            }
            return Ok(purchas);
        }
        [AllowAnonymous]
        [HttpGet("CheckIfProductIsInCart/{userId}/{giftId}")]
        public async Task<bool> CheckIfProductIsInCart(int userId, int giftId)
        {
            var found = await purchasService.CheckIfProductIsInCart(userId, giftId);
            if (!found)
            {
                return false;

            }
            return true;
        }
        [Authorize(Roles = "True")]
        [HttpGet("GetPurchases")]
        public async Task<ActionResult<Purchases>> GetPurchases()
        {
            var purchases = await purchasService.GetPurchases();
            if (purchases == null)
            {
                return NotFound("NO Gifts Found");
            }
            return Ok(purchases);
        }
        [Authorize(Roles = "True")]
        [HttpGet("PurchasesByGift/{name}")]
        public async Task<ActionResult<Purchases>> GetPurchasesGroupByGift(string name)
        {
            var purchas = await purchasService.GetPurchasesGroupByGift(name);
            if (purchas == null)
            {
                return NotFound("NO Gifts Found");
            }
            return Ok(purchas);
        }
        [Authorize(Roles = "True")]
        [HttpGet("DetailsOfBuyers")]
        public async Task<ActionResult<Users>> GetDetailsOfTheBuyers()
        {
            var user = await purchasService.GetDetailsOfTheBuyers();
            if (user == null)
            {
                return NotFound("No Users Found");
            }
            return Ok(user);
        }
        [Authorize(Roles = "True")]
        [HttpGet("SortByMostPurchasedGift")]
        public async Task<ActionResult<Users>> SortByMostPurchasedGift()
        {
            var user = await purchasService.MostPurchasedGift();
            if (user == null)
            {
                return NotFound("No Users Found");
            }
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpGet("TotalPaymentInCartForUser/{UserId}")]
        public async Task<ActionResult<int>> TotalPaymentInCartForUser(int UserId)
        {
            var total = await purchasService.TotalPaymentInCartForUser(UserId);
            if (total == null)
            {
                return NotFound("Not Found");
            }
            return Ok(total);
        }
        [Authorize(Roles = "True")]
        [HttpGet("TotalIncomeForChineseauction")]
        public async Task<ActionResult<int>> TotalIncomeForChineseauction()
        {
            var total = await purchasService.TotalIncomeForChineseauction();
            if (total == null)
            {
                return NotFound("Not Found");
            }
            return Ok(total);
        }
        [AllowAnonymous]
        [HttpPut("CheckOut")]
        public async Task CheckOut(List<PurchaseWithGift> giftsList)
        {
             await purchasService.CheckOut(giftsList);

            
        }

    }
}

