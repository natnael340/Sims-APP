using System.ComponentModel.DataAnnotations;

namespace Duapp.Models
{
    public class Student
    {
        [Required]
        [MaxLength(60)]
        [Key]
        public string Sid {get; set;}
        [Required, StringLength(126), Display(Name="First Name")]
        public string FirstName {get; set;}
        [Required, StringLength(126), Display(Name="Middle Name")]
        public string MiddleName {get; set;}
        [Required, StringLength(126), Display(Name="Last Name")]
        public string LastName {get; set;}
        [Required, Display(Name="Academic Year")]
        public int AcademicYear {get; set;}

        public string image {get; set;}
        
        [Display(Name="Full Name")]
        public string FullName{
            get{
                return FirstName + MiddleName + LastName;
            }
        }
        public virtual Department Department{get; set;}

        
    }
}