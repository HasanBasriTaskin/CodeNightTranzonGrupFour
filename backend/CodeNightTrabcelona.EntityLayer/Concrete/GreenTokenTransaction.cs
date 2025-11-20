using System;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class GreenTokenTransaction : BaseEntity
    {
        public Guid UserId { get; set; }
        public decimal Amount { get; set; } // Can be + or -
        public string Reason { get; set; } // e.g. "Weekly Goal Achieved"
        public DateTime TransactionDate { get; set; }

        // Relation
        public User User { get; set; }
    }
}

