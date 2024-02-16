using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class List
    {
        public class Query : IRequest<List<BookClub>> {}

        public class Handler : IRequestHandler<Query, List<BookClub>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<BookClub>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BookClubs.ToListAsync();
            }
        }
    }
}