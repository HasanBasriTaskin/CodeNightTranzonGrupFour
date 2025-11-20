using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.BusinessLayer.DTOs.BadgeDtos
{
    public class BadgeDto
    {
        public Guid Id { get; set; }
        public BadgeType BadgeType { get; set; }
        public EcoLevel Level { get; set; }
        public DateTime AwardedAt { get; set; }
        public string ImageUrl { get; set; } // Frontend için görsel yolu dönebiliriz
    }
}
