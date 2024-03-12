using Application.Core;

namespace Application.BookClubs
{
    public class BookClubParams : PagingParams
    {
        public bool IsMember { get; set; }
        public bool IsOwner { get; set; }
        public string Category { get; set; }
        public string ReadingPace { get; set; }
    }
}