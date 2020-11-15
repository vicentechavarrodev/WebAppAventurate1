using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class Usuarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdUsuario")]
        public int IdUsuario { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(12, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Codigo")]
        [JsonProperty(PropertyName = "Codigo")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(12, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Identificación")]
        [JsonProperty(PropertyName = "Identificacion")]
        public string Identificacion { get; set; }

        [MaxLength(30, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombres")]
        [JsonProperty(PropertyName = "Nombres")]
        public string Nombres { get; set; }

        [MaxLength(30, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Apellidos")]
        [JsonProperty(PropertyName = "Apellidos")]
        public string Apellidos { get; set; }

        [MaxLength(9, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Genero")]
        [JsonProperty(PropertyName = "Genero")]
        public string Genero { get; set; }

        [Display(Name = "Fecha Nacimiento")]
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "FechaNacimiento")]
        public DateTime FechaNacimiento { get; set; }

        [MaxLength(10, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Telefono")]
        [JsonProperty(PropertyName = "Telefono")]
        public string Telefono { get; set; }

        [MaxLength(10, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Celular")]
        [JsonProperty(PropertyName = "Celular")]
        public string Celular { get; set; }

        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Dirección")]
        [JsonProperty(PropertyName = "Direccion")]
        public string Direccion { get; set; }

        [MaxLength(50, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Correo")]
        [JsonProperty(PropertyName = "Correo")]
        public string Correo { get; set; }
        [Display(Name = "Contraseña")]
        [JsonProperty(PropertyName = "Contrasena")]
        public string Contrasena { get; set; }

        [Display(Name = "Activo")]
        [JsonProperty(PropertyName = "Activo")]
        public bool Activo { get; set; }

        [Display(Name = "Fecha Registro")]
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "FechaRegistro")]
        public DateTime FechaRegistro { get; set; }

        [Display(Name = "Role")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdRole")]
        public int IdRole { get; set; }

        [JsonIgnore]
        public virtual Roles Role { get; set; }

        [JsonIgnore]
        public virtual ICollection<Empresas> Empresas { get; set; }


        public bool Equals(Usuarios other)
        {
            if (object.ReferenceEquals(other, null)) return false;
            if (object.ReferenceEquals(this, other)) return true;

            return
            this.IdUsuario == other.IdUsuario &
            this.Activo == other.Activo &
            this.Nombres == other.Nombres &
            this.Apellidos == other.Apellidos &
            this.Celular == other.Celular &
            this.Correo == other.Correo &
            this.Contrasena == other.Contrasena &
            this.Codigo == other.Codigo &
            this.Direccion == other.Direccion &
            this.IdRole == other.IdRole &
            this.Genero == other.Genero &
            this.Telefono == other.Telefono &
            this.Identificacion == other.Identificacion &
            this.FechaNacimiento == other.FechaNacimiento &
            this.FechaRegistro == other.FechaRegistro;
        }

        public override int GetHashCode()
        {
            return IdUsuario.GetHashCode();
        }
    }
}
