using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.BusinessLayer.DTOs.UserDtos
{
    public class UserDashboardDto
    {
        public string FullName { get; set; }
        public EcoLevel EcoLevel { get; set; }
        public int CurrentBalance { get; set; }
        
        // Hedef İlerleme Durumu
        public decimal CurrentCarbonUsage { get; set; }
        public decimal WeeklyGoal { get; set; }
        public int GoalProgressPercentage { get; set; } // %60 doldu gibi

        // Öneriler
        public List<string> ActiveRecommendations { get; set; }
    }
}
