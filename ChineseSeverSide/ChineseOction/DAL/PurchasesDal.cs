using AutoMapper.Execution;
using ChineseOction.Controllers;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Drawing;

namespace ChineseOction.DAL
{
    public class PurchasesDal : IPurchasesDal
    {
        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<PurchasesDal> _logger;

        public PurchasesDal(ChineseCondex chineseCondex, ILogger<PurchasesDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Purchases> Add(Purchases purchase)
        {
            try
            {
                await chineseCondex.Purchases.AddAsync(purchase);
                await chineseCondex.SaveChangesAsync();
                return purchase;
            }
            catch
            {
                _logger.LogInformation("error Add Purchases");
                return null;
            }
        }

        public async Task<Purchases> Update(int userId, int giftId)
        {
            try
            {
                var existingPurchase = await chineseCondex.Purchases.FirstOrDefaultAsync(d => d.Status == false && d.UserId == userId && d.GiftId == giftId);
                if (existingPurchase == null)
                {
                    throw new Exception("Purchase not found");
                }
                existingPurchase.AmountOfTickets = existingPurchase.AmountOfTickets + 1;
                await chineseCondex.SaveChangesAsync();
                return existingPurchase;
            }
            catch 
            {
                _logger.LogInformation("error Update Purchases");
                return null;
            }
        }

        public async Task<Purchases> UpdateMinus(int userId, int giftId)
        {
            try
            {
                var existingPurchase = await chineseCondex.Purchases.FirstOrDefaultAsync(d => d.Status == false && d.UserId == userId && d.GiftId == giftId);
                if (existingPurchase == null)
                {
                    throw new Exception("Purchase not found");
                }
                if (existingPurchase.AmountOfTickets - 1 < 1)
                    existingPurchase.AmountOfTickets = existingPurchase.AmountOfTickets;
                else
                    existingPurchase.AmountOfTickets = existingPurchase.AmountOfTickets - 1;
                await chineseCondex.SaveChangesAsync();
                return existingPurchase;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error UpdateMinus");
                return null;
            }
        }

        public async Task Delete(int id)
        {
            try
            {

                var purchaseToDelete = await chineseCondex.Purchases.FirstOrDefaultAsync(d => d.Status == false && d.PurchaseNumber == id);
                if (purchaseToDelete != null)
                {
                    chineseCondex.Purchases.Remove(purchaseToDelete);
                    await chineseCondex.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Delete purchase");
              
            }
        }
        public async Task<List<Purchases>> GetPurchases()
        {
            try
            {
                return await chineseCondex.Purchases.Where(x => x.Status==true).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Add GetPurchases");
                return null;
            }
        }

        public async Task<List<PurchaseWithGift>> GetPuchasesByUserId(int id)
        {
            try
            {
                var purchases = await (from p in chineseCondex.Purchases
                                       join g in chineseCondex.Gifts on p.GiftId equals g.GiftId
                                       where p.Status == false && p.UserId == id
                                       select new PurchaseWithGift
                                       {
                                           PurchaseNumber = p.PurchaseNumber,
                                           AmountOfTickets = p.AmountOfTickets,
                                           GiftName = g.Name,
                                           TicketPrice = g.Price,
                                           GiftId = g.GiftId,
                                           TotalPrice = g.Price * p.AmountOfTickets,
                                       }).ToListAsync();

                return purchases;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetPuchasesByUserId");
                return null;
            }
        }
        public async Task<bool> CheckIfProductIsInCart(int userId, int giftId)
        {
            try
            {
                var purchases = await chineseCondex.Purchases.Where(d => d.UserId == userId && d.GiftId == giftId && d.Status == false).ToListAsync();
                if (purchases.Any())
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Add CheckIfProductIsInCart");
                return false;
            }
        }

        public async Task<List<Purchases>> GetPurchasesGroupByGift(string name)
        {
            try
            {
                var purchase = await (from g in chineseCondex.Gifts
                                      join p in chineseCondex.Purchases on g.GiftId equals p.GiftId
                                      where g.Name == name && p.Status == true
                                      select p).ToListAsync();
                return purchase;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetPurchasesGroupByGift");
                return null;
            }
        }


        public async Task<List<Users>> GetDetailsOfTheBuyers()
        {
            try
            {
                var users = await chineseCondex.Users.
                    Where(u => chineseCondex.Purchases.Where(x => x.Status == true).Any(p => p.UserId == u.Id && u.IsManager == false)).ToListAsync();
                return users;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetDetailsOfTheBuyers");
                return null;
            }
        }
        public async Task<List<Gifts>> MostPurchasedGift()
        {
            try
            {
                var gifts = await (from g in chineseCondex.Gifts
                                   join purchaseGroup in (from p in chineseCondex.Purchases
                                                          where p.Status == true
                                                          group p by p.GiftId into groupedPurchases
                                                          select new { GiftId = groupedPurchases.Key, TotalAmount = groupedPurchases.Sum(p => p.AmountOfTickets) })
                                                      on g.GiftId equals purchaseGroup.GiftId
                                   orderby purchaseGroup.TotalAmount descending
                                   select g).ToListAsync();
                return gifts;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error MostPurchasedGift");
                return null;
            }
        }

        public async Task<int> TotalPaymentInCartForUser(int UserId)
        {
            try
            {
                var total = await (from p in chineseCondex.Purchases
                                   join g in chineseCondex.Gifts on p.GiftId equals g.GiftId
                                   where p.Status == false && p.UserId == UserId
                                   select (g.Price * p.AmountOfTickets)).ToListAsync();
                return total.Sum();
            }
            catch 
            {
                _logger.LogInformation("error TotalPaymentInCartForUser");
                return 0;
            }
        }
        public async Task<int> TotalIncomeForChineseauction()
        {
            try
            {
                var total = await (from p in chineseCondex.Purchases
                                   join g in chineseCondex.Gifts on p.GiftId equals g.GiftId
                                   where p.Status == true
                                   select (g.Price * p.AmountOfTickets)).ToListAsync();
                return total.Sum();
            }
            catch
            {
                _logger.LogInformation("error TotalIncomeForChineseauction");
                return 0;
            }
        }
        public async Task CheckOut(List<PurchaseWithGift> giftsList)
        {
            try
            {
               foreach(var i in giftsList)
                {
                    var existingPurchase = await chineseCondex.Purchases.FirstOrDefaultAsync(d => d.PurchaseNumber == i.PurchaseNumber );
                    existingPurchase.Status = true;
                    await chineseCondex.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
_logger.LogInformation("error CheckOut");
                            }
        }

    }
}
