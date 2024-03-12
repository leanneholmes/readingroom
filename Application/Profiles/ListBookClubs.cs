using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListBookClubs
    {
        public class Query : IRequest<Result<List<UserBookClubDto>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserBookClubDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserBookClubDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.BookClubMembers
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.BookClub.Name)
                    .ProjectTo<UserBookClubDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var bookClubs = await query.ToListAsync();

                return Result<List<UserBookClubDto>>.Success(bookClubs);
            }
        }
    }
}