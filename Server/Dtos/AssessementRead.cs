using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Dtos
{
    public class AssesementRead
    {
        [Required]
        public string AssesementTitle { get; set; }
        [Required]
        public double Result { get; set; }
        [Required]
        public double Outof { get; set; }

        public virtual InstructorRead Instructor {get; set; }
    }
}