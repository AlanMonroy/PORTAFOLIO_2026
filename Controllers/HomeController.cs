using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PORTAFOLIO_2026.Models;
using System.Diagnostics;
using System.Text.Json;

namespace PORTAFOLIO_2026.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public ActionResult Proyectos(int proyecto_id)
        {
            /*var json = System.IO.File.ReadAllText("wwwroot/proyectos.json");
            var lista = JsonSerializer.Deserialize<List<ProyectosViewModel>>(json);
            var model = lista.FirstOrDefault(p => p.id == proyecto_id);*/
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "proyectos.json");

            if (!System.IO.File.Exists(path))
            {
                return NotFound("No existe el archivo JSON");
            }

            var json = System.IO.File.ReadAllText(path);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var lista = JsonSerializer.Deserialize<List<ProyectosViewModel>>(json, options)
                        ?? new List<ProyectosViewModel>();

            var model = lista.FirstOrDefault(p => p.id == proyecto_id);

            if (model == null)
            {
                return NotFound($"No se encontró el proyecto con id {proyecto_id}");
            }

            return View(model);
        }
    }
}
