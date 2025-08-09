// "use client" direktifi SİLİNDİ.
import { MovieCard } from "@/components/movie-card";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { Movie } from "@/types/watchlist";
// import { authOptions } from "../api/auth/[...nextauth]/route"; // authOptions dosyanızın yolunu belirtin

// 1. GÜVENLİ VERİ ÇEKME FONKSİYONU
// Bu fonksiyon, backend'deki watchlist API'mize istek atar.
// Next.js'in sunucu taraflı fetch'i, kullanıcı oturum bilgilerini (cookie) otomatik olarak bu isteğe ekler.
async function getWatchlist(): Promise<Movie[]> {
  const res = await fetch('http://localhost:3000/api/watchlist', { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    console.error("Failed to fetch watchlist");
    // Gerçek bir uygulamada burada daha detaylı hata yönetimi yapılabilir.
    return [];
  }
  return res.json();
}

// 2. İZLEME LİSTESİ SAYFA BİLEŞENİ
// Artık bir async fonksiyon.
export default async function WatchlistPage() {
  
  // SUNUCU TARAFINDA OTURUM KONTROLÜ
  // Eğer kullanıcı giriş yapmamışsa, onu giriş sayfasına yönlendiririz.
  const session = await getServerSession(/*authOptions*/); // authOptions'ı import edip buraya ekleyin
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/watchlist');
  }

  // Oturum varsa, kullanıcının izleme listesini çekiyoruz.
  const watchlist = await getWatchlist();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
        <p className="text-muted-foreground">
          {watchlist.length === 0 
            ? "Your watchlist is empty. Start adding movies!"
            : `You have ${watchlist.length} movie${watchlist.length === 1 ? '' : 's'} in your watchlist`
          }
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎬</span>
          </div>
          <p className="text-lg font-medium mb-2">Your watchlist is empty</p>
          <p className="text-muted-foreground">
            Start exploring and add movies to keep track of what you want to watch.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.map((item) => (
            <MovieCard
              key={item.id} // Prisma'dan gelen benzersiz ID'yi kullanmak daha iyidir
              movie={item}
              isInWatchlist={true} // Bu sayfadaki her şey zaten listede
              variant="watchlist" // MovieCard'a bunun bir izleme listesi kartı olduğunu söylüyoruz
            />
          ))}
        </div>
      )}
    </div>
  );
}