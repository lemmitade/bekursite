import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await auth();
  return !!session;
}

// GET /api/admin/videos - Returns both production_videos and tiktok_videos sections
export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [productionSec, tiktokSec] = await Promise.all([
    prisma.homepageSection.findUnique({ where: { sectionKey: 'production_videos' } }),
    prisma.homepageSection.findUnique({ where: { sectionKey: 'tiktok_videos' } }),
  ]);

  return NextResponse.json({
    production: productionSec,
    tiktok: tiktokSec,
  });
}

// PUT /api/admin/videos - Updates either or both sections
export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { sectionKey, title, subtitle, enabled, extraData } = body;

  if (!sectionKey || (sectionKey !== 'production_videos' && sectionKey !== 'tiktok_videos')) {
    return NextResponse.json({ error: 'Invalid sectionKey' }, { status: 400 });
  }

  const updated = await prisma.homepageSection.upsert({
    where: { sectionKey },
    update: {
      title: title ?? '',
      subtitle: subtitle ?? '',
      enabled: enabled ?? true,
      extraData: typeof extraData === 'string' ? extraData : JSON.stringify(extraData ?? {}),
    },
    create: {
      sectionKey,
      title: title ?? '',
      subtitle: subtitle ?? '',
      enabled: enabled ?? true,
      extraData: typeof extraData === 'string' ? extraData : JSON.stringify(extraData ?? {}),
    },
  });

  return NextResponse.json(updated);
}
