using System;

namespace Duapp.Configuration
{
    public class JwtConfig
    {
        public string Secret { get; set; }
        public TimeSpan TokenLifeTime { get; set; }
    }
}