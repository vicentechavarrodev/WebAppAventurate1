using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NombreTwitter",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pagina",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TwitterUrl",
                table: "Sedes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NombreTwitter",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "Pagina",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "TwitterUrl",
                table: "Sedes");
        }
    }
}
