
using ContactList.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        //[HttpGet]
        //public IEnumerable<Contact> Get()
        //{
        //    return _context
        //        .Contacts
        //        .Include(c => c.Category)
        //        .Include(c => c.Subcategory)
        //        .ToList();
        //}
    }
}
