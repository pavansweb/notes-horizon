import { NextRequest, NextResponse } from 'next/server';
import { getDocumentList, updateDocumentDetails, deleteDocument, getStorageStats } from '@/lib/storage';


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
