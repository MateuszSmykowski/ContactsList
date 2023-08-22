using System.ComponentModel.DataAnnotations;

namespace ContactList.Models
{
    public class Subcategory
    {
        [Key]
        public int Id { get; set; }

        public string SubcategoryName { get; set; }

        public Category Category { get; set; }

        public int CategoryId { get; set; }
    }
}