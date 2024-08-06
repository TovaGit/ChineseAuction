using ChineseOction.Models;
using ChineseOction.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using static Azure.Core.HttpHeader;

namespace ChineseOction.DAL
{
    public class WinnersDal : IWinnersDal
    {
        private readonly ChineseCondex chineseCondex;

        public WinnersDal(ChineseCondex chineseCondex)
        {
            this.chineseCondex = chineseCondex;

        }
        public async Task<Winners> RaffleForEeahGiftById(int GiftId)
        {
            try
            {
                var DidRaffle = await chineseCondex.Winners.Where(w => w.GiftId == GiftId).FirstOrDefaultAsync();
                if (DidRaffle != null) { return null; }
                var allPurchasesForCurrentGift = await chineseCondex.Purchases
                  .Include(p => p.Gift)
                  .Where(p => p.GiftId == GiftId&&p.Status==true)
                  .ToListAsync();

                List<Purchases> allTicketForGift = new List<Purchases>();
                foreach (var a in allPurchasesForCurrentGift)
                {
                    for (int j = 0; j < a.AmountOfTickets; j++)
                    {
                        allTicketForGift.Add(a);
                    }
                }
                if (!allTicketForGift.Any())
                {
                    return null;
                }

                Random random = new Random();
                int randomIndex = random.Next(0, allTicketForGift.Count);
                var randomPurchase = allTicketForGift[randomIndex];

                Winners winner = new Winners();
                winner.UserId = randomPurchase.UserId;
                winner.GiftId = randomPurchase.GiftId;

                await chineseCondex.Winners.AddAsync(winner);
                await chineseCondex.SaveChangesAsync();
                return winner;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro Doing the reffle ");

            }
        }
        public async Task<List<DtoWinner>> GetAllWinners()
        {
            try
            {
                var winners = await chineseCondex.Winners
                  .Include(w => w.User)
                  .Select(w => new DtoWinner // Project data into WinnerDto objects
                  {
                      WinningGift = w.Gift.Name,
                      WinningNumber = w.WinningNumber,
                      FullName = w.User.FullName,
                      Email = w.User.Email,
                      Phone = w.User.Phone
                  })
                  .ToListAsync();

                return winners;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro getting winners for each gift");

            }
          
        }
        public async Task<bool> CheckIfDrawn(int giftId)
        {
            var DidRaffle = await chineseCondex.Winners.Where(w => w.GiftId == giftId).FirstOrDefaultAsync();
            if(DidRaffle!=null) return true;
            return false;
        }
    }
}
