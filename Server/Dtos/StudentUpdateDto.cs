using System.ComponentModel.DataAnnotations;

namespace Duapp.Models
{
    public class StudentUpdateDto
    {
        
        public string Sid {get; set;}
        public string FirstName {get; set;}
        public string MiddleName {get; set;}
        public string LastName {get; set;}
        public string image { get; set; }
        public virtual Department Department{get; set;}

        
    }
}