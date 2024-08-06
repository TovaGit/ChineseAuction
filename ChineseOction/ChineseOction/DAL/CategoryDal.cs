using ChineseOction.Controllers;
using ChineseOction.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace ChineseOction.DAL
{
    public class CategoryDal : ICategoryDal
    {

        private readonly ChineseCondex chineseCondex;
        private readonly ILogger<CategoryDal> _logger;

        public CategoryDal(ChineseCondex chineseCondex, ILogger<CategoryDal> _logger)
        {
            this.chineseCondex = chineseCondex;
            this._logger = _logger;

        }
        public async Task<Categorys> Add(Categorys category)
        {
            try
            {
                  await chineseCondex.Categorys.AddAsync(category);
                 chineseCondex.SaveChanges();
                return category;

            }
            catch 
            {
                _logger.LogInformation("error Add Categorys");
                return null;
            }
        }


        public async Task Delete(int id)
        {
            try
            {
                Categorys category = await chineseCondex.Categorys.FirstOrDefaultAsync(d => d.CategoryId == id);
                chineseCondex.Categorys.Remove(category);
                chineseCondex.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error Delete Categorys");

            }


        }

        public async Task<List<Categorys>> GetCategories()
        {
            try
            {
                return await chineseCondex.Categorys.Select(x => x).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogInformation("error  GetCategories");
                return null;
            }
        }

    }
}
