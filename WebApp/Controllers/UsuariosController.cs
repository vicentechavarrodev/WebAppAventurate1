using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApp.Class;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UsuariosController : Controller
    {
        private readonly DataContext db;

        public UsuariosController(DataContext dataContext)
        {
            db = dataContext;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<JsonResult> Login([FromBody] VistaLogin vista)
        {


            try
            {
             
                 var   user = await db.Set<Usuarios>().Where(u => u.Codigo.ToLower() == vista.codigo.ToLower()).FirstOrDefaultAsync();

                if (user == null)
                {
                    return Json(new Response { IsSuccess = false, Message = "Este usuario no existe.", Result = null });

                }

                user = ToVistaUsuario(user);

                if (vista.contrasena != user.Contrasena)
                {
                    return Json(new Response { IsSuccess = false, Message = "Contraseña incorrecta", Result = null });

                }

                if (!user.Activo)
                {
                    return Json(new Response { IsSuccess = false, Message = "Usuario inactivo", Result = null });
                }
                user.Contrasena = "";

                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = user });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });

            }

        }


        [HttpGet]
        [Route("Index")]
        public async Task<JsonResult> Index()
        {
            try
            {
                var usuarios = await (from u in db.Usuarios
                                      where u.IdRole != 1
                                      select new VistaUsuarios()
                                      {
                                          Identificacion = u.Identificacion,
                                          IdUsuario = u.IdUsuario,
                                          Nombres = u.Nombres,
                                          Apellidos = u.Apellidos,
                                          EsActivo = u.Activo ? "SI" : "NO",
                                          Contrasena = u.Contrasena,
                                          Codigo = u.Codigo,
                                          Celular = u.Celular,
                                          Correo = u.Correo,
                                          IdRole = u.IdRole,
                                     

                                      }).OrderBy(u => u.Nombres).ToListAsync();

                return Json(new Response { IsSuccess = true, Message = "", Result = usuarios });

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
                var roles = await (from r in db.Roles
                                   where r.IdRole != 1
                                   select new VistaRole() { IdRole = r.IdRole, Nombre = r.Nombre, Codigo = r.Codigo }
                              ).OrderBy(u => u.Nombre).ToListAsync();
                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = new VistaUsuarios { Roles = roles } });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaUsuarios { Roles = null } });
            }

        }



        [HttpPost]
        [Route("Crear")]
        public async Task<JsonResult> Crear([FromBody] Usuarios usuario)
        {
            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    usuario.Activo = true;
                    usuario.FechaRegistro = DateTime.Now;
                    usuario.Contrasena = usuario.Contrasena;
                    
                    db.Usuarios.Add(usuario);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Usuario creado correctamente", Result = usuario });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }

            }

        }


        [HttpGet]
        [Route("Editar/{id}")]
        public async Task<JsonResult> Editar([FromRoute] int id)
        {
            try
            {
                var roles = await (from r in db.Roles
                                   where r.IdRole != 1
                                   select new VistaRole() { IdRole = r.IdRole, Nombre = r.Nombre, Codigo = r.Codigo }
                             ).OrderBy(u => u.Nombre).ToListAsync();

                var usuario = await db.Usuarios.Where(u => u.IdUsuario == id).FirstOrDefaultAsync();
                var vistaUsuario = ToVistaUsuario(usuario);
                vistaUsuario.Roles = roles;
                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = vistaUsuario });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }


        [HttpPost]
        [Route("Editar")]
        public async Task<JsonResult> Editar([FromBody] Usuarios usuario)
        {
            try
            {
                usuario.Contrasena = usuario.Contrasena;

                db.Entry(usuario).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Json(new Response { IsSuccess = true, Message = "Usuario actualizado correctamente", Result = usuario });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
            }
        }

        [HttpPost]
        [Route("CrearContacto")]
        public async Task<JsonResult> CrearContacto([FromBody] VistaContacto contacto)
        {
            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string mensaje = contacto.Nombre + "  <br/> " + contacto.Correo + "  <br/> " + contacto.Telefono + "  <br/> " + contacto.Mensaje;
                    await  MailHelper.SendMail(contacto.Correo, "Contacto Aventurate", mensaje);
                    return Json(new Response { IsSuccess = true, Message = "Gracias por contactarte con nosotros,nos comunicaremos contígo muy pronto." });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }

            }

        }


        private VistaUsuarios ToVistaUsuario(Usuarios usuario)
        {
            return new VistaUsuarios
            {
                Identificacion = usuario.Identificacion,
                IdUsuario = usuario.IdUsuario,
                Nombres = usuario.Nombres,
                Apellidos = usuario.Apellidos,
                Activo = usuario.Activo,
                Contrasena = usuario.Contrasena,
                Codigo = usuario.Codigo,
                IdRole = usuario.IdRole,
                Celular = usuario.Celular,
                Correo = usuario.Correo,
                Genero = usuario.Genero,
                Direccion = usuario.Direccion,
                Telefono = usuario.Telefono,
                FechaNacimiento = usuario.FechaNacimiento,
                FechaRegistro = usuario.FechaRegistro
            };
        }




    }
}
