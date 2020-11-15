using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sedes_Empresas_EmpresasIdEmpresa",
                table: "Sedes");

            migrationBuilder.DropIndex(
                name: "IX_Sedes_EmpresasIdEmpresa",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "EmpresasIdEmpresa",
                table: "Sedes");

            migrationBuilder.AddColumn<int>(
                name: "IdEmpresa",
                table: "Sedes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_IdEmpresa",
                table: "Sedes",
                column: "IdEmpresa");

            migrationBuilder.AddForeignKey(
                name: "FK_Sedes_Empresas_IdEmpresa",
                table: "Sedes",
                column: "IdEmpresa",
                principalTable: "Empresas",
                principalColumn: "IdEmpresa",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sedes_Empresas_IdEmpresa",
                table: "Sedes");

            migrationBuilder.DropIndex(
                name: "IX_Sedes_IdEmpresa",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "IdEmpresa",
                table: "Sedes");

            migrationBuilder.AddColumn<int>(
                name: "EmpresasIdEmpresa",
                table: "Sedes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_EmpresasIdEmpresa",
                table: "Sedes",
                column: "EmpresasIdEmpresa");

            migrationBuilder.AddForeignKey(
                name: "FK_Sedes_Empresas_EmpresasIdEmpresa",
                table: "Sedes",
                column: "EmpresasIdEmpresa",
                principalTable: "Empresas",
                principalColumn: "IdEmpresa",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
