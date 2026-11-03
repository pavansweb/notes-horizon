import { google } from 'googleapis';
import { Readable } from 'stream';
import { PDFDocument } from '@/types/document';
import { saveMetadata, updateMetadata, removeMetadata, getAllMetadata } from './metadata';

export interface DriveConfig {
  drive: ReturnType<typeof google.drive>;
  folderId?: string;
}

export function getDriveConfig(): DriveConfig | null {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  // Option 1: Service Account
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    try {
      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      return { drive: google.drive({ version: 'v3', auth }), folderId };
    } catch (err) {
      console.error('Error initializing Google Drive Service Account:', err);
    }
  }

  // Option 2: OAuth2 Refresh Token (Personal Google Account)
  if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  ) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });
      return { drive: google.drive({ version: 'v3', auth: oauth2Client }), folderId };
    } catch (err) {
      console.error('Error initializing Google Drive OAuth2:', err);
    }
  }

  return null;
}

export function isDriveConfigured(): boolean {
  return !!getDriveConfig();
}

export async function uploadToDrive(
  file: File | Blob,
  filename: string,
  tags: string[] = [],
  notes: string = ''
): Promise<PDFDocument | null> {
  const config = getDriveConfig();
  if (!config) return null;

  const { drive, folderId } = config;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  const metaPayload = JSON.stringify({ tags, notes, originalName: filename });

  const response = await drive.files.create({
    requestBody: {
      name: filename,
      mimeType: 'application/pdf',
      parents: folderId ? [folderId] : undefined,
      description: metaPayload,
    },
    media: {
      mimeType: 'application/pdf',
      body: stream,
    },
    fields: 'id, name, size, webViewLink, webContentLink, createdTime, description',
  });

  const fileData = response.data;
  if (!fileData.id) throw new Error('Google Drive upload failed: No file ID returned');

  // Set file to anyone with link can view (public read)
  try {
    await drive.permissions.create({
      fileId: fileData.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  } catch (permErr) {
    console.warn('Could not set public permission on Drive file:', permErr);
  }

  const docId = `gdrive-${fileData.id}`;
  const now = new Date().toISOString();

  await saveMetadata(docId, {
    id: docId,
    name: filename,
    pathname: fileData.id,
    url: `/api/documents/drive/${fileData.id}`,
    size: parseInt(fileData.size || `${buffer.length}`, 10),
    uploadedAt: fileData.createdTime || now,
    tags,
    isFavorite: false,
    notes,
    contentType: 'application/pdf',
  });

  return {
    id: docId,
    name: filename,
    url: `/api/documents/drive/${fileData.id}`,
    downloadUrl: `/api/documents/drive/${fileData.id}?download=1`,
    size: parseInt(fileData.size || `${buffer.length}`, 10),
    uploadedAt: fileData.createdTime || now,
    tags,
    isFavorite: false,
    notes,
    pathname: fileData.id,
    contentType: 'application/pdf',
  };
}

export async function listDriveFiles(): Promise<PDFDocument[]> {
  const config = getDriveConfig();
  if (!config) return [];

  const { drive, folderId } = config;
  const metadataMap = await getAllMetadata();

  let query = "trashed = false and mimeType = 'application/pdf'";
  if (folderId) {
    query = `'${folderId}' in parents and ${query}`;
  }

  const response = await drive.files.list({
    q: query,
    fields: 'files(id, name, size, webViewLink, webContentLink, createdTime, description)',
    orderBy: 'createdTime desc',
    pageSize: 100,
  });

  const files = response.data.files || [];
  const docs: PDFDocument[] = [];

  for (const f of files) {
    if (!f.id) continue;
    const docId = `gdrive-${f.id}`;
    const meta = metadataMap[docId];

    let tags: string[] = meta?.tags || [];
    let notes: string = meta?.notes || '';

    // If description holds meta json
    if (f.description) {
      try {
        const parsed = JSON.parse(f.description);
        if (parsed.tags && (!tags || tags.length === 0)) tags = parsed.tags;
        if (parsed.notes && !notes) notes = parsed.notes;
      } catch {
        if (!notes) notes = f.description;
      }
    }

    docs.push({
      id: docId,
      name: f.name || 'Untitled.pdf',
      url: `/api/documents/drive/${f.id}`,
      downloadUrl: `/api/documents/drive/${f.id}?download=1`,
      size: parseInt(f.size || '0', 10),
      uploadedAt: f.createdTime ? new Date(f.createdTime).toISOString() : new Date().toISOString(),
      tags,
      isFavorite: meta?.isFavorite || false,
      notes,
      pathname: f.id,
      contentType: 'application/pdf',
    });
  }

  return docs;
}

export async function deleteDriveFile(fileId: string): Promise<boolean> {
  const config = getDriveConfig();
  if (!config) return false;

  const cleanId = fileId.replace(/^gdrive-/, '');
  try {
    await config.drive.files.delete({ fileId: cleanId });
    await removeMetadata(`gdrive-${cleanId}`);
    return true;
  } catch (err) {
    console.error('Error deleting file from Google Drive:', err);
    return false;
  }
}

export async function updateDriveMetadata(
  fileId: string,
  updates: { isFavorite?: boolean; tags?: string[]; name?: string; notes?: string }
): Promise<PDFDocument | null> {
  const config = getDriveConfig();
  const cleanId = fileId.replace(/^gdrive-/, '');
  const docId = `gdrive-${cleanId}`;

  const meta = await updateMetadata(docId, updates);
  if (!meta) return null;

  if (config && updates.notes) {
    try {
      await config.drive.files.update({
        fileId: cleanId,
        requestBody: {
          description: JSON.stringify({
            tags: meta.tags,
            notes: meta.notes,
            name: meta.name,
          }),
        },
      });
    } catch {
      // Non-critical
    }
  }

  return {
    id: docId,
    name: meta.name,
    url: `/api/documents/drive/${cleanId}`,
    downloadUrl: `/api/documents/drive/${cleanId}?download=1`,
    size: meta.size,
    uploadedAt: meta.uploadedAt,
    tags: meta.tags,
    isFavorite: meta.isFavorite,
    notes: meta.notes,
    pathname: cleanId,
    contentType: 'application/pdf',
  };
}

export async function getDriveStorageQuota(): Promise<{ total: number; used: number }> {
  const config = getDriveConfig();
  if (!config) {
    // 2 TB default for Gemini Pro / Google One
    return { total: 2 * 1024 * 1024 * 1024 * 1024, used: 0 };
  }

  try {
    const about = await config.drive.about.get({
      fields: 'storageQuota',
    });

    const quota = about.data.storageQuota;
    const total = quota?.limit ? parseInt(quota.limit, 10) : 2 * 1024 * 1024 * 1024 * 1024;
    const used = quota?.usage ? parseInt(quota.usage, 10) : 0;

    return { total, used };
  } catch {
    return { total: 2 * 1024 * 1024 * 1024 * 1024, used: 0 };
  }
}
