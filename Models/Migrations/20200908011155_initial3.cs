using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Longitud",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(float));

            migrationBuilder.AlterColumn<string>(
                name: "Latitud",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(float));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Longitud",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<float>(
                name: "Latitud",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
