using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdTipoSede",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Latitud",
                table: "Municipios",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Longitud",
                table: "Municipios",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UrlImagen",
                table: "Municipios",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "TiposSede",
                columns: table => new
                {
                    IdTipoSede = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposSede", x => x.IdTipoSede);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_IdTipoSede",
                table: "Sedes",
                column: "IdTipoSede");

            migrationBuilder.AddForeignKey(
                name: "FK_Sedes_TiposSede_IdTipoSede",
                table: "Sedes",
                column: "IdTipoSede",
                principalTable: "TiposSede",
                principalColumn: "IdTipoSede",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sedes_TiposSede_IdTipoSede",
                table: "Sedes");

            migrationBuilder.DropTable(
                name: "TiposSede");

            migrationBuilder.DropIndex(
                name: "IX_Sedes_IdTipoSede",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "IdTipoSede",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "Latitud",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "Longitud",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "UrlImagen",
                table: "Municipios");
        }
    }
}
