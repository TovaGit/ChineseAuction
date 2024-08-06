using AutoMapper;

namespace ChineseOction.Models.DTO
{
    public class ProfileChinese : Profile
    {
        public ProfileChinese()
        {
            CreateMap<DtoUser, Users>()
                .ForMember(us => us.FullName, i => i.MapFrom(o => o.FirstName + " " + o.LastName));
            CreateMap<DtoDonors, Donors>()
               .ForMember(us => us.FullName, i => i.MapFrom(o => o.FirstName + " " + o.LastName));
            CreateMap<DtoCategorys, Categorys>();
            CreateMap<DtoGifts, Gifts>();
            CreateMap<DtoPurchases, Purchases>();
        }
    }
}