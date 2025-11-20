📄 Teknik Şartname: Turkcell GreenConnect
Proje: Turkcell GreenConnect – Yeşil Yaşam Takip Sistemi
Versiyon: 1.0
Tarih: 20 Kasım 2025
Durum: Taslak (Draft)
1. Proje Özeti ve Teknoloji Mimarisi
Bu proje, Turkcell müşterilerinin dijital servis kullanımlarından (Superonline, TV+, Fizy, Game+, Paycell) kaynaklanan karbon ayak izini hesaplayan, takip eden ve oyunlaştırma (gamification) kurgusuyla azaltmayı teşvik eden bir web uygulamasıdır.
1.1. Teknoloji Yığını (Tech Stack)
Proje, modern ve ölçeklenebilir bir mimari üzerine inşa edilecektir.
Backend (Sunucu Tarafı)
Framework: .NET 8 Web API
Veritabanı: PostgreSQL (Docker üzerinde)
ORM: Entity Framework Core (Code-First yaklaşımı)
Kütüphaneler:
AutoMapper:  dönüşümleri için. Kod tekrarını önler ve veri güvenliğini sağlar.
CsvHelper: users.csv, usage.csv gibi dış kaynak verilerini import etmek için.
FluentValidation: İş kuralları validasyonu (Örn: Hedef 0'dan küçük olamaz).
Swagger/OpenAPI: API dökümantasyonu ve test arayüzü.
Frontend (İstemci Tarafı)
Framework: Next.js 14+ (App Router)
Auth: NextAuth.js (v5) (Session yönetimi ve AuthContext sağlayıcısı).
UI Kütüphanesi: shadcn/ui + Tailwind CSS (Yeşil tema uyumu: #059669, #86efac).
State Management: TanStack Query (React Query) – Server state yönetimi.
Form Yönetimi: React Hook Form + Zod (Schema validation).
Görselleştirme: Recharts (Karbon grafikleri).
Bildirimler: Sonner (Toast notifications).
Kaydırmalı şeyler için motionui gibi bir şey vardı.

AI & Otomasyon (Bonus Modül)
n8n: Kural tabanlı sistemi aşan durumlar için yapay zeka destekli (OpenAI entegreli) kişisel öneri motoru.
2. Fonksiyonel Gereksinimler
Sistem aşağıdaki temel fonksiyonları yerine getirecektir:
2.1. Veri İşleme Modülü
Sistem, harici CSV/JSON dosyalarından kullanıcı ve kullanım verilerini (Internet GB, Oyun Saati, Müzik Dk, vb.) içe aktarabilmelidir.
İçe aktarılan ham veriler, belirlenen formül ile işlenerek TotalCarbonEmission değerine dönüştürülmelidir.
2.2. Dashboard ve Takip
Kullanıcılar günlük, haftalık ve aylık karbon tüketimlerini grafiksel olarak görüntüleyebilmelidir.
Kullanıcılar kendilerine haftalık bir "Karbon Limiti" (örn: < 500g) belirleyebilmelidir.
Anlık durum, bir "Progress Bar" (İlerleme Çubuğu) üzerinden yüzdesel olarak (%60 doldu) gösterilmelidir.
2.3. Oyunlaştırma (Gamification)
Yeşil Jeton: Haftalık hedefini tutturan kullanıcılara sistem tarafından otomatik "Yeşil Jeton" tanımlanmalıdır.
Rozetler (Badges): Haftalık ortalama karbon tüketimine göre kullanıcı profiline otomatik rozet atanmalıdır:
< 100g: Green Hero
< 250g: Gold
< 500g: Silver
Liderlik Tablosu (Leaderboard): Takımların (Grupların) haftalık ortalama karbon tüketimine göre sıralandığı bir liste sunulmalıdır.
2.4. Akıllı Öneri Sistemi
Kural Bazlı (Zorunlu): Sistem, tanımlı eşik değerler aşıldığında (Örn: >10 GB İnternet) statik uyarı mesajları üretmelidir.
AI Destekli (n8n): Kritik seviyedeki kullanıcılar için n8n webhook tetiklenerek LLM tabanlı, kişiselleştirilmiş ve motive edici öneriler oluşturulmalıdır.



3. Veri Modeli Tasarımı (ER Şeması)
Veritabanı ilişkisel yapıda kurgulanmıştır. Guid tipi ID'ler kullanılarak dağıtık yapıya uygunluk sağlanır.
Tablo 1: Users (Kullanıcılar)
Kullanıcı temel bilgilerini tutar.
| Alan Adı | Tip | Açıklama |
| :--- | :--- | :--- |
| Id | Guid (PK) | Benzersiz Kimlik |
| FullName | String | Ad Soyad |
| Email | String | Giriş ve bildirim için |
| WeeklyGoal | Decimal | Hedeflenen Max Karbon (gCO2) |
| CurrentBalance | Int | Kazanılan Yeşil Jeton Bakiyesi |
| GroupId | Guid (FK) | Bağlı olduğu takımın ID'si |
Tablo 2: DailyUsages (Günlük Kullanımlar)
Tüm tüketim verilerinin ve hesaplanan karbonun tutulduğu tablo.
| Alan Adı | Tip | Açıklama |
| :--- | :--- | :--- |
| Id | Guid (PK) | Benzersiz Kimlik |
| UserId | Guid (FK) | Hangi kullanıcıya ait? |
| Date | DateTime | Verinin tarihi |
| InternetUsageGb | Decimal | Superonline verisi |
| GameTimeHours | Decimal | Game+ verisi |
| MusicTimeMinutes | Decimal | Fizy verisi |
| VideoTimeMinutes | Decimal | TV+ verisi |
| TotalCarbonEmission| Decimal | Hesaplanan günlük toplam |
Tablo 3: Groups (Takımlar/Ligler)
Lig usulü yarışma için kullanıcı grupları.
| Alan Adı | Tip | Açıklama |
| :--- | :--- | :--- |
| Id | Guid (PK) | Benzersiz Kimlik |
| Name | String | Takım adı (Örn: "Turkcell AI Squad") |
| AverageEmission | Decimal | Takımın o haftaki ortalama karbonu |
Tablo 4: Recommendations (Öneriler)
Kullanıcıya sunulan tasarruf önerileri.
| Alan Adı | Tip | Açıklama |
| :--- | :--- | :--- |
| Id | Guid (PK) | Benzersiz Kimlik |
| UserId | Guid (FK) | Öneri kime? |
| Message | String | Öneri metni |
| PotentialSaving | Decimal | Uyulursa tahmini kazanç (gCO2) |
| Source | Enum | RuleBased veya AI_n8n |
| CreatedAt | DateTime | Öneri tarihi |
Tablo 5: Badges (Rozetler)
Kazanılan başarı rozetleri.
| Alan Adı | Tip | Açıklama |
| :--- | :--- | :--- |
| Id | Guid (PK) | Benzersiz Kimlik |
| UserId | Guid (FK) | Rozet kime? |
| BadgeType | Enum | GreenHero, Gold, Silver |
| EarnedDate | DateTime | Kazanılma tarihi |
4. Hesaplama Mantığı (Business Logic)
4.1. Karbon Ayak İzi Formülü
Backend tarafında her veri girişinde çalışacak fonksiyon:
$$Karbon (g) = (InternetGB \times 55) + (OyunSaat \times 75) + (MüzikDk \times 0.2) + (FilmDk \times 0.4)$$
4.2. Öneri Kuralları (Rule Engine)
İnternet Limiti: InternetUsageGb > 10
Mesaj: "Veri kullanımını azalt, 550g CO2 tasarruf edebilirsin."
Oyun Limiti: GameTimeHours > 3
Mesaj: "Oyun süreni 1 saat kısaltarak 75g CO2 azalt."
Müzik Limiti: MusicTimeMinutes > 120
Mesaj: "Fizy'de ses kalitesini düşürmeyi dene."


