namespace PORTAFOLIO_2026.Models
{
    public class ProyectosViewModel
    {
        public required int id { get; set; }
        public required string nombre { get; set; }
        public string? descripcion { get; set; }
        public string? url { get; set; }
        public List<string>? imagenes { get; set; }
        public string? video { get; set; }
        public List<string>? tecnologias { get; set; }
    }
}
