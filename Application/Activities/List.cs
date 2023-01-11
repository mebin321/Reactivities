using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // If we wanted to pass any parameter, put them down as properties.
        public class Query : IRequest<List<Activity>> { }

        //2nd argument is the list that will be returned
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
           
            public Handler(DataContext context)
            {
                _context = context;
            }
            // Query forms a request in our handler  & returns the data we are looking for specified in IRequesthandler interface's
            // 2nd argument
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}