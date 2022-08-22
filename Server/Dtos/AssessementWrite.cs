using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Dtos
{
    public class AssesementWrite
    {
        [Required]
        public string AssesementTitle { get; set; }
        [Required]
        public double Result { get; set; }
        [Required]
        public double Outof { get; set; }
        [Required]
        public string Sid { get; set; }
        [Required]
        public int Cid { get; set; }
        public virtual InstructorRead Instructor {get; set; }
    }
}