using CodeNightTrabcelona.EntityLayer.Concrete;
using Microsoft.EntityFrameworkCore;

namespace CodeNightTrabcelona.DAL.Concrete
{
    public class CodeNightConnectContext : DbContext
    {
        public CodeNightConnectContext(DbContextOptions<CodeNightConnectContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserGoal> UserGoals { get; set; }
        public DbSet<DailyUsage> DailyUsages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<GreenTokenTransaction> GreenTokenTransactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Apply all configurations from the current assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CodeNightConnectContext).Assembly);
            
            base.OnModelCreating(modelBuilder);
        }
    }
}

