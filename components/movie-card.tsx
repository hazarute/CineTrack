"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/types/movie"
import { getMovieTitle, getReleaseYear } from "@/types/movie"

interface MovieCardProps {
  movie: Movie
  isInWatchlist?: boolean
  variant?: "search" | "watchlist"
}

export function MovieCard({
  movie,
  isInWatchlist = false,
}: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAction = async () => {
    setIsLoading(true)
    
    // Eğer film zaten listedeyse, SİLME isteği yap
    if (isInWatchlist) {
      await fetch(`/api/watchlist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdbId: movie.id }),
      });
    } 
    // Eğer listede değilse, EKLEME isteği yap
    else {
      await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tmdbId: movie.id,
          title: getMovieTitle(movie),
          posterPath: movie.poster_path,
          releaseYear: getReleaseYear(movie),
          mediaType: movie.media_type || 'movie',
        }),
      });
    }
    
    // İşlem bittikten sonra, sunucudan güncel verileri çekmek için sayfayı yenile
    router.refresh();
    setTimeout(() => setIsLoading(false), 500);
  }

  // TMDB'den gelen poster yolu için tam URL oluşturuyoruz
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "/placeholder.svg"
    
  const title = getMovieTitle(movie);
  const releaseYear = getReleaseYear(movie);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={posterUrl}
            alt={`${title} poster`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant={isInWatchlist ? "secondary" : "default"}
              onClick={handleAction}
              disabled={isLoading}
              className="h-12 w-12"
            >
              {isInWatchlist ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
            {title}
          </h3>
          {releaseYear && (
            <p className="text-sm text-muted-foreground">{releaseYear}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
