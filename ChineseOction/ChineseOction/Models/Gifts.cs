using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChineseOction.Models
{
    public class Gifts
    {    
        [Key]
        public int GiftId { get; set; }
        public string Name { get; set; }
        public int DonorId { get; set; }
        public Donors Donor { get; set; }
        public int CategoryId { get; set; }
        public Categorys Category { get; set; }
        public int Price { get; set; }

    }
}
