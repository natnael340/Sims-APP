using System.ComponentModel.DataAnnotations;

namespace Duapp.Models  
{  
    public class Department 
    {  
        public int Id {get; set;}   
        [Required]
        public string DepartmentName{get; set;}
        [Required]
        public string Faculity{get; set;}
    }  
}