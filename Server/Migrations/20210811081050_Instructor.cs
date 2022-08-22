using Microsoft.EntityFrameworkCore.Migrations;

namespace Duapp.Migrations
{
    public partial class Instructor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Instructor",
                table: "StudentGPAs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "InstructorrUid",
                table: "StudentGPAs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseReferences",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CourseTextBook",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreRequiste",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Instructor",
                columns: table => new
                {
                    Uid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficeNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructor", x => x.Uid);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentGPAs_InstructorrUid",
                table: "StudentGPAs",
                column: "InstructorrUid");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrUid",
                table: "StudentGPAs",
                column: "InstructorrUid",
                principalTable: "Instructor",
                principalColumn: "Uid",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.DropTable(
                name: "Instructor");

            migrationBuilder.DropIndex(
                name: "IX_StudentGPAs_InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "Instructor",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "CourseReferences",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CourseTextBook",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PreRequiste",
                table: "Courses");
        }
    }
}
