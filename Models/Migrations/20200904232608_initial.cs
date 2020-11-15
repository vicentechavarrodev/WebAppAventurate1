using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    IdCategoria = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(maxLength: 30, nullable: false),
                    UrlImagen = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "Municipios",
                columns: table => new
                {
                    IdMunicipio = table.Column<int>(nullable: false),
                    Nombre = table.Column<string>(maxLength: 30, nullable: false),
                    Clima = table.Column<string>(maxLength: 20, nullable: false),
                    Descripcion = table.Column<string>(maxLength: 144, nullable: false),
                    Festividades = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Municipios", x => x.IdMunicipio);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IdRole = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Codigo = table.Column<string>(maxLength: 12, nullable: false),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.IdRole);
                });

            migrationBuilder.CreateTable(
                name: "SubCategorias",
                columns: table => new
                {
                    IdSubCategoria = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(maxLength: 30, nullable: false),
                    UrlImagen = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategorias", x => x.IdSubCategoria);
                });

            migrationBuilder.CreateTable(
                name: "ImagenesMunicipio",
                columns: table => new
                {
                    IdImagenMunicipio = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UrlImagen = table.Column<string>(maxLength: 100, nullable: false),
                    IdMunicipio = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagenesMunicipio", x => x.IdImagenMunicipio);
                    table.ForeignKey(
                        name: "FK_ImagenesMunicipio_Municipios_IdMunicipio",
                        column: x => x.IdMunicipio,
                        principalTable: "Municipios",
                        principalColumn: "IdMunicipio",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Codigo = table.Column<string>(maxLength: 12, nullable: false),
                    Identificacion = table.Column<string>(maxLength: 12, nullable: false),
                    Nombres = table.Column<string>(maxLength: 30, nullable: true),
                    Apellidos = table.Column<string>(maxLength: 30, nullable: true),
                    Genero = table.Column<string>(maxLength: 9, nullable: true),
                    FechaNacimiento = table.Column<DateTime>(nullable: false),
                    Telefono = table.Column<string>(maxLength: 10, nullable: true),
                    Celular = table.Column<string>(maxLength: 10, nullable: true),
                    Direccion = table.Column<string>(maxLength: 100, nullable: true),
                    Correo = table.Column<string>(maxLength: 50, nullable: true),
                    Contrasena = table.Column<string>(nullable: true),
                    Activo = table.Column<bool>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    IdRole = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuarios_Roles_IdRole",
                        column: x => x.IdRole,
                        principalTable: "Roles",
                        principalColumn: "IdRole",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CategoriasSubcategorias",
                columns: table => new
                {
                    IdCategoriaSubcategoria = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdSubCategoria = table.Column<int>(nullable: false),
                    IdCategoria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriasSubcategorias", x => x.IdCategoriaSubcategoria);
                    table.ForeignKey(
                        name: "FK_CategoriasSubcategorias_Categorias_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categorias",
                        principalColumn: "IdCategoria",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CategoriasSubcategorias_SubCategorias_IdSubCategoria",
                        column: x => x.IdSubCategoria,
                        principalTable: "SubCategorias",
                        principalColumn: "IdSubCategoria",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    IdEmpresa = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false),
                    Activa = table.Column<bool>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    IdUsuario = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.IdEmpresa);
                    table.ForeignKey(
                        name: "FK_Empresas_Usuarios_IdUsuario",
                        column: x => x.IdUsuario,
                        principalTable: "Usuarios",
                        principalColumn: "IdUsuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sedes",
                columns: table => new
                {
                    IdSede = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false),
                    Telefono = table.Column<string>(maxLength: 12, nullable: false),
                    Celular = table.Column<string>(maxLength: 12, nullable: false),
                    Horarios = table.Column<string>(nullable: false),
                    Activa = table.Column<bool>(nullable: false),
                    Imagen = table.Column<string>(nullable: true),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    Latitud = table.Column<float>(nullable: false),
                    Longitud = table.Column<float>(nullable: false),
                    IdMunicipio = table.Column<int>(nullable: false),
                    IdCategoriaSubcategoria = table.Column<int>(nullable: false),
                    EmpresasIdEmpresa = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sedes", x => x.IdSede);
                    table.ForeignKey(
                        name: "FK_Sedes_Empresas_EmpresasIdEmpresa",
                        column: x => x.EmpresasIdEmpresa,
                        principalTable: "Empresas",
                        principalColumn: "IdEmpresa",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sedes_CategoriasSubcategorias_IdCategoriaSubcategoria",
                        column: x => x.IdCategoriaSubcategoria,
                        principalTable: "CategoriasSubcategorias",
                        principalColumn: "IdCategoriaSubcategoria",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sedes_Municipios_IdMunicipio",
                        column: x => x.IdMunicipio,
                        principalTable: "Municipios",
                        principalColumn: "IdMunicipio",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ImagenesEmpresa",
                columns: table => new
                {
                    IdImagenEmpresa = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UrlImagen = table.Column<string>(maxLength: 100, nullable: false),
                    IdSede = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagenesEmpresa", x => x.IdImagenEmpresa);
                    table.ForeignKey(
                        name: "FK_ImagenesEmpresa_Sedes_IdSede",
                        column: x => x.IdSede,
                        principalTable: "Sedes",
                        principalColumn: "IdSede",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoriasSubcategorias_IdCategoria",
                table: "CategoriasSubcategorias",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_CategoriasSubcategorias_IdSubCategoria",
                table: "CategoriasSubcategorias",
                column: "IdSubCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_IdUsuario",
                table: "Empresas",
                column: "IdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_ImagenesEmpresa_IdSede",
                table: "ImagenesEmpresa",
                column: "IdSede");

            migrationBuilder.CreateIndex(
                name: "IX_ImagenesMunicipio_IdMunicipio",
                table: "ImagenesMunicipio",
                column: "IdMunicipio");

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_EmpresasIdEmpresa",
                table: "Sedes",
                column: "EmpresasIdEmpresa");

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_IdCategoriaSubcategoria",
                table: "Sedes",
                column: "IdCategoriaSubcategoria");

            migrationBuilder.CreateIndex(
                name: "IX_Sedes_IdMunicipio",
                table: "Sedes",
                column: "IdMunicipio");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdRole",
                table: "Usuarios",
                column: "IdRole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImagenesEmpresa");

            migrationBuilder.DropTable(
                name: "ImagenesMunicipio");

            migrationBuilder.DropTable(
                name: "Sedes");

            migrationBuilder.DropTable(
                name: "Empresas");

            migrationBuilder.DropTable(
                name: "CategoriasSubcategorias");

            migrationBuilder.DropTable(
                name: "Municipios");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "SubCategorias");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
