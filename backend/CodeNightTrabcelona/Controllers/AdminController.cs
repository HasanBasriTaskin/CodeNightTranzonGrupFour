using CodeNightTrabcelona.BusinessLayer.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeNightTrabcelona.API.Controllers
{
    // [Authorize(Roles = "Admin")] // Şimdilik rol kontrolü yok, sadece token yeterli
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : CustomBaseController
    {
        private readonly IDataImportService _dataImportService;

        public AdminController(IDataImportService dataImportService)
        {
            _dataImportService = dataImportService;
        }

        [HttpPost("import-usage")]
        public async Task<IActionResult> ImportUsage(IFormFile file)
        {
            var response = await _dataImportService.ImportUsageDataAsync(file);
            return CreateActionResult(response);
        }
    }
}
