
using ContactList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return new Contact[1]
            {
                new Contact { 
                    Id = 1, 
                    FirstName = "nn", 
                    LastName = "gg", 
                    CategoryId = 1,
                    SubcategoryId = 3,
                    Email = "test@wp.pl",
                    PhoneNumber = "123123123",
                    DateOfBirth = DateTime.Now,
                }
            };
        }
    }
}
