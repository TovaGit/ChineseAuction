using ChineseOction.DAL;
using ChineseOction.Models;

namespace ChineseOction.BLL
{
    public class GiftService:IGiftService
    {
        private readonly IGiftDal giftDal;

        public GiftService(IGiftDal giftDal)
        {
            this.giftDal = giftDal;
        }
        public async Task<Gifts> Add(Gifts gift)
        {
            return await giftDal.Add(gift);

        }
        public async Task<Gifts> Update(Gifts gift, int id)
        {
            return await giftDal.Update(gift, id);
        }

        public async Task Delete(int id)
        {
            await giftDal.Delete(id);
        }
        public async Task<List<Gifts>>GetGifts()
        {
            return await giftDal.GetGifts();
        }

        public async Task<List<Gifts>> GetGiftsByName(string searchText)
        {
            return await giftDal.GetGiftsByName(searchText);

        }

        public async Task<List<Gifts>> GetGiftsByDonorName(string searchText)
        {
            return await giftDal.GetGiftsByDonorName(searchText);

        }
        public async Task<List<Gifts>> GetGiftsByAmountOfBuyers(int amount)
        {
            return await giftDal.GetGiftsByAmountOfBuyers(amount);

        }
        public async Task<List<Gifts>> GetGiftsByCategory(string category)
        {
            return await giftDal.GetGiftsByCategory(category);

        }
        public async Task<List<Gifts>> SortByPriceLowToHigh()
        {
            return await giftDal.SortByPriceLowToHigh();
        }

        public async Task<List<Gifts>> SortByPriceHighToLow()
        {
            return await giftDal.SortByPriceHighToLow();
        }



    }
}
