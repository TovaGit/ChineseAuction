using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models
{
    public class Winners
    {
        [Key]
        public int WinningNumber { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; }

        public int GiftId { get; set; }
        public Gifts Gift { get; set; }
    }
}
