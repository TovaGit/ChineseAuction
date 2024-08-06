using ChineseOction.Controllers;
using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Drawing;

namespace ChineseOction.DAL
{
    public class DonorDal : IDonorDal
    {

        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<DonorDal> _logger;

        public DonorDal(ChineseCondex chineseCondex, ILogger<DonorDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Donors> Add(Donors donor)
        {
            try
            {
                  await chineseCondex.Donors.AddAsync(donor);
                  chineseCondex.SaveChanges();
                 return donor;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Adding Donors");
                return null;
            }
        }
        public async Task<Donors> Update(Donors donor, int id)
        {
            try
            {
                Donors newDonor = await chineseCondex.Donors.FirstOrDefaultAsync(d => d.DonorId == id);
                newDonor.FullName = donor.FullName;
                newDonor.Phone = donor.Phone;
                newDonor.Email = donor.Email;

                  chineseCondex.Donors.Update(newDonor);
                 chineseCondex.SaveChanges();
                return newDonor;

            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Update Donors");
                return null;
            }
        }
        public async Task Delete(int id)
        {
            try
            {
                Donors donor =await chineseCondex.Donors.FirstOrDefaultAsync(d => d.DonorId == id);
                chineseCondex.Donors.Remove(donor);
                 chineseCondex.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Delete Donor");
             
            }
        }
        public async Task<List<Donors>> GetDonors()
        {
            try
            {
                return await chineseCondex.Donors.Select(x => x).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetDonors");
                return null;
            }

        }
        public async Task<List<Gifts>> GetGiftsByDonorID(int id)
        {
            try
            {
                var g = await chineseCondex.Donors.
                                Include(d => d.Gifts)
                                .Where(d => d.DonorId == id).SelectMany(d=>d.Gifts).
                                ToListAsync();
                return g;

                             
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetGiftsByDonorID");
                return null;
            }

        }
        public async Task<List<Donors>> GetDonorByName(string searchText)
        {
            try
            {
                var donors =await chineseCondex.Donors.
               Where(d => d.FullName.Contains(searchText)).ToListAsync();
                return donors;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetDonorByName");
                return null;
            }

        }
        public async Task<List<Donors>> GetDonorByMail(string searchText)
        {
            try
            {
                var donors =await chineseCondex.Donors.
             Where(d => d.Email.Contains(searchText)).ToListAsync();
                return donors;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetDonorByMail");
                return null;
            }

        }

        public async Task<List<Donors>> GetDonorByGift(string searchText)
        {
            try
            {
             var donors = await chineseCondex.Donors
            .Where(d => d.Gifts.Any(g => g.Name.Contains(searchText))) 
            .ToListAsync();
             return donors;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error GetDonorByGift");
                return null;
            }
        }

    }

}
