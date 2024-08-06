using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models.DTO;
using ChineseOction.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace ChineseOction.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class CategoryController:ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;
        private readonly ILogger<CategoryController>_logger;

        public CategoryController(ICategoryService categoryService, IMapper mapper, ILogger<CategoryController> _logger)
        {
            this.categoryService = categoryService;
            this.mapper = mapper;
            this._logger = _logger;
        }
        [Authorize(Roles = "True")]
        [HttpPost]
        public async Task<ActionResult<Categorys>> Add(DtoCategorys category)
        {
            
            var newCategory = mapper.Map<Categorys>(category);
            return await categoryService.Add(newCategory);
        }
        [Authorize(Roles = "True")]
        [HttpDelete]
        public async Task Delete(int id)
        {
           await categoryService.Delete(id);
        }

        [AllowAnonymous]
        [HttpGet("GetAllCatigories")]
        public async Task<ActionResult<Categorys>> Get()
        {
            var category = await categoryService.GetCategories();
            if (category == null)
            {
                return NotFound("No category Found");
            }
            return Ok(category);
        }


    }
}
