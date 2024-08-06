using ChineseOction.DAL;
using ChineseOction.Models;
using System.Drawing;
using System.Runtime.CompilerServices;

namespace ChineseOction.BLL
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryDal categoryDal;

        public CategoryService(ICategoryDal categoryDal)
        {
            this.categoryDal = categoryDal;
        }
        public async Task<Categorys> Add(Categorys category)
        {
            Categorys newCategory =await categoryDal.Add(category);
            return newCategory;
        }
        public async Task  Delete( int id)
        {
            await categoryDal.Delete(id);

        }
        public async Task<List<Categorys>> GetCategories()
        {
            return await categoryDal.GetCategories();   
        }

    }
}

