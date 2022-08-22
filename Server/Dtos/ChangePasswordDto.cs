using System.ComponentModel.DataAnnotations;

namespace Duapp.Dtos
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Old password required!!")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }
        [Required(ErrorMessage = "Old password required!!")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
    }

}