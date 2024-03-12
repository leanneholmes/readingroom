using Application.BookClubs;
using Application.Comments;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<BookClub, BookClub>();
            CreateMap<BookClub, BookClubDto>()
                .ForMember(d => d.OwnerUsername, o=> o.MapFrom(s => s.Members
                    .FirstOrDefault(x => x.IsOwner).AppUser.UserName));
            CreateMap<BookClubMember, MemberDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Avatar.Url));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Avatar.Url));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Avatar, o => o.MapFrom(s => s.Author.Avatar.Url));
            CreateMap<BookClubMember, UserBookClubDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.BookClub.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.BookClub.Name))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.BookClub.Category))        
                .ForMember(d => d.ReadingPace, o => o.MapFrom(s => s.BookClub.ReadingPace)); 
        }
    }
}