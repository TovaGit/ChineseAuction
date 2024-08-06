using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models
{
    public class Categorys
    {
        [Key]
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public IEnumerable<Gifts>? Gifts { get; set; }


    }
}