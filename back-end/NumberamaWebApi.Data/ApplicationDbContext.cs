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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<AccessToken> AccessTokens { get; set; }
    }
}
