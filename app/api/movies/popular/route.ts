import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET() {
  try {
    // Check if API key is available
    if (!TMDB_API_KEY) {
      return NextResponse.json(
        { error: 'TMDB API key is not configured' },
        { status: 500 }
      );
    }

    // Fetch popular movies from TMDB
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=tr-TR&region=TR&page=1`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('TMDB API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch popular movies from TMDB' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return the results with proper typing
    return NextResponse.json({
      results: data.results || [],
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
    
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching popular movies' },
      { status: 500 }
    );
  }
}
