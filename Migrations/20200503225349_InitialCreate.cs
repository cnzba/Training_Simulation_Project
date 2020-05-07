using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CBA_Training.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Department",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 1, "It is the company department charged with finding, screening, recruiting and training.", "HR" });

            migrationBuilder.InsertData(
                table: "Department",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 2, "The accounting department is responsible for recording and reporting the cash flow transactions of a company.", "Account" });

            migrationBuilder.InsertData(
                table: "Department",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 3, "A sales department is the direct link between a company's product or service and its customers. ", "Sales" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Department");
        }
    }
}
