using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        // Command is used since it will not return anything
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        // 2nd parameter empty since it won't return anything
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Here async version of add is not used since it's not saved 
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                //this is informing the api controller thta task is finished
                return Unit.Value;

            }
        }
    }
}