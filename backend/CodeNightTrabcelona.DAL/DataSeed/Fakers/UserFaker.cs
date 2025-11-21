using Bogus;
using CodeNightTrabcelona.EntityLayer.Concrete;
using CodeNightTrabcelona.EntityLayer.Enums;

namespace CodeNightTrabcelona.DAL.DataSeed.Fakers
{
    public class UserFaker : Faker<User>
    {
        public UserFaker()
        {
            RuleFor(x => x.Id, f => Guid.NewGuid());
            RuleFor(x => x.FullName, f => f.Name.FullName());
            RuleFor(x => x.Email, (f, u) => f.Internet.Email(u.FullName));
            RuleFor(x => x.City, f => f.Address.City());
            RuleFor(x => x.PasswordHash, f => "hashed_password_placeholder"); // Gerçek hash'i DataSeed içinde set edebiliriz
            RuleFor(x => x.EcoLevel, f => f.PickRandom<EcoLevel>());
            RuleFor(x => x.WeeklyGoalCarbon, f => f.Random.Decimal(1000, 5000));
            RuleFor(x => x.GreenTokenBalance, f => f.Random.Int(0, 500));
            RuleFor(x => x.CreatedDate, f => f.Date.Past(1));
        }
    }
}
