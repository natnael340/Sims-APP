using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Models  
{  
    public class Dormitary 
    {  
        [Key]
        [ForeignKey("Student")]
        public string Sid {get; set;}   
        [Required]
        public string Campus{get; set;}
        [Required]
        public string BuildingNo{get; set;}
        [Required]
        public string BuildingName{get; set;}
        [Required]
        public string Floor{get; set;}
        [Required]
        public string Dorm{get; set;}
        [Required]
        public int BedNo{get; set;}

        public virtual Student Student{get; set;}
    }  
}