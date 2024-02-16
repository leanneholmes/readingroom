using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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