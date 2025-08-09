### Proje Anayasası v1.0: CineTrack (Arayüz Öncelikli Versiyon)

**Proje Adı:** CineTrack
**Tarih:** 09.08.2025
**Versiyon:** 1.0 (MVP)
**Geliştirme Metodu:** UI-First (Arayüz Öncelikli)

-----

### Adım 1: Proje Özeti ve Amaç

  * **Kısa Açıklama:** Kullanıcıların hesap oluşturarak giriş yapabildiği, The Movie Database (TMDB) üzerinden filmleri ve dizileri aratabildiği ve kendi kişisel izleme listelerini oluşturup yönetebildiği bir platform.
  * **Çözdüğü Sorun:** İzlenecek filmlerin ve dizilerin unutulmasını engeller, farklı platformlardaki (Netflix, Amazon Prime vb.) içerikleri tek bir kişisel listede birleştirme imkanı sunar.
  * **MVP Kapsamı:**
    1.  Kullanıcı kaydı ve girişi.
    2.  TMDB API'si üzerinden film/dizi arama.
    3.  Arama sonuçlarından bir filmi/diziyi kullanıcının kişisel "İzleme Listesine" ekleme.
    4.  Kullanıcının kendi izleme listesini görüntüleyebilmesi.
    5.  İzleme listesinden bir içeriği kaldırabilmesi.

-----

### Adım 2: v0.dev Prompt'u (Anayasa'nın Temeli)

Bu prompt, `v0.dev`'e verilerek projenin arayüz iskeleti oluşturulacak.

```prompt
A modern and clean web application interface for a movie and TV show watchlist tracker called "CineTrack". The app should use shadcn/ui components, have full dark mode support, and use the Inter font.

The layout needs a main header (Navbar) that is visible on all pages. The navbar should contain:
- The "CineTrack" logo on the left.
- A prominent search bar in the center for finding movies.
- On the right, a "My Watchlist" link and a "Login" button. If the user is logged in, it should show their profile picture/avatar and a dropdown menu with "Logout".

The main page (homepage) should display the search results. When the user searches, this area should be populated with movie cards in a responsive grid layout. Each movie card must display:
- The movie poster.
- The movie title.
- The release year.
- An "Add to Watchlist" button (a plus icon button is preferred).

The "/watchlist" page should be protected and only accessible to logged-in users. It should have a title like "My Watchlist" and display the movies the user has added, using the same movie card component. However, on this page, the button on the card should be a "Remove from Watchlist" button (a trash can icon button is preferred).

If either the search results or the watchlist is empty, display a clear message like "No movies found." or "Your watchlist is empty."
```

#### Adım 2.1: Giriş Sayfası için v0.dev Prompt'u (Yama 1.0.1)

Bu prompt, kullanıcıların sisteme giriş yapacağı özel sayfayı oluşturmak için kullanılacaktır.

A clean, modern, and minimalist sign-in page for an application called "CineTrack". The design should be consistent with a dark/light mode theme using shadcn/ui components.

The layout should feature a single Card component centered vertically and horizontally on the page.

Inside the card, there should be:
1.  A header section with an icon (like a movie clapperboard or a ticket icon) and the main title "Sign in to CineTrack".
2.  A brief descriptive text below the title, such as "Access your personal watchlist and discover new movies."
3.  A divider line for clean separation.
4.  A section with social login provider buttons. These should be full-width within the card. Create two distinct buttons:
    - A "Sign in with Google" button.
    - A "Sign in with GitHub" button.
    Each button should feature the respective provider's logo on the left.

-----

### Entegrasyon Adımları

`v0.dev`'den bu sayfanın kodunu aldıktan sonra, projeye entegre etmek için şu adımları izlemelisiniz:

1.  **Dosya Oluşturma:** Üretilen kodu, projenizde `app/auth/signin/page.tsx` yoluna yeni bir dosya oluşturarak içine yapıştırın. Next.js'in App Router yapısı sayesinde bu, otomatik olarak `/auth/signin` URL'ini oluşturacaktır.

