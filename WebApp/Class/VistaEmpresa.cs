using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaEmpresa : Empresas
    {
        public string EsActiva { get; set; }

        public int NumeroSedes { get; set; }

        public string NombreUsuario { get; set; }

        public string ApellidoUsuario { get; set; }

        public new List<VistaSedes> SedesEmpresa { get; set; }

        public new List<VistaUsuarios> Usuarios { get; set; }
    }
}
