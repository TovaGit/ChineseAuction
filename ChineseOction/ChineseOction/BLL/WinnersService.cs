using ChineseOction.DAL;
using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.BLL
{
    public class WinnersService:IWinnersService
    {
        private readonly IWinnersDal winnerDal;

        public WinnersService(IWinnersDal winnerDal) 
        {
            this.winnerDal = winnerDal;

        }

        public async Task<Winners> RaffleForEeahGiftById(int GiftID)
        {
           return await winnerDal.RaffleForEeahGiftById(GiftID);
        }
        public async Task<List<DtoWinner>> GetAllWinners()
        {
            return await  winnerDal.GetAllWinners();   
        }
        public async Task<bool> CheckIfDrawn(int giftId)
        {
            return await winnerDal.CheckIfDrawn(giftId);

        }

    }
}
