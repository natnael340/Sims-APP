using System;
using System.Security.Cryptography;
using Duapp.Data;

namespace Duapp.Authentication
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        public string GenerateToken()
        {
            var random = new byte[32];
            using (var randomNumGenerator = RandomNumberGenerator.Create())
            {
                randomNumGenerator.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }
    }
}