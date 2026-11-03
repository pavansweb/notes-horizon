import { NextRequest, NextResponse } from 'next/server';
import { getDriveConfig } from '@/lib/googleDrive';
import { Readable } from 'stream';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const cleanId = decodeURIComponent(id).replace(/^gdrive-/, '');

    const config = getDriveConfig();
    if (!config) {
      return new NextResponse('Google Drive storage is not configured', { status: 503 });
    }

    const { drive } = config;

    // Get file metadata for name and size
    let filename = `${cleanId}.pdf`;
    let size: string | undefined;

    try {
      const meta = await drive.files.get({
        fileId: cleanId,
        fields: 'name, size',
      });
      if (meta.data.name) filename = meta.data.name;
      if (meta.data.size) size = meta.data.size;
    } catch (metaErr) {
      console.warn('Could not fetch Drive file metadata:', metaErr);
    }

    // Fetch the file binary stream
    const driveRes = await drive.files.get(
      { fileId: cleanId, alt: 'media' },
      { responseType: 'stream' }
    );

    const isDownload = request.nextUrl.searchParams.get('download') === '1';

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Accept-Ranges', 'bytes');
    if (size) headers.set('Content-Length', size);

    const safeAsciiFilename = filename.replace(/["\\]/g, '').replace(/[^\x20-\x7E]/g, '_');
    headers.set(
      'Content-Disposition',
      `${isDownload ? 'attachment' : 'inline'}; filename="${safeAsciiFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
    );
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

    // Convert Node Readable stream to Web ReadableStream
    const webStream = Readable.toWeb(driveRes.data as unknown as Readable) as unknown as ReadableStream;

    return new Response(webStream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error streaming from Google Drive:', error);
    return new NextResponse('File not found or failed to load from Google Drive', { status: 404 });
  }
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const cleanId = decodeURIComponent(id).replace(/^gdrive-/, '');

    const config = getDriveConfig();
    if (!config) {
      return new NextResponse(null, { status: 503 });
    }

    const meta = await config.drive.files.get({
      fileId: cleanId,
      fields: 'name, size',
    });

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Accept-Ranges', 'bytes');
    if (meta.data.size) headers.set('Content-Length', meta.data.size);

    return new Response(null, {
      status: 200,
      headers,
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
