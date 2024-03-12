namespace Domain
{
    public class BookClubMember
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid BookClubId { get; set; }
        public BookClub BookClub { get; set; }
        public bool IsOwner { get; set; }
    }
}