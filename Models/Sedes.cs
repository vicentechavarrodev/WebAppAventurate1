using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Sedes
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdSede")]
        public int IdSede { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Descripcion")]
        [JsonProperty(PropertyName = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Anexo")]
        [JsonProperty(PropertyName = "Anexo")]
        public string Anexo { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(12, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Telefono")]
        [JsonProperty(PropertyName = "Telefono")]
        public string Telefono { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(12, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Celular")]
        [Display(Name = "Celular")]
        public string Celular { get; set; }
        [Display(Name = "Horarios")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Horarios")]
        public string Horarios { get; set; }
        [Display(Name = "Direccion")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Direccion")]
        public string Direccion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Activa")]
        [JsonProperty(PropertyName = "Activa")]
        public bool Activa { get; set; }
        [DataType(DataType.ImageUrl)]
        [JsonProperty(PropertyName = "Imagen")]
        public string Imagen { get; set; }
        [JsonProperty(PropertyName = "FechaRegistro")]
        [Display(Name = "FechaRegistro")]
        [DataType(DataType.DateTime)]
        public DateTime FechaRegistro { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Latitud")]
        [JsonProperty(PropertyName = "Latitud")]
        public string  Latitud { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Longitud")]
        [JsonProperty(PropertyName = "Longitud")]
        public string Longitud { get; set; }
        [Display(Name = "Precio")]
        [JsonProperty(PropertyName = "Precio")]
        public string Precio { get; set; }
        [Display(Name = "InstagramUrl")]
        [JsonProperty(PropertyName = "InstagramUrl")]
        public string InstagramUrl { get; set; }
        [Display(Name = "NombreInstagram")]
        [JsonProperty(PropertyName = "NombreInstagram")]
        public string NombreInstagram { get; set; }
        [Display(Name = "FacebookUrl")]
        [JsonProperty(PropertyName = "FacebookUrl")]
        public string FacebookUrl { get; set; }
        [Display(Name = "NombreFacebook")]
        [JsonProperty(PropertyName = "NombreFacebook")]
        public string NombreFacebook { get; set; }

        [Display(Name = "Correo")]
        [JsonProperty(PropertyName = "Correo")]
        public string Correo { get; set; }
        [Display(Name = "Tips")]
        [JsonProperty(PropertyName = "Tips")]
        public string Tips { get; set; }
        [Display(Name = "Pagina")]
        [JsonProperty(PropertyName = "Pagina")]
        public string Pagina { get; set; }
        [Display(Name = "TwitterUrl")]
        [JsonProperty(PropertyName = "TwitterUrl")]
        public string TwitterUrl { get; set; }
        [Display(Name = "NombreTwitter")]
        [JsonProperty(PropertyName = "NombreTwitter")]
        public string NombreTwitter { get; set; }

        [JsonProperty(PropertyName = "IdMunicipio")]
        [Display(Name = "Municipio")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        public int IdMunicipio { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdCategoriaSubcategoria")]
        public int IdCategoriaSubcategoria { get; set; }

        [Display(Name = "Empresa")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdEmpresa")]
        public int IdEmpresa { get; set; }

        [Display(Name = "Sede")]
        [JsonProperty(PropertyName = "IdTipoSede")]
        public int? IdTipoSede { get; set; }

        [JsonIgnore]
        public virtual TiposSede TipoSede { get; set; }

        [JsonIgnore]
        public virtual Empresas Empresa { get; set; }

        [JsonIgnore]
        public virtual Municipios Municipio { get; set; }

        [JsonProperty(PropertyName = "CategoriaSubcategoria")]
        public virtual CategoriasSubcategorias CategoriaSubcategoria { get; set; }

        [JsonProperty(PropertyName = "ImagenesEmpresa")]
        public virtual ICollection<ImagenesEmpresa> ImagenesEmpresa { get; set; }

    }
}