2.  **Next-Auth Yapılandırması:** `Next-Auth`'a varsayılan sayfası yerine bizim özel sayfamızı kullanmasını söylememiz gerekiyor. `app/api/auth/[...nextauth]/route.ts` (veya benzeri) dosyanızdaki `NextAuth` seçeneklerine `pages` objesini ekleyin:

    ```typescript
    // app/api/auth/[...nextauth]/route.ts

    export const authOptions = {
      // ...providers array
      pages: {
        signIn: '/auth/signin', // Giriş için özel sayfamızın yolu
        // error: '/auth/error', // Hata sayfası için de özel sayfa belirleyebilirsiniz
      },
      // ...rest of your options
    }
    ```

3.  **Butonlara İşlevsellik Kazandırma:** Oluşturduğunuz `app/auth/signin/page.tsx` dosyası, kullanıcı etkileşimi içereceği için bir **İstemci Bileşeni** olmalıdır.

      * Dosyanın en başına `'use client';` ekleyin.
      * `next-auth/react` kütüphanesinden `signIn` fonksiyonunu import edin.
      * "Sign in with Google" ve "Sign in with GitHub" butonlarına, tıklandığında `signIn('google')` veya `signIn('github')` fonksiyonlarını çağıracak `onClick` olayları ekleyin.

    <!-- end list -->

    ```tsx
    // app/auth/signin/page.tsx (Basitleştirilmiş örnek)
    'use client';

    import { signIn } from 'next-auth/react';
    import { Button } from '@/components/ui/button'; // Shadcn/ui butonunuz

    export default function SignInPage() {
      return (
        // ... v0'dan gelen layout JSX
        <div className="card-content">
            <Button onClick={() => signIn('google')} variant="outline" className="w-full">
              {/* Google ikonu */} Sign in with Google
            </Button>
            <Button onClick={() => signIn('github')} variant="outline" className="w-full">
              {/* GitHub ikonu */} Sign in with GitHub
            </Button>
        </div>
        // ...
      );
    }
    ```

-----

### Adım 3: Frontend Yapısı Yama 1.1.2 (Gerçekleşen Frontend Yapısına Göre Entegrasyon)

#### Genel Bakış

Frontend'imiz, birbiriyle konuşan 4 anahtar dosyadan oluşacak:

1.  **`components/navbar.tsx`:** Kullanıcı oturumunu ve arama çubuğu mantığını yönetecek.
2.  **`app/page.tsx`:** Arama sonuçlarını listeleyecek.
3.  **`app/watchlist/page.tsx`:** Kişisel izleme listesini gösterecek.
4.  **`components/movie-card.tsx`:** Hem arama sonucunda hem de izleme listesinde tek bir filmi temsil edecek ve "Ekle/Sil" butonlarını barındıracak.

-----

