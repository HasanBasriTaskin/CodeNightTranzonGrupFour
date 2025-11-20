using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using FluentValidation;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class GroupManager : IGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateGroupDto> _validator;

        public GroupManager(IUnitOfWork unitOfWork, IMapper mapper, IValidator<CreateGroupDto> validator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<NoContentDto>> CreateGroupAsync(CreateGroupDto createDto, Guid creatorUserId)
        {
            // 1. Validasyon
            var validationResult = await _validator.ValidateAsync(createDto);
            if (!validationResult.IsValid)
            {
                return Response<NoContentDto>.Fail(400, validationResult.Errors.Select(x => x.ErrorMessage).ToList());
            }

            // 2. Kullanıcıyı bul (Zaten bir grubu varsa hata verebiliriz veya grup değiştirebilir)
            var creator = await _unitOfWork.Users.GetByIDAsync(creatorUserId);
            if (creator == null) return Response<NoContentDto>.Fail(404, "Kullanıcı bulunamadı.");
            
            if (creator.GroupId != null)
            {
                return Response<NoContentDto>.Fail(400, "Zaten bir gruba üyesiniz.");
            }

            // 3. Grubu oluştur
            var group = _mapper.Map<Group>(createDto);
            group.MemberCount = 1;
            group.AverageEmission = 0; // Yeni grup

            await _unitOfWork.Groups.InsertAsync(group);
            
            // 4. Kullanıcıyı gruba ekle
            // EF Core, SaveChanges çağrıldığında group.Id'yi oluşturmuş olacak.
            // Ancak UnitOfWork yapısında ID'nin oluşması için önce grubu kaydetmemiz gerekebilir.
            // Transaction içinde olduğumuz için sorun yok.
            await _unitOfWork.SaveAsync(); 

            creator.GroupId = group.Id;
            _unitOfWork.Users.Update(creator);
            await _unitOfWork.SaveAsync();

            return Response<NoContentDto>.Success(201);
        }

        public async Task<Response<GroupDto>> GetGroupDetailsAsync(Guid groupId)
        {
            var group = await _unitOfWork.Groups.GetGroupWithMembersAsync(groupId);
            if (group == null) return Response<GroupDto>.Fail(404, "Grup bulunamadı.");

            var dto = _mapper.Map<GroupDto>(group);
            return Response<GroupDto>.Success(200, dto);
        }

        public async Task<Response<List<GroupDto>>> GetLeaderboardAsync(int topCount = 10)
        {
            var groups = await _unitOfWork.Groups.GetLeaderboardAsync(topCount);
            var dtos = _mapper.Map<List<GroupDto>>(groups);

            // Sıralama (Rank) bilgisini manuel set edebiliriz (Repository'de orderby yapıldı ama Rank property'si DB'de tutuluyor mu?)
            // DB'deki Rank alanı schedule bir job ile güncellenmeli. 
            // Anlık gösterim için burada index'e göre sıra numarası verebiliriz.
            for (int i = 0; i < dtos.Count; i++)
            {
                dtos[i].Rank = i + 1;
            }

            return Response<List<GroupDto>>.Success(200, dtos);
        }

        public async Task<Response<PagedResult<GroupDto>>> GetLeaderboardPagedAsync(int page, int pageSize)
        {
            var pagedGroups = await _unitOfWork.Groups.GetLeaderboardPagedAsync(page, pageSize);
            
            var dtos = _mapper.Map<List<GroupDto>>(pagedGroups.Items);
            
            // PagedResult dönüşümü
            var pagedDto = new PagedResult<GroupDto>(dtos, pagedGroups.TotalCount, page, pageSize);
            
            return Response<PagedResult<GroupDto>>.Success(200, pagedDto);
        }
    }
}
