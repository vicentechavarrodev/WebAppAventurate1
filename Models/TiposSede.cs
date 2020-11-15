using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public class TiposSede
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdTipoSede")]
        public int IdTipoSede { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(30, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sedes> Sedes { get; set; }



    }
}
