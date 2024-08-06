using ChineseOction.DAL;
using ChineseOction.Models.DTO;
using System.Net.Mail;
using System.Net;

namespace ChineseOction.BLL
{
    public class EmailSenderService:IEmailSenderService
    {
       private readonly ILogger<EmailSenderService> _logger;
        

        public EmailSenderService(ILogger<EmailSenderService> _logger)
        {
            this._logger = _logger;

        }
        public async Task  SendEmail(DtoSendEmail dtoSendEmail)
        {
            var mail = "yourMail";
            var pwd = "yourPwd";

            var client = new SmtpClient("smtp.office365.com", 587)
            {
                UseDefaultCredentials = false,
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pwd)
            };
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("37326082690@mby.co.il", "A LotOf ChineeseAuction");
                mailMessage.To.Add(dtoSendEmail.Email);
                mailMessage.Subject = dtoSendEmail.Subject;
                mailMessage.Body = dtoSendEmail.Message;

                await client.SendMailAsync(mailMessage);

            }
            catch
            {
                _logger.LogInformation("error SendEmail");

            }
            
        }

    }
}
