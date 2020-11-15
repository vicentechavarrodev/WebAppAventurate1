using EfCore.Shaman;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
 public   class CategoriasSubcategorias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdCategoriaSubcategoria")]
        public int IdCategoriaSubcategoria { get; set; }
        [Display(Name = "IdSubcategoria")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdSubCategoria")]
        public int IdSubCategoria { get; set; }

        [Display(Name = "IdCategoria")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdCategoria")]
        public int IdCategoria { get; set; }


        [JsonProperty(PropertyName = "SubCategoria")]
        public virtual SubCategorias SubCategoria { get; set; }


        [JsonProperty(PropertyName = "Categoria")]
        public virtual Categorias Categoria { get; set; }

        [JsonIgnore]
        public virtual ICollection<Sedes> Sedes { get; set; }

    }
}
