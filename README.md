#  CineTrack - Kişisel Film & Dizi İzleme Listesi

[![Lisans: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=flat-square&logo=next-auth&logoColor=white)](https://next-auth.js.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**CineTrack**, sevdiğiniz filmleri ve dizileri keşfetmenizi, kişisel izleme listeleri oluşturmanızı ve yönetmenizi sağlayan modern bir web uygulamasıdır. Bu platform sayesinde izlemek istediğiniz içerikleri unutmaz, hepsini tek bir yerden kolayca takip edebilirsiniz.

![CineTrack Ekran Görüntüsü](https://i.imgur.com/your-screenshot-link.png)
*(Not: Bu alana projenizin güncel bir ekran görüntüsünü eklemeniz tavsiye edilir.)*

## ✨ Temel Özellikler

* **Güvenli Kullanıcı Yönetimi:** Google ve GitHub hesapları ile hızlı ve güvenli kayıt/giriş işlemleri.
* **Geniş İçerik Arşivi:** The Movie Database (TMDB) entegrasyonu ile milyonlarca film ve diziye anında erişim ve arama imkanı.
* **Kişiye Özel Listeler:** Her kullanıcı sadece kendi "İzleme Listesini" görür ve yönetir.
* **Dinamik Arayüz:** Arama sonuçlarından tek tıkla listeye ekleme ve listeden çıkarma.
* **Modern ve Duyarlı Tasarım:** `v0.dev` ile üretilmiş, tüm cihazlarla uyumlu, koyu/aydınlık tema destekli şık bir arayüz.

## 🚀 Kullanılan Teknolojiler

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Dil:** [TypeScript](https://www.typescriptlang.org/)
* **Kimlik Doğrulama:** [Next-Auth (Auth.js)](https://next-auth.js.org/)
* **Veritabanı & ORM:** [Prisma](https://www.prisma.io/) & [SQLite](https://www.sqlite.org/index.html)
* **Stil:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Bileşenleri:** [Shadcn/ui](https://ui.shadcn.com/)
* **UI Üretimi:** [v0.dev by Vercel](https://v0.dev/)

## 📖 Geliştirme Yaklaşımı: UI-First

Bu proje, modern ve verimli bir **"UI-First (Arayüz Öncelikli)"** geliştirme metodolojisi ile inşa edilmiştir. Backend kodlamasına geçmeden önce, projenin tüm arayüzü Vercel'in yapay zeka aracı `v0.dev` kullanılarak tasarlanmış ve bu tasarım, projenin "teknik şartnamesi" olarak kullanılmıştır. Bu yaklaşım, geliştirme sürecini önemli ölçüde hızlandırmış ve entegrasyon sorunlarını en aza indirmiştir.

## 🏁 Başlarken

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın
```bash
git clone [https://github.com/hazarute/CineTrack.git](https://github.com/hazarute/CineTrack.git)
cd CineTrack
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
Proje kök dizininde `.env` adında bir dosya oluşturun ve aşağıdaki içeriği kendi bilgilerinizle doldurun. `.env.example` dosyasını referans alabilirsiniz.

```env
# Veritabanı bağlantı adresi (SQLite için varsayılan)
DATABASE_URL="file:./prisma/dev.db"

# Next-Auth için zorunlu gizli anahtar.
# Üretmek için: openssl rand -base64 32
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"

# Google & GitHub Provider bilgileri
# [https://console.cloud.google.com/](https://console.cloud.google.com/) ve [https://github.com/settings/developers](https://github.com/settings/developers) adreslerinden alabilirsiniz.
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"

# The Movie Database (TMDB) API Anahtarı
# [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) adresinden kayıt olup alabilirsiniz.
TMDB_API_KEY="YOUR_TMDB_API_KEY"
```

### 4. Veritabanını Ayarlayın
Prisma Client'ı oluşturun ve veritabanı şemasını senkronize edin.
```bash
npx prisma generate
npx prisma db push
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Artık tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı görebilirsiniz.

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.

---

*Bu proje, **[hazarute](https://github.com/hazarute)** tarafından geliştirilmiştir.*