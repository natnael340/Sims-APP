using System.ComponentModel.DataAnnotations;

namespace Duapp.Models
{
    public class StudentWriteDto
    {
        [Required]
        [MaxLength(60)]
        [Key]
        public string Username {get; set;}
        [Required]
        public string Password { get; set; }
        [Required, StringLength(126)]
        public string FirstName {get; set;}
        [Required, StringLength(126)]
        public string MiddleName {get; set;}
        [Required, StringLength(126)]
        public string LastName {get; set;}
        [Required]
        public int AcademicYear {get; set;}
        public int DepartmentId{get; set; }
        public string DepartmentName{get;set;}

        
    }
}