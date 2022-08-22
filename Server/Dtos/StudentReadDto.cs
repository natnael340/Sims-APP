using System.ComponentModel.DataAnnotations;

namespace Duapp.Models
{
    public class StudentReadDto
    {
        
        public string Sid {get; set;}
        public string FirstName {get; set;}
        public string MiddleName {get; set;}
        public string LastName {get; set;}
        public string image { get; set; }
        public string FullName{
            get{
                return FirstName + " " + MiddleName + " " + LastName;
            }
        }
        public virtual Department Department{get; set;}

        
    }
}