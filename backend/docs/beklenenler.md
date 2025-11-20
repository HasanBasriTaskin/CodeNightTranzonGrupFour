Codenight Case: Turkcell GreenConnect – Yeşil Yaşam Takip Sistemi (AI opsiyonel) 
Amaç 
Ekipler, Turkcell müşterilerinin dijital yaşam alışkanlıklarını analiz eden ve karbon ayak izi 
farkındalığı yaratan bir web veya mobil uygulama geliştirir. 
Sistem, Turkcell servislerinden (Superonline, Fizy, TV+, Paycell, Game+) gelen kullanım verilerini 
toplayarak: 
• Günlük karbon tüketimini hesaplar, 
• Haftalık hedeflerle karşılaştırır, 
• Tasarruf önerileri üretir, 
• Kullanıcıyı yeşil davranışlara teşvik eder. 
Yapay zekâ destekli öneri sistemi opsiyonel — isteyen ekip kurallı sistem, isteyen ekip AI 
modeliyle çalışabilir. 
Özellikler (AI’siz çözümle de yapılabilir) 
1. Veri Toplama (Mock Entegrasyon) 
• Superonline → günlük veri kullanımı (GB) 
• Fizy / TV+ → izleme/dinleme süresi (dk) 
• Game+ → oyun süresi (saat) 
• Paycell → alışveriş harcaması (₺) 
Veriler CSV veya JSON olarak sağlanır; manuel import yeterlidir. 
2. Karbon Hesaplama Modülü 
Sabit formül: 
karbon_gram = (internet_gb*55) + (oyun_saat*75) + (müzik_dk*0.2) + (film_dk*0.4) 
Sonuçlar günlük, haftalık ve aylık özetlerde gösterilir. 
3. Yeşil Hedefler ve Bar Takibi 
• Kullanıcı hedef belirler: “Bu hafta < 500 gCO₂” 
• Günlük artış barı → “%60 doldu” 
• Hedef tamamlanırsa Yeşil Jeton kazanır (mock Paycell API). 
4. Kural Bazlı Öneriler (zorunlu) 
Koşul 
Öneri 
internet_gb > 10 “Veri kullanımını azalt, 550g CO₂ tasarruf edebilirsin.” 
oyun_saat > 3 “Oyun süreni 1 saat kısaltarak 75g CO₂ azalt.” 
müzik_dk > 120 “Fizy’de ses kalitesini düşürmeyi dene.” 
İsteyen ekip bu tabloyu “AI öneri motoruna” dönüştürebilir ama zorunlu değil. 
5. Gruplar ve Lig Sistemi 
• Ekipler “Green Team” oluşturur (ör. Turkcell AI Squad). 
• Haftalık ortalama karbon tüketimine göre sıralama yapılır. 
• “Green Leaderboard” ekranı → en düşük ortalama kazanır. 
6. Yeşil Jeton ve Rozetler 
• 500g altında → Silver  
• 250g altında → Gold  
• 100g altında → Green Hero  
• Jetonlar Paycell hesabına işlenir (mock). 
Veri Modeli (CSV Önerisi) 
users.csv 
user_id,name,city,eco_level,weekly_goal_g,group_id 
usage.csv 
user_id,date,internet_gb,game_hours,music_min,film_min 
recommendations.csv 
rec_id,user_id,category,message,impact_g_co2 
groups.csv 
group_id,name,members,avg_g_co2,rank 
transactions.csv 
tx_id,user_id,amount,reason,date 
badges.csv 
badge_id,user_id,name,level,awarded_at 
API Önerisi 
GET  /users/{id}/summary -> { total_g_co2, eco_level, goal_progress, recommendations } 
POST /users/{id}/goal -> { weekly_goal_g } 
GET  /groups/leaderboard -> { teams:[{name,avg_g_co2,rank}] } 
POST /users/{id}/redeem -> { tokens, status:"ok" } 
UI/UX Beklentisi 
• Dashboard → Günlük karbon, hedef ilerlemesi, öneriler 
• Lig tablosu → grup sıralaması 
• Renk paleti → yeşil tonlar (#059669, #86efac) 
• Responsive tasarım, mobil uyumlu 
Puanlama (100) 
Kriter 
Çalışabilirlik 
Veri Modeli 
UI/UX 
Puan Açıklama 
30 Hesaplama ve öneri akışı doğru 
20 Doğru veri yapısı, anlamlı ilişkiler 
20 Görsel sadelik, mobil uyum 
Grup & Jeton Akışı 20 Lig sistemi ve ödül akışı tamam 
Bonus 
10 İsteğe bağlı AI / ML öneri modülü