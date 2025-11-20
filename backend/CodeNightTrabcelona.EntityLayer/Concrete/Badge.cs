using System;
using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class Badge : BaseEntity
    {
        public Guid UserId { get; set; }
        public BadgeType BadgeType { get; set; } // Updated to Enum (was Name)
        public EcoLevel Level { get; set; } // Updated to Enum (e.g. Gold, Silver)
        public DateTime AwardedAt { get; set; }

        // Relation
        public User User { get; set; }
    }
}
