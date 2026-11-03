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
}

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'size-desc' | 'size-asc';

export type ViewMode = 'grid' | 'list';

export interface StorageInfo {
  totalBytes: number;
  usedBytes: number;
  maxBytes: number;
  fileCount: number;
  favoriteCount: number;
  isCloud: boolean;
}
