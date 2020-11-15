using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Model
{
    public class Empresas
    {
        public int key { get; set; }
        public int IdEmpresa { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        public double Latitud { get; set; }

        public double Longitud { get; set; }

        public string Servicios { get; set; }

        public int IdCategoria { get; set; }
    }
}
