
using ContactList.Models;
using ContactsList.Data;
using ContactsList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubcategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubcategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        //method returns list of subcategories 
        [HttpGet]
        public IEnumerable<Subcategory> Get()
        {
            return _context
                .SubCategories
                .Include(sc => sc.Category)
                .ToList();
        }

        //method adds new subcategory to database based on input on frontend side
        [Authorize]
        [HttpPost]
        [Route("create")]
        public void Create(Subcategory subcategory)
        {
            _context.SubCategories.Add(subcategory);
            _context.SaveChanges();
        }
    }
}
