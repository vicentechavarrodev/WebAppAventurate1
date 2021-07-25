using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApp.Class;
using WebApp.Helpers;

namespace WebApp.Controllers
{
        [Produces("application/json")]
        [Route("api/[controller]")]
    public class CategoriasController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;

        public CategoriasController(IWebHostEnvironment env, DataContext dataContext)
        {
            db = dataContext;
            _env = env;
        }

     


        [HttpGet]
        [Route("Index")]
        public async Task<JsonResult> Index()
        {
            try
            {
                var categorias = await  db.Categorias.OrderBy( c => c.Orden).ToListAsync();

                return Json(new Response { IsSuccess = true, Message = "", Result = categorias });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }



        


        [HttpPost, DisableRequestSizeLimit]
        [Route("Crear")]
        public async  Task<JsonResult> Crear()
        {
            
            var files = HttpContext.Request.Form.Files;
            
            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(_env.ContentRootPath, "images/categorias");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var categoria = new Categorias
                        {
                            Nombre = form["Nombre"],
                            UrlImagen = "categorias/" + FileName,
                            Orden = int.Parse( form["Orden"])

                        };
                        db.Categorias.Add(categoria);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                    }
                    else
                    {

                        return Json(new Response { IsSuccess = false, Message = "No se logro guardar la imagen " + Directory.GetCurrentDirectory(), Result = null });
                    }


                    return Json(new Response { IsSuccess = true, Message = "Categoría creada correctamente", Result = null });

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
           
                var categoria = await db.Categorias.Where(u => u.IdCategoria == id).FirstOrDefaultAsync();
                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = categoria });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("Editar")]
        public async Task<JsonResult> Editar()
        {

            var files = HttpContext.Request.Form.Files;


            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/categorias");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var Nombre = form["Nombre"];
            var Id = int.Parse( form["IdCategoria"]);
            var UrlImagen = form["UrlImagen"];
            bool archivoBorrado = false;
            var categoria = await db.Categorias.Where(u => u.IdCategoria == Id).FirstOrDefaultAsync();

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";
                    if (files.Count() > 0)
                    {
                        archivoBorrado = FilesHelper.DeleteFile(ruta, UrlImagen.Substring(UrlImagen.IndexOf("/") + 1));
                        if (archivoBorrado)
                        {
                            var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                            if (imagenGuardada)
                            {
                                categoria.UrlImagen = "categorias/" + FileName;
                            }
                            else
                            {
                                categoria.UrlImagen = "categorias/default.png";
                            }
                        }
                    }



                    categoria.Orden = int.Parse(form["Orden"]);
                    categoria.Nombre = form["Nombre"];
                    db.Entry(categoria).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Categoría actualizada correctamente", Result = categoria });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }

            }
           
        }

        [HttpPost]
        [Route("Delete/{id}")]
        public async Task<JsonResult> Delete([FromRoute] int id)
        {

            try
            {
                var cs = db.CategoriasSubcategorias.Any(c => c.IdCategoria == id);
                if (cs)
                {
                    return Json(new Response { IsSuccess = true, Message = "No se pudo eliminar esta categoria, porque esta asociada a una Categoría-Subcategoría", Result = null });
                }

                var c = db.Categorias.First(c => c.IdCategoria == id);
                db.Categorias.Remove(c);
                await db.SaveChangesAsync();
                return Json(new Response { IsSuccess = true, Message = "Categoría eliminada correctamente", Result = c });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
            }

        }


    }
}
