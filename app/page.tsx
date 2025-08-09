"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/types/movie"

// TMDB'den popüler filmleri getiren fonksiyon
async function fetchPopularMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`/api/movies/popular`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error('Failed to load movies:', err);
        setError('Filmler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Popüler Filmler ve Diziler</h1>
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[2/3] bg-muted rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-16 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Bir Hata Oluştu</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Popüler Filmler ve Diziler</h1>
        <p className="text-muted-foreground">
          En popüler filmleri ve dizileri keşfedin
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Gösterilecek film bulunamadı.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.id}-${movie.media_type || 'movie'}`}
              movie={movie}
              isInWatchlist={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}
