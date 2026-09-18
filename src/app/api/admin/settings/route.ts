import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await auth();
  return !!session;
}

// GET /api/admin/settings
export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const [settings, tiktokSection] = await Promise.all([
    prisma.siteSettings.findFirst({ where: { id: 'main' } }),
    prisma.homepageSection.findUnique({ where: { sectionKey: 'tiktok_videos' } }),
  ]);

  let tiktokUrl = 'https://www.tiktok.com/@bekurtrading';
  if (tiktokSection?.extraData) {
    try {
      const parsed = JSON.parse(tiktokSection.extraData);
      if (parsed.accountUrl) tiktokUrl = parsed.accountUrl;
    } catch {}
  }

  return NextResponse.json({
    ...(settings || {}),
    tiktokUrl,
  });
}

// PUT /api/admin/settings
export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { tiktokUrl, ...settingsData } = body;

  // If tiktokUrl was passed, update the tiktok_videos section extraData
  if (tiktokUrl !== undefined) {
    try {
      const tiktokSec = await prisma.homepageSection.findUnique({ where: { sectionKey: 'tiktok_videos' } });
      let extra = {};
      if (tiktokSec?.extraData) {
        try { extra = JSON.parse(tiktokSec.extraData); } catch {}
      }
      extra = { ...extra, accountUrl: tiktokUrl };
      await prisma.homepageSection.upsert({
        where: { sectionKey: 'tiktok_videos' },
        update: { extraData: JSON.stringify(extra) },
        create: { sectionKey: 'tiktok_videos', extraData: JSON.stringify(extra) },
      });
    } catch (e) {
      console.error('Error updating tiktok section url:', e);
    }
  }

  // Remove any fields that don't belong to Prisma SiteSettings
  const allowedKeys = [
    'companyName', 'tagline', 'logoUrl', 'faviconUrl', 'email',
    'phone1', 'phone2', 'whatsappNumber', 'whatsappMessage', 'address',
    'mapEmbedUrl', 'facebookUrl', 'twitterUrl', 'linkedinUrl',
    'instagramUrl', 'youtubeUrl', 'telegramUrl', 'primaryCtaText',
    'secondaryCtaText', 'contactCtaText', 'footerText', 'copyright',
    'privacyPolicyUrl', 'termsUrl'
  ];

  const sanitized: Record<string, any> = {};
  for (const key of allowedKeys) {
    if (key in settingsData) {
      sanitized[key] = settingsData[key];
    }
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: sanitized,
    create: { id: 'main', ...sanitized },
  });

  return NextResponse.json({
    ...settings,
    tiktokUrl: tiktokUrl || 'https://www.tiktok.com/@bekurtrading',
  });
}
