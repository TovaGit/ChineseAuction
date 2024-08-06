using ChineseOction.DAL;
using ChineseOction.Models;
namespace ChineseOction.BLL
{
    public class DonorService:IDonorService
    {
        private readonly IDonorDal donorDal;

        public DonorService(IDonorDal donorDal)
        {
            this.donorDal = donorDal;
        }
        public async Task<Donors> Add(Donors donor)
        {
            return await donorDal.Add(donor);

        }
        public async Task<Donors>Update(Donors donor,int id)
        {
            return await donorDal.Update(donor,id);
        }

        public async Task Delete(int id)
        {
            await donorDal.Delete(id);
        }
        public async Task<List<Donors>> GetDonors()
        {
            return await donorDal.GetDonors();
        }
        public async Task<List<Gifts>> GetGiftsByDonorID (int id)
        {
            return await donorDal.GetGiftsByDonorID(id);
        }
        public async Task<List<Donors>> GetDonorByName(string searchText)
        {
            return await donorDal.GetDonorByName(searchText);
        }
        public async Task<List<Donors>> GetDonorByMail(string searchText)
        {
            return await donorDal.GetDonorByMail(searchText);
        }
        public async Task<List<Donors>> GetDonorByGift(string searchText)
        {
            return await donorDal.GetDonorByGift(searchText);

        }

    }
}
