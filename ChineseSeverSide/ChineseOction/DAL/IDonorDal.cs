﻿using ChineseOction.Models;
using System.Drawing;

namespace ChineseOction.DAL
{
    public interface IDonorDal
    {
        public Task<Donors> Add(Donors donor);

        public Task<Donors> Update(Donors donor,int id);

        public Task Delete(int id);

        public  Task<List<Donors>> GetDonors();
        public Task<List<Gifts>> GetGiftsByDonorID(int id);

        public Task<List<Donors>> GetDonorByName(string searchText);

        public Task<List<Donors>> GetDonorByMail(string searchText);
        public Task<List<Donors>> GetDonorByGift(string searchText);

    }
}
