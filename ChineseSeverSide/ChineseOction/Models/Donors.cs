using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models
{
    public class Donors
    {
        [Key]
        public int DonorId { get; set; }

        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public IEnumerable<Gifts>? Gifts { get; set; }
    }
}
