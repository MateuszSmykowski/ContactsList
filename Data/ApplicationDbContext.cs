using ContactList.Models;
using ContactsList.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ContactsList.Data
{
    //class that connects application with database, it sets the tables in database based on models
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> SubCategories { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var rng = new Random();

            var categories = new[]
            {
                new { Id = 1, CategoryName = "Business" },
                new { Id = 2, CategoryName = "Private" },
                new { Id = 3, CategoryName = "Other" }
            };

            modelBuilder.Entity<Category>().HasData(categories);
        }
    }
}