#### Bileşen Bazında Entegrasyon Adımları

  * **Dosya: `components/navbar.tsx` (İstemci Bileşeni)**

      * **Sorumluluğu:** Kullanıcı arama yaptığında, onu arama sonuçlarını görebileceği ana sayfaya yönlendirmek. Oturum bilgilerini göstermek.
      * **Entegrasyon Mantığı:**
        1.  Dosyanın en başına `'use client';` eklenmelidir.
        2.  Arama input'unun değerini tutmak için bir state (`useState`) kullanılacak.
        3.  Kullanıcı arama formunu gönderdiğinde (örn. Enter'a bastığında), `next/navigation`'dan alınan `useRouter` ile ana sayfaya bir `query` parametresi eklenerek yönlendirme yapılacak. Bu, sayfanın yeniden yüklenmeden arama sonuçlarını getirmesini sağlar.
        4.  Kullanıcı oturumunu kontrol etmek için `next-auth/react`'tan `useSession` hook'u kullanılacak ve duruma göre "Giriş Yap" veya kullanıcı profili/çıkış butonu gösterilecek.

    <!-- end list -->

    ```tsx
    // components/navbar.tsx (Örnek Mantık)
    'use client';
    import { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import { useSession, signIn, signOut } from 'next-auth/react';

    export function Navbar() {
      const [searchTerm, setSearchTerm] = useState('');
      const router = useRouter();
      const { data: session } = useSession();

      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/?query=${searchTerm}`);
      };

      return (
        <nav>
          {/* ... Logo, linkler ... */}
          <form onSubmit={handleSearch}>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Film veya dizi arayın..." />
          </form>
          {session ? (
            <button onClick={() => signOut()}>Çıkış Yap</button>
          ) : (
            <button onClick={() => signIn()}>Giriş Yap</button>
          )}
        </nav>
      );
    }
    ```

  * **Dosya: `app/page.tsx` (Ana Sayfa - Sunucu Bileşeni)**

      * **Sorumluluğu:** URL'deki `query` parametresini okuyup, backend'deki `/api/search` endpoint'ine istek atarak arama sonuçlarını çekmek ve listelemek.
      * **Entegrasyon Mantığı:**
        1.  Bu bir `async` sunucu bileşenidir ve `searchParams` prop'unu alır.
        2.  `searchParams` içinden `query` değeri okunur.
        3.  Eğer bir `query` varsa, `fetch` kullanılarak `http://localhost:3000/api/search?query=${query}` adresine istek atılır.
        4.  Gelen film dizisi, `map` fonksiyonu ile dönülerek her bir film için `<MovieCard />` bileşeni render edilir.

    <!-- end list -->

    ```tsx
    // app/page.tsx (Örnek Mantık)
    import { MovieCard } from '@/components/movie-card';

    async function searchMovies(query: string) {
      if (!query) return [];
      const res = await fetch(`http://localhost:3000/api/search?query=${query}`, { cache: 'no-store' });
      return res.json();
    }

    export default async function HomePage({ searchParams }: { searchParams: { query: string } }) {
      const movies = await searchMovies(searchParams.query);

      return (
        <main>
          {/* Navbar ve diğer bileşenler layout.tsx'de olacak */}
          <h1>Arama Sonuçları</h1>
          <div className="grid ..."> {/* MovieGrid JSX'i burada */}
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} variant="search" />
            ))}
          </div>
        </main>
      );
    }
    ```

  * **Dosya: `app/watchlist/page.tsx` (İzleme Listesi - Sunucu Bileşeni)**

      * **Sorumluluğu:** Sadece giriş yapmış kullanıcının kişisel izleme listesini `/api/watchlist` endpoint'inden çekip göstermek.
      * **Entegrasyon Mantığı:**
        1.  Bu `async` sunucu bileşeni, sunucu tarafında oturumu kontrol etmelidir. `next-auth`'tan `getServerSession` kullanılır. Oturum yoksa kullanıcı giriş sayfasına yönlendirilir.
        2.  Oturum varsa, `fetch` ile `http://localhost:3000/api/watchlist` adresine istek atılır. (Sunucu tarafı `fetch`'leri oturum bilgilerini otomatik olarak taşır).
        3.  Gelen liste, `map` ile dönülerek her bir film için `<MovieCard />` bileşeni render edilir.

    <!-- end list -->

    ```tsx
    // app/watchlist/page.tsx (Örnek Mantık)
    import { MovieCard } from '@/components/movie-card';
    import { getServerSession } from 'next-auth';
    import { redirect } from 'next/navigation';

    async function getWatchlist() {
        const res = await fetch('http://localhost:3000/api/watchlist', { cache: 'no-store' });
        return res.json();
    }

    export default async function WatchlistPage() {
        const session = await getServerSession(); // Sunucu tarafında oturum kontrolü
        if (!session) {
            redirect('/api/auth/signin'); // Oturum yoksa giriş sayfasına yönlendir
        }
        const watchlist = await getWatchlist();
        return (
            <main>
                <h1>İzleme Listem</h1>
                <div className="grid ..."> {/* MovieGrid JSX'i burada */}
                   {watchlist.map((item: any) => (
                      <MovieCard key={item.tmdbId} movie={item} variant="watchlist" />
                   ))}
                </div>
            </main>
        );
    }
    ```

  * **Dosya: `components/movie-card.tsx` (İstemci Bileşeni)**

      * **Sorumluluğu:** Tek bir filmi göstermek ve duruma göre "Listeye Ekle" veya "Listeden Çıkar" aksiyonlarını tetiklemek.
      * **Entegrasyon Mantığı:**
        1.  Dosyanın en başına `'use client';` eklenir.
        2.  `movie` verisini ve `variant` ("search" veya "watchlist") bilgisini prop olarak alır.
        3.  `handleAddToWatchlist` fonksiyonu `POST /api/watchlist`'e istek atar.
        4.  `handleRemoveFromWatchlist` fonksiyonu `DELETE /api/watchlist/[id]`'e istek atar.
        5.  Her iki fonksiyon da başarılı olursa `router.refresh()`'i çağırarak arayüzü günceller.
        6.  `variant` prop'una göre "Ekle" veya "Sil" butonu koşullu olarak render edilir.

