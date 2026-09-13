import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function checkAuth() {
  const session = await auth();
  return !!session;
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sections = await prisma.homepageSection.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(sections);
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { id, sectionKey, ...data } = body;

  const section = await prisma.homepageSection.upsert({
    where: { sectionKey },
    update: data,
    create: { sectionKey, ...data },
  });
  return NextResponse.json(section);
}
