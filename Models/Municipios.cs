using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class Municipios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [JsonProperty(PropertyName = "IdMunicipio")]
        public int IdMunicipio { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(20, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Clima")]
        [JsonProperty(PropertyName = "Clima")]
        public string Clima { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Descripción")]
        [JsonProperty(PropertyName = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Festividades")]
        [JsonProperty(PropertyName = "Festividades")]
        public string Festividades { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Latitud")]
        [JsonProperty(PropertyName = "Latitud")]
        public string Latitud { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Longitud")]
        [JsonProperty(PropertyName = "Longitud")]
        public string Longitud { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "UrlImagen")]
        [JsonProperty(PropertyName = "UrlImagen")]
        public string UrlImagen { get; set; }
        [Display(Name = "Tips")]
        [JsonProperty(PropertyName = "Tips")]
        public string Tips { get; set; }

        [Display(Name = "QueHacer")]
        [JsonProperty(PropertyName = "QueHacer")]
        public string QueHacer { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sedes> Sedes { get; set; }

        [JsonProperty(PropertyName = "ImagenesMunicipio")]
        public virtual ICollection<ImagenesMunicipio> ImagenesMunicipio { get; set; }

    }
}
