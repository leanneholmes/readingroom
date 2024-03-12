using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
  public class Seed {
    public static async Task SeedData(DataContext context,
      UserManager < AppUser > userManager) {
      if (!userManager.Users.Any() && !context.BookClubs.Any()) {
        var users = new List < AppUser > {
          new AppUser {
            DisplayName = "test", UserName = "testuser", Email = "test@test.com"
          },
          new AppUser {
            DisplayName = "Deanna", UserName = "deanna", Email = "deanna@test.com"
          },
          new AppUser {
            DisplayName = "Leanne", UserName = "leanne", Email = "leanne@test.com"
          },
          new AppUser {
            DisplayName = "Brian", UserName = "brian", Email = "brian@test.com"
          },
          new AppUser {
            DisplayName = "Set", UserName = "set", Email = "set@test.com"
          },
          new AppUser {
            DisplayName = "Aryan", UserName = "aryan", Email = "aryan@test.com"
          },
        };

        foreach(var user in users) {
          await userManager.CreateAsync(user, "Pa$$w0rd");
        }

        var bookClubs = new List < BookClub > {
          new BookClub {
            Name = "Mystery Readers",
              Description = "A club for mystery enthusiasts",
              Category = "Mystery",
              ReadingPace = "Moderate",
              NextMeeting = DateTime.UtcNow.AddMonths(1),
              MeetingLink = "www.zoomlink.com/mysteryreaders",
              CurrentBook = "The Girl with the Dragon Tattoo",
              CurrentBookAuthor = "Stieg Larsson",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[1],
                    IsOwner = true
                }
              }
          },
          new BookClub {
            Name = "Classic Literature Society",
              Description = "Exploring the world of classic literature",
              Category = "Classics",
              ReadingPace = "Slow",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/classicsociety",
              CurrentBook = "Pride and Prejudice",
              CurrentBookAuthor = "Jane Austen",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[2],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[3],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[0],
                    IsOwner = true
                },
              }
          },
          new BookClub {
            Name = "Sci-Fi Galaxy Explorers",
              Description = "Diving into the realms of science fiction",
              Category = "Sci-Fi",
              ReadingPace = "Fast",
              NextMeeting = DateTime.UtcNow.AddMonths(1),
              MeetingLink = "www.zoomlink.com/scifigalaxy",
              CurrentBook = "Dune",
              CurrentBookAuthor = "Frank Herbert",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[3],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[4],
                    IsOwner = false
                }
              }
          },
          new BookClub {
            Name = "Historical Fiction Voyage",
              Description = "Embarking on historical journeys through fiction",
              Category = "Fiction",
              ReadingPace = "Moderate",
              NextMeeting = DateTime.UtcNow.AddMonths(2),
              MeetingLink = "www.zoomlink.com/historicalvoyage",
              CurrentBook = "The Nightingale",
              CurrentBookAuthor = "Kristin Hannah",
              Members = new List < BookClubMember > {
                new BookClubMember {
                  AppUser = users[4],
                    IsOwner = true
                },
                new BookClubMember {
                  AppUser = users[5],
                    IsOwner = false
                },
                new BookClubMember {
                  AppUser = users[1],
                    IsOwner = false
                }
              }
          }
        };

        await context.BookClubs.AddRangeAsync(bookClubs);
        await context.SaveChangesAsync();
      }
    }
  }
}