import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// İzleme listesinden öğe sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  const itemId = params.id;

  try {
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

    // Öğeyi bul ve kullanıcıya ait olduğundan emin ol
    const item = await prisma.watchlistItem.findFirst({
      where: {
        id: itemId,
        userId: user.id,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'İzleme listesi öğesi bulunamadı veya yetkiniz yok' },
        { status: 404 }
      );
    }

    // Öğeyi sil
    await prisma.watchlistItem.delete({
      where: { id: itemId },
    });

    return new NextResponse(null, { status: 204 });
    
  } catch (error) {
    console.error('İzleme listesinden çıkarma hatası:', error);
    return NextResponse.json(
      { error: 'İzleme listesinden çıkarılırken bir hata oluştu' },
      { status: 500 }
    );
  }
}
