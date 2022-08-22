using Microsoft.EntityFrameworkCore.Migrations;

namespace Duapp.Migrations
{
    public partial class Assesement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assesement_AssesementValue_AssesementValueId",
                table: "Assesement");

            migrationBuilder.DropTable(
                name: "AssesementValue");

            migrationBuilder.DropIndex(
                name: "IX_Assesement_AssesementValueId",
                table: "Assesement");

            migrationBuilder.DropColumn(
                name: "AssesementValueId",
                table: "Assesement");

            migrationBuilder.AddColumn<string>(
                name: "AssesementTitle",
                table: "Assesement",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Outof",
                table: "Assesement",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Result",
                table: "Assesement",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssesementTitle",
                table: "Assesement");

            migrationBuilder.DropColumn(
                name: "Outof",
                table: "Assesement");

            migrationBuilder.DropColumn(
                name: "Result",
                table: "Assesement");

            migrationBuilder.AddColumn<int>(
                name: "AssesementValueId",
                table: "Assesement",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AssesementValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Outof = table.Column<double>(type: "float", nullable: false),
                    Result = table.Column<double>(type: "float", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssesementValue", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assesement_AssesementValueId",
                table: "Assesement",
                column: "AssesementValueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assesement_AssesementValue_AssesementValueId",
                table: "Assesement",
                column: "AssesementValueId",
                principalTable: "AssesementValue",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
