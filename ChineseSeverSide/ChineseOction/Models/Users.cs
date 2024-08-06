using System.ComponentModel.DataAnnotations;
namespace ChineseOction.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }
        public string Pwd { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        
        public string Email { get; set; }
        public bool IsManager { get; set; }
        public Users()
        {
            IsManager = false;
        }

    }
}
