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
    public class SubCategoriasController : Controller
    {
       
        private readonly DataContext db;

        public SubCategoriasController(DataContext dataContext)
            {
                db = dataContext;
            }

        [HttpGet]
        [Route("Index/{IdCategoria}")]
        public async Task<JsonResult> Index([FromRoute] int IdCategoria)
            {
            List<CategoriasSubcategorias> catSub = new List<CategoriasSubcategorias>();
            catSub.AddRange( await db.CategoriasSubcategorias.Include(i => i.Categoria  ).Include(i => i.SubCategoria).Where(c => c.IdCategoria == IdCategoria).ToListAsync());
            return Json(new Response { IsSuccess = true, Message = "", Result = catSub.OrderBy( s => s.IdCategoriaSubcategoria) });
            }

        [HttpGet]
        [Route("CatSub/{id}")]
        public async Task<JsonResult> CatSub([FromRoute] int id)
        {
            try
            {
                var catsub = await db.CategoriasSubcategorias.Include(sub => sub.SubCategoria).Where(cs => cs.IdCategoria == id).ToListAsync();
                var vista = (from cs in db.CategoriasSubcategorias
                             where cs.IdCategoria == id
                             select ToVistaCategoriasSubcategorias(cs)).ToList();

                return Json(new Response { IsSuccess = true, Message = "", Result = vista });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }

        [HttpPost]
        [Route("CatSubDelete/{id}")]
        public async Task<JsonResult> CatSubDelete([FromRoute] int id)
        {
            try
            {
                var q = db.CategoriasSubcategorias.First(c => c.IdCategoriaSubcategoria == id);
                db.CategoriasSubcategorias.Remove(q);
                await db.SaveChangesAsync();
                return Json(new Response { IsSuccess = true, Message = "", Result = q });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }

        [HttpGet]
        [Route("Index")]
        public async Task<JsonResult> Index()
        {
            try
            {
                var subcategorias = await db.SubCategorias.ToListAsync();

                return Json(new Response { IsSuccess = true, Message = "", Result = subcategorias });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("Crear")]
        public async Task<JsonResult> Crear()
        {

            var files = HttpContext.Request.Form.Files;

            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/subcategorias");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".svg";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var subcategoria = new SubCategorias
                        {
                            Nombre = form["Nombre"],
                            UrlImagen = "subcategorias/" + FileName,

                        };
                        db.SubCategorias.Add(subcategoria);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                    }
                    else
                    {

                        return Json(new Response { IsSuccess = false, Message = "No se logro guardar la imagen ", Result = null });
                    }


                    return Json(new Response { IsSuccess = true, Message = "SubCategoría creada correctamente", Result = null });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }

            }

        }


        [HttpPost]
        [Route("CrearCategoriaSubcategoria")]
        public async Task<JsonResult> CrearCategoriaSubcategoria([FromBody] VistaCateSub param  )
        {

           

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    var catSub = new CategoriasSubcategorias { IdSubCategoria = param.IdSubCategoria, IdCategoria = param.IdCategoria };
                    db.CategoriasSubcategorias.Add(catSub);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Creada correctamente", Result = catSub });

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

                var subcategoria = await db.SubCategorias.Where(u => u.IdSubCategoria == id).FirstOrDefaultAsync();
                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = subcategoria });
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


            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/subcategorias");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var Nombre = form["Nombre"];
            var Id = int.Parse(form["IdSubCategoria"]);
            var UrlImagen = form["UrlImagen"];
            bool archivoBorrado = false;
            var subcategoria = await db.SubCategorias.Where(u => u.IdSubCategoria == Id).FirstOrDefaultAsync();

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".svg";
                    if (files.Count() > 0)
                    {
                        archivoBorrado = FilesHelper.DeleteFile(ruta, UrlImagen.Substring(UrlImagen.IndexOf("/") + 1));
                        if (archivoBorrado)
                        {
                            var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                            if (imagenGuardada)
                            {
                                subcategoria.UrlImagen = "subcategorias/" + FileName;
                            }
                            else
                            {
                                subcategoria.UrlImagen = "subcategorias/default.png";
                            }
                        }
                    }


                    subcategoria.Nombre = form["Nombre"];
                    db.Entry(subcategoria).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "SubCategoría actualizada correctamente", Result = subcategoria });

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
                var cs = db.CategoriasSubcategorias.Any(c => c.IdSubCategoria == id);
                if (cs)
                {
                    return Json(new Response { IsSuccess = true, Message = "No se pudo eliminar esta subcategoria, porque esta asociada a una Categoría-Subcategoría", Result = null });
                }

                var s = db.SubCategorias.First(c => c.IdSubCategoria == id);
                db.SubCategorias.Remove(s);
                await db.SaveChangesAsync();
                return Json(new Response { IsSuccess = true, Message = "SubCategoría eliminada correctamente", Result = s });

            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }

        }

        private VistaCategoSubcatego ToVistaCategoriasSubcategorias(CategoriasSubcategorias catSub)
        {
            return new VistaCategoSubcatego
            {
                IdCategoria = catSub.IdCategoria,
                IdCategoriaSubcategoria = catSub.IdCategoriaSubcategoria,
                IdSubCategoria = catSub.IdSubCategoria,
                NombreSubcategoria = catSub.SubCategoria.Nombre,
                SubCategoria= catSub.SubCategoria

            };
        }
    }
}
