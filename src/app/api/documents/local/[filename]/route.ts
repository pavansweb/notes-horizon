import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const decodedName = decodeURIComponent(filename);

    // Prevent path traversal
    const safePath = path.resolve(UPLOAD_DIR, decodedName);
    if (!safePath.startsWith(UPLOAD_DIR)) {
      return new NextResponse('Access denied', { status: 403 });
    }

    try {
      const fileBuffer = await fs.readFile(safePath);
      const isDownload = request.nextUrl.searchParams.get('download') === '1';

      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Length', fileBuffer.length.toString());
      headers.set(
        'Content-Disposition',
        `${isDownload ? 'attachment' : 'inline'}; filename="${decodedName}"`
      );
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');

      return new NextResponse(fileBuffer, {
        status: 200,
        headers,
      });
    } catch {
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error serving local file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
