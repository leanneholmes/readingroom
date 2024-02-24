using Application.Core;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Delete
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

            public class Handler : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var bookClub = await _context.BookClubs.FindAsync(request.Id);

                    // if (bookClub == null) return null;

                    _context.Remove(bookClub);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to delete the book club");

                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}