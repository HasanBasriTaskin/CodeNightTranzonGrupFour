using AutoMapper;
using CodeNightTrabcelona.BusinessLayer.Abstract;
using CodeNightTrabcelona.BusinessLayer.DTOs.UsageDtos;
using CodeNightTrabcelona.DAL.Abstract;
using CodeNightTrabcelona.EntityLayer.Commons;
using CodeNightTrabcelona.EntityLayer.Concrete;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;
using System.Globalization;

namespace CodeNightTrabcelona.BusinessLayer.Concrete
{
    public class DataImportManager : IDataImportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DataImportManager(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<NoContentDto>> ImportUsageDataAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return Response<NoContentDto>.Fail(400, "Dosya yüklenemedi.");

            if (!file.FileName.EndsWith(".csv"))
                return Response<NoContentDto>.Fail(400, "Lütfen geçerli bir CSV dosyası yükleyin.");

            try
            {
                using (var stream = new StreamReader(file.OpenReadStream()))
                using (var csv = new CsvReader(stream, new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    PrepareHeaderForMatch = args => args.Header.ToLower(), // Header eşleşmesi (case-insensitive)
                    MissingFieldFound = null // Eksik alan varsa hata fırlatma
                }))
                {
                    // CSV'den okuma
                    // CSV başlıkları: user_id, date, internet_gb, game_hours, music_min, film_min
                    // DTO propertyleri ile eşleşmesi için ClassMap kullanabiliriz veya Attribute
                    // Basitlik için ClassMap tanımlayalım (Private class olarak)
                    
                    csv.Context.RegisterClassMap<DailyUsageCsvMap>();
                    var records = csv.GetRecords<CreateDailyUsageDto>().ToList();

                    foreach (var record in records)
                    {
                        // User var mı kontrolü? (Performans için toplu kontrol yapılabilir ama şimdilik basit tutuyoruz)
                        // Eğer UserId boş gelirse veya DB'de yoksa atla
                        if (record.UserId == Guid.Empty) continue;

                        var usage = _mapper.Map<DailyUsage>(record);
                        
                        // Karbon Hesabı (DailyUsageManager'daki mantıkla aynı olmalı)
                        usage.TotalCarbonEmission = CalculateCarbonEmission(usage);

                        await _unitOfWork.DailyUsages.InsertAsync(usage);
                    }

                    await _unitOfWork.SaveAsync();
                }

                return Response<NoContentDto>.Success(200);
            }
            catch (Exception ex)
            {
                return Response<NoContentDto>.Fail(500, $"Import hatası: {ex.Message}");
            }
        }

        private decimal CalculateCarbonEmission(DailyUsage usage)
        {
            return (usage.InternetUsageGb * 55) +
                   (usage.GameTimeHours * 75) +
                   (usage.MusicTimeMinutes * 0.2m) +
                   (usage.VideoTimeMinutes * 0.4m);
        }

        // CSV Mapping Sınıfı
        private class DailyUsageCsvMap : ClassMap<CreateDailyUsageDto>
        {
            public DailyUsageCsvMap()
            {
                Map(m => m.UserId).Name("user_id");
                Map(m => m.Date).Name("date");
                Map(m => m.InternetUsageGb).Name("internet_gb");
                Map(m => m.GameTimeHours).Name("game_hours");
                Map(m => m.MusicTimeMinutes).Name("music_min");
                Map(m => m.VideoTimeMinutes).Name("film_min");
            }
        }
    }
}
