using ChineseOction.Controllers;
using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Text.RegularExpressions;

namespace ChineseOction.DAL
{
    public class GiftDal : IGiftDal
    {
        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<GiftDal> _logger;

        public GiftDal(ChineseCondex chineseCondex, ILogger<GiftDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Gifts> Add(Gifts gift)
        {
            try
            {
                await chineseCondex.Gifts.AddAsync(gift);
                chineseCondex.SaveChanges();
                return gift;

            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Adding Gift");
                return null;
            }
        }

        public async Task<Gifts> Update(Gifts gift, int id)
        {
            try
            {
                Gifts newGift =await chineseCondex.Gifts.FirstOrDefaultAsync(g => g.GiftId == id);
                newGift.Name = gift.Name;
                newGift.Price = gift.Price;
                newGift.CategoryId = gift.CategoryId;

                chineseCondex.Gifts.Update(newGift);
                 chineseCondex.SaveChanges();
                return newGift;

            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Update Gift");
                return null;
            }
        }

        public async Task Delete(int id)
        {
            try
            {
                Gifts gift =await chineseCondex.Gifts.FirstOrDefaultAsync(d => d.GiftId == id);
                chineseCondex.Gifts.Remove(gift);
                 chineseCondex.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Delete Gift");
                
            }
        }

        public async Task<List<Gifts>> GetGifts()
        {
            try
            {
                return await chineseCondex.Gifts.Select(x => x).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGifts");
                return null;
            }

        }

        public async Task<List<Gifts>> GetGiftsByName(string searchText)
        {
            try
            {
                var gift = await chineseCondex.Gifts.
                Where(d => d.Name.Contains(searchText)).ToListAsync();
                return gift;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGiftsByName");
                return null;
            }

        }

        public async Task<List<Gifts>> GetGiftsByDonorName(string searchText)
        {
            try
            {
                var gifts =await chineseCondex.Gifts
                .Where(g => g.Donor != null && g.Donor.FullName.Contains(searchText))
                .ToListAsync();
                return gifts;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGiftsByDonorName");
                return null;
            }

        }
        public async Task<List<Gifts>> GetGiftsByAmountOfBuyers(int amount)
        {
            try
            {
                var gifts = await (from g in chineseCondex.Gifts
                                   join p in chineseCondex.Purchases on g.GiftId equals p.GiftId
                                   where p.Status==true 
                                   group g by g.GiftId into groupedGift 
                                   where groupedGift.Count() == amount 
                                   select groupedGift.First()).ToListAsync();
                return gifts;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGiftsByDonorName");
                return null;
            }
        }
        public async Task<List<Gifts>> GetGiftsByCategory(string category)
        {
            try
            {
                var gifts = await chineseCondex.Gifts
                .Where(c => c.Category.Name.Contains(category))
                .Select(g => g)
                .ToListAsync();
                return gifts;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGiftsByCategory");
                return null;
            }
        }

        public async Task<List<Gifts>> SortByPriceLowToHigh()
        {
            try
            {
                return await chineseCondex.Gifts.OrderBy(x => x.Price).ToListAsync();

            }
            catch (Exception ex)
            {
                _logger.LogInformation("error SortByPriceLowToHigh");
                return null;
            }
        }
        public async Task<List<Gifts>> SortByPriceHighToLow()
        {
            try
            {
                return await chineseCondex.Gifts.OrderByDescending(x=>x.Price).ToListAsync();

            }
            catch
            {
                    _logger.LogInformation("error SortByPriceHighToLow");
                    return null;
                }
        }



    }

}
