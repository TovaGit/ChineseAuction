using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models.DTO;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using ChineseOction.Middleware;

namespace ChineseOction.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class DonorController : ControllerBase
    {
        private readonly ILogger<AuthenticationMiddleware> logger;
        private readonly IDonorService donorService;
        private readonly IMapper mapper;

        public DonorController(IDonorService donorService, IMapper mapper,ILogger<AuthenticationMiddleware> logger)
        {
            this.logger = logger;
            this.donorService = donorService;
            this.mapper = mapper;
        }
        [Authorize(Roles = "True")]
        [HttpPost]
        public async Task<ActionResult<Donors>> Add(DtoDonors donor)
        {
            var d = mapper.Map<Donors>(donor);
            return await donorService.Add(d);
        }
        [Authorize(Roles = "True")]
        [HttpDelete("delete/{id}")]
        public async Task Delete(int id)
        {
           await donorService.Delete(id);
        }
        [Authorize(Roles = "True")]
        [HttpPut("edit/{id}")]
        public async Task< ActionResult<Donors>> Update(DtoDonors donor, int id)
        {
            var d = mapper.Map<Donors>(donor);
            return await donorService.Update(d, id);
        }
        [Authorize(Roles = "True")]
        [HttpGet]
        public async Task<ActionResult<Donors>> Get()
        {
            var donors = await donorService.GetDonors();
            if (donors == null)
            {
                return NotFound("NO Donors Found");
            }
            return Ok(donors);
        }
        [Authorize(Roles = "True")]
        [HttpGet("GetGiftsById/{id}")]
        public async Task<ActionResult<Gifts>> GetGiftsByDonorID(int id)
        {
            var donors =  await donorService.GetGiftsByDonorID(id);
            if (donors == null)
            {
                return NotFound("NO Donors Found");
            }
            return Ok(donors);
        }
        [Authorize(Roles = "True")]
        [HttpGet("GetDonorByName/{searchText}")]
        public async Task<ActionResult<Donors>> GetDonorByName(string searchText)
        {
            var donors = await donorService.GetDonorByName(searchText);
            if (donors == null)
            {
                return NotFound("NO Donors Found");
            }
            return Ok(donors);
        }
        [Authorize(Roles = "True")]
        [HttpGet("GetDonorByMail/{searchText}")]
        public async Task<ActionResult<Donors>> GetDonorByMail(string searchText)
        {
            var donors = await donorService.GetDonorByMail(searchText);
            if (donors == null)
            {
                return NotFound("NO Donors Found");
            }
            return Ok(donors);
        }
        [Authorize(Roles = "True")]
        [HttpGet("GetDonorByGift/{searchText}")]
        public async Task<ActionResult<Donors>> GetDonorByGift(string searchText)
        {
            var donors =await donorService.GetDonorByGift(searchText);
            if(donors == null)
            {
                return NotFound("NO Donors Found");
            }
            return Ok(donors);
        }
    }
    }
