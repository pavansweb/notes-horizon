export interface PDFDocument {
  id: string;
  name: string;
  url: string;
  downloadUrl: string;
  size: number;
  uploadedAt: string;
  tags: string[];
  isFavorite: boolean;
  notes?: string;
  pathname: string;
  contentType: string;
  folderPath?: string;
  folderParts?: string[];
  category?: string;
  subject?: 'Physics' | 'Chemistry' | 'Maths' | 'General';
  classLevel?: string;
}

export type SortOption =
  | 'chapter-asc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'oldest'
  | 'size-desc'
  | 'size-asc';

export type ViewMode = 'grid' | 'list';

export interface StorageInfo {
  totalBytes: number;
  usedBytes: number;
  maxBytes: number;
  fileCount: number;
  favoriteCount: number;
  isCloud: boolean;
}

export interface FolderNode {
  id: string;
  name: string;
  path: string;
  depth: number;
  parentPath: string;
  totalFileCount: number;
  directFileCount: number;
  subfolderCount: number;
  subject?: 'Physics' | 'Chemistry' | 'Maths' | 'General';
  classLevel?: string;
  category?: string;
}
