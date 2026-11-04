import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from '@/types/document';
import { saveMetadata, updateMetadata, removeMetadata, getAllMetadata } from './metadata';

export interface DriveConfig {
  drive: drive_v3.Drive;
  folderId?: string;
}

// In-memory cache for Drive files list (30s TTL for fast navigation)
let cachedDriveDocs: PDFDocument[] | null = null;
let cachedDriveDocsTime = 0;
const CACHE_TTL_MS = 30 * 1000;

export function invalidateDriveCache() {
  cachedDriveDocs = null;
  cachedDriveDocsTime = 0;
}

// Load .upload-cache.json once if available for instant path lookups
let uploadCacheMap: Record<string, string> | null = null;
function getUploadCacheMap(): Record<string, string> {
  if (uploadCacheMap) return uploadCacheMap;
  uploadCacheMap = {};
  try {
    const cachePath = path.join(process.cwd(), '.upload-cache.json');
    if (fs.existsSync(cachePath)) {
      const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (data && data.files) {
        for (const item of Object.values(data.files) as Array<{ id?: string; relPath?: string }>) {
          if (item?.id && item?.relPath) {
            uploadCacheMap[item.id] = item.relPath;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not read .upload-cache.json:', err);
  }
  return uploadCacheMap;
}

function getServiceAccountCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  // Auto-detect JSON file in workspace root during local development
  if (process.env.NODE_ENV !== 'production') {
    try {
      const files = fs.readdirSync(/*turbopackIgnore: true*/ process.cwd());
      const jsonFile = files.find(
        (f) =>
          f.endsWith('.json') &&
          !['package.json', 'package-lock.json', 'tsconfig.json', 'components.json'].includes(f)
      );
      if (jsonFile) {
        const filePath = path.join(process.cwd(), jsonFile);
        const content = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
        const data = JSON.parse(content);
        if (data.type === 'service_account' && data.client_email && data.private_key) {
          return {
            email: data.client_email,
            key: data.private_key,
          };
        }
      }
    } catch (err) {
      console.warn('Could not read local service account json:', err);
    }
  }

  return null;
}

export function getDriveConfig(): DriveConfig | null {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  // Option 1: OAuth2 Refresh Token (Personal Google Account containing the JEE resources)
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

  // Option 2: Service Account fallback
  const saCreds = getServiceAccountCredentials();
  if (saCreds) {
    try {
      const auth = new google.auth.JWT({
        email: saCreds.email,
        key: saCreds.key,
        scopes: ['https://www.googleapis.com/auth/drive'],
      });
      return { drive: google.drive({ version: 'v3', auth }), folderId };
    } catch (err) {
      console.error('Error initializing Google Drive Service Account:', err);
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
      appProperties: { app: 'jee-resources' },
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

  invalidateDriveCache();

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
  const now = Date.now();
  if (cachedDriveDocs && now - cachedDriveDocsTime < CACHE_TTL_MS) {
    return cachedDriveDocs;
  }

  const config = getDriveConfig();
  if (!config) return [];

  const { drive, folderId } = config;
  const metadataMap = await getAllMetadata();
  const cacheMap = getUploadCacheMap();

  let query = "trashed = false and mimeType = 'application/pdf'";
  if (folderId) {
    query = `(appProperties has { key='app' and value='jee-resources' } or '${folderId}' in parents) and ${query}`;
  } else {
    query = `appProperties has { key='app' and value='jee-resources' } and ${query}`;
  }

  const files: Array<{
    id?: string | null;
    name?: string | null;
    size?: string | null;
    webViewLink?: string | null;
    webContentLink?: string | null;
    createdTime?: string | null;
    description?: string | null;
  }> = [];

  let pageToken: string | undefined = undefined;

  try {
    let hasMore = true;
    while (hasMore) {
      const res: { data: drive_v3.Schema$FileList } = await drive.files.list({
        q: query,
        fields: 'nextPageToken, files(id, name, size, webViewLink, webContentLink, createdTime, description)',
        orderBy: 'createdTime desc',
        pageSize: 1000,
        pageToken: pageToken,
      });

      const listFiles = res.data?.files || [];
      for (const item of listFiles) {
        files.push(item);
      }
      pageToken = res.data?.nextPageToken || undefined;
      hasMore = !!pageToken;
    }
  } catch (err) {
    console.error('Error querying Google Drive files:', err);
  }

  const docs: PDFDocument[] = [];

  for (const f of files) {
    if (!f.id) continue;
    const docId = `gdrive-${f.id}`;
    const meta = metadataMap[docId];

    let tags: string[] = meta?.tags || [];
    let notes: string = meta?.notes || '';
    let relPath: string = '';

    // If description holds meta json
    if (f.description) {
      try {
        const parsed = JSON.parse(f.description);
        if (parsed.tags && (!tags || tags.length === 0)) tags = parsed.tags;
        if (parsed.notes) {
          const match = parsed.notes.match(/Relative path:\s*(.+)/i);
          if (match) {
            relPath = match[1].trim();
          } else if (!notes) {
            notes = parsed.notes;
          }
        }
      } catch {
        if (!notes) notes = f.description;
      }
    }

    // Fallback to cacheMap if relPath wasn't in description
    if (!relPath && f.id && cacheMap[f.id]) {
      relPath = cacheMap[f.id];
    }

    // Exclude any PYQ or Question Paper files
    if (
      relPath.toLowerCase().includes('pyq') ||
      relPath.startsWith('JEE Main 2026 Qs') ||
      relPath.startsWith('Top 100 Qs') ||
      (f.name || '').toLowerCase().includes('pyq')
    ) {
      continue;
    }

    let folderPath = '';
    if (relPath) {
      const dir = path.dirname(relPath);
      if (dir && dir !== '.') {
        folderPath = dir.replace(/\\/g, '/');
      }
    }

    // Determine subject accurately
    const cleanLowerPath = folderPath.replace(/^Physics Wallah Content\/?/i, '').toLowerCase();
    const fileNameLower = (f.name || '').toLowerCase();

    let subject: 'Physics' | 'Chemistry' | 'Maths' | 'General' = 'General';
    if (cleanLowerPath.includes('saleem sir')) {
      subject = 'Physics';
    } else if (cleanLowerPath.includes('ashish sir')) {
      subject = 'Maths';
    } else if (cleanLowerPath.includes('pankaj sir') || cleanLowerPath.includes('rohit sir')) {
      subject = 'Chemistry';
    } else {
      const rawParts = cleanLowerPath.split('/');
      for (const part of rawParts) {
        if (part === 'physics' || part === 'phy') {
          subject = 'Physics';
          break;
        }
        if (part === 'chemistry' || part === 'chem') {
          subject = 'Chemistry';
          break;
        }
        if (part === 'maths' || part === 'mathematics' || part === 'math') {
          subject = 'Maths';
          break;
        }
      }

      if (subject === 'General') {
        const fullCheck = `${cleanLowerPath} ${fileNameLower} ${tags.join(' ').toLowerCase()}`;
        if (/(\bchemistry\b|\bchem\b|\borganic\b|\binorganic\b)/i.test(fullCheck)) {
          subject = 'Chemistry';
        } else if (/(\bphysics\b|\bphy\b)/i.test(fullCheck)) {
          subject = 'Physics';
        } else if (/(\bmaths\b|\bmathematics\b|\bcalculus\b|\balgebra\b|\btrigonometry\b)/i.test(fullCheck)) {
          subject = 'Maths';
        } else {
          subject = 'Physics'; // Default safe fallback
        }
      }
    }

    // Determine resource category
    const cleanParts = folderPath
      .replace(/^Physics Wallah Content\/?/i, '')
      .replace(/^agy ai genrated\/?/i, '')
      .split('/')
      .filter(Boolean);
    const rawType = cleanParts[0] || 'Short Notes';

    let category = 'Short Notes';
    let isAI = false;

    if (
      rawType.toLowerCase().includes('summary') ||
      rawType.toLowerCase().includes('ai') ||
      rawType.toLowerCase() === 'agy'
    ) {
      isAI = true;
      category = 'AI Generated Summary';
    } else if (rawType.toLowerCase().includes('mindmap')) {
      category = 'Mind Maps & Flowcharts';
    } else if (rawType === 'Teacher Kits') {
      category = 'Teacher Kits';
    } else if (rawType === 'Formula Sheets') {
      category = 'Formula Sheets';
    } else if (rawType === 'Syllabus') {
      category = 'Syllabus';
    }

    // Construct 2-folder structure inside Subject: Physics Wallah vs agy
    let structuredPath = '';
    if (isAI) {
      const remainingParts = cleanParts.slice(1);
      structuredPath = remainingParts.length > 0
        ? `${subject}/agy/${remainingParts.join('/')}`
        : `${subject}/agy`;
    } else {
      if (category === 'Teacher Kits') {
        const kitName = cleanParts[1] || 'General Kit';
        const sub = cleanParts.slice(2).join('/');
        structuredPath = sub
          ? `${subject}/Physics Wallah/Teacher Kits/${kitName}/${sub}`
          : `${subject}/Physics Wallah/Teacher Kits/${kitName}`;
      } else if (category === 'Syllabus') {
        const exam = cleanParts[1] || '';
        structuredPath = exam
          ? `${subject}/Physics Wallah/Syllabus/${exam}`
          : `${subject}/Physics Wallah/Syllabus`;
      } else {
        const remainingParts = cleanParts.slice(1).filter((p) => {
          const pl = p.toLowerCase();
          return pl !== 'physics' && pl !== 'chemistry' && pl !== 'maths' && pl !== 'math';
        });
        if (remainingParts.length > 0) {
          structuredPath = `${subject}/Physics Wallah/${category}/${remainingParts.join('/')}`;
        } else {
          structuredPath = `${subject}/Physics Wallah/${category}`;
        }
      }
    }

    folderPath = structuredPath;
    const folderParts = folderPath.split('/').filter(Boolean);

    // Infer classLevel
    let classLevel: string | undefined = undefined;
    if (folderPath.includes('Class 11')) classLevel = 'Class 11';
    else if (folderPath.includes('Class 12')) classLevel = 'Class 12';
    else if (folderPath.includes('JEE Advance')) classLevel = 'JEE Advance';
    else if (folderPath.includes('JEE Mains')) classLevel = 'JEE Mains';

    // Physics Wallah tag verification
    const isPhysicsWallah =
      !cleanLowerPath.startsWith('ai gen') &&
      !cleanLowerPath.startsWith('user upload') &&
      !fileNameLower.includes('custom_note');
    if (isPhysicsWallah && !tags.includes('Physics Wallah')) {
      tags = ['Physics Wallah', ...tags];
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
      folderPath,
      folderParts,
      category,
      subject,
      classLevel,
      isPhysicsWallah,
    });
  }

  cachedDriveDocs = docs;
  cachedDriveDocsTime = Date.now();
  return docs;
}

export async function deleteDriveFile(fileId: string): Promise<boolean> {
  const config = getDriveConfig();
  if (!config) return false;

  const cleanId = fileId.replace(/^gdrive-/, '');
  try {
    await config.drive.files.delete({ fileId: cleanId });
    await removeMetadata(`gdrive-${cleanId}`);
    invalidateDriveCache();
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
  invalidateDriveCache();

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
