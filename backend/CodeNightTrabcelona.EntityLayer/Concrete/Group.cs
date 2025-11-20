using System;
using System.Collections.Generic;

namespace CodeNightTrabcelona.EntityLayer.Concrete
{
    public class Group : BaseEntity
    {
        public string Name { get; set; }
        public int MemberCount { get; set; }
        public decimal AverageEmission { get; set; }
        public int Rank { get; set; }

        // Relations
        public ICollection<User> Members { get; set; }
    }
}

