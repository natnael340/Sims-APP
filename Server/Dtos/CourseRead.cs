using Duapp.Models;
using System.Collections.Generic;

namespace Duapp.Dtos
{
    public class CourseRead
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string CourseCategory { get; set; }
        public int cp { get; set; }
        public int year { get; set; }
        public int semseter { get; set; }
        public string grade { get; set; }
        public virtual IEnumerable<AssesementRead> Assess { get; set; }
    }
}