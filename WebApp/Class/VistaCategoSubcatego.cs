using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaCategoSubcatego: CategoriasSubcategorias
    {
        [JsonProperty(PropertyName = "NombreSubcategoria")]
        public string NombreSubcategoria { get; set; }
    }
}
