using Domain;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Details
    {
        public class Query : IRequest<BookClub>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BookClub>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<BookClub> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BookClubs.FindAsync(request.Id);
            }
        }
    }
}