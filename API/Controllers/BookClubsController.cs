using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BookClubsController : BaseApiController
    {
        private readonly DataContext _context;
        public BookClubsController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] //api/bookclubs
        public async Task<ActionResult<List<BookClub>>> GetBookClubs()
        {
            return await _context.BookClubs.ToListAsync();
        }

        [HttpGet("{id}")] //api/bookclubs/id
        public async Task<ActionResult<BookClub>> GetBookClub(Guid id)
        {
            return await _context.BookClubs.FindAsync(id);
        }
    }
}