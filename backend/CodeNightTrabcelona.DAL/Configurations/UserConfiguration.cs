using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).ValueGeneratedOnAdd(); // GUID

            builder.Property(u => u.FullName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(150);
            
            // User - UserGoal (One-to-One)
            builder.HasOne(u => u.UserGoal)
                   .WithOne(ug => ug.User)
                   .HasForeignKey<UserGoal>(ug => ug.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // User - Group (Many-to-One)
            builder.HasOne(u => u.Group)
                   .WithMany(g => g.Members)
                   .HasForeignKey(u => u.GroupId)
                   .IsRequired(false) // A user might not have a group initially
                   .OnDelete(DeleteBehavior.SetNull);
        }
    }
}

