import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await auth();
  if (!session) return false;
  return true;
}

// GET /api/admin/settings
export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await prisma.siteSettings.findFirst({ where: { id: 'main' } });
  return NextResponse.json(settings);
}

// PUT /api/admin/settings
export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: body,
    create: { id: 'main', ...body },
  });
  return NextResponse.json(settings);
}
