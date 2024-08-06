using ChineseOction.Models.DTO;

namespace ChineseOction.BLL
{
    public interface IEmailSenderService
    {
        public Task SendEmail(DtoSendEmail dtoSendEmail);

    }
}
