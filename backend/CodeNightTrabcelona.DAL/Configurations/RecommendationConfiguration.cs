using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class RecommendationConfiguration : IEntityTypeConfiguration<Recommendation>
    {
        public void Configure(EntityTypeBuilder<Recommendation> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Id).ValueGeneratedOnAdd();

            builder.Property(r => r.Message).IsRequired().HasMaxLength(500);
            builder.Property(r => r.ImpactPotentialSaving).HasPrecision(18, 2);
            
            // Enum conversions (stored as int by default, can be string if preferred)
            builder.Property(r => r.Category).HasConversion<int>();
            builder.Property(r => r.Source).HasConversion<int>();

            // User - Recommendation (One-to-Many)
            builder.HasOne(r => r.User)
                   .WithMany(u => u.Recommendations)
                   .HasForeignKey(r => r.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

