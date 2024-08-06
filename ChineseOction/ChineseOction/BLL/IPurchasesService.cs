using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.BLL
{
    public interface IPurchasesService
    {
        public  Task<Purchases> Add(Purchases purchas);

        public  Task<Purchases> Update(int userId, int giftId);

        public  Task<Purchases> UpdateMinus(int userId, int giftId);

        public Task Delete(int id);

        public Task<List<Purchases>> GetPurchases();

        public Task<List<PurchaseWithGift>> GetPuchasesByUserId(int id);

        public Task<bool> CheckIfProductIsInCart(int userId, int giftId);


        public Task<List<Purchases>> GetPurchasesGroupByGift(string name);

        public Task<List<Users>> GetDetailsOfTheBuyers();

        public Task<List<Gifts>> MostPurchasedGift();

        public  Task<int> TotalPaymentInCartForUser(int UserId);

        public Task<int> TotalIncomeForChineseauction();

        public Task CheckOut(List<PurchaseWithGift> giftsList);

    }
}
