namespace CodeNightTrabcelona.BusinessLayer.DTOs.GroupDtos
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int MemberCount { get; set; }
        public decimal AverageEmission { get; set; }
        public int Rank { get; set; }
    }
}
