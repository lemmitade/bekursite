import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const originalName = file.name || 'upload';
    const ext = path.extname(originalName).toLowerCase();
    const mimeType = file.type || '';

    const isVideo =
      mimeType.startsWith('video/') ||
      ['.mp4', '.webm', '.mov', '.mkv'].includes(ext);

    const isImage =
      mimeType.startsWith('image/') ||
      ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload MP4/WebM/MOV video or JPG/PNG/WebP image.' },
        { status: 400 }
      );
    }

    // Max 150MB for video, 20MB for images
    const maxSize = isVideo ? 150 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File is too large. Max limit is ${isVideo ? '150MB' : '20MB'}.` },
        { status: 400 }
      );
    }

    const subfolder = isVideo ? 'videos' : 'images';
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subfolder);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean filename
    const cleanBaseName = path
      .basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueFileName = `${cleanBaseName}_${Date.now()}${ext || (isVideo ? '.mp4' : '.jpg')}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${subfolder}/${uniqueFileName}`;

    // Record in Prisma Media table
    try {
      await prisma.media.create({
        data: {
          filename: uniqueFileName,
          url: publicUrl,
          altText: originalName,
          type: isVideo ? 'video' : 'image',
          size: file.size,
        },
      });
    } catch (dbErr) {
      console.warn('Failed to record media in database, file saved on disk:', dbErr);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFileName,
      originalName,
      size: file.size,
      type: isVideo ? 'video' : 'image',
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
