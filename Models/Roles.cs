using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class Roles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdRole")]
        public int IdRole { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(12, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Codigo")]
        [JsonProperty(PropertyName = "Codigo")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre Role")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Usuarios> Usuarios { get; set; }

     
    }
}
