using System;
using System.Collections.Generic;
using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class User : BaseEntity
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } 
        public string City { get; set; }
        public EcoLevel EcoLevel { get; set; } // Updated to Enum
        
        public decimal WeeklyGoalCarbon { get; set; } 
        
        public int GreenTokenBalance { get; set; } 

        // Foreign Keys
        public Guid? GroupId { get; set; }

        // Relations
        public Group Group { get; set; }
        public UserGoal UserGoal { get; set; } 
        public ICollection<DailyUsage> DailyUsages { get; set; }
        public ICollection<Recommendation> Recommendations { get; set; }
        public ICollection<Badge> Badges { get; set; }
        public ICollection<GreenTokenTransaction> Transactions { get; set; }
    }
}
