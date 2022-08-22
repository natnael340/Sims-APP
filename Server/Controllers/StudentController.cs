using Duapp.Data;
using Duapp.Models;
using Duapp.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using AutoMapper;
using System.Collections.Generic;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace Duapp.Controllers
{
    
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepo _repo;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IMapper _mapper;

        public StudentController(IStudentRepo repo, UserManager<IdentityUser> userManager, IMapper mapper)
        {
            _repo = repo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Route("status/")]
        [HttpGet]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<IActionResult> GetStatus(){
            var cStudent = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var gpas = await _repo.getStatus(cStudent);
            if(gpas == null)
            return Ok();
            return Ok(gpas);

        }
        [Route("grade/", Name = "GetStatus")]
        [HttpGet]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<IActionResult> GetStatus([FromQuery] int year, [FromQuery] int semseter){
            var cStudent = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.GetStatusAsync(cStudent, year, semseter);

            return Ok(result);

        }
        [Route("courses/")]
        [HttpGet]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<IActionResult> GetCourses(){
            var cStudent = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.GetCoursesAsync(cStudent);
            return Ok(result);
        }      
        [Route("status/add")]
        [HttpPost]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Staff")]
        public async Task<IActionResult> SetStatus([FromBody] StudentGpa Gpa){
            if(!ModelState.IsValid){
                return BadRequest(new Response(){Status="400", Message="Invalid Payload"});
            }
            var user = await _repo.GetStudentAsync(Gpa.Sid);
            if(user == null){
                return BadRequest(new Response(){Status="400", Message="There is no student with this Id"});
            }
            var status = new StudentGPA(){Sid=Gpa.Sid, Year=Gpa.Year, Semseter=Gpa.Semseter, SGPA=Gpa.SGPA, CP=Gpa.CP};
            _repo.SetStatus(status);
            return Ok(new Response(){Status="200", Message="Status Added"});

        }
        [Route("departments")]
        [HttpGet]
        public async Task<IActionResult> GetDepartments(){
            var depts = await _repo.GetAllDepartments();
            return Ok(depts);
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<IActionResult> GetStudent(){
            var cStudent = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var res = await _repo.GetStudentAsync(cStudent);
            return Ok(_mapper.Map<StudentReadDto>(res));
        }
        [Route("dormitary")]
        [HttpGet]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<IActionResult> getDormitary(){
            var cStudent = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var res = await _repo.GetDormitary(cStudent);
            var r = _mapper.Map<DormReadDto>(res);
            return Ok(r);
        }
        [Route("addcourse")]
        [HttpPost]
        public IActionResult addCourse([FromBody] CourseWrite stw){
            if(!ModelState.IsValid){
                return BadRequest(new Response(){Status="400", Message="Invalid Payload"});
            }
            var course = _mapper.Map<Courses>(stw);
            _repo.addCourse(course);
            _repo.SaveChange();
            return Ok(course);
        }
        [Route("relatecourse")]
        [HttpPost]
        public IActionResult relateCourse([FromBody] CourseDepartmentWrite cdw){
            if(!ModelState.IsValid){
                return BadRequest(new Response(){Status="400", Message="Invalid Payload"});
            }
            var course = _repo.GetCourse(cdw.CourseId);
            var dept = _repo.GetDepartment(cdw.CourseDepartment);
            if(course==null)
            return BadRequest(new Response(){Status="400", Message="No Course by this name"});
            if(dept==null)
            return BadRequest(new Response(){Status="400", Message="No Dept by this id"});

            var rel = new CourseDepartmentRelation(){CourseDepartment=cdw.CourseDepartment, CourseId=course.Id, Credit=cdw.Credit, Year=cdw.Year, Semester=cdw.Semester, CourseCategory=cdw.CourseCategory, Course=course, Department=dept};
            _repo.RelateCourse(rel);
            _repo.SaveChange();
            return Ok(rel);
        }
        [Route("assesement")]
        [HttpPost]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Staff")]
        public async Task<IActionResult> GetAssesement([FromBody] AssesementWrite asw ){
            var InstructorName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var instructorID = (await _userManager.FindByNameAsync(InstructorName)).Id;
            var instructor = await _repo.getInfo(instructorID);
            var student = await _repo.GetStudentAsync(asw.Sid);
            var course = await _repo.GetCourseByIdAsync(asw.Cid);
            var assesement = _mapper.Map<Assesement>(asw);
            assesement.Instructor = instructor;
            assesement.Student = student;
            assesement.Courses = course;
            _repo.AddAssesement(assesement);
            _repo.SaveChange();
            
            return Ok(assesement);
        }
        [Route("upload")]
        [HttpPost]
        [Authorize(AuthenticationSchemes =  JwtBearerDefaults.AuthenticationScheme, Roles = "Student")]
        public async Task<ActionResult> UploadProfile(){
            var uname = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //string base64string = System.Convert.ToBase64String(image);
            var student = await _repo.GetStudentAsync(uname);
            Console.WriteLine("here");
            try{
                var image  = Request.Form.Files[0];
                Console.WriteLine(Request.ContentType);
                if(image.Length > 0){
                    BinaryReader rd = new BinaryReader(image.OpenReadStream());
                    Byte[] bytes = rd.ReadBytes((Int32)image.Length);
                    string base64string = System.Convert.ToBase64String(bytes);
                    string imageurl = "data:"+image.ContentType+";base64,"+base64string;
                    student.image = imageurl;
                    _repo.SaveChange();
                }
            }
           catch{
               return BadRequest();
           }
               
            
            
            return Ok(student);
        }
        
    }
}