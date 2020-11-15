using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Categorias
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdCategoria")]
        public int IdCategoria { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(30, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "UrlImagen")]
        [JsonProperty(PropertyName = "UrlImagen")]
        public string UrlImagen { get; set; }

        [JsonProperty(PropertyName = "Orden")]
        [Display(Name = "Orden")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        public int? Orden { get; set; }
    }
}
