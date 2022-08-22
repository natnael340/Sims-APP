using System.Threading.Tasks;
using Duapp.Configuration;
using Duapp.Models;
using Microsoft.AspNetCore.Identity;

namespace Duapp.Data
{
    public interface IAuthentication
    {
        TokenModel GetToken(IdentityUser user, string role);
        TokenModel RefreshToken(TokenModel token);
    }
}