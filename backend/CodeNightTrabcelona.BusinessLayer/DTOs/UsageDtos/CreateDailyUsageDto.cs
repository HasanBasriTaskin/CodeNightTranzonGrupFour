namespace CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos
{
    public class CreateDailyUsageDto
    {
        public Guid UserId { get; set; } // JWT'den de alınabilir ama DTO'da bulunsun
        public DateTime Date { get; set; }
        public decimal InternetUsageGb { get; set; }
        public decimal GameTimeHours { get; set; }
        public decimal MusicTimeMinutes { get; set; }
        public decimal VideoTimeMinutes { get; set; }
    }
}