-----

**Anayasa güncellendi\!** Artık planımız, sizin hayata geçirdiğiniz temiz yapı ile %100 uyumlu. Bu adımları izleyerek, tamamladığınız backend ile `v0.dev`'in ürettiği arayüzü birbirine bağlayabilir ve projenizi tamamlayabilirsiniz.

Bu son entegrasyon adımlarında başarılar dilerim\!

-----

### Adım 4: Gerekli Backend API Endpoint'leri

  * **Kimlik Doğrulama API'ları:** `/api/auth/[...nextauth]`
      * `Next-Auth` kütüphanesi bu endpoint'leri (login, logout, session kontrolü vb.) otomatik olarak oluşturacaktır.
  * **Arama API'ı:** `GET /api/search?query=[arama_terimi]`
      * Bu endpoint, istemciden gelen arama isteğini alıp, backend'de güvenli bir şekilde saklanan TMDB API anahtarı ile TMDB'ye istek atacak ve sonuçları istemciye geri dönecektir. (Bu, API anahtarını tarayıcıda ifşa etmemek için en iyi yöntemdir).
  * **İzleme Listesi API'ları:** `/api/watchlist`
      * `GET`: Giriş yapmış kullanıcının izleme listesindeki tüm filmleri getirir.
      * `POST`: Giriş yapmış kullanıcının listesine yeni bir film ekler. (Gövde: `{ tmdbId, title, posterPath, releaseYear }`)
      * `DELETE`: Giriş yapmış kullanıcının listesinden belirtilen bir filmi siler. (Gövde: `{ tmdbId }` veya `id` parametresi)

-----

### Adım 5: Veritabanı Modeli (`prisma/schema.prisma`)

  * `User`, `Account`, `Session`, `VerificationToken`: Bu modeller `Next-Auth`'un Prisma Adapter'ı için gereklidir ve standarttır.
  * **`WatchlistItem` (Bizim Özel Modelimiz):**
      * `id`: String (Primary Key)
      * `tmdbId`: Int (TMDB'den gelen film ID'si, Benzersiz olmalı)
      * `title`: String
      * `posterPath`: String? (Poster yolu)
      * `releaseYear`: String?
      * `createdAt`: DateTime
      * **İlişki Alanları:**
          * `userId`: String (User modeline referans)
          * `user`: `User @relation(fields: [userId], references: [id], onDelete: Cascade)`

-----

### Adım 6: Teknoloji Yığını

  * **Framework:** Next.js (App Router)
  * **Dil:** TypeScript
  * **Kimlik Doğrulama:** **Next-Auth (Auth.js)**
  * **Veritabanı:** Prisma + SQLite
  * **Stil:** Tailwind CSS & Shadcn/ui
  * **API İstekleri:** `axios` veya `fetch`

-----