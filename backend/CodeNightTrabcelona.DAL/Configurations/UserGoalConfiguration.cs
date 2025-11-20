using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class UserGoalConfiguration : IEntityTypeConfiguration<UserGoal>
    {
        public void Configure(EntityTypeBuilder<UserGoal> builder)
        {
            builder.HasKey(ug => ug.Id);
            builder.Property(ug => ug.Id).ValueGeneratedOnAdd();

            // Default values for goals can be set here if needed, but usually handled in business logic
            builder.Property(ug => ug.DailyInternetGoalGb).HasPrecision(18, 2);
            builder.Property(ug => ug.DailyGameGoalHours).HasPrecision(18, 2);
        }
    }
}

