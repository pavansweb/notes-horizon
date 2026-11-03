'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PDFDocument, StorageInfo, SortOption, ViewMode, FolderNode } from '@/types/document';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { FolderCard } from '@/components/FolderCard';
import { DropZone } from '@/components/DropZone';
import { DocumentCard } from '@/components/DocumentCard';
import { DocumentList } from '@/components/DocumentList';
import { PDFViewerModal } from '@/components/PDFViewerModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { useToast } from '@/components/Toast';
import {
  FileQuestion,
  RefreshCw,
  Trash2,
  Download,
  FolderOpen,
  Search,
  Star,
  Clock,
  Sparkles,
} from 'lucide-react';

// Maps a document's relative path based on the clean Subject-first structure
function getDocFolderPath(doc: PDFDocument): string {
  let raw = doc.folderPath || '';
  // Strip legacy prefixes
  raw = raw.replace(/^Physics Wallah Content\/?/i, '').replace(/^agy ai genrated\/?/i, '');

  if (!raw) {
    const subj = doc.subject && doc.subject !== 'General' ? doc.subject : 'Physics';
    const cat = doc.category || 'Short Notes';
    return `${subj}/${cat}`;
  }

  // Check if it already starts with a subject
  const parts = raw.split('/').filter(Boolean);
  let subject = parts[0];

  if (!['Physics', 'Chemistry', 'Maths'].includes(subject)) {
    subject = doc.subject && doc.subject !== 'General' ? doc.subject : 'Physics';
    raw = `${subject}/${raw}`;
  }

  // Normalize category naming
  raw = raw
    .replace(/\/Mindmaps(\/|$)/i, '/Mind Maps & Flowcharts$1')
    .replace(/\/(JEE Main 2026 Qs|Top 100 Qs for 2026)(\/|$)/i, '/Question Papers$2');

  return raw;
}

const TYPE_ORDER: Record<string, number> = {
  'Mind Maps & Flowcharts': 1,
  'Short Notes': 2,
  'Formula Sheets': 3,
  'Teacher Kits': 4,
  'Question Papers': 5,
  'AI Generated Summary': 6,
  'Syllabus': 7,
};

const SUBJECT_ORDER: Record<string, number> = {
  Physics: 1,
  Chemistry: 2,
  Maths: 3,
};

const CLASS_ORDER: Record<string, number> = {
  'Class 11': 1,
  'Class 12': 2,
  'JEE Mains': 3,
  'JEE Advance': 4,
};

