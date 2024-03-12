using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        // This will represent the table in our SQL database
        public DbSet<BookClub> BookClubs { get; set; }
        public DbSet<BookClubMember> BookClubMembers { get; set; }
        public DbSet<Photo> Photos { get; set;}
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BookClubMember>(x => x.HasKey(aa => new {aa.AppUserId, aa.BookClubId}));

            builder.Entity<BookClubMember>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.BookClubs)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<BookClubMember>()
                .HasOne(u => u.BookClub)
                .WithMany(a => a.Members)
                .HasForeignKey(aa => aa.BookClubId);

            builder.Entity<Comment>()
                .HasOne(a => a.BookClub)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade); // Deleting a book club will delete all comments
        }
    }
}