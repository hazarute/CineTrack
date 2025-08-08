"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"

interface Movie {
  id: number
  title: string
  year: number
  poster: string
}

// Mock movie data
const mockMovies: Movie[] = [
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
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    poster: "/matrix-movie-poster.png"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    poster: "/pulp-fiction-poster.png"
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    poster: "/shawshank-redemption-poster.png"
  },
  {
    id: 7,
    title: "Forrest Gump",
    year: 1994,
    poster: "/forrest-gump-poster.png"
  },
  {
    id: 8,
    title: "The Godfather",
    year: 1972,
    poster: "/classic-mob-poster.png"
  }
]

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading search results
    const timer = setTimeout(() => {
      setSearchResults(mockMovies)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToWatchlist = (movie: Movie) => {
    setWatchlist(prev => [...prev, movie])
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Discover Movies & TV Shows</h1>
          <p className="text-muted-foreground">Loading popular movies...</p>
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Discover Movies & TV Shows</h1>
        <p className="text-muted-foreground">
          Search for your favorite movies and add them to your watchlist
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No movies found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try searching for a different movie or TV show.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={watchlist.some(w => w.id === movie.id)}
              onAddToWatchlist={handleAddToWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}
