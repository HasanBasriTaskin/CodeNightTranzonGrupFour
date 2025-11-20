using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.BusinessLayer.DTOs.RecommendationDtos
{
    public class RecommendationDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public decimal PotentialSaving { get; set; }
        public RecommendationCategory Category { get; set; }
        public RecommendationSource Source { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
