using Microsoft.EntityFrameworkCore.Migrations;

namespace Duapp.Migrations
{
    public partial class Instructor3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.DropIndex(
                name: "IX_StudentGPAs_InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.AddColumn<int>(
                name: "InstructorId",
                table: "Assesement",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Assesement_InstructorId",
                table: "Assesement",
                column: "InstructorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assesement_Instructor_InstructorId",
                table: "Assesement",
                column: "InstructorId",
                principalTable: "Instructor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assesement_Instructor_InstructorId",
                table: "Assesement");

            migrationBuilder.DropIndex(
                name: "IX_Assesement_InstructorId",
                table: "Assesement");

            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "Assesement");

            migrationBuilder.AddColumn<int>(
                name: "InstructorrId",
                table: "StudentGPAs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentGPAs_InstructorrId",
                table: "StudentGPAs",
                column: "InstructorrId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrId",
                table: "StudentGPAs",
                column: "InstructorrId",
                principalTable: "Instructor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
