using Application.BookClubs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookClubsController : BaseApiController
    {
        [HttpGet] //api/bookclubs
        public async Task<IActionResult> GetBookClubs()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/bookclubs/id
        public async Task<IActionResult> GetBookClub(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookClub(BookClub bookClub)
        {
            return HandleResult(await Mediator.Send(new Create.Command {BookClub = bookClub}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBookClub(Guid id, BookClub bookClub)
        {
            bookClub.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{BookClub = bookClub}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookClub(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}