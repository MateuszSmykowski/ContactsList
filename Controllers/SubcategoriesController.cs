
using ContactList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubcategoriesController : ControllerBase
    {
        //[HttpGet]
        //public IEnumerable<Subcategory> Get()
        //{
        //    return _context
        //        .SubCategories
        //        .Include(sc => sc.Category)
        //        .ToList();
        //}
    }
}
