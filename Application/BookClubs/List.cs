using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class List
    {
        public class Query : IRequest<Result<List<BookClub>>> {}

        public class Handler : IRequestHandler<Query, Result<List<BookClub>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<BookClub>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<BookClub>>.Success(await _context.BookClubs.ToListAsync());
            }
        }
    }
}