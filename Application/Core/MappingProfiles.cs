using AutoMapper;
using Domain;

namespace Application.Core
{
    //This class can be used for mapping purpose for the Application Project
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}