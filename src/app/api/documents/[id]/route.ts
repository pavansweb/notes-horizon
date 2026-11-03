import { NextRequest, NextResponse } from 'next/server';
import { getDocumentList, updateDocumentDetails, deleteDocument, getStorageStats } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const decodedId = decodeURIComponent(id);
    const docs = await getDocumentList();
    const doc = docs.find((d) => d.id === decodedId || d.pathname === decodedId);

    if (!doc) {
      // If it looks like a gdrive ID, redirect directly to the drive endpoint
      if (decodedId.startsWith('gdrive-') || decodedId.length > 20) {
        const clean = decodedId.replace(/^gdrive-/, '');
        const target = new URL(`/api/documents/drive/${clean}`, request.url);
        request.nextUrl.searchParams.forEach((v, k) => target.searchParams.set(k, v));
        return NextResponse.redirect(target, 307);
      }
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
    }

    const wantsJson = request.nextUrl.searchParams.get('json') === '1' ||
      request.headers.get('accept')?.includes('application/json');

    if (wantsJson) {
      return NextResponse.json({ success: true, document: doc });
    }

    // Redirect to the direct streaming endpoint
    const targetUrl = new URL(doc.url, request.url);
    if (request.nextUrl.searchParams.get('download') === '1') {
      targetUrl.searchParams.set('download', '1');
    }
    return NextResponse.redirect(targetUrl, 307);
  } catch (error) {
    console.error('Error fetching document by ID:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await updateDocumentDetails(decodeURIComponent(id), {
      isFavorite: body.isFavorite,
      tags: body.tags,
      name: body.name,
      notes: body.notes,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    const stats = await getStorageStats();

    return NextResponse.json({
      success: true,
      document: updated,
      stats,
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const decodedId = decodeURIComponent(id);
    const docs = await getDocumentList();
    const docToDelete = docs.find((d) => d.id === decodedId || d.pathname === decodedId);

    if (!docToDelete) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    const success = await deleteDocument(docToDelete);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete file from storage' },
        { status: 500 }
      );
    }

    const stats = await getStorageStats();

    return NextResponse.json({
      success: true,
      deletedId: decodedId,
      stats,
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
