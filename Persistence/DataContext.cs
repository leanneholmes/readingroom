using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        // This will represent the table in our SQL database
        public DbSet<BookClub> BookClubs { get; set; }
    }
}