using Duapp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Duapp.Data
{
    public class StudentContext : IdentityDbContext
    {
      public StudentContext(DbContextOptions<StudentContext> opt) : base(opt)
      {
          
      }
      
      public DbSet<Student> Students { get; set; }
      public DbSet<Department> Departments {get; set;}
      public DbSet<Courses> Courses {get; set;}
      public DbSet<Dormitary> Dormitary {get; set;}
      public DbSet<EnrolledCourse> EnrolledCourse {get; set;}
      public DbSet<CourseDepartmentRelation> CourseDepartmentRelation {get; set;}
      public DbSet<StudentGPA> StudentGPAs {get; set;}
      public DbSet<Assesement> Assesement {get; set;}
      public DbSet<Instructor> Instructor { get; set; }
      

    }   
}