using Microsoft.EntityFrameworkCore.Migrations;

namespace Duapp.Migrations
{
    public partial class Instructor1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.DropIndex(
                name: "IX_StudentGPAs_InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instructor",
                table: "Instructor");

            migrationBuilder.DropColumn(
                name: "Instructor",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "InstructorrUid",
                table: "StudentGPAs");

            migrationBuilder.AddColumn<int>(
                name: "InstructorrId",
                table: "StudentGPAs",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Uid",
                table: "Instructor",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Instructor",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instructor",
                table: "Instructor",
                column: "Id");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentGPAs_Instructor_InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.DropIndex(
                name: "IX_StudentGPAs_InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instructor",
                table: "Instructor");

            migrationBuilder.DropColumn(
                name: "InstructorrId",
                table: "StudentGPAs");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Instructor");

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

            migrationBuilder.AlterColumn<string>(
                name: "Uid",
                table: "Instructor",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instructor",
                table: "Instructor",
                column: "Uid");

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
    }
}
