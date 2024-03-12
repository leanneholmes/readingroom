using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class UpdateMembership
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var bookClub = await _context.BookClubs
                    .Include(a => a.Members).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (bookClub == null) return null; 

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var ownerUsername = bookClub.Members.FirstOrDefault(x => x.IsOwner)?.AppUser?.UserName;

                var membership = bookClub.Members.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // if (membership != null && ownerUsername == user.UserName)
                // {
                //     _context.Remove(bookClub);

                //     var deleteResult = await _context.SaveChangesAsync() > 0;

                //     if (!deleteResult) return Result<Unit>.Failure("Failed to delete the book club");

                //     return Result<Unit>.Success(Unit.Value);                    
                // }

                if (membership != null && ownerUsername != user.UserName)
                    bookClub.Members.Remove(membership);

                if (membership == null)
                {
                    membership = new BookClubMember
                    {
                        AppUser = user,
                        BookClub = bookClub,
                        IsOwner = false
                    };

                    bookClub.Members.Add(membership);
                }

                var result = await _context.SaveChangesAsync() > 0; 

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating club membership");
            }
        }
    }
}