export default function Home() {
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [stats, setStats] = useState<StorageInfo>({
    totalBytes: 2 * 1024 * 1024 * 1024 * 1024,
    usedBytes: 0,
    maxBytes: 2 * 1024 * 1024 * 1024 * 1024,
    fileCount: 0,
    favoriteCount: 0,
    isCloud: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Navigation states
  const [currentFolderPath, setCurrentFolderPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const folderParam = params.get('folder');
      if (folderParam) {
        return folderParam
          .replace(/^Physics Wallah Content\/?/i, '')
          .replace(/^agy ai genrated\/?/i, '');
      }
    }
    return '';
  });
  const [isStarredView, setIsStarredView] = useState<boolean>(false);
  const [isRecentView, setIsRecentView] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('chapter-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showAllNested, setShowAllNested] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modal & Selection states
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<PDFDocument | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<PDFDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshDocuments = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Fetch documents on mount & refreshTrigger
  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/documents');
        if (!res.ok) throw new Error('Failed to load documents');
        const data = await res.json();
        if (!isCancelled && data.success) {
          setDocuments(data.documents || []);
          if (data.stats) setStats(data.stats);
        }
      } catch {
        if (!isCancelled) {
          showToast('Could not load documents', 'error');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [refreshTrigger, showToast]);



  // Handle browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const folderParam = (params.get('folder') || '')
        .replace(/^Physics Wallah Content\/?/i, '')
        .replace(/^agy ai genrated\/?/i, '');
      setCurrentFolderPath(folderParam);
      setIsStarredView(false);
      setIsRecentView(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize URL when folder path changes
  const navigateToFolder = useCallback((rawPath: string) => {
    const targetPath = rawPath
      .replace(/^Physics Wallah Content\/?/i, '')
      .replace(/^agy ai genrated\/?/i, '');

    setCurrentFolderPath(targetPath);
    setIsStarredView(false);
    setIsRecentView(false);
    setSelectedIds([]);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (targetPath) {
        url.searchParams.set('folder', targetPath);
      } else {
        url.searchParams.delete('folder');
      }
      window.history.pushState({ folder: targetPath }, '', url.toString());
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        window.document.activeElement?.tagName !== 'INPUT'
      ) {
        e.preventDefault();
        const searchInput = window.document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement | null;
        searchInput?.focus();
        return;
      }

      if (
        e.key === 'Backspace' &&
        window.document.activeElement?.tagName !== 'INPUT' &&
        window.document.activeElement?.tagName !== 'TEXTAREA' &&
        !previewDoc &&
        !deleteDoc
      ) {
        if (currentFolderPath) {
          e.preventDefault();
          const parts = currentFolderPath.split('/').filter(Boolean);
          if (parts.length > 0) {
            const parent = parts.slice(0, -1).join('/');
            navigateToFolder(parent);
          }
        }
      }

      if (e.key === 'Escape') {
        if (searchQuery) setSearchQuery('');
        if (isSidebarOpen) setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFolderPath, previewDoc, deleteDoc, searchQuery, isSidebarOpen, navigateToFolder]);

  // Build Folder Hierarchy: strictly Physics, Chemistry, Maths at root
  const { folderMap, categoryCounts } = useMemo(() => {
    const fMap = new Map<string, FolderNode>();
    const catCounts: Record<string, number> = {};

    // 1. Initial 3 Root Subject Folders ONLY
    const ROOT_SUBJECTS: Array<'Physics' | 'Chemistry' | 'Maths'> = ['Physics', 'Chemistry', 'Maths'];
    const STANDARD_CATEGORIES = [
      'Mind Maps & Flowcharts',
      'Short Notes',
      'Formula Sheets',
      'Teacher Kits',
      'Question Papers',
      'AI Generated Summary',
      'Syllabus',
    ];

    for (const subj of ROOT_SUBJECTS) {
      fMap.set(subj, {
        id: subj,
        name: subj,
        path: subj,
        depth: 0,
        parentPath: '',
        totalFileCount: 0,
        directFileCount: 0,
        subfolderCount: 0,
        subject: subj,
        category: subj,
      });

      // Ensure standard categories exist for each subject
      for (const cat of STANDARD_CATEGORIES) {
        const catPath = `${subj}/${cat}`;
        fMap.set(catPath, {
          id: catPath,
          name: cat,
          path: catPath,
          depth: 1,
          parentPath: subj,
          totalFileCount: 0,
          directFileCount: 0,
          subfolderCount: 0,
          subject: subj,
          category: cat,
        });
      }
    }

    documents.forEach((doc) => {
      const folderPath = getDocFolderPath(doc);
      if (!folderPath) return;

      const parts = folderPath.split('/').filter(Boolean);
      if (parts[0]) catCounts[parts[0]] = (catCounts[parts[0]] || 0) + 1;
      if (parts[1]) catCounts[parts[1]] = (catCounts[parts[1]] || 0) + 1;
      if (parts[2]) catCounts[parts[2]] = (catCounts[parts[2]] || 0) + 1;

      for (let i = 0; i < parts.length; i++) {
        const subPath = parts.slice(0, i + 1).join('/');
        const parent = i === 0 ? '' : parts.slice(0, i).join('/');
        const name = parts[i];

        if (!fMap.has(subPath)) {
          let subject: 'Physics' | 'Chemistry' | 'Maths' | 'General' | undefined = undefined;
          if (parts[0] === 'Physics' || parts[0] === 'Chemistry' || parts[0] === 'Maths') {
            subject = parts[0];
          }

          let classLevel: string | undefined = undefined;
          if (subPath.includes('Class 11')) classLevel = 'Class 11';
          else if (subPath.includes('Class 12')) classLevel = 'Class 12';
          else if (subPath.includes('JEE Advance')) classLevel = 'JEE Advance';
          else if (subPath.includes('JEE Mains')) classLevel = 'JEE Mains';

          fMap.set(subPath, {
            id: subPath,
            name,
            path: subPath,
            depth: i,
            parentPath: parent,
            totalFileCount: 0,
            directFileCount: 0,
            subfolderCount: 0,
            subject,
            classLevel,
            category: parts[1] || parts[0],
          });
        }

        const node = fMap.get(subPath)!;
        node.totalFileCount += 1;
        if (i === parts.length - 1) {
          node.directFileCount += 1;
        }
      }
    });

    // Compute subfolder counts
    const parentChildrenMap = new Map<string, Set<string>>();
    fMap.forEach((node) => {
      if (!parentChildrenMap.has(node.parentPath)) {
        parentChildrenMap.set(node.parentPath, new Set());
      }
      parentChildrenMap.get(node.parentPath)!.add(node.path);
    });

    fMap.forEach((node) => {
      const childSet = parentChildrenMap.get(node.path);
      node.subfolderCount = childSet ? childSet.size : 0;
    });

    return { folderMap: fMap, categoryCounts: catCounts };
  }, [documents]);

  // Subfolders in current view
  const currentSubfolders = useMemo(() => {
    if (isStarredView || isRecentView || searchQuery.trim().length > 0) {
      return [];
    }

    const subfolders: FolderNode[] = [];
    folderMap.forEach((node) => {
      if (node.parentPath === currentFolderPath) {
        if (selectedSubject !== 'All' && node.subject && node.subject !== selectedSubject) {
          return;
        }
        if (selectedClass !== 'All' && node.classLevel && node.classLevel !== selectedClass) {
          return;
        }
        subfolders.push(node);
      }
    });

    // Root ordering: Physics -> Chemistry -> Maths
    if (currentFolderPath === '') {
      subfolders.sort((a, b) => (SUBJECT_ORDER[a.name] ?? 99) - (SUBJECT_ORDER[b.name] ?? 99));
    } else {
      subfolders.sort((a, b) => {
        const typeOrderA = TYPE_ORDER[a.name];
        const typeOrderB = TYPE_ORDER[b.name];
        if (typeOrderA !== undefined && typeOrderB !== undefined) return typeOrderA - typeOrderB;

        const classOrderA = CLASS_ORDER[a.name];
        const classOrderB = CLASS_ORDER[b.name];
        if (classOrderA !== undefined && classOrderB !== undefined) return classOrderA - classOrderB;

        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
      });
    }

    return subfolders;
  }, [folderMap, currentFolderPath, isStarredView, isRecentView, searchQuery, selectedSubject, selectedClass]);

  // Filtered & sorted documents
  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.folderPath?.toLowerCase().includes(q) ||
          d.notes?.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      );

      if (selectedSubject !== 'All') {
        result = result.filter((d) => d.subject === selectedSubject || d.tags?.includes(selectedSubject));
      }
      if (selectedClass !== 'All') {
        result = result.filter(
          (d) => d.classLevel === selectedClass || d.folderPath?.includes(selectedClass)
        );
      }
    } else if (isStarredView) {
      result = result.filter((d) => d.isFavorite);
    } else if (isRecentView) {
      // recent files
    } else {
      if (showAllNested) {
        if (currentFolderPath) {
          result = result.filter((d) => {
            const p = getDocFolderPath(d);
            return p === currentFolderPath || p.startsWith(currentFolderPath + '/');
          });
        }
      } else {
        result = result.filter((d) => getDocFolderPath(d) === currentFolderPath);
      }

      if (selectedSubject !== 'All') {
        result = result.filter((d) => d.subject === selectedSubject || d.tags?.includes(selectedSubject));
      }
      if (selectedClass !== 'All') {
        result = result.filter(
          (d) => d.classLevel === selectedClass || d.folderPath?.includes(selectedClass)
        );
      }
    }

    result.sort((a, b) => {
      if (sortOption === 'chapter-asc' || sortOption === 'name-asc') {
        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
      }
      if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' });
      }
      if (sortOption === 'newest') {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
      if (sortOption === 'oldest') {
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      }
      if (sortOption === 'size-desc') {
        return b.size - a.size;
      }
      if (sortOption === 'size-asc') {
        return a.size - b.size;
      }
      return 0;
    });

    return result;
  }, [
    documents,
    searchQuery,
    isStarredView,
    isRecentView,
    currentFolderPath,
    showAllNested,
    selectedSubject,
    selectedClass,
    sortOption,
  ]);

  // Toggle favorite
  const handleToggleFavorite = async (id: string, currentState: boolean) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: !currentState } : d))
    );
    if (previewDoc && previewDoc.id === id) {
      setPreviewDoc((prev) => (prev ? { ...prev, isFavorite: !currentState } : null));
    }

    try {
      const res = await fetch(`/api/documents/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !currentState }),
      });
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    } catch {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isFavorite: currentState } : d))
      );
      showToast('Failed to update favorite', 'error');
    }
  };

  // Update notes or tags
  const handleUpdateMetadata = async (
    id: string,
    updates: { notes?: string; tags?: string[] }
  ) => {
    try {
      const res = await fetch(`/api/documents/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success && data.document) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
        );
        if (previewDoc && previewDoc.id === id) {
          setPreviewDoc((prev) => (prev ? { ...prev, ...updates } : null));
        }
      }
    } catch {
      showToast('Failed to update notes', 'error');
    }
  };

  // Confirm delete
  const handleConfirmDelete = async (doc: PDFDocument) => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/documents/${encodeURIComponent(doc.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
        if (data.stats) setStats(data.stats);
        if (previewDoc?.id === doc.id) setPreviewDoc(null);
        setSelectedIds((prev) => prev.filter((id) => id !== doc.id));
        showToast('Document deleted', 'success');
      } else {
        throw new Error(data.error || 'Failed to delete');
      }
    } catch (err) {
      showToast((err as Error).message || 'Failed to delete', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteDoc(null);
    }
  };

  // Bulk actions
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedDocs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedDocs.map((d) => d.id));
    }
  };

  const handleBulkDownload = () => {
    const selectedDocs = documents.filter((d) => selectedIds.includes(d.id));
    selectedDocs.forEach((doc, idx) => {
      setTimeout(() => {
        const link = window.document.createElement('a');
        link.href = doc.downloadUrl;
        link.download = doc.name;
        link.target = '_blank';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
      }, idx * 250);
    });
    showToast(`Downloading ${selectedDocs.length} files...`, 'info');
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} selected files?`)) return;

    for (const id of selectedIds) {
      try {
        await fetch(`/api/documents/${encodeURIComponent(id)}`, { method: 'DELETE' });
      } catch {
        // Continue
      }
    }

    showToast('Deleted selected files', 'success');
    setSelectedIds([]);
    refreshDocuments();
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
      {/* Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen((prev) => !prev)}
        stats={stats}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Layout: Sidebar + Explorer */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6">
        {/* Navigation Sidebar */}
        <Sidebar
          currentPath={currentFolderPath}
          onNavigatePath={navigateToFolder}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          selectedClass={selectedClass}
          onSelectClass={setSelectedClass}
          stats={stats}
          isStarredView={isStarredView}
          onSelectStarredView={() => {
            setIsStarredView(true);
            setIsRecentView(false);
            setSearchQuery('');
          }}
          isRecentView={isRecentView}
          onSelectRecentView={() => {
            setIsRecentView(true);
            setIsStarredView(false);
            setSearchQuery('');
            setSortOption('newest');
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categoryCounts={categoryCounts}
        />

        {/* Explorer Content */}
        <main className="flex-1 min-w-0 py-5 px-2 sm:px-4 space-y-4">
          {/* Upload Drawer */}
          {isUploadOpen && (
            <div className="animate-in fade-in duration-200 mb-4">
              <DropZone
                onUploadSuccess={refreshDocuments}
                onClose={() => setIsUploadOpen(false)}
              />
            </div>
          )}

          {/* Search Header Banner */}
          {searchQuery.trim().length > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-300">
                  Search results for &quot;<span className="text-white font-medium">{searchQuery}</span>&quot;
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {filteredAndSortedDocs.length} matches
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Starred Banner */}
          {isStarredView && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-amber-200">
                  Starred Resources
                </span>
                <span className="text-[11px] font-mono text-amber-400/80 bg-amber-500/20 px-1.5 py-0.5 rounded">
                  {filteredAndSortedDocs.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigateToFolder('')}
                className="text-xs text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
              >
                Back to Library
              </button>
            </div>
          )}

          {/* Recent Banner */}
          {isRecentView && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-300" />
                <span className="text-xs font-semibold text-zinc-200">
                  Recently Uploaded
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {filteredAndSortedDocs.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigateToFolder('')}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Back to Library
              </button>
            </div>
          )}

          {/* Breadcrumb Navigation & Controls */}
          {!isStarredView && !isRecentView && searchQuery.trim().length === 0 && (
            <BreadcrumbNav
              currentPath={currentFolderPath}
              onNavigate={navigateToFolder}
              itemCount={currentSubfolders.length + filteredAndSortedDocs.length}
              sortOption={sortOption}
              onSortChange={setSortOption}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onRefresh={refreshDocuments}
              isLoading={isLoading}
              showAllNested={showAllNested}
              onToggleShowAllNested={setShowAllNested}
              hasSubfolders={currentSubfolders.length > 0}
            />
          )}

          {/* Bulk Action Controls */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-300 px-2 py-0.5 bg-zinc-800 rounded">
                  {selectedIds.length} selected
                </span>
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  {selectedIds.length === filteredAndSortedDocs.length
                    ? 'Deselect all'
                    : 'Select all'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkDownload}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 text-xs text-red-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && documents.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-zinc-500 animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">Loading JEE Notes...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* SUBFOLDERS SECTION */}
              {currentSubfolders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5 text-zinc-400" />
                      <span>
                        {currentFolderPath === ''
                          ? 'Subjects'
                          : `Folders (${currentSubfolders.length})`}
                      </span>
                    </h2>
                  </div>

                  <div
                    className={
                      currentFolderPath === ''
                        ? 'grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5'
                        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                    }
                  >
                    {currentSubfolders.map((folder) => (
                      <FolderCard
                        key={folder.id}
                        folder={folder}
                        onClick={navigateToFolder}
                        isRootCard={currentFolderPath === ''}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* FILES SECTION */}
              <div>
                {currentSubfolders.length > 0 && filteredAndSortedDocs.length > 0 && (
                  <div className="flex items-center justify-between mb-3 pt-2">
                    <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Files in this folder ({filteredAndSortedDocs.length})
                    </h2>
                  </div>
                )}

                {filteredAndSortedDocs.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredAndSortedDocs.map((doc) => {
                        const activeDoc = {
                          ...doc,
                          folderPath: getDocFolderPath(doc),
                        };
                        return (
                          <DocumentCard
                            key={doc.id}
                            document={activeDoc}
                            onPreview={(d) => setPreviewDoc(d)}
                            onDelete={(d) => setDeleteDoc(d)}
                            onToggleFavorite={handleToggleFavorite}
                            isSelected={selectedIds.includes(doc.id)}
                            onSelect={handleToggleSelect}
                            onNavigateFolder={navigateToFolder}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <DocumentList
                      documents={filteredAndSortedDocs.map((doc) => ({
                        ...doc,
                        folderPath: getDocFolderPath(doc),
                      }))}
                      onPreview={(d) => setPreviewDoc(d)}
                      onDelete={(d) => setDeleteDoc(d)}
                      onToggleFavorite={handleToggleFavorite}
                      selectedIds={selectedIds}
                      onToggleSelect={handleToggleSelect}
                      onToggleSelectAll={handleToggleSelectAll}
                      onNavigateFolder={navigateToFolder}
                    />
                  )
                ) : currentSubfolders.length === 0 ? (
                  currentFolderPath.includes('AI Generated Summary') ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/40">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
                        <Sparkles className="w-5 h-5 text-violet-400" />
                      </div>
                      <h3 className="text-sm font-medium text-zinc-200 mb-1">
                        AI Generated Summary
                      </h3>
                      <p className="text-xs text-zinc-500 max-w-sm mb-4">
                        No AI summaries generated yet for this subject.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const parts = currentFolderPath.split('/');
                          navigateToFolder(parts[0] || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Back to {currentFolderPath.split('/')[0] || 'Library'}
                      </button>
                    </div>
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                        <FileQuestion className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-medium text-zinc-200 mb-1">
                        No documents found
                      </h3>
                      <p className="text-xs text-zinc-500 max-w-sm mb-4">
                        {searchQuery
                          ? 'Try refining your search keyword.'
                          : currentFolderPath
                          ? 'This folder does not contain any direct PDFs.'
                          : 'No documents have been uploaded yet.'}
                      </p>
                      {currentFolderPath && (
                        <button
                          type="button"
                          onClick={() => navigateToFolder('')}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          Return to Library
                        </button>
                      )}
                    </div>
                  )
                ) : null}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PDF Viewer Modal */}
      {previewDoc && (
        <PDFViewerModal
          document={previewDoc}
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          onToggleFavorite={handleToggleFavorite}
          onUpdateMetadata={handleUpdateMetadata}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteDoc && (
        <DeleteConfirmModal
          document={deleteDoc}
          isOpen={!!deleteDoc}
          isDeleting={isDeleting}
          onConfirm={() => handleConfirmDelete(deleteDoc)}
          onClose={() => setDeleteDoc(null)}
        />
      )}
    </div>
  );
}
