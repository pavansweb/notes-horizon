import { put, del, list } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { PDFDocument, StorageInfo } from '@/types/document';
import { getAllMetadata, saveMetadata, removeMetadata, updateMetadata } from './metadata';
import { sanitizeFilename } from './utils';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    // Directory exists
  }
}

export function isCloudStorage(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function getDocumentList(): Promise<PDFDocument[]> {
  const metadataMap = await getAllMetadata();

  if (isCloudStorage()) {
    try {
      const { blobs } = await list();
      const docs: PDFDocument[] = [];

      for (const blob of blobs) {
        const id = blob.pathname.replace(/^pdf\//, '').replace(/\.pdf$/, '') || blob.url;
        const meta = metadataMap[id] || metadataMap[blob.url] || metadataMap[blob.pathname];

        docs.push({
          id,
          name: meta?.name || path.basename(blob.pathname),
          url: blob.url,
          downloadUrl: blob.downloadUrl || blob.url,
          size: blob.size,
          uploadedAt: blob.uploadedAt ? new Date(blob.uploadedAt).toISOString() : new Date().toISOString(),
          tags: meta?.tags || [],
          isFavorite: meta?.isFavorite || false,
          notes: meta?.notes || '',
          pathname: blob.pathname,
          contentType: 'application/pdf',
        });
      }

      // Sort newest first by default
      return docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    } catch (err) {
      console.error('Error fetching Vercel blobs, falling back to local files:', err);
    }
  }

  // Local storage fallback
  await ensureUploadDir();
  try {
    const files = await fs.readdir(UPLOAD_DIR);
    const docs: PDFDocument[] = [];

    for (const file of files) {
      if (!file.toLowerCase().endsWith('.pdf') && !metadataMap[file]) continue;
      const filePath = path.join(UPLOAD_DIR, file);
      const stat = await fs.stat(filePath);
      const meta = metadataMap[file];

      const docId = file;
      const originalName = meta?.name || file.replace(/^[0-9]+-/, '');

      docs.push({
        id: docId,
        name: originalName,
        url: `/api/documents/local/${encodeURIComponent(file)}`,
        downloadUrl: `/api/documents/local/${encodeURIComponent(file)}?download=1`,
        size: stat.size,
        uploadedAt: meta?.uploadedAt || stat.mtime.toISOString(),
        tags: meta?.tags || [],
        isFavorite: meta?.isFavorite || false,
        notes: meta?.notes || '',
        pathname: file,
        contentType: 'application/pdf',
      });
    }

    return docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  } catch (err) {
    console.error('Error reading local uploads:', err);
    return [];
  }
}

export async function uploadDocument(
  file: File | Blob,
  filename: string,
  tags: string[] = [],
  notes: string = ''
): Promise<PDFDocument> {
  const cleanName = sanitizeFilename(filename);
  const now = new Date();
  const timestamp = now.getTime();
  const uniqueName = `${timestamp}-${cleanName}`;

  if (isCloudStorage()) {
    const pathname = `pdf/${uniqueName}`;
    const blob = await put(pathname, file, {
      access: 'public',
      contentType: 'application/pdf',
    });

    const id = uniqueName.replace(/\.pdf$/, '');
    const fileSize = (file as Blob).size || 0;
    const meta = await saveMetadata(id, {
      id,
      name: filename,
      pathname: blob.pathname,
      url: blob.url,
      size: fileSize,
      uploadedAt: now.toISOString(),
      tags,
      isFavorite: false,
      notes,
      contentType: 'application/pdf',
    });

    return {
      id,
      name: filename,
      url: blob.url,
      downloadUrl: blob.downloadUrl || blob.url,
      size: fileSize,
      uploadedAt: meta.uploadedAt,
      tags: meta.tags,
      isFavorite: meta.isFavorite,
      notes: meta.notes,
      pathname: blob.pathname,
      contentType: 'application/pdf',
    };
  }

  // Local storage upload
  await ensureUploadDir();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  await fs.writeFile(filePath, buffer);

  const meta = await saveMetadata(uniqueName, {
    id: uniqueName,
    name: filename,
    pathname: uniqueName,
    url: `/api/documents/local/${encodeURIComponent(uniqueName)}`,
    size: buffer.length,
    uploadedAt: now.toISOString(),
    tags,
    isFavorite: false,
    notes,
    contentType: 'application/pdf',
  });

  return {
    id: uniqueName,
    name: filename,
    url: `/api/documents/local/${encodeURIComponent(uniqueName)}`,
    downloadUrl: `/api/documents/local/${encodeURIComponent(uniqueName)}?download=1`,
    size: buffer.length,
    uploadedAt: meta.uploadedAt,
    tags: meta.tags,
    isFavorite: meta.isFavorite,
    notes: meta.notes,
    pathname: uniqueName,
    contentType: 'application/pdf',
  };
}

export async function deleteDocument(doc: PDFDocument): Promise<boolean> {
  try {
    if (isCloudStorage() && doc.url && !doc.url.startsWith('/api/')) {
      await del(doc.url);
    } else {
      // Local delete
      const filePath = path.join(UPLOAD_DIR, doc.pathname);
      await fs.unlink(filePath).catch(() => null);
    }
    await removeMetadata(doc.id);
    return true;
  } catch (err) {
    console.error('Failed to delete document:', err);
    return false;
  }
}

export async function updateDocumentDetails(
  id: string,
  updates: { isFavorite?: boolean; tags?: string[]; name?: string; notes?: string }
): Promise<PDFDocument | null> {
  const updated = await updateMetadata(id, updates);
  if (!updated) return null;

  return {
    id: updated.id,
    name: updated.name,
    url: updated.url,
    downloadUrl: updated.url,
    size: updated.size,
    uploadedAt: updated.uploadedAt,
    tags: updated.tags,
    isFavorite: updated.isFavorite,
    notes: updated.notes,
    pathname: updated.pathname,
    contentType: updated.contentType,
  };
}

export async function getStorageStats(): Promise<StorageInfo> {
  const docs = await getDocumentList();
  const usedBytes = docs.reduce((acc, curr) => acc + curr.size, 0);
  const favoriteCount = docs.filter((d) => d.isFavorite).length;
  // Free tier is 1 GB = 1024 * 1024 * 1024 bytes
  const maxBytes = 1024 * 1024 * 1024;

  return {
    totalBytes: maxBytes,
    usedBytes,
    maxBytes,
    fileCount: docs.length,
    favoriteCount,
    isCloud: isCloudStorage(),
  };
}
