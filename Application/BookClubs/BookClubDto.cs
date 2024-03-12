using Application.Profiles;

namespace Application.BookClubs
{
    public class BookClubDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string ReadingPace { get; set; }

        public DateTime NextMeeting { get; set; }

        public string MeetingLink { get; set; }

        public string CurrentBook { get; set; }

        public string CurrentBookAuthor { get; set; }

        public string OwnerUsername { get; set; }

        public ICollection<MemberDto> Members { get; set; }
    }
}