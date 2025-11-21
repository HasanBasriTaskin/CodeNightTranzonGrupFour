using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.AiDtos;
using CodeNightTrabcelona.EntityLayer.Commons;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class AiManager : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AiManager(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Response<AiAnalysisResultDto>> AnalyzeStoryAsync(UserStoryDto storyDto)
        {
            var n8nUrl = _configuration.GetValue<string>("AiSettings:N8nWebhookUrl");
            
            if (string.IsNullOrEmpty(n8nUrl))
            {
                return Response<AiAnalysisResultDto>.Fail(500, "AI Configuration is missing.");
            }

            try
            {
                var response = await _httpClient.PostAsJsonAsync(n8nUrl, storyDto);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return Response<AiAnalysisResultDto>.Fail((int)response.StatusCode, $"AI Service unavailable. Status: {response.StatusCode}, Details: {errorContent}");
                }

                var result = await response.Content.ReadFromJsonAsync<AiAnalysisResultDto>();
                
                if (result == null)
                {
                    return Response<AiAnalysisResultDto>.Fail(500, "AI Service returned empty response.");
                }

                return Response<AiAnalysisResultDto>.Success(200, result);
            }
            catch (Exception ex)
            {
                return Response<AiAnalysisResultDto>.Fail(500, ex.Message);
            }
        }
    }
}

