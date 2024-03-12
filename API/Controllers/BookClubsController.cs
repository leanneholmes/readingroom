using Application.BookClubs;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookClubsController : BaseApiController
    {
        [HttpGet] //api/bookclubs
        public async Task<IActionResult> GetBookClubs([FromQuery]BookClubParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
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

        [Authorize(Policy = "IsBookClubOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBookClub(Guid id, BookClub bookClub)
        {
            bookClub.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{BookClub = bookClub}));
        }

        [Authorize(Policy = "IsBookClubOwner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookClub(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [HttpPost("{id}/join")]
        public async Task<IActionResult> Join(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateMembership.Command{Id = id}));
        }
    }
}