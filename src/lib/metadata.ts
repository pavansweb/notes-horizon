import fs from 'fs/promises';
import path from 'path';

export interface DocumentMetadata {
  id: string;
  name: string;
  pathname: string;
  url: string;
  size: number;
  uploadedAt: string;
  tags: string[];
  isFavorite: boolean;
  notes?: string;
  contentType: string;
  folderPath?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const METADATA_FILE = path.join(DATA_DIR, 'metadata.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Already exists
  }
}

export async function getAllMetadata(): Promise<Record<string, DocumentMetadata>> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(METADATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function saveMetadata(id: string, metadata: Partial<DocumentMetadata> & { pathname: string }): Promise<DocumentMetadata> {
  await ensureDataDir();
  const all = await getAllMetadata();
  const existing = all[id] || {
    id,
    name: path.basename(metadata.pathname),
    pathname: metadata.pathname,
    url: metadata.url || '',
    size: metadata.size || 0,
    uploadedAt: new Date().toISOString(),
    tags: [],
    isFavorite: false,
    contentType: 'application/pdf',
  };

  const updated: DocumentMetadata = {
    ...existing,
    ...metadata,
    id,
  };

  all[id] = updated;
  try {
    await fs.writeFile(METADATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write metadata to disk (read-only filesystem on serverless?):', err);
  }

  return updated;
}

export async function updateMetadata(id: string, updates: Partial<DocumentMetadata>): Promise<DocumentMetadata | null> {
  await ensureDataDir();
  const all = await getAllMetadata();
  if (!all[id]) {
    // If not in disk metadata yet, create it
    all[id] = {
      id,
      name: updates.name || 'Document.pdf',
      pathname: updates.pathname || id,
      url: updates.url || '',
      size: updates.size || 0,
      uploadedAt: updates.uploadedAt || new Date().toISOString(),
      tags: updates.tags || [],
      isFavorite: !!updates.isFavorite,
      notes: updates.notes || '',
      contentType: 'application/pdf',
    };
  }

  all[id] = {
    ...all[id],
    ...updates,
  };

  try {
    await fs.writeFile(METADATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write metadata to disk:', err);
  }

  return all[id];
}

export async function removeMetadata(id: string): Promise<void> {
  try {
    const all = await getAllMetadata();
    delete all[id];
    await fs.writeFile(METADATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not remove metadata:', err);
  }
}
