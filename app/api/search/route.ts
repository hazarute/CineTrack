import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// TMDB API anahtarınızı .env dosyanıza eklemeyi unutmayın
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  try {
    // Kullanıcı oturumunu kontrol et
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';
    
    if (!query) {
      return NextResponse.json(
        { error: 'Arama sorgusu gerekli' },
        { status: 400 }
      );
    }

    // TMDB'den arama yap
    const searchUrl = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=tr-TR`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error('TMDB API hatası');
    }
    
    const data = await response.json();
    
    // Sadece film ve TV şovlarını filtrele
    const filteredResults = data.results.filter(
      (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
    );
    
    return NextResponse.json({
      ...data,
      results: filteredResults,
    });
    
  } catch (error) {
    console.error('Arama hatası:', error);
    return NextResponse.json(
      { error: 'Arama sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
