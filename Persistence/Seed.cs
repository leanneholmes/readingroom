using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Admin", UserName = "admin", Email = "admin@test.com"},
                    new AppUser{DisplayName = "Leanne", UserName = "leanne", Email = "leanne@test.com"},
                    new AppUser{DisplayName = "Deanna", UserName = "admin", Email = "deanna@test.com"},
                    new AppUser{DisplayName = "Set", UserName = "admin", Email = "set@test.com"},
                    new AppUser{DisplayName = "Brian", UserName = "admin", Email = "brian@test.com"},
                    new AppUser{DisplayName = "Aryan", UserName = "admin", Email = "aryan@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.BookClubs.Any()) return;
            
            var BookClubs = new List<BookClub>
            {
            new BookClub
            {
                Name = "Mystery Readers",
                Description = "A club for mystery enthusiasts",
                Category = "Mystery",
                ReadingPace = "Moderate",
                NextMeeting = DateTime.UtcNow.AddMonths(1),
                MeetingLink = "www.zoomlink.com/mysteryreaders",
                CurrentBook = "The Girl with the Dragon Tattoo",
                CurrentBookAuthor = "Stieg Larsson"
            },
            new BookClub
            {
                Name = "Classic Literature Society",
                Description = "Exploring the world of classic literature",
                Category = "Classic",
                ReadingPace = "Slow",
                NextMeeting = DateTime.UtcNow.AddMonths(2),
                MeetingLink = "www.zoomlink.com/classicsociety",
                CurrentBook = "Pride and Prejudice",
                CurrentBookAuthor = "Jane Austen"
            },
            new BookClub
            {
                Name = "Sci-Fi Galaxy Explorers",
                Description = "Diving into the realms of science fiction",
                Category = "Science Fiction",
                ReadingPace = "Fast",
                NextMeeting = DateTime.UtcNow.AddMonths(1),
                MeetingLink = "www.zoomlink.com/scifigalaxy",
                CurrentBook = "Dune",
                CurrentBookAuthor = "Frank Herbert"
            },
            new BookClub
            {
                Name = "Historical Fiction Voyage",
                Description = "Embarking on historical journeys through fiction",
                Category = "Historical Fiction",
                ReadingPace = "Moderate",
                NextMeeting = DateTime.UtcNow.AddMonths(2),
                MeetingLink = "www.zoomlink.com/historicalvoyage",
                CurrentBook = "The Nightingale",
                CurrentBookAuthor = "Kristin Hannah"
            }
            };

            await context.BookClubs.AddRangeAsync(BookClubs);
            await context.SaveChangesAsync();
        }
    }
}