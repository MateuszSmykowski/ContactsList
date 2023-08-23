
using ContactList.Models;
using ContactsList.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        //method returns list of categories
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _context
                .Categories
                .ToList();
        }
    }
}
