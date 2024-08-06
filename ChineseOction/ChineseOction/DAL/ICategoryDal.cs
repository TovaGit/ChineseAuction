using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace ChineseOction.DAL
{
    public interface ICategoryDal
    {
        public Task<Categorys> Add(Categorys category);
        public Task Delete(int id);

        public Task<List<Categorys>> GetCategories();

    }
}
