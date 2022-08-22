using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Dtos
{
    public class InstructorRead
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string OfficeNo { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}