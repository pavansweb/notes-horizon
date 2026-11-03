'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PDFDocument, StorageInfo, SortOption, ViewMode, FolderNode, BrowseMode } from '@/types/document';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { FolderCard } from '@/components/FolderCard';
import { DropZone } from '@/components/DropZone';
import { DocumentCard } from '@/components/DocumentCard';
import { DocumentList } from '@/components/DocumentList';
import { PDFViewerModal } from '@/components/PDFViewerModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { BrowseModeModal } from '@/components/BrowseModeModal';
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
} from 'lucide-react';

// Maps a document's relative path based on user's preferred browse arrangement
function getDocFolderPath(doc: PDFDocument, mode: BrowseMode): string {
  const raw = doc.folderPath || '';
  if (!raw || raw.startsWith('agy ai genrated')) return raw;

  // Strip 'Physics Wallah Content/' prefix if present for clean restructuring
  const cleanPath = raw.replace(/^Physics Wallah Content\/?/, '');
  if (!cleanPath) return 'Physics Wallah Content';

  const parts = cleanPath.split('/').filter(Boolean);
  const rawType = parts[0] || 'Notes';

  // Normalize category / resource format
  let type = rawType;
  if (rawType === 'Mindmaps' || rawType.toLowerCase().includes('mindmap')) {
    type = 'Mindmaps & Flowcharts';
  } else if (rawType.includes('2026 Qs') || rawType.includes('Top 100') || rawType.toLowerCase().includes('question')) {
    type = 'Question Papers';
  } else if (rawType === 'Formula Sheets') {
    type = 'Formula Sheets';
  } else if (rawType === 'Short Notes') {
    type = 'Short Notes';
  }

  // Subject detection
  let subject = doc.subject && doc.subject !== 'General' ? doc.subject : 'General';
  if (subject === 'General') {
    const checkStr = (cleanPath + ' ' + doc.name + ' ' + (doc.tags || []).join(' ')).toLowerCase();
    if (checkStr.includes('physics') || checkStr.includes('phy')) {
      subject = 'Physics';
    } else if (
      checkStr.includes('chemistry') ||
      checkStr.includes('chem') ||
      checkStr.includes('organic')
    ) {
      subject = 'Chemistry';
    } else if (
      checkStr.includes('maths') ||
      checkStr.includes('mathematics') ||
      checkStr.includes('math')
    ) {
      subject = 'Maths';
    }
  }

  // Class level detection
  let classLevel = doc.classLevel;
  if (!classLevel || classLevel === 'General') {
    if (cleanPath.includes('Class 11')) classLevel = 'Class 11';
    else if (cleanPath.includes('Class 12')) classLevel = 'Class 12';
    else if (cleanPath.includes('JEE Advance')) classLevel = 'JEE Advance';
    else if (cleanPath.includes('JEE Mains')) classLevel = 'JEE Mains';
    else classLevel = 'Class 11';
  }

  if (mode === 'subject') {
    // Subject mode: Physics Wallah Content -> Subject (Physics | Chemistry | Maths) -> Class (Class 11 | Class 12) -> Type
    if (type === 'Teacher Kits') {
      const kitName = parts[1] || 'Lakshya JEE';
      const sub = parts.slice(2).join('/');
      return `Physics Wallah Content/${subject}/Teacher Kits/${kitName}${sub ? '/' + sub : ''}`;
    }
    if (type === 'Syllabus') {
      return `Physics Wallah Content/${subject}/Syllabus`;
    }
    return `Physics Wallah Content/${subject}/${classLevel}/${type}`;
  } else {
    // Format mode: Physics Wallah Content -> Type (Mindmaps & Flowcharts | Short Notes | ...) -> Class -> Subject
    if (type === 'Teacher Kits') {
      const kitName = parts[1] || 'Lakshya JEE';
      const sub = parts.slice(2).join('/');
      return `Physics Wallah Content/Teacher Kits/${subject}/${kitName}${sub ? '/' + sub : ''}`;
    }
    if (type === 'Syllabus') {
      return `Physics Wallah Content/Syllabus/${subject}`;
    }
    return `Physics Wallah Content/${type}/${classLevel}/${subject}`;
  }
}

