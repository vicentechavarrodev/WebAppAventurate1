using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApp.Class;

namespace WebApp.Controllers
{

    [Route("api/[controller]")]
    public class EmpresasController : Controller
    {
        private readonly DataContext db;

        public EmpresasController(DataContext dataContext)
        {
            db = dataContext;
        }

        [HttpPost]
        [Route("Index")]
        public async Task<JsonResult> Index([FromBody] VistaFiltro vista)
        {
            List<Sedes> sedes;

            sedes = await db.Sedes.Include(i => i.CategoriaSubcategoria.SubCategoria).ToListAsync();

            if (vista.IdMunicipio == 0)
            {

                sedes = (from cs in vista.CategoriasSubcategorias
                                join sede in sedes
                                on cs.IdCategoriaSubcategoria equals sede.IdCategoriaSubcategoria
                                select sede).ToList();

            }
            else
            {
                sedes = (from cs in vista.CategoriasSubcategorias
                         join sede in sedes
                         on cs.IdCategoriaSubcategoria equals sede.IdCategoriaSubcategoria
                         where sede.IdMunicipio== vista.IdMunicipio
                         select sede).ToList();
            }


            return Json(new Response { IsSuccess = true, Message = "", Result = sedes });
        }

        [HttpGet]
        [Route("Index")]
        public async Task<JsonResult> Index()
        {
            try
            {
                var empresas = await (from e in db.Empresas
                                      select new VistaEmpresa()

                                      {
                                          IdEmpresa = e.IdEmpresa,
                                          Nombre = e.Nombre,
                                          EsActiva = e.Activa ? "SI" : "NO",
                                          NumeroSedes = e.Sedes.Count(),
                                          NombreUsuario = e.Usuario.Nombres,
                                          ApellidoUsuario = e.Usuario.Apellidos,
                                          SedesEmpresa = (from s in e.Sedes
                                                          select new VistaSedes()
                                                          {
                                                              Nombre = s.Nombre,
                                                              Telefono = s.Telefono,
                                                              IdEmpresa = s.IdEmpresa,
                                                              IdSede = s.IdSede,
                                                              Descripcion= s.Descripcion,
                                                              NombreTipoSede= s.TipoSede.Nombre
                                                               
                                                          }).ToList()

                                      }).OrderBy(u => u.Nombre).ToListAsync();

                return Json(new Response { IsSuccess = true, Message = "", Result = empresas });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }


        [HttpGet]
        [Route("Crear")]
        public async Task<JsonResult> Crear()
        {
            try
            {
                var usuarios = await (from u in db.Usuarios
                                      where u.IdRole == 2
                                      select new VistaUsuarios() { IdUsuario = u.IdUsuario, Nombres = u.Nombres, Apellidos = u.Apellidos, Codigo = u.Codigo }
                              ).OrderBy(u => u.Nombres).ToListAsync();

                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = new VistaEmpresa { Usuarios = usuarios } });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaEmpresa { Usuarios = null } });
            }

        }


        [HttpPost]
        [Route("Crear")]
        public async Task<JsonResult> Crear([FromBody] Empresas empresa)
        {
            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    db.Empresas.Add(empresa);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Empresa creada correctamente", Result = empresa });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
                }

            }

        }


        [HttpGet]
        [Route("Editar/{id}")]
        public async Task<JsonResult> Editar([FromRoute] int? id)
        {
            try
            {
                var usuarios = await (from u in db.Usuarios
                                      where u.IdRole == 2
                                      select new VistaUsuarios() { IdUsuario = u.IdUsuario, Nombres = u.Nombres, Apellidos = u.Apellidos }
                             ).OrderBy(u => u.Nombres).ToListAsync();

                var empresa = await db.Empresas.Where(e => e.IdEmpresa == id).FirstOrDefaultAsync();
                var vistaEmpresa = ToVistaEmpresa(empresa);
                vistaEmpresa.Usuarios = usuarios;

                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = vistaEmpresa });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }


        [HttpPost]
        [Route("Editar")]
        public async Task<JsonResult> Editar([FromBody] Empresas empresa)
        {
            try
            {

                db.Entry(empresa).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Json(new Response { IsSuccess = true, Message = "Empresa actualizada correctamente", Result = empresa });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }



        private VistaEmpresa ToVistaEmpresa(Empresas empresa)
        {
            return new VistaEmpresa
            {
                IdEmpresa = empresa.IdEmpresa,
                Nombre = empresa.Nombre,
                Activa = empresa.Activa,
                IdUsuario = empresa.IdUsuario,


            };
        }
    }
}
