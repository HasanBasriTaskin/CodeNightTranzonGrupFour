using CodeNightTrabcelona.EntityLayer.Commons;
using Microsoft.AspNetCore.Http;

namespace CodeNightTrabcelona.BusinessLayer.Abstract
{
    public interface IDataImportService
    {
        Task<Response<NoContentDto>> ImportUsageDataAsync(IFormFile file);
    }
}
