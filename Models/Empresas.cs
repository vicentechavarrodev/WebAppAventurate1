using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Empresas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdEmpresa")]
        public int IdEmpresa { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [Display(Name = "Activa")]
        [JsonProperty(PropertyName = "Activa")]
        public bool Activa { get; set; }
        [Display(Name = "FechaRegistro")]
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "FechaRegistro")]
        public DateTime FechaRegistro { get; set; }
        [Display(Name = "Usuario")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdUsuario")]
        public int IdUsuario { get; set; }

        [JsonIgnore]
        public virtual Usuarios Usuario { get; set; }
        [JsonIgnore]
        public virtual ICollection<Sedes> Sedes { get; set; }
    }
}
