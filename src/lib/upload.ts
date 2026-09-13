import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'image/gif',
];

const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

const ALLOWED_DOC_TYPES = ['application/pdf'];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function saveUploadedFile(file: File): Promise<{
  filename: string;
  url: string;
  type: string;
  size: number;
}> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 50MB limit');
  }

  const allAllowed = [
    ...ALLOWED_IMAGE_TYPES,
    ...ALLOWED_VIDEO_TYPES,
    ...ALLOWED_DOC_TYPES,
  ];
  if (!allAllowed.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }

  let fileType = 'document';
  if (ALLOWED_IMAGE_TYPES.includes(file.type)) fileType = 'image';
  else if (ALLOWED_VIDEO_TYPES.includes(file.type)) fileType = 'video';

  const ext = file.name.split('.').pop() || 'bin';
  const safeName = `${randomUUID()}.${ext}`;

  const subDir = path.join(UPLOAD_DIR, fileType + 's');
  await mkdir(subDir, { recursive: true });

  const filePath = path.join(subDir, safeName);
  await writeFile(filePath, buffer);

  return {
    filename: file.name,
    url: `/uploads/${fileType}s/${safeName}`,
    type: fileType,
    size: buffer.length,
  };
}

export async function deleteUploadedFile(url: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'public', url);
  try {
    await unlink(filePath);
  } catch {
    // File may not exist, ignore
  }
}
