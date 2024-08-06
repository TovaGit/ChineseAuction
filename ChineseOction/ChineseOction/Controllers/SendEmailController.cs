using AutoMapper;
using ChineseOction.BLL;
using ChineseOction.Models.DTO;
using ChineseOction.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChineseOction.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SendEmailController : Controller
    {

        private readonly ILogger<SendEmailController> _logger;

        private readonly IEmailSenderService emailSevice;
        public SendEmailController(IEmailSenderService email, ILogger<SendEmailController> logger)
        {

            emailSevice = email;
            _logger = logger;
        }
        [AllowAnonymous]
        [HttpPost()]
        public async Task<ActionResult> SendEmail(DtoSendEmail dtoSendEmail)
        {
            try
            {
                _logger.LogInformation("Sending email to {email} with subject {subject}", dtoSendEmail.Email, dtoSendEmail.Subject);

                await emailSevice.SendEmail(dtoSendEmail);
                return Ok(); 
            }
            catch (Exception ex)
            {
                _logger.LogError("Error sending email: {message}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
