using System.ComponentModel.DataAnnotations;

namespace  Duapp.Dtos
{
    public class StudentAuthenticate
    {
      [Required]  
      public string Username {get; set;}
      [Required]
      public string Password{get; set;}
    }
}