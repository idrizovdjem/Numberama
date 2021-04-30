using Microsoft.EntityFrameworkCore;

using NumberamaWebApi.Data.Models;

namespace NumberamaWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<GameResult> GameResults { get; set; }

        public DbSet<AccessToken> AccessTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameResult>(entity =>
            {
                entity
                    .HasOne(gr => gr.User)
                    .WithMany(u => u.Results)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
