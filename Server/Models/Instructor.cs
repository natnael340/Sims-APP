using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Duapp.Models
{
    public class Instructor
    {

        [Key]
        public int Id { get; set; }
        [ForeignKey("AspNetUsers")]
        public string Uid {get; set;}
        [Required]
        public string Name { get; set; }
        [Required]
        public string OfficeNo { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}