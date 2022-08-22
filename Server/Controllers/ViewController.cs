using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Duapp.Controllers
{
    [Route("")]
    public class ViewController : Controller
    {
        private readonly ILogger<ViewController> _logger;
        public ViewController(ILogger<ViewController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}