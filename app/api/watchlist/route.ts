import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type AddToWatchlistRequest = {
  tmdbId: number;
  title: string;
  posterPath?: string | null;
  releaseYear?: string | null;
  mediaType: 'movie' | 'tv';
};

// Kullanıcının izleme listesini getir
export async function GET() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        watchlist: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(user.watchlist);
    
  } catch (error) {
    console.error('İzleme listesi getirme hatası:', error);
    return NextResponse.json(
      { error: 'İzleme listesi getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// İzleme listesine yeni öğe ekle
export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  try {
    const body: AddToWatchlistRequest = await request.json();
    
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Aynı film/dizi zaten ekli mi kontrol et
    const existingItem = await prisma.watchlistItem.findFirst({
      where: {
        userId: user.id,
        tmdbId: body.tmdbId,
        mediaType: body.mediaType,
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'Bu içerik zaten izleme listenizde mevcut' },
        { status: 400 }
      );
    }

    // Yeni öğeyi ekle
    const newItem = await prisma.watchlistItem.create({
      data: {
        tmdbId: body.tmdbId,
        title: body.title,
        posterPath: body.posterPath || null,
        releaseYear: body.releaseYear || null,
        mediaType: body.mediaType,
        userId: user.id,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
    
  } catch (error) {
    console.error('İzleme listesine ekleme hatası:', error);
    return NextResponse.json(
      { error: 'İzleme listesine eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
