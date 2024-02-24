using Domain;
using FluentValidation;

namespace Application.BookClubs
{
    public class BookClubValidator : AbstractValidator<BookClub>
    {
        public BookClubValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.ReadingPace).NotEmpty();
            RuleFor(x => x.NextMeeting).NotEmpty();
            RuleFor(x => x.MeetingLink).NotEmpty();
            RuleFor(x => x.CurrentBook).NotEmpty();
            RuleFor(x => x.CurrentBookAuthor).NotEmpty();
        }
    }
}