using ChineseOction.DAL;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.BLL
{
    public class PurchasesService:IPurchasesService
    {
        private readonly IPurchasesDal purchasesDal;

        public PurchasesService(IPurchasesDal purchasesDal)
        {
            this.purchasesDal = purchasesDal;
        }
        public async Task<Purchases> Add(Purchases purchas)
        {
            return await purchasesDal.Add(purchas);
        }

        public async Task<Purchases> Update(int userId, int gifrId) { 
            return await purchasesDal.Update(userId, gifrId);
        }
        public async Task<Purchases> UpdateMinus(int userId, int giftId)
        {
            return await purchasesDal.UpdateMinus(userId, giftId);

        }

        public async Task Delete(int id)
        {
             await purchasesDal.Delete(id);
        }
        public async Task<List<Purchases>> GetPurchases()
        {
            return await purchasesDal.GetPurchases();

        }

        public async Task<List<PurchaseWithGift>> GetPuchasesByUserId(int id)
        {
            return await purchasesDal.GetPuchasesByUserId(id);
        }
        public async Task<bool> CheckIfProductIsInCart(int userId, int giftId)
        {
            return await purchasesDal.CheckIfProductIsInCart(userId,giftId);
        }
        public async Task<List<Purchases>> GetPurchasesGroupByGift(string name)
        {
            return await purchasesDal.GetPurchasesGroupByGift(name);
        }

        public async Task<List<Users>> GetDetailsOfTheBuyers()
        {
            return await purchasesDal.GetDetailsOfTheBuyers();

        }
        public async Task<List<Gifts>> MostPurchasedGift()
        {
            return await purchasesDal.MostPurchasedGift();
        }
        public async Task<int> TotalPaymentInCartForUser(int UserId)
        {
            return await purchasesDal.TotalPaymentInCartForUser(UserId);
        }
        public async Task<int> TotalIncomeForChineseauction()
        {
            return await purchasesDal.TotalIncomeForChineseauction();
        }
        public async Task CheckOut(List<PurchaseWithGift> giftsList)
        {
             await purchasesDal.CheckOut(giftsList);
        }


    }
}
