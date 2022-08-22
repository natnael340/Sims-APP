using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Models
{
    public class StudentGPA
    {
        public int ID { get; set; }
        [Required]
        [ForeignKey("Student")]
        public string Sid { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public int Semseter { get; set; }
        [Required]
        public double SGPA { get; set; }
        [Required]
        public int CP { get; set; }
    }
}