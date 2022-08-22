using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Duapp.Models
{
    public class Assesement
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string AssesementTitle { get; set; }
        [Required]
        public double Result { get; set; }
        [Required]
        public double Outof { get; set; }
        [ForeignKey("Student")]
        public string Sid { get; set; }
        [ForeignKey("Courses")]
        public int Cid { get; set; }
        public virtual Student Student{ get; set; }
        public virtual Courses Courses { get; set; }
        public virtual Instructor Instructor { get; set; }
    }
}