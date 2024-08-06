using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models.DTO
{
    public class DtoUser
    {
        
        public string UserName { get; set; }
        public string Pwd { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Phone { get; set; }

        public string Email { get; set; }
     


    }
}
