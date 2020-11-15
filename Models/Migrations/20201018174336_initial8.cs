using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 144);

            migrationBuilder.AlterColumn<string>(
                name: "Anexo",
                table: "Sedes",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 144);

            migrationBuilder.AddColumn<string>(
                name: "Correo",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FacebookUrl",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstagramUrl",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NombreFacebook",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NombreInstagram",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Precio",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tips",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Municipios",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Festividades",
                table: "Municipios",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Municipios",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 144);

            migrationBuilder.AddColumn<string>(
                name: "QueHacer",
                table: "Municipios",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tips",
                table: "Municipios",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Correo",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "FacebookUrl",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "InstagramUrl",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "NombreFacebook",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "NombreInstagram",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "Tips",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "QueHacer",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "Tips",
                table: "Municipios");

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Sedes",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Sedes",
                maxLength: 144,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Anexo",
                table: "Sedes",
                maxLength: 144,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Municipios",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Festividades",
                table: "Municipios",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Municipios",
                maxLength: 144,
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
