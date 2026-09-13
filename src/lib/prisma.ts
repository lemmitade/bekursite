import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionUrl =
  process.env.STORAGE_PRISMA_URL ||
  process.env.STORAGE_URL ||
  process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(
    connectionUrl
      ? {
          datasourceUrl: connectionUrl,
        }
      : undefined
  );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
