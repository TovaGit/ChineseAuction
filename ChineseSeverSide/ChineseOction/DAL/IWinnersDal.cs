using ChineseOction.Models;
using ChineseOction.Models.DTO;

namespace ChineseOction.DAL
{
    public interface IWinnersDal
    {
        public Task<Winners> RaffleForEeahGiftById(int GiftId);

        public  Task<List<DtoWinner>> GetAllWinners();

        public Task<bool> CheckIfDrawn(int giftId);


    }
}