const TYPE_ORDER: Record<string, number> = {
  'Mindmaps & Flowcharts': 1,
  'Short Notes': 2,
  'Formula Sheets': 3,
  'Question Papers': 4,
  'Teacher Kits': 5,
  'Syllabus': 6,
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
  const [currentFolderPath, setCurrentFolderPath] = useState<string>('');
  const [browseMode, setBrowseMode] = useState<BrowseMode>('subject');
  const [isModeModalOpen, setIsModeModalOpen] = useState<boolean>(false);
  const [isStarredView, setIsStarredView] = useState<boolean>(false);
  const [isRecentView, setIsRecentView] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('chapter-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showAllNested, setShowAllNested] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Load saved arrangement mode on mount & trigger welcome modal on first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jee_browse_mode') as BrowseMode | null;
      if (saved === 'subject' || saved === 'type') {
        setBrowseMode(saved);
      }
      const asked = localStorage.getItem('jee_mode_asked');
      if (!asked) {
        setIsModeModalOpen(true);
      }
    }
  }, []);

  const handleBrowseModeChange = useCallback((mode: BrowseMode) => {
    setBrowseMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jee_browse_mode', mode);
      localStorage.setItem('jee_mode_asked', 'true');
    }
    // If inside a deep PW folder, reset back to 'Physics Wallah Content'
    setCurrentFolderPath((prev) => {
      if (prev.startsWith('Physics Wallah Content/')) {
        return 'Physics Wallah Content';
      }
      return prev;
    });
    showToast(
      mode === 'subject'
        ? 'Arranged by Subject'
        : 'Arranged by Format',
      'info'
    );
  }, [showToast]);

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

  // Read initial folder path from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const folderParam = params.get('folder');
      if (folderParam) {
        setCurrentFolderPath(folderParam);
      }
    }
  }, []);

  // Handle browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const folderParam = params.get('folder') || '';
      setCurrentFolderPath(folderParam);
      setIsStarredView(false);
      setIsRecentView(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize URL when folder path changes with smart mode resolution
  const navigateToFolder = useCallback((rawPath: string) => {
    // Normalize legacy aliases
    let targetPath = rawPath
      .replace(/\/Mindmaps(\/|$)/, '/Mindmaps & Flowcharts$1')
      .replace(/\/(JEE Main 2026 Qs|Top 100 Qs for 2026)(\/|$)/, '/Question Papers$2');

    // Auto-detect mode if navigating to a specific top-level branch
    if (targetPath.startsWith('Physics Wallah Content/')) {
      const secondPart = targetPath.split('/')[1];
      if (['Physics', 'Chemistry', 'Maths'].includes(secondPart) && browseMode !== 'subject') {
        setBrowseMode('subject');
        if (typeof window !== 'undefined') localStorage.setItem('jee_browse_mode', 'subject');
      } else if (
        ['Mindmaps & Flowcharts', 'Short Notes', 'Formula Sheets', 'Question Papers'].includes(secondPart) &&
        browseMode !== 'type'
      ) {
        setBrowseMode('type');
        if (typeof window !== 'undefined') localStorage.setItem('jee_browse_mode', 'type');
      }
    }

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
  }, [browseMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search with '/' or 'Cmd+K'
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

      // Backspace to go up one folder level
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

      // Escape to clear search or close preview
      if (e.key === 'Escape') {
        if (searchQuery) setSearchQuery('');
        if (isSidebarOpen) setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFolderPath, previewDoc, deleteDoc, searchQuery, isSidebarOpen, navigateToFolder]);

  // Build Folder Hierarchy from documents
  const { folderMap, categoryCounts } = useMemo(() => {
    const fMap = new Map<string, FolderNode>();
    const catCounts: Record<string, number> = {};

    // Explicitly guarantee root folders exist
    fMap.set('Physics Wallah Content', {
      id: 'Physics Wallah Content',
      name: 'Physics Wallah Content',
      path: 'Physics Wallah Content',
      depth: 0,
      parentPath: '',
      totalFileCount: 0,
      directFileCount: 0,
      subfolderCount: 0,
      category: 'Physics Wallah',
    });

    fMap.set('agy ai genrated', {
      id: 'agy ai genrated',
      name: 'agy ai genrated',
      path: 'agy ai genrated',
      depth: 0,
      parentPath: '',
      totalFileCount: 0,
      directFileCount: 0,
      subfolderCount: 0,
      category: 'AI Generated',
    });

    documents.forEach((doc) => {
      const folderPath = getDocFolderPath(doc, browseMode);
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
          // Infer subject & classLevel for this folder
          let subject: 'Physics' | 'Chemistry' | 'Maths' | 'General' | undefined = undefined;
          const lower = subPath.toLowerCase();
          if (lower.includes('physics')) subject = 'Physics';
          else if (lower.includes('chemistry') || lower.includes('organic')) subject = 'Chemistry';
          else if (lower.includes('maths') || lower.includes('math')) subject = 'Maths';

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
            category: parts[0],
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
  }, [documents, browseMode]);

  // Subfolders in current view
  const currentSubfolders = useMemo(() => {
    if (isStarredView || isRecentView || searchQuery.trim().length > 0) {
      return [];
    }

    const subfolders: FolderNode[] = [];
    folderMap.forEach((node) => {
      if (node.parentPath === currentFolderPath) {
        // Filter by subject if chosen
        if (selectedSubject !== 'All' && node.subject && node.subject !== selectedSubject) {
          return;
        }
        // Filter by class if chosen
        if (selectedClass !== 'All' && node.classLevel && node.classLevel !== selectedClass) {
          return;
        }
        subfolders.push(node);
      }
    });

    // Order: at root, Physics Wallah first, then agy ai genrated
    if (currentFolderPath === '') {
      subfolders.sort((a, b) => {
        if (a.path === 'Physics Wallah Content') return -1;
        if (b.path === 'Physics Wallah Content') return 1;
        return a.name.localeCompare(b.name);
      });
    } else {
      subfolders.sort((a, b) => {
        const subOrderA = SUBJECT_ORDER[a.name];
        const subOrderB = SUBJECT_ORDER[b.name];
        if (subOrderA !== undefined && subOrderB !== undefined) return subOrderA - subOrderB;

        const classOrderA = CLASS_ORDER[a.name];
        const classOrderB = CLASS_ORDER[b.name];
        if (classOrderA !== undefined && classOrderB !== undefined) return classOrderA - classOrderB;

        const typeOrderA = TYPE_ORDER[a.name];
        const typeOrderB = TYPE_ORDER[b.name];
        if (typeOrderA !== undefined && typeOrderB !== undefined) return typeOrderA - typeOrderB;

        return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
      });
    }

    return subfolders;
  }, [folderMap, currentFolderPath, isStarredView, isRecentView, searchQuery, selectedSubject, selectedClass]);

  // Filtered & sorted documents
  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    // Search query takes precedence for discovery across library
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
      // All files sorted by uploadedAt
    } else {
      // Normal Folder Navigation
      if (showAllNested) {
        // Include everything in this folder and deeper
        if (currentFolderPath) {
          result = result.filter((d) => {
            const p = getDocFolderPath(d, browseMode);
            return p === currentFolderPath || p.startsWith(currentFolderPath + '/');
          });
        }
      } else {
        // Only direct files in this exact folder
        result = result.filter((d) => getDocFolderPath(d, browseMode) === currentFolderPath);
      }

      // Subject filter
      if (selectedSubject !== 'All') {
        result = result.filter((d) => d.subject === selectedSubject || d.tags?.includes(selectedSubject));
      }

      // Class filter
      if (selectedClass !== 'All') {
        result = result.filter(
          (d) => d.classLevel === selectedClass || d.folderPath?.includes(selectedClass)
        );
      }
    }

    // Sorting
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
    browseMode,
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
        browseMode={browseMode}
        onBrowseModeChange={handleBrowseModeChange}
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
          browseMode={browseMode}
          onBrowseModeChange={handleBrowseModeChange}
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
              browseMode={browseMode}
              onBrowseModeChange={handleBrowseModeChange}
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
              <p className="text-xs text-zinc-400 font-mono">Organizing JEE Resources...</p>
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
                          ? 'Repositories'
                          : `Folders (${currentSubfolders.length})`}
                      </span>
                    </h2>
                  </div>

                  <div
                    className={
                      currentFolderPath === ''
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'
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
                {/* Heading if there are both subfolders and files */}
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
                          folderPath: getDocFolderPath(doc, browseMode),
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
                        folderPath: getDocFolderPath(doc, browseMode),
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
                  currentFolderPath === 'agy ai genrated' ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/40">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                        <FolderOpen className="w-5 h-5 text-zinc-400" />
                      </div>
                      <h3 className="text-sm font-medium text-zinc-200 mb-1">
                        agy ai genrated
                      </h3>
                      <p className="text-xs text-zinc-500 max-w-sm mb-4">
                        This folder is currently empty.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigateToFolder('Physics Wallah Content')}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Open Physics Wallah Content
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
                          ? 'Try refining your search keyword or check other categories.'
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

      {/* First-Visit / Change Browse Mode Prompt Dialog */}
      <BrowseModeModal
        isOpen={isModeModalOpen}
        currentMode={browseMode}
        onSelect={handleBrowseModeChange}
        onClose={() => {
          setIsModeModalOpen(false);
          if (typeof window !== 'undefined') {
            localStorage.setItem('jee_mode_asked', 'true');
          }
        }}
      />

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
