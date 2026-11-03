import { NextRequest, NextResponse } from 'next/server';
import { getDocumentList, getStorageStats, uploadDocument } from '@/lib/storage';


export async function GET() {
  try {
    const [documents, stats] = await Promise.all([
      getDocumentList(),
      getStorageStats(),
    ]);

    return NextResponse.json({
      success: true,
      documents,
      stats,
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const tagsJson = formData.get('tags') as string | null;
    const notes = (formData.get('notes') as string | null) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only PDF documents are allowed' },
        { status: 400 }
      );
    }

    let tags: string[] = [];
    if (tagsJson) {
      try {
        tags = JSON.parse(tagsJson);
      } catch {
        tags = tagsJson.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }

    const document = await uploadDocument(file, file.name, tags, notes);
    const stats = await getStorageStats();

    return NextResponse.json({
      success: true,
      document,
      stats,
    });
  } catch (error) {
    console.error('Error during upload:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}
