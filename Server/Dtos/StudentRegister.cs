using System.ComponentModel.DataAnnotations;

namespace  Duapp.Dtos
{
    public class StudentRegister
    {
      [Required]  
      public string Username {get; set;}
      [Required]
      public string Password{get; set;}
    }
}