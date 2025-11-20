using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class DailyUsageConfiguration : IEntityTypeConfiguration<DailyUsage>
    {
        public void Configure(EntityTypeBuilder<DailyUsage> builder)
        {
            builder.HasKey(du => du.Id);
            builder.Property(du => du.InternetUsageGb).HasPrecision(18, 2);
            builder.Property(du => du.TotalCarbonEmission).HasPrecision(18, 2);

            // User - DailyUsage (One-to-Many)
            builder.HasOne(du => du.User)
                   .WithMany(u => u.DailyUsages)
                   .HasForeignKey(du => du.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

