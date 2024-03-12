using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BookClubs
{
    public class Details
    {
        public class Query : IRequest<Result<BookClubDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BookClubDto>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<BookClubDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bookClub = await _context.BookClubs
                    .ProjectTo<BookClubDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<BookClubDto>.Success(bookClub);
            }
        }
    }
}