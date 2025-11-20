namespace CodeNightTrabcelona.BusinessLayer.DTOs.TransactionDtos
{
    public class GreenTokenTransactionDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; } // + veya - olabilir
        public string Reason { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
