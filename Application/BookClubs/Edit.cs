using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Edit
    {
        public class Command: IRequest
        {
            public BookClub BookClub { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var bookClub = await _context.BookClubs.FindAsync(request.BookClub.Id);

                _mapper.Map(request.BookClub, bookClub);

                await _context.SaveChangesAsync();
            }
        }
    }
}