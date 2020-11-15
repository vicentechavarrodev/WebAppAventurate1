using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaSede: Sedes
    {
        public int key { get; set; }

        [JsonProperty(PropertyName = "CategoriasSubcategorias")]
        public new List<VistaCategoSubcatego> CategoriasSubcategorias { get; set; }

        [JsonProperty(PropertyName = "URLImagen1")]
        public string URLImagen1 { get; set; }
        [JsonProperty(PropertyName = "URLImagen2")]
        public string URLImagen2 { get; set; }
        [JsonProperty(PropertyName = "URLImagen3")]
        public string URLImagen3 { get; set; }
        [JsonProperty(PropertyName = "URLImagen5")]
        public string URLImagen5 { get; set; }
        [JsonProperty(PropertyName = "URLImagen4")]
        public string URLImagen4 { get; set; }

        public new List<Categorias> Categorias { get; set; }
        public new List<TiposSede> TiposSede { get; set; }
        public new List<Municipios> Municipios { get; set; }

        [JsonProperty(PropertyName = "IdCategoria")]
        public new int IdCategoria { get; set; }

        [JsonProperty(PropertyName = "SubCategoria")]
        public new SubCategorias SubCategoria { get; set; }

        [JsonProperty(PropertyName = "Municipio")]
        public new Municipios Municipio { get; set; }

        [JsonProperty(PropertyName = "TipoSede")]
        public new TiposSede TipoSede { get; set; }
    }
}
