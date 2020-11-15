using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaCategoria
    {
        public IFormFile File { get; set; }
        public string Nombre { get; set; }
        public dynamic Imagen { get; set; }
    }
}
