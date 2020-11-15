using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaSedes:Sedes
    {
        public new List<TiposSede> TiposSede { get; set; }
        public new List<Municipios> Municipios { get; set; }

        [JsonProperty(PropertyName = "NombreTipoSede")]
        public new string  NombreTipoSede { get; set; }

    }
}
