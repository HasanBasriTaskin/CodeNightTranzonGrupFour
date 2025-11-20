using System;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class DailyUsage : BaseEntity
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        
        // Raw usage data
        public decimal InternetUsageGb { get; set; }
        public decimal GameTimeHours { get; set; }
        public decimal MusicTimeMinutes { get; set; }
        public decimal VideoTimeMinutes { get; set; }
        
        // Calculated result
        public decimal TotalCarbonEmission { get; set; }

        // Relation
        public User User { get; set; }
    }
}

