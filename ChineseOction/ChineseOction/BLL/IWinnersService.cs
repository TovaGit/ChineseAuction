using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.BLL
{
    public interface IWinnersService
    {
        public Task<Winners> RaffleForEeahGiftById(int GiftId);

        public Task<List<DtoWinner>> GetAllWinners();

        public  Task<bool> CheckIfDrawn(int giftId);


    }
}
