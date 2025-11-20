using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasKey(g => g.Id);
            builder.Property(g => g.Id).ValueGeneratedOnAdd();

            builder.Property(g => g.Name).IsRequired().HasMaxLength(100);
            builder.Property(g => g.AverageEmission).HasPrecision(18, 2);

            // Group - User (One-to-Many)
            // Relationship is already defined in UserConfiguration, but explicit definition here is fine too
            builder.HasMany(g => g.Members)
                   .WithOne(u => u.Group)
                   .HasForeignKey(u => u.GroupId)
                   .OnDelete(DeleteBehavior.SetNull);
        }
    }
}

