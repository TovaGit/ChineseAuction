using System.Collections;
using System.ComponentModel.DataAnnotations;
namespace ChineseOction.Models
{
    public class Purchases
    {
        [Key]
        public int PurchaseNumber { get; set; }
        public int UserId { get; set; }
        public IEnumerable<Users> User { get; set; }
        public int GiftId { get; set; }
        public IEnumerable<Gifts> Gift { get; set; }
        public DateTime Date { get; set; }
        public bool Status { get; set; }
        public int AmountOfTickets { get; set; }


        public Purchases()
        {
            Status = false;
            Date = DateTime.Now;
        }


    }
}
