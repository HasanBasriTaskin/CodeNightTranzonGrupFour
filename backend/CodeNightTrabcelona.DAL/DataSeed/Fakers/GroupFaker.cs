using Bogus;
using CodeNightTrabcelona.EntityLayer.Concrete;

namespace CodeNightTrabcelona.DAL.DataSeed.Fakers
{
    public class GroupFaker : Faker<Group>
    {
        public GroupFaker()
        {
            RuleFor(x => x.Id, f => Guid.NewGuid());
            RuleFor(x => x.Name, f => f.Company.CompanyName() + " Green Team");
            RuleFor(x => x.AverageEmission, f => f.Random.Decimal(500, 3000));
            RuleFor(x => x.MemberCount, 0); // DataSeed içinde hesaplanacak
            RuleFor(x => x.CreatedDate, f => f.Date.Past(1));
        }
    }
}
