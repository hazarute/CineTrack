export interface WatchlistItem {
  id: string;
  tmdbId: number;
  title: string;
  posterPath: string | null;
  releaseYear: string | null;
  mediaType: 'movie' | 'tv';
  userId: string;
  createdAt: Date;
}

export interface AddToWatchlistRequest {
  tmdbId: number;
  title: string;
  posterPath?: string | null;
  releaseYear?: string | null;
  mediaType: 'movie' | 'tv';
}
