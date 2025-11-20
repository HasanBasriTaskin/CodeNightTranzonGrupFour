using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CodeNightTrabcelona.DAL.Configurations
{
    public class GreenTokenTransactionConfiguration : IEntityTypeConfiguration<GreenTokenTransaction>
    {
        public void Configure(EntityTypeBuilder<GreenTokenTransaction> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedOnAdd();

            builder.Property(t => t.Amount).HasPrecision(18, 2);
            builder.Property(t => t.Reason).HasMaxLength(255);

            // User - Transaction (One-to-Many)
            builder.HasOne(t => t.User)
                   .WithMany(u => u.Transactions)
                   .HasForeignKey(t => t.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

