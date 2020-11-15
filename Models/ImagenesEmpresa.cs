using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class ImagenesEmpresa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdImagenEmpresa")]
        public int IdImagenEmpresa { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "UrlImagen")]
        [JsonProperty(PropertyName = "UrlImagen")]
        public string UrlImagen { get; set; }

        [Display(Name = "Sede")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdSede")]
        public int IdSede { get; set; }
   
        [JsonIgnore]
        public virtual Sedes Sede { get; set; }
    }
}
