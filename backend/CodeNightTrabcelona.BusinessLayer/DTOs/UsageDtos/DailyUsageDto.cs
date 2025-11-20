namespace CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos
{
    public class DailyUsageDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public decimal InternetUsageGb { get; set; }
        public decimal GameTimeHours { get; set; }
        public decimal MusicTimeMinutes { get; set; }
        public decimal VideoTimeMinutes { get; set; }
        public decimal TotalCarbonEmission { get; set; }
    }
}
