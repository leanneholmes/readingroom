using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<BookClubDto>>> 
        {
            public BookClubParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BookClubDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<PagedList<BookClubDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.BookClubs
                    .OrderBy(d => d.Name)
                    .ProjectTo<BookClubDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                if (request.Params.IsMember && !request.Params.IsMember)
                {
                    query = query.Where(x => x.Members.Any(a => a.Username == _userAccessor.GetUsername()));
                }

                if (request.Params.IsOwner && !request.Params.IsMember)
                {
                    query = query.Where(x => x.OwnerUsername == _userAccessor.GetUsername());
                }

                if (!string.IsNullOrEmpty(request.Params.Category))
                {
                    query = query.Where(x => x.Category == request.Params.Category);
                }

                if (!string.IsNullOrEmpty(request.Params.ReadingPace))
                {
                    query = query.Where(x => x.ReadingPace == request.Params.ReadingPace);
                }

                return Result<PagedList<BookClubDto>>.Success(
                    await PagedList<BookClubDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}