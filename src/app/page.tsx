'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PDFDocument, StorageInfo, SortOption, ViewMode } from '@/types/document';
import { Header } from '@/components/Header';
import { DropZone } from '@/components/DropZone';
import { DocumentCard } from '@/components/DocumentCard';
import { DocumentList } from '@/components/DocumentList';
import { PDFViewerModal } from '@/components/PDFViewerModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { useToast } from '@/components/Toast';
import {
  LayoutGrid,
  List as ListIcon,
  ArrowUpDown,
  FileQuestion,
  RefreshCw,
  Trash2,
  Download,
  Star,
} from 'lucide-react';

const PRESET_TAGS = ['Physics', 'Chemistry', 'Maths', 'Notes', 'PYQs', 'Formula Sheet', 'Mock Tests'];

export default function Home() {
  const { showToast } = useToast();

  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [stats, setStats] = useState<StorageInfo>({
    totalBytes: 1024 * 1024 * 1024,
    usedBytes: 0,
    maxBytes: 1024 * 1024 * 1024,
    fileCount: 0,
    favoriteCount: 0,
    isCloud: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

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

  // Keyboard shortcut '/' to focus search
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute available tags (preset + any custom tags found on documents)
  const allTags = useMemo(() => {
    const set = new Set<string>(PRESET_TAGS);
    documents.forEach((d) => {
      d.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [documents]);

  // Filter & Sort
  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.notes?.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTag === 'Starred') {
      result = result.filter((d) => d.isFavorite);
    } else if (selectedTag !== 'All') {
      result = result.filter((d) => d.tags?.includes(selectedTag));
    }

    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
      if (sortOption === 'oldest') {
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      }
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
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
  }, [documents, searchQuery, selectedTag, sortOption]);

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
      showToast('Failed to update', 'error');
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
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen((prev) => !prev)}
        stats={stats}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Upload Drawer */}
        {isUploadOpen && (
          <div className="animate-in fade-in duration-200">
            <DropZone
              onUploadSuccess={refreshDocuments}
              onClose={() => setIsUploadOpen(false)}
            />
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none border-b border-zinc-900 pt-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedTag('All')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTag === 'All'
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              All ({documents.length})
            </button>

            <button
              onClick={() => setSelectedTag('Starred')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTag === 'Starred'
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              Starred ({stats.favoriteCount})
            </button>

            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-zinc-100 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md px-1.5 py-0.5">
                <span className="text-[11px] text-zinc-300 font-mono px-1">
                  {selectedIds.length}
                </span>
                <button
                  type="button"
                  onClick={handleBulkDownload}
                  title="Download selected"
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  title="Delete selected"
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-xs text-zinc-400">
              <ArrowUpDown className="w-3 h-3 text-zinc-500" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort by"
                className="bg-transparent text-[11px] text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-zinc-950">Newest</option>
                <option value="oldest" className="bg-zinc-950">Oldest</option>
                <option value="name-asc" className="bg-zinc-950">Name (A-Z)</option>
                <option value="name-desc" className="bg-zinc-950">Name (Z-A)</option>
                <option value="size-desc" className="bg-zinc-950">Size (Largest)</option>
                <option value="size-asc" className="bg-zinc-950">Size (Smallest)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="List view"
                aria-label="List view"
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={refreshDocuments}
              className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Refresh"
              aria-label="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Documents */}
        {isLoading && documents.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 text-zinc-500 animate-spin" />
            <p className="text-xs text-zinc-500">Loading resources...</p>
          </div>
        ) : filteredAndSortedDocs.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredAndSortedDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onPreview={(d) => setPreviewDoc(d)}
                  onDelete={(d) => setDeleteDoc(d)}
                  onToggleFavorite={handleToggleFavorite}
                  isSelected={selectedIds.includes(doc.id)}
                  onSelect={handleToggleSelect}
                />
              ))}
            </div>
          ) : (
            <DocumentList
              documents={filteredAndSortedDocs}
              onPreview={(d) => setPreviewDoc(d)}
              onDelete={(d) => setDeleteDoc(d)}
              onToggleFavorite={handleToggleFavorite}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
            />
          )
        ) : (
          /* Clean Minimal Empty State */
          <div className="border border-zinc-850 rounded-xl p-10 text-center flex flex-col items-center justify-center max-w-sm mx-auto my-12 bg-zinc-900/20">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-zinc-500">
              <FileQuestion className="w-5 h-5" />
            </div>

            <p className="text-xs font-medium text-zinc-200 mb-1">
              {searchQuery || selectedTag !== 'All'
                ? 'No matching files'
                : 'No PDFs uploaded yet'}
            </p>

            <p className="text-[11px] text-zinc-500 mb-4 max-w-xs">
              {searchQuery || selectedTag !== 'All'
                ? 'Try clearing the search or category filter.'
                : 'Upload syllabus, notes, formulas, or PYQs to store and read here.'}
            </p>

            {searchQuery || selectedTag !== 'All' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-md text-xs transition-colors"
              >
                Clear filter
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-3.5 py-1.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-xs font-medium transition-colors"
              >
                Upload First File
              </button>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <PDFViewerModal
        document={previewDoc}
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        onToggleFavorite={handleToggleFavorite}
        onUpdateMetadata={handleUpdateMetadata}
      />

      <DeleteConfirmModal
        document={deleteDoc}
        isOpen={!!deleteDoc}
        onClose={() => setDeleteDoc(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Clean Footer */}
      <footer className="border-t border-zinc-900 py-4 text-center text-[11px] text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span>JEE Resources</span>
          <span>{stats.fileCount} files</span>
        </div>
      </footer>
    </div>
  );
}
