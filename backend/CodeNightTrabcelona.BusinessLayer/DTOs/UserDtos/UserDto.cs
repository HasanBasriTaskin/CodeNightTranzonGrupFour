using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.BusinessLayer.DTOs.UserDtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public EcoLevel EcoLevel { get; set; }
        public decimal WeeklyGoal { get; set; }
        public int CurrentBalance { get; set; }
        
        // Grup bilgisi varsa sadece adını dönebiliriz
        public Guid? GroupId { get; set; }
        public string GroupName { get; set; }
    }
}
