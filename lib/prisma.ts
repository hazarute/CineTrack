import { PrismaClient } from '@prisma/client';

// PrismaClient'ı global olarak tanımla (development sırasında sıcak yeniden yükleme için)
declare global {
  var prisma: PrismaClient | undefined;
}

// Geliştirme sırasında sadece bir PrismaClient örneği oluştur
const prisma = global.prisma || new PrismaClient();

// Geliştirme modunda global değişkene ata
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export { prisma };
