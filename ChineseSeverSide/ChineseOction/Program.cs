using Microsoft.EntityFrameworkCore;
//using ChineseOction.BLL;
using ChineseOction.DAL;
using AutoMapper;
using ChineseOction.BLL;
using ChineseOction;
using ChineseOction.Models.DTO;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using ChineseOction.Middleware;
using ChineseOction.Models;
using System;


var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ChineseCondex>(c => c.UseSqlServer("your connection string"));
builder.Services.AddScoped<IUserDal, UserDal>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDonorService, DonorService>();
builder.Services.AddScoped<IDonorDal, DonorDal>();
builder.Services.AddScoped<IGiftService, GiftService>();
builder.Services.AddScoped<IGiftDal, GiftDal>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryDal, CategoryDal>();
builder.Services.AddScoped<IPurchasesService, PurchasesService>();
builder.Services.AddScoped<IPurchasesDal, PurchasesDal>();
builder.Services.AddScoped<IWinnersService, WinnersService>();
builder.Services.AddScoped<IWinnersDal, WinnersDal>();
builder.Services.AddScoped<IEmailSenderService, EmailSenderService>();
builder.Services.AddScoped<ILoginService, LoginServer>();
builder.Services.AddScoped<ILoginDal, LoginDal>();


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Logging.AddConsole();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "development web site")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
      
    };
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(IdentityData.AdminUserPolicyName,
        p =>
        {
            p.RequireClaim(IdentityData.AdminUserClaimName, "true");
        });
});
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });

    c.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddMvc();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000",
                            "development web site")
               .AllowAnyHeader()
               .AllowAnyMethod();
        });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();
app.UseWhen(
    context =>
         !context.Request.Path.StartsWithSegments("/api/Login")&&
         !context.Request.Path.StartsWithSegments("/Users")&&
         !context.Request.Path.StartsWithSegments("/GetUserIdByEmail") &&
         !context.Request.Path.StartsWithSegments("/Purchases/Update") &&
         !context.Request.Path.StartsWithSegments("/Purchases/Delete") &&
         !context.Request.Path.StartsWithSegments("/Purchases/UpdateMinus") &&
         !context.Request.Path.StartsWithSegments("/Purchases/CheckOut") &&
         !context.Request.Path.StartsWithSegments("/Category/GetAllCatigories") &&
         !context.Request.Path.StartsWithSegments("/Gift") &&
         !context.Request.Path.StartsWithSegments("/GetGiftsByName") &&
         !context.Request.Path.StartsWithSegments("/GetGiftsByCategory") &&
         !context.Request.Path.StartsWithSegments("/SortByPriceLowToHigh") &&
         !context.Request.Path.StartsWithSegments("/SortByPriceHighToLow")&&
         !context.Request.Path.StartsWithSegments("/SendEmail")&&
         !context.Request.Path.StartsWithSegments("/Purchases/Add") &&
         !context.Request.Path.StartsWithSegments("/Purchases/Update")&&
         !context.Request.Path.StartsWithSegments("/Purchases/GetPuchasesByUserId")&&
         !context.Request.Path.StartsWithSegments("/Purchases/CheckIfProductIsInCart")&&
         !context.Request.Path.StartsWithSegments("/Purchases/TotalPaymentInCartForUser")&&
         !context.Request.Path.StartsWithSegments("/Reffle/AllWinners"),





    orderApp =>

    {
        orderApp.Use(async (context, next) =>
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var authorizationHeader = context.Request.Headers["Authorization"].ToString();
                if (authorizationHeader.StartsWith("Bearer "))
                {
                    context.Request.Headers["Authorization"] = authorizationHeader.Substring("Bearer ".Length);
                }
            }

            await next();
        });
       orderApp.UseMiddleware<ChineseOction.Middleware.AuthenticationMiddleware>();
    });


app.Run();
