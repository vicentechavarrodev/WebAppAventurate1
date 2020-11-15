using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaContacto
    {


        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [JsonProperty(PropertyName = "Telefono")]
        public string Telefono { get; set; }
        [JsonProperty(PropertyName = "Correo")]
        public string Correo { get; set; }
        [JsonProperty(PropertyName = "Mensaje")]
        public string Mensaje { get; set; }

    }
}
