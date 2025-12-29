import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

globalForPrisma.prisma = prismaClient;
