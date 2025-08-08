"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"

interface Movie {
  id: number
  title: string
  year: number
  poster: string
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading watchlist
    const timer = setTimeout(() => {
      // Mock some movies in watchlist
      setWatchlist([
        {
          id: 1,
          title: "The Dark Knight",
          year: 2008,
          poster: "/dark-knight-poster.png"
        },
        {
          id: 2,
          title: "Inception",
          year: 2010,
          poster: "/inception-movie-poster.png"
        },
        {
          id: 3,
          title: "Interstellar",
          year: 2014,
          poster: "/interstellar-inspired-poster.png"
        }
      ])
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleRemoveFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
          <p className="text-muted-foreground">Loading your saved movies...</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
        <p className="text-muted-foreground">
          {watchlist.length === 0 
            ? "Your watchlist is empty. Start adding movies to track what you want to watch!"
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
            Start exploring movies and add them to your watchlist to keep track of what you want to watch.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={true}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}
