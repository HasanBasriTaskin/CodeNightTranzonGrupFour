namespace CodeNightTrabcelona.BusinessLayer.DTOs.GoalDtos
{
    public class UserGoalDto
    {
        public decimal DailyInternetGoalGb { get; set; }
        public decimal DailyGameGoalHours { get; set; }
        public decimal DailyMusicGoalMinutes { get; set; }
        public decimal DailyVideoGoalMinutes { get; set; }
        public decimal CalculatedWeeklyCarbonGoal { get; set; }
    }
}
