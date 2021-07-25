using EfCore.Shaman;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models
{
    public class DataContext : DbContext
    {
       // const string connectionString = "Data Source=DESKTOP-S8K9CMA;Initial Catalog=AventurateBD01;Integrated Security=False;User Id=sa;Password=PazziSoftware*";


        const string connectionString = "Data Source=45.169.100.31;Initial Catalog=coaventu_bd;Integrated Security=False;User Id=coaventu_sa;Password=Aventu_01*";
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DataContext() : base() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
       .SelectMany(t => t.GetForeignKeys())
       .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            this.FixOnModelCreating(modelBuilder);
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        }


        public DbSet<Usuarios> Usuarios { get; set; }

        public DbSet<Empresas> Empresas { get; set; }

        public DbSet<Categorias> Categorias { get; set; }

        public DbSet<SubCategorias> SubCategorias { get; set; }

        public DbSet<CategoriasSubcategorias> CategoriasSubcategorias { get; set; }

        public DbSet<Roles> Roles { get; set; }

        public DbSet<Sedes> Sedes { get; set; }

        public DbSet<Municipios> Municipios { get; set; }

        public DbSet<ImagenesMunicipio> ImagenesMunicipio { get; set; }
        
        public DbSet<ImagenesEmpresa> ImagenesEmpresa { get; set; }
        
        public DbSet<TiposSede> TiposSede { get; set; }

    }
}
