using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.DTOs.AuthDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.BadgeDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.RecommendationDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.TransactionDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using CodeNightTrabcelona.BusinessLayer.DTOs.UserDtos;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.BusinessLayer.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // --- User Mappings ---
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.GroupName, opt => opt.MapFrom(src => src.Group != null ? src.Group.Name : null));
            
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserDashboardDto>();

            // --- Daily Usage Mappings ---
            CreateMap<DailyUsage, DailyUsageDto>().ReverseMap();
            CreateMap<CreateDailyUsageDto, DailyUsage>();

            // --- Group Mappings ---
            CreateMap<Group, GroupDto>().ReverseMap();
            CreateMap<CreateGroupDto, Group>();

            // --- Recommendation Mappings ---
            CreateMap<Recommendation, RecommendationDto>().ReverseMap();

            // --- Badge Mappings ---
            CreateMap<Badge, BadgeDto>()
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => $"/assets/badges/{src.BadgeType.ToString().ToLower()}_{src.Level.ToString().ToLower()}.png")); 
                // Örn: /assets/badges/greenhero_gold.png gibi basit bir path atadık.

            // --- Transaction Mappings ---
            CreateMap<GreenTokenTransaction, GreenTokenTransactionDto>().ReverseMap();

            // --- Goal Mappings ---
            CreateMap<UserGoal, UserGoalDto>().ReverseMap();
            CreateMap<UpdateUserGoalDto, UserGoal>();
        }
    }
}
