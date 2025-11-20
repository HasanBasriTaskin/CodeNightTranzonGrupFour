# GreenConnect API Dokümantasyonu

## Genel Bilgiler

**Base URL:** `http://localhost:5247/api`  
**Environment Variable:** `NEXT_PUBLIC_API_URL`  
**Content-Type:** `application/json`  
**API Version:** 1.0

---

## Endpoint'ler

### 1. Kullanıcı Özet Bilgileri

Kullanıcının karbon ayak izi özet bilgilerini getirir.

| Özellik | Değer |
|---------|-------|
| **Method** | `GET` |
| **Endpoint** | `/users/{userId}/summary` |
| **Açıklama** | Kullanıcının toplam karbon tüketimi, günlük/haftalık ortalamalar, hedef ilerlemesi ve önerileri |
| **Authentication** | Gerekli değil |

#### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `userId` | `number` | ✅ | Kullanıcı ID'si |

#### Request Body

Yok

#### Response: 200 OK

```json
{
  "totalGCo2": 1250,
  "dailyAverage": 178,
  "weeklyAverage": 1246,
  "weeklyGoalG": 500,
  "goalProgress": 75,
  "ecoLevel": "Silver",
  "recommendations": [
    "Toplu taşıma kullanımınızı artırın",
    "Enerji tasarruflu ampuller kullanın",
    "Kısa mesafeler için yürüyüş tercih edin"
  ]
}
```

#### Response Fields

| Alan | Tip | Açıklama |
|------|-----|----------|
| `totalGCo2` | `number` | Toplam karbon tüketimi (gram) |
| `dailyAverage` | `number` | Günlük ortalama karbon tüketimi (gram) |
| `weeklyAverage` | `number` | Haftalık ortalama karbon tüketimi (gram) |
| `weeklyGoalG` | `number` | Haftalık hedef (gram) |
| `goalProgress` | `number` | Hedef ilerleme yüzdesi (0-100) |
| `ecoLevel` | `string` | Çevre dostu seviye (Bronze, Silver, Gold, Platinum) |
| `recommendations` | `string[]` | Öneriler listesi |

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Failed to fetch user summary"
}
```

**404 Not Found**
```json
{
  "error": "User not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

#### Connection Error (Mock Data)

Backend çalışmıyorsa otomatik olarak mock data döndürülür:
```json
{
  "totalGCo2": 1250,
  "dailyAverage": 178,
  "weeklyAverage": 1246,
  "weeklyGoalG": 500,
  "goalProgress": 75,
  "ecoLevel": "Silver",
  "recommendations": [
    "Toplu taşıma kullanımınızı artırın",
    "Enerji tasarruflu ampuller kullanın",
    "Kısa mesafeler için yürüyüş tercih edin"
  ]
}
```

---

### 2. Haftalık Hedef Belirleme

Kullanıcının haftalık karbon ayak izi hedefini belirler veya günceller.

| Özellik | Değer |
|---------|-------|
| **Method** | `POST` |
| **Endpoint** | `/users/{userId}/goal` |
| **Açıklama** | Haftalık karbon ayak izi hedefini günceller (Min: 50g, Max: 2000g) |
| **Authentication** | Gerekli değil |

#### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `userId` | `number` | ✅ | Kullanıcı ID'si |

#### Request Body

```json
{
  "weeklyGoalG": 500
}
```

#### Request Body Fields

| Alan | Tip | Zorunlu | Validasyon | Açıklama |
|------|-----|---------|------------|----------|
| `weeklyGoalG` | `number` | ✅ | Min: 50, Max: 2000 | Haftalık hedef (gram) |

#### Response: 200 OK

```json
{
  "success": true,
  "weeklyGoalG": 500
}
```

#### Response Fields

| Alan | Tip | Açıklama |
|------|-----|----------|
| `success` | `boolean` | İşlem başarılı mı |
| `weeklyGoalG` | `number` | Güncellenmiş haftalık hedef (gram) |

#### Error Responses

**400 Bad Request - Validation Error**
```json
{
  "error": "Validation failed",
  "message": "weeklyGoalG must be between 50 and 2000"
}
```

**404 Not Found**
```json
{
  "error": "User not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to set weekly goal"
}
```

#### Connection Error (Mock Response)

Backend çalışmıyorsa otomatik olarak mock response döndürülür:
```json
{
  "success": true,
  "weeklyGoalG": 500
}
```

---

### 3. Yeşil Jeton Alma

Kullanıcı haftalık hedefine ulaştığında yeşil jeton alır.

| Özellik | Değer |
|---------|-------|
| **Method** | `POST` |
| **Endpoint** | `/users/{userId}/redeem` |
| **Açıklama** | Hedefe ulaşıldığında yeşil jeton alır, ulaşılmadıysa 0 döner |
| **Authentication** | Gerekli değil |

#### Path Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `userId` | `number` | ✅ | Kullanıcı ID'si |

#### Request Body

Yok

#### Response: 200 OK - Jeton Alındı

```json
{
  "tokens": 10,
  "message": "Jeton başarıyla alındı"
}
```

#### Response: 200 OK - Hedefe Ulaşılmadı

```json
{
  "tokens": 0,
  "message": "Hedefinize henüz ulaşmadınız"
}
```

#### Response Fields

| Alan | Tip | Açıklama |
|------|-----|----------|
| `tokens` | `number` | Alınan jeton sayısı (0 veya pozitif) |
| `message` | `string` | İşlem mesajı |

#### Error Responses

**400 Bad Request**
```json
{
  "error": "Failed to redeem tokens"
}
```

**404 Not Found**
```json
{
  "error": "User not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

#### Connection Error (Mock Response)

Backend çalışmıyorsa otomatik olarak mock response döndürülür:
```json
{
  "tokens": 0,
  "message": "Backend bağlantısı yok, mock response"
}
```

---

### 4. Liderlik Tablosu

Grup bazında karbon ayak izi sıralamasını getirir.

| Özellik | Değer |
|---------|-------|
| **Method** | `GET` |
| **Endpoint** | `/groups/leaderboard` |
| **Açıklama** | En düşük ortalama karbon tüketimine sahip ekipler üst sıralarda |
| **Authentication** | Gerekli değil |

#### Path Parameters

Yok

#### Request Body

Yok

#### Response: 200 OK

```json
{
  "teams": [
    {
      "name": "Yeşil Takım",
      "members": 5,
      "avgGCo2": 450,
      "rank": 1
    },
    {
      "name": "Eko Warriors",
      "members": 4,
      "avgGCo2": 520,
      "rank": 2
    },
    {
      "name": "Carbon Fighters",
      "members": 6,
      "avgGCo2": 580,
      "rank": 3
    },
    {
      "name": "Green Heroes",
      "members": 3,
      "avgGCo2": 620,
      "rank": 4
    }
  ]
}
```

#### Response Fields

| Alan | Tip | Açıklama |
|------|-----|----------|
| `teams` | `array` | Takım listesi (sıralı) |

#### Team Object Fields

| Alan | Tip | Açıklama |
|------|-----|----------|
| `name` | `string` | Takım adı |
| `members` | `number` | Takım üye sayısı |
| `avgGCo2` | `number` | Ortalama karbon tüketimi (gram) |
| `rank` | `number` | Sıralama (1 = en iyi) |

#### Response: 200 OK - Boş Liste

```json
{
  "teams": []
}
```

#### Error Responses

**500 Internal Server Error**
```json
{
  "error": "Failed to fetch leaderboard: [status] [statusText] - [error details]"
}
```

#### Connection Error (Mock Data)

Backend çalışmıyorsa otomatik olarak mock data döndürülür:
```json
{
  "teams": [
    {
      "name": "Yeşil Takım",
      "members": 5,
      "avgGCo2": 450,
      "rank": 1
    },
    {
      "name": "Eko Warriors",
      "members": 4,
      "avgGCo2": 520,
      "rank": 2
    },
    {
      "name": "Carbon Fighters",
      "members": 6,
      "avgGCo2": 580,
      "rank": 3
    },
    {
      "name": "Green Heroes",
      "members": 3,
      "avgGCo2": 620,
      "rank": 4
    }
  ]
}
```

---

## Hata Yönetimi

### HTTP Status Kodları

| Kod | Açıklama |
|-----|----------|
| `200` | Başarılı |
| `400` | Geçersiz istek (validation error) |
| `404` | Kaynak bulunamadı |
| `500` | Sunucu hatası |

### Connection Error Detection

Tüm endpoint'ler aşağıdaki hata türlerini otomatik olarak algılar ve mock data döndürür:

- `ERR_CONNECTION_REFUSED`
- `Failed to fetch`
- `ECONNREFUSED`
- Error message'ında "fetch" kelimesi geçen hatalar

### Error Handling Flow

1. **Connection Error:** Mock data döndürülür, console'da uyarı gösterilir
2. **HTTP Error (4xx/5xx):** Error throw edilir, React Query tarafından yakalanır
3. **Network Error:** Connection error olarak algılanır, mock data döndürülür

### React Query Retry Logic

- **Connection Errors:** Retry yapılmaz (mock data kullanılır)
- **Other Errors:** Maksimum 2 retry, 1 saniye arayla
- **Retry Delay:** 1000ms

---

## Mock Data Sistemi

### Development Mode

Backend çalışmıyorsa veya bağlantı hatası varsa, tüm endpoint'ler otomatik olarak mock data döndürür. Bu sayede frontend development backend'e bağımlı olmadan yapılabilir.

### Mock Data Özellikleri

- ✅ Gerçekçi veri yapısı
- ✅ Tüm gerekli alanları içerir
- ✅ Production'a deploy edilmez (sadece connection error durumunda)
- ✅ Console'da uyarı mesajı gösterilir

---

## Kullanım Örnekleri

### JavaScript/TypeScript

```javascript
import { api } from '@/lib/api';

// Kullanıcı özet bilgileri
const summary = await api.getUserSummary(1);
console.log(summary.totalGCo2);

// Haftalık hedef belirleme
const result = await api.setWeeklyGoal(1, 500);
console.log(result.success);

// Jeton alma
const tokens = await api.redeemTokens(1);
if (tokens.tokens > 0) {
  console.log(`${tokens.tokens} jeton kazandınız!`);
}

// Liderlik tablosu
const leaderboard = await api.getLeaderboard();
leaderboard.teams.forEach(team => {
  console.log(`${team.rank}. ${team.name} - ${team.avgGCo2}g CO₂`);
});
```

### React Query ile Kullanım

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Query örneği
const { data, isLoading, error } = useQuery({
  queryKey: ['userSummary', userId],
  queryFn: () => api.getUserSummary(userId),
  refetchInterval: 30000, // 30 saniyede bir yenile
});

// Mutation örneği
const mutation = useMutation({
  mutationFn: (weeklyGoalG) => api.setWeeklyGoal(userId, weeklyGoalG),
  onSuccess: () => {
    console.log('Hedef başarıyla güncellendi!');
  },
  onError: (error) => {
    console.error('Hata:', error.message);
  },
});
```

### cURL Örnekleri

```bash
# Kullanıcı özet bilgileri
curl -X GET http://localhost:5247/api/users/1/summary

# Haftalık hedef belirleme
curl -X POST http://localhost:5247/api/users/1/goal \
  -H "Content-Type: application/json" \
  -d '{"weeklyGoalG": 500}'

# Jeton alma
curl -X POST http://localhost:5247/api/users/1/redeem

# Liderlik tablosu
curl -X GET http://localhost:5247/api/groups/leaderboard
```

---

## Environment Configuration

### Development

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5247/api
```

### Production

```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.greenconnect.com/api
```

---

## Notlar ve Önemli Bilgiler

- ✅ Tüm endpoint'ler async/await pattern kullanır
- ✅ POST istekleri `Content-Type: application/json` header'ı gerektirir
- ✅ Path parametreleri URL'de gönderilir
- ✅ Mock data sadece connection error durumunda kullanılır
- ✅ Environment variable ile base URL değiştirilebilir
- ✅ React Query retry mekanizması connection error'lar için devre dışıdır
- ✅ Tüm response'lar JSON formatındadır
- ✅ Hata mesajları Türkçe ve İngilizce olabilir

---

## Versiyon Geçmişi

| Versiyon | Tarih | Değişiklikler |
|----------|-------|---------------|
| 1.0 | 2024 | İlk versiyon - 4 endpoint |

---

## İletişim ve Destek

API ile ilgili sorularınız için lütfen proje ekibi ile iletişime geçin.
