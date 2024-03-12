using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //MediatR Unit means not returning anything
        {
            public BookClub BookClub { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BookClub).SetValidator(new BookClubValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
            _userAccessor = userAccessor;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var member = new BookClubMember
                {
                    AppUser = user,
                    BookClub = request.BookClub,
                    IsOwner = true,
                };

                request.BookClub.Members.Add(member);

                _context.BookClubs.Add(request.BookClub);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failred to create book club");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}