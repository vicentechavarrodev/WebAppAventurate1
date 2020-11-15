using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaMunicipio:Municipios
    {
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
    }
}
