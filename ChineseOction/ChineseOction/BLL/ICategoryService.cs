using ChineseOction.Models;
namespace ChineseOction.BLL
{
    public interface ICategoryService
    {
        public Task<Categorys> Add(Categorys category);
        public Task Delete( int id);

        public Task<List<Categorys>> GetCategories();


    }
}
