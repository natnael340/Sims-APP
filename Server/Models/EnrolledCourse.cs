using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Models
{
    public class EnrolledCourse
    {
        
        [Key]
        [ForeignKey("Courses")]
        public int CourseId {get; set;}
        [ForeignKey("Student")]
        public string Sid {get; set;}
        [Required]
        public string Grade{get; set;}
        public string Remark{get; set;}
        public virtual Courses Courses{get; set;}
        public virtual Student Student{get; set;}

        
    }
}