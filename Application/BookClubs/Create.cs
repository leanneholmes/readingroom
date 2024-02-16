using Domain;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Create
    {
        public class Command : IRequest
        {
            public BookClub BookClub { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.BookClubs.Add(request.BookClub);

                await _context.SaveChangesAsync();
            }
        }
    }
}