using Microsoft.EntityFrameworkCore.Migrations;

namespace Duapp.Migrations
{
    public partial class AssesementValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssesementValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Result = table.Column<double>(type: "float", nullable: false),
                    Outof = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssesementValue", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Assesement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssesementValueId = table.Column<int>(type: "int", nullable: false),
                    Sid = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Cid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assesement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assesement_AssesementValue_AssesementValueId",
                        column: x => x.AssesementValueId,
                        principalTable: "AssesementValue",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assesement_Courses_Cid",
                        column: x => x.Cid,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assesement_Students_Sid",
                        column: x => x.Sid,
                        principalTable: "Students",
                        principalColumn: "Sid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assesement_AssesementValueId",
                table: "Assesement",
                column: "AssesementValueId");

            migrationBuilder.CreateIndex(
                name: "IX_Assesement_Cid",
                table: "Assesement",
                column: "Cid");

            migrationBuilder.CreateIndex(
                name: "IX_Assesement_Sid",
                table: "Assesement",
                column: "Sid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assesement");

            migrationBuilder.DropTable(
                name: "AssesementValue");
        }
    }
}
