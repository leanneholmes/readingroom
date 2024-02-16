using Application.BookClubs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookClubsController : BaseApiController
    {
        [HttpGet] //api/bookclubs
        public async Task<ActionResult<List<BookClub>>> GetBookClubs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/bookclubs/id
        public async Task<ActionResult<BookClub>> GetBookClub(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookClub(BookClub bookClub)
        {
            await Mediator.Send(new Create.Command {BookClub = bookClub});
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBookClub(Guid id, BookClub bookClub)
        {
            bookClub.Id = id;
            await Mediator.Send(new Edit.Command{BookClub = bookClub});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookClub(Guid id)
        {
            await Mediator.Send(new Delete.Command {Id = id});
            return Ok();
        }
    }
}