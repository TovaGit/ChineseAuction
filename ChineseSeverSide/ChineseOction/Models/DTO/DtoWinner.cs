using System.Net;
using System.Net.Mail;

namespace ChineseOction.Models.DTO
{
    public class DtoWinner
    {
       public string WinningGift { get; set; }
       public  int WinningNumber { get; set; }
       public  string FullName { get; set; }
       public  string Email { get; set; }
        
       public  string Phone { get; set; }
    }
}


