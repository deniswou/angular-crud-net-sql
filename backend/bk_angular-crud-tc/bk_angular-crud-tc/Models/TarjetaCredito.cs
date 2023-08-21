using System.ComponentModel.DataAnnotations;

namespace bk_angular_crud_tc.Models
{
    public class TarjetaCredito
    {
        public int Id { get; set; }

        [Required]
        public string Titular { get; set; }

        [Required]
        public string NumTarjeta { get; set; }

        [Required]
        public string FechExp { get; set; }

        [Required]
        public string Cvv { get; set; }

    }
}
