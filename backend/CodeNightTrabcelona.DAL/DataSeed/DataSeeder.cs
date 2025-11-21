using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CodeNightTrabcelona.DAL.Concrete;
using CodeNightTrabcelona.DAL.DataSeed.Fakers;
using CodeNightTrabcelona.EntityLayer.Concrete;
using CodeNightTrabcelona.EntityLayer.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CodeNightTrabcelona.DAL.DataSeed
{
    public class DataSeeder
    {
        private readonly CodeNightConnectContext _context;
        private readonly IConfiguration _configuration;

        public DataSeeder(CodeNightConnectContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task SeedAsync()
        {
            // Check if database is already seeded
            if (await _context.Users.AnyAsync())
            {
                return;
            }

            var seedSettings = _configuration.GetSection("SeedSettings");
            int userCount = seedSettings.GetValue<int>("UserCount", 50);
            int groupCount = seedSettings.GetValue<int>("GroupCount", 5);

            // 1. Create Groups
            var groupFaker = new GroupFaker();
            var groups = groupFaker.Generate(groupCount);
            
            await _context.Groups.AddRangeAsync(groups);
            await _context.SaveChangesAsync();

            // 2. Create Admin User
            string adminEmail = seedSettings.GetValue<string>("AdminUser:Email") ?? "codenight@taskinnovation.net";
            string adminPassword = seedSettings.GetValue<string>("AdminUser:Password") ?? "Taskinnovation1234!";
            
            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                FullName = "CodeNight Admin",
                Email = adminEmail,
                PasswordHash = CreatePasswordHash(adminPassword),
                City = "Trabzon",
                EcoLevel = EcoLevel.GreenHero,
                WeeklyGoalCarbon = 5000,
                GreenTokenBalance = 1000,
                CreatedDate = DateTime.Now,
                GroupId = groups.First().Id // Assign to first group or null
            };

            await _context.Users.AddAsync(adminUser);

            // 3. Create Fake Users
            var userFaker = new UserFaker();
            var users = userFaker.Generate(userCount);

            foreach (var user in users)
            {
                // Assign random group
                var randomGroup = groups[new Random().Next(groups.Count)];
                user.GroupId = randomGroup.Id;
                user.PasswordHash = CreatePasswordHash("123456"); // Default password for fake users
            }

            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

            // Update Group Member Counts
            foreach (var group in groups)
            {
                group.MemberCount = await _context.Users.CountAsync(u => u.GroupId == group.Id);
            }
            await _context.SaveChangesAsync();
        }

        private string CreatePasswordHash(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}

