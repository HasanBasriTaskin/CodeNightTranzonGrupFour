using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.Concrete;
using CodeNightTrabcelona.BusinessLayer.Mappings;
using CodeNightTrabcelona.BusinessLayer.Security;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace CodeNightTrabcelona.BusinessLayer
{
    public static class ServiceRegistration
    {
        public static void AddBusinessServices(this IServiceCollection services)
        {
            // AutoMapper
            services.AddAutoMapper(typeof(MappingProfile));

            // HTTP Client
            services.AddHttpClient();

            // FluentValidation
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            // Security Services
            services.AddScoped<TokenHandler>();

            // Business Services
            services.AddScoped<IAuthService, AuthManager>();
            services.AddScoped<IUserService, UserManager>();
            services.AddScoped<IDailyUsageService, DailyUsageManager>();
            services.AddScoped<IGroupService, GroupManager>();
            services.AddScoped<IRecommendationService, RecommendationManager>();
            services.AddScoped<IBadgeService, BadgeManager>();
            services.AddScoped<IGreenTokenService, GreenTokenManager>();
            services.AddScoped<IUserGoalService, UserGoalManager>();
            services.AddScoped<IDataImportService, DataImportManager>();
            services.AddScoped<IAiService, AiManager>();
        }
    }
}
