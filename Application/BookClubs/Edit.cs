using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.BookClubs
{
    public class Edit
    {
        public class Command: IRequest<Result<Unit>>
        {
            public BookClub BookClub { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BookClub).SetValidator(new BookClubValidator());
            }
        }        

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var bookClub = await _context.BookClubs.FindAsync(request.BookClub.Id);

                if (bookClub == null) return null;

                _mapper.Map(request.BookClub, bookClub);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update book club");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}