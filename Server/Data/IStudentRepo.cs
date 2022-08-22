using System.Collections.Generic;
using System.Threading.Tasks;
using Duapp.Dtos;
using Duapp.Models;

namespace Duapp.Data
{
    public interface IStudentRepo
    {
        Task<Student> GetStudentAsync(string Sid);
        void RegisterStudent(Student student);
        Task<IEnumerable<StudentGPA>> getStatus(string Sid);
        Task<Department> GetDepartmentByIDAsync(int Did);
        Task<Department> GetDepartmentByNameAsync(string Name);
        bool SaveChange();
        Task<IEnumerable<Department>> GetAllDepartments();
        void SetStatus(StudentGPA Gpa);
        Task<IEnumerable<StudentStatus>> GetStatusAsync(string sid, int year, int semster);
        Task<IEnumerable<CourseRead>> GetCoursesAsync(string sid);
        Task<Dormitary> GetDormitary(string sid);
        void addCourse(Courses courses);
        void RelateCourse(CourseDepartmentRelation cdr);
        Courses GetCourse(string cid);
        Task<Courses> GetCourseByIdAsync(int id);
        Department GetDepartment(int id);
        Task<IEnumerable<Assesement>> GetAssesement(int cid, string sid);
        void AddAssesement(Assesement asses);
        void addInfo(Instructor isr);
        Task<Instructor> getInfo(string uid);
    }
}