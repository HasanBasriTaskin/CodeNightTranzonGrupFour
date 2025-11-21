namespace CodeNightTrabcelona.BusinessLayer.DTOs.AiDtos
{
    public class AiAnalysisResultDto
    {
        public decimal InternetUsageGb { get; set; }
        public decimal GameTimeHours { get; set; }
        public decimal MusicTimeMinutes { get; set; }
        public decimal VideoTimeMinutes { get; set; }
        public decimal WeeklyGoalCarbon { get; set; }
        public string AiSuggestion { get; set; }
    }
}

