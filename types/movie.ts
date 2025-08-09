// Shared Movie type that matches TMDB API response structure
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string; // For TV shows
  media_type?: 'movie' | 'tv';
  name?: string; // For TV shows
  original_title?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  backdrop_path?: string | null;
  genre_ids?: number[];
  popularity?: number;
  original_language?: string;
}

// Helper function to get the correct title (for both movies and TV shows)
export function getMovieTitle(movie: Movie): string {
  return movie.title || movie.name || 'Untitled';
}

// Helper function to get the release year
export function getReleaseYear(movie: Movie): string | null {
  const date = movie.release_date || movie.first_air_date;
  return date ? date.substring(0, 4) : null;
}
