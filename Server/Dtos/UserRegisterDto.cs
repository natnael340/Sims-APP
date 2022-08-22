using System.ComponentModel.DataAnnotations;

namespace Duapp.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        
    }
}