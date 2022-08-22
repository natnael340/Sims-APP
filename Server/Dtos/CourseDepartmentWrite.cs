using System.ComponentModel.DataAnnotations;

namespace Duapp.Dtos
{
    public class CourseDepartmentWrite
    {
        [Required]
        public int CourseDepartment { get; set; }
        [Required]
        public string CourseId { get; set; }
        [Required]
        public int Credit { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public int Semester { get; set; }
        [Required]
        public string CourseCategory { get; set; }



    }
}