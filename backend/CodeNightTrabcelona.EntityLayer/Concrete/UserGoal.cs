using System;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    // This is the new entity for detailed goal settings as requested
    public class UserGoal : BaseEntity
    {
        public Guid UserId { get; set; }
        
        // Daily targets set by user or AI
        public decimal DailyInternetGoalGb { get; set; }
        public decimal DailyGameGoalHours { get; set; }
        public decimal DailyMusicGoalMinutes { get; set; }
        public decimal DailyVideoGoalMinutes { get; set; }

        // The AI or System can update this based on the calculation
        public decimal CalculatedWeeklyCarbonGoal { get; set; } 

        // Relation
        public User User { get; set; }
    }
}

