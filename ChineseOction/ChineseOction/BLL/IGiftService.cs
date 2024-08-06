using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public interface IGiftService
    {
        public Task<Gifts> Add(Gifts gift);

        public Task<Gifts> Update(Gifts gift, int id);

        public Task Delete(int id);
        public Task<List<Gifts>> GetGifts();

        public Task<List<Gifts>> GetGiftsByName(string searchText);

        public Task<List<Gifts>> GetGiftsByDonorName(string searchText);

        public Task<List<Gifts>> GetGiftsByAmountOfBuyers(int amount);

        public Task<List<Gifts>> GetGiftsByCategory(string category);

        public Task<List<Gifts>> SortByPriceLowToHigh();

        public Task<List<Gifts>> SortByPriceHighToLow();



    }
}
