using Microsoft.AspNetCore.Authentication;
using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models.DTO
{
    public class DtoSendEmail
    {
        public string Email { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

    }
}
