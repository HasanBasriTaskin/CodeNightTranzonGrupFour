using System.Security.Cryptography;
using System.Text;

namespace CodeNightTrabcelona.BusinessLayer.Security
{
    public static class HashingHelper
    {
        public static string CreatePasswordHash(string password)
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

        public static bool VerifyPasswordHash(string password, string storedHash)
        {
            var hashOfInput = CreatePasswordHash(password);
            return StringComparer.OrdinalIgnoreCase.Compare(hashOfInput, storedHash) == 0;
        }
    }
}
