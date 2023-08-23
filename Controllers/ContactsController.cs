
using ContactList.Models;
using ContactsList.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //method returns all contacts list
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _context
                .Contacts
                .Include(c => c.Category)
                .Include(c => c.Subcategory)
                .ToList();
        }

        //method returns one contact from list specified by id number
        [HttpGet]
        [Route("{contactId}")]
        public Contact Get(int contactId)
        {
            return _context.Contacts
              .Include(c => c.Category)
              .Include(c => c.Subcategory)
              .SingleOrDefault(x => x.Id == contactId);
        }

        //method deletes contact specified by id number
        [Authorize]
        [HttpDelete]
        [Route("{contactId}")]
        public void Delete(int contactId)
        {
            var contact = _context.Contacts.Find(contactId);
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
        }

        //method adds new contact to database based on datas from form on frontend side
        [Authorize]
        [HttpPost]
        [Route("create")]
        public void Create(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
        }

        //method deletes contact specified by id number
        [Authorize]
        [HttpPut]
        [Route("update")]
        public void Update(Contact contact)
        {
            _context.Contacts.Update(contact);
            _context.SaveChanges();
        }
    }
}
