using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Details
    {
        public class Query : IRequest<Result<BookClub>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BookClub>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<BookClub>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookClub = await _context.BookClubs.FindAsync(request.Id);

                return Result<BookClub>.Success(bookClub);
            }
        }
    }
}