"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Movie {
  id: number
  title: string
  year: number
  poster: string
}

interface MovieCardProps {
  movie: Movie
  isInWatchlist?: boolean
  onAddToWatchlist?: (movie: Movie) => void
  onRemoveFromWatchlist?: (movieId: number) => void
}

export function MovieCard({
  movie,
  isInWatchlist = false,
  onAddToWatchlist,
  onRemoveFromWatchlist,
}: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async () => {
    setIsLoading(true)
    
    if (isInWatchlist && onRemoveFromWatchlist) {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      onRemoveFromWatchlist(movie.id)
    } else if (!isInWatchlist && onAddToWatchlist) {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      onAddToWatchlist(movie)
    }
    
    setIsLoading(false)
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.poster || "/placeholder.svg"}
            alt={`${movie.title} poster`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant={isInWatchlist ? "destructive" : "default"}
              onClick={handleAction}
              disabled={isLoading}
              className="h-12 w-12"
            >
              {isInWatchlist ? (
                <Trash2 className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground">{movie.year}</p>
        </div>
      </CardContent>
    </Card>
  )
}
