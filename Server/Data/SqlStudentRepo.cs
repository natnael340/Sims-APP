using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Duapp.Dtos;
using Duapp.Models;
using Microsoft.EntityFrameworkCore;

namespace Duapp.Data
{
    public class SqlStudentRepo : IStudentRepo
    {
        private readonly StudentContext _context;

        public SqlStudentRepo(StudentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetAllDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<Department> GetDepartmentByIDAsync(int Did)
        {
            return await _context.Departments.FirstOrDefaultAsync(p => p.Id==Did);
        }

        public async Task<Department> GetDepartmentByNameAsync(string Name)
        {
            return await _context.Departments.FirstOrDefaultAsync(p => p.DepartmentName==Name);
        }

        public async Task<IEnumerable<StudentGPA>> getStatus(string Sid)
        {
            return (await _context.StudentGPAs.ToListAsync()).FindAll(p => p.Sid==Sid);
        }

        public async Task<IEnumerable<StudentStatus>> GetStatusAsync(string sid, int year, int semster)
        {
            var result = await (from c in _context.Courses join ec in _context.EnrolledCourse on c.Id equals ec.CourseId join rel in _context.CourseDepartmentRelation on c.Id equals rel.CourseId where 
            rel.Year==year && rel.Semester == semster && ec.Sid == sid 
            select new StudentStatus{Id = c.Id, CourseName=c.CourseTitle, Grade = ec.Grade, CP = rel.Credit }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<CourseRead>> GetCoursesAsync(string sid)
        {
            var result = await (from c in _context.Courses join cd in _context.CourseDepartmentRelation on c.Id equals cd.CourseId 
            join stu in _context.Students on cd.CourseDepartment equals stu.Department.Id join ec in _context.EnrolledCourse on c.Id equals ec.CourseId 
            into Enro from subcou in Enro.DefaultIfEmpty() where stu.Sid == sid
            select new CourseRead(){Id=c.Id, CourseName = c.CourseTitle, CourseCategory=cd.CourseCategory ,cp=cd.Credit, year=cd.Year ,semseter=cd.Semester, grade=(subcou.Grade ?? String.Empty), Assess=(from coo in _context.Courses join ass in _context.Assesement on coo.Id equals ass.Cid where coo.Id==c.Id select new AssesementRead(){AssesementTitle=ass.AssesementTitle, Result=ass.Result, Outof=ass.Outof, Instructor=(ass.Instructor.Name==null ? null : new InstructorRead(){Name=ass.Instructor.Name, OfficeNo=ass.Instructor.OfficeNo, PhoneNumber=ass.Instructor.PhoneNumber, Address=ass.Instructor.Address})}).ToList() }).ToListAsync();
            
            return result;
        }

        public async Task<Student> GetStudentAsync(string Sid)
        {
            return  await _context.Students.FirstOrDefaultAsync(p => p.Sid==Sid);
        }

        public void RegisterStudent(Student student)
        {
            if(student == null)
            throw new ArgumentNullException(nameof(student));

            _context.Students.Add(student);

        }
        public bool SaveChange(){
            return (_context.SaveChanges() >= 0);
        }

        public void SetStatus(StudentGPA Gpa)
        {
            if(Gpa == null){
                throw new ArgumentNullException(nameof(Gpa));
            }
            _context.StudentGPAs.Add(Gpa);
        }

        public Task<Dormitary> GetDormitary(string sid)
        {
            return _context.Dormitary.FirstOrDefaultAsync(p => p.Sid==sid);
        }

        public void addCourse(Courses courses)
        {
            if(courses==null){
                throw new ArgumentNullException(nameof(courses));
            }
            _context.Courses.Add(courses);
        }

        public void RelateCourse(CourseDepartmentRelation cdr)
        {
            if(cdr==null){
                throw new ArgumentNullException(nameof(cdr));
            }
            _context.CourseDepartmentRelation.Add(cdr);
        }

        public Courses GetCourse(string cid)
        {
            return _context.Courses.FirstOrDefault(p => p.Course==cid);
        }
        public Department GetDepartment(int id)
        {
            return _context.Departments.FirstOrDefault(p => p.Id==id);
        }

        public async Task<IEnumerable<Assesement>> GetAssesement(int cid, string sid)
        {
            return (await _context.Assesement.ToListAsync()).FindAll(a => a.Cid == cid && a.Sid == sid);
        }
        public void addInfo(Instructor isr){
            
            if(isr==null){
                throw new ArgumentNullException(nameof(isr));
            }
            _context.Instructor.Add(isr);

        }
        public async Task<Instructor> getInfo(string uid){
            return await _context.Instructor.FirstOrDefaultAsync(i => i.Uid == uid);
        }
        public void AddAssesement(Assesement asses){
            if(asses==null){
                throw new ArgumentNullException(nameof(asses));
            }
            _context.Assesement.Add(asses);
        }
        public async Task<Courses> GetCourseByIdAsync(int id){
            return await _context.Courses.FirstOrDefaultAsync(i => i.Id == id);
        }

        
    }
}   