using System;
using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class Recommendation : BaseEntity
    {
        public Guid UserId { get; set; }
        public RecommendationCategory Category { get; set; } 
        public string Message { get; set; }
        public decimal ImpactPotentialSaving { get; set; } 
        public RecommendationSource Source { get; set; } // Updated to Enum

        // Relation
        public User User { get; set; }
    }
}
