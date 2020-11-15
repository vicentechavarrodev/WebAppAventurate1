using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaUsuarios:Usuarios
    {

        [JsonProperty(PropertyName = "EsActivo")]
        public string EsActivo { get; set; }

        [JsonProperty(PropertyName = "Roles")]
        public List<VistaRole> Roles { get; set; }

        [JsonProperty(PropertyName = "RepetirContrasena")]
        public string RepetirContrasena
        {
            get
            {
                if (this.Contrasena != null)
                {
                    return this.Contrasena;
                }

                return "";
            }

            set
            {

                this.RepetirContrasena = value; ;
            }
        }
    }
}
