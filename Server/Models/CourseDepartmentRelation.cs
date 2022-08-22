using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Models  
{  
    public class CourseDepartmentRelation 
    {  
        public int Id {get; set;}   
        [Required]
        [ForeignKey("Department")]
        public int CourseDepartment{get; set;}
        [ForeignKey("Course")]
        [Required]
        public int CourseId{get; set;}
        [Required]
        public int Credit{get; set;}
        [Required]
        public int Year{get; set;}
        [Required]
        public int Semester{get; set;}
        [Required]
        public string CourseCategory{get; set;}

        public virtual Department Department{get; set;}
        public virtual Courses Course{get; set;}


        
    }  
}