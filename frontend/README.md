# GreenConnect - Yeşil Yaşam Takip Sistemi

Turkcell GreenConnect projesi - Karbon ayak izinizi takip edin, yeşil yaşam hedeflerinize ulaşın.

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm, yarn, pnpm veya bun

### Adım 1: Projeyi Klonlayın

```bash
git clone <repository-url>
cd frontend
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### Adım 3: Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:5247/api
```

### Adım 4: Development Server'ı Başlatın

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Proje Yapısı

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Ana sayfa (Dashboard)
│   ├── leaderboard/       # Liderlik tablosu
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
│   ├── ui/               # shadcn/ui bileşenleri
│   └── dashboard/        # Dashboard bileşenleri
├── lib/                   # Utility fonksiyonları
│   ├── api.js           # API client
│   └── utils.js         # Yardımcı fonksiyonlar
├── components.json       # shadcn/ui config
├── tailwind.config.js    # Tailwind CSS config
└── package.json
```

## 🎨 UI Bileşenleri

Bu proje [shadcn/ui](https://ui.shadcn.com/) kullanmaktadır. Kurulu bileşenler:

- ✅ **button** - Buton bileşeni
- ✅ **card** - Kart bileşeni
- ✅ **input** - Input alanı
- ✅ **progress** - İlerleme çubuğu
- ✅ **table** - Tablo bileşeni
- ✅ **dialog** - Modal/Dialog bileşeni
- ✅ **toast** - Bildirim bileşeni (sonner)
- ✅ **badge** - Rozet bileşeni

### Yeni Bileşen Ekleme

```bash
npx shadcn-ui@latest add [component-name]
```

## 🎨 Tailwind CSS Konfigürasyonu

Proje Turkcell yeşil renklerini kullanmaktadır:

- **Primary Color:** `#059669` (Turkcell Yeşil)
- **Secondary Color:** `#86efac` (Açık Yeşil)

Renkler `tailwind.config.js` dosyasında tanımlıdır ve `primary` class'ı ile kullanılabilir:

```jsx
<button className="bg-primary text-primary-foreground">
  Yeşil Buton
</button>
```

## 📚 Kullanılan Teknolojiler

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - CSS framework
- **shadcn/ui** - UI component library
- **Radix UI** - Headless UI components
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications

## 🔌 API Entegrasyonu

API endpoint'leri `lib/api.js` dosyasında tanımlıdır. Detaylı dokümantasyon için [API_ENDPOINTS.md](./API_ENDPOINTS.md) dosyasına bakın.

### Mock Data

Backend çalışmıyorsa, tüm API çağrıları otomatik olarak mock data döndürür. Bu sayede frontend development backend'e bağımlı olmadan yapılabilir.

## 🛠️ Geliştirme

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## 📝 Önemli Notlar

1. **shadcn/ui Kurulumu:** Proje zaten kurulu, ancak yeni bileşen eklemek için `npx shadcn-ui@latest add [component]` komutunu kullanın.

2. **Tailwind Config:** Turkcell yeşil renkleri (`#059669`) `tailwind.config.js` dosyasında `primary` color olarak tanımlıdır.

3. **Path Aliases:** `@/` alias'ı proje root'una işaret eder (`jsconfig.json`).

4. **API Base URL:** Environment variable `NEXT_PUBLIC_API_URL` ile değiştirilebilir.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje CodeNight etkinliği kapsamında geliştirilmiştir.
