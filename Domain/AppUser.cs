using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<BookClubMember> BookClubs { get; set; }
        public Photo Avatar { get; set;}
    }
}