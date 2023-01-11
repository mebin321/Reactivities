using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        //If we have mediator available for whatever reason then we  are gonna use that otherwise we will
        //get the mediator service and use it instead.
        private IMediator _mediator;

        //=> Means we are gonna return from this
        //(??) means, If _mediator is null, assign what is on the right.
        protected IMediator Mediator => _mediator ??=
         HttpContext.RequestServices.GetService<IMediator>();
    }
}