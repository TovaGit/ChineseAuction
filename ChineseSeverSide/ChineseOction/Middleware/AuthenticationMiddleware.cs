
using ChineseOction.Models;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.Extensions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ChineseOction.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthenticationMiddleware> _logger;

        private static IConfiguration _config;
        public AuthenticationMiddleware(RequestDelegate next, ILogger<AuthenticationMiddleware> logger, IConfiguration config)
        {
            _next = next;
           _logger = logger;
            _config = config;

        }

        public async Task InvokeAsync(HttpContext context)
        {
                var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
                var handler = new JwtSecurityTokenHandler();
                var b = context.Request.Headers["Authorization"].ToString();
                var tokenSecure = handler.ReadToken(context.Request.Headers["Authorization"]) as SecurityToken;
                var validations = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                var claims = handler.ValidateToken(context.Request.Headers["Authorization"], validations, out tokenSecure);
                var prinicpal = (ClaimsPrincipal)Thread.CurrentPrincipal;


                Users user = new Users();

                int a;
                int.TryParse(claims.Claims.FirstOrDefault(x => x.Type == "UserName")?.Value ?? "", out a);
                user.UserName = a.ToString();

                bool role;
                bool.TryParse(claims.Claims.FirstOrDefault(x => x.Type == "IsManager")?.Value ?? "", out role);
                user.IsManager = role;

                context.Items["Users"] = user;

                await _next(context);
        }

    }
}