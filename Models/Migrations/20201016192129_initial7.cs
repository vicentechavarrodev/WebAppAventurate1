using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Anexo",
                table: "Sedes",
                maxLength: 144,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Orden",
                table: "Categorias",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Anexo",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "Orden",
                table: "Categorias");
        }
    }
}
