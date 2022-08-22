using Duapp.Data;
using Duapp.Models;
using Duapp.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Duapp.Configuration;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Protocols;

namespace Duapp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthManagmentController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IStudentRepo _repo;
        private readonly IAuthentication _authentication;

        public AuthManagmentController(UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> optionMonitor, RoleManager<IdentityRole> roleManager, IStudentRepo repo, IAuthentication authentication)
        {
            _userManager = userManager;
            _jwtConfig = optionMonitor.CurrentValue;
            _roleManager = roleManager;
            _repo = repo;
            _authentication = authentication;
        }
        [HttpPost]
        [Route("register/user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto user)
        {
            if (ModelState.IsValid)
            {
                if (user.Role == "Student")
                    return Redirect("/student");
                if (user.Role != "Staff" && user.Role != "Admin")
                    return BadRequest(new Response() { Status = "400", Message = "There is no such role. roles(Admin, Student, Staff)" });
                var exist = await _userManager.FindByNameAsync(user.Username);
                if (exist != null)
                {
                    return BadRequest(new Response() { Status = "401", Message = "Username aleready in use." });
                }
                var newUser = new IdentityUser() { UserName = user.Username };
                var isCreated = await _userManager.CreateAsync(newUser, user.Password);
                if (isCreated.Succeeded)
                {
                    var result = await _userManager.AddToRoleAsync(newUser, user.Role);

                    return Ok(newUser);
                }
                return BadRequest(new Response() { Status = "401", Message = "an error occured" });
            }
            return BadRequest(new Response() { Status = "401", Message = "Invalid Payload" });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] StudentAuthenticate user)
        {
            if (ModelState.IsValid)
            {
                var euser = await _userManager.FindByNameAsync(user.Username);
                if (euser == null)
                {
                    return BadRequest(new Response() { Status = "401", Message = "Username or password incorrect" });
                }
                var isuser = await _userManager.CheckPasswordAsync(euser, user.Password);
                if (!isuser)
                {
                    return BadRequest(new Response() { Status = "401", Message = "Username or password incorrect" });
                }
                var role = await _userManager.GetRolesAsync(euser);
                //var token = GenerateToken(euser, role[0]);
                var token = _authentication.GetToken(euser, role[0]);
                return Ok(token);
            }
            return BadRequest(new Response() { Status = "401", Message = "Invalid Payload" });
        }
        [Route("logout")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return NoContent();
        }
        [Route("register/student")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin, Staff")]
        public async Task<IActionResult> RegisterStudent([FromBody] StudentWriteDto student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response() { Status = "400", Message = "Invalid Payload" });
            }
            var estudent = await _repo.GetStudentAsync(student.Username);
            if (estudent != null)
                return BadRequest(new Response() { Status = "400", Message = "Student already Registered" });
            Department derpartment;
            if (student.DepartmentId == 0 && (student.DepartmentName != null || student.DepartmentName != ""))
            {
                derpartment = await _repo.GetDepartmentByNameAsync(student.DepartmentName);
            }
            else if (student.DepartmentId != 0)
            {
                derpartment = await _repo.GetDepartmentByIDAsync(student.DepartmentId);
            }
            else
            {
                return BadRequest(new Response() { Status = "400", Message = "Department need to be supplied" });
            }
            if (derpartment == null)
            {
                return BadRequest(new Response() { Status = "400", Message = "No Department With supplied info" });
            }
            var user = await _userManager.FindByNameAsync(student.Username);
            if (user != null)
                return BadRequest(new Response() { Status = "400", Message = "A user with this username is already Registered" });
            var newStudent = new Student()
            {
                Sid = student.Username,
                FirstName = student.FirstName,
                MiddleName = student.MiddleName,
                LastName = student.LastName,
                AcademicYear = student.AcademicYear,
                Department = derpartment
            };
            var newUser = new IdentityUser() { UserName = student.Username };
            var isCreated = await _userManager.CreateAsync(newUser, student.Password);
            if (isCreated.Succeeded)
            {
                var result = await _userManager.AddToRoleAsync(newUser, "Student");
                _repo.RegisterStudent(newStudent);
                _repo.SaveChange();
                return Ok(newStudent);
            }
            return BadRequest(new Response() { Status = "400", Message = "Please use a strong password(include Capital letter, small later, number and should be greater than 7)" });

        }
        [Route("changepassword")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin, Staff, Student")]
        public async Task<IActionResult> changePassword([FromBody] ChangePasswordDto password)
        {
            var uname = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByNameAsync(uname);
            var result = await _userManager.ChangePasswordAsync(user, password.OldPassword, password.NewPassword);
            if (!result.Succeeded)
            {
                return Forbid();
            }
            return Ok();
        }
        [Route("instructor/info")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin, Staff")]
        public async Task<IActionResult> AddInstructor([FromBody] InstructorRead ir){
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response() { Status = "400", Message = "Invalid Payload" });
            }
            var uname = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByNameAsync(uname);
            var instructor = new Instructor(){Uid=user.Id, Name=ir.Name, OfficeNo=ir.OfficeNo, PhoneNumber=ir.PhoneNumber, Address=ir.Address};
            _repo.addInfo(instructor);
            _repo.SaveChange();

            return Ok(instructor);
        }
        /*
        [Route("role")]
        [HttpGet]
        public async Task<IActionResult> CreateRole()
        {
            var role = new IdentityRole();
            role.Name = "Admin";
            await _roleManager.CreateAsync(role);
            var srole = new IdentityRole();
            srole.Name = "Staff";
            await _roleManager.CreateAsync(srole);
            var sturole = new IdentityRole();
            sturole.Name = "Student";
            await _roleManager.CreateAsync(sturole);

            var user = new IdentityUser(){UserName= "admin"};
            var chkuser = await _userManager.CreateAsync(user, "P@a55w0rd");
            if (chkuser.Succeeded)
            {
                var result = await _userManager.AddToRoleAsync(user, "Admin");
                return Ok(new Response(){Status="200", Message="Roles Created"});
            }
            return BadRequest(new Response(){Status="500", Message="Internal Server Error"});
        }
        */
        private string GenerateToken(IdentityUser user, string role)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]{
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.Add(_jwtConfig.TokenLifeTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}