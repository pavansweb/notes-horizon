'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PDFDocument, StorageInfo, SortOption, ViewMode } from '@/types/document';
import { Header } from '@/components/Header';
import { StorageStats } from '@/components/StorageStats';
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
  UploadCloud,
} from 'lucide-react';

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

  // Modals & Active items
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [previewDoc, setPreviewDoc] = useState<PDFDocument | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<PDFDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const refreshDocuments = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Fetch documents from API on mount and on refreshTrigger
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
          showToast('Could not load documents from storage', 'error');
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

  // Keyboard shortcut: '/' or 'Ctrl+K' / 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && window.document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        const searchInput = window.document.querySelector('input[type="search"]') as HTMLInputElement | null;
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute available tags from document list
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => {
      d.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [documents]);

  // Filtering & Sorting
  const filteredAndSortedDocs = useMemo(() => {
    let result = [...documents];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.notes?.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by tag
    if (selectedTag === 'Favorites') {
      result = result.filter((d) => d.isFavorite);
    } else if (selectedTag !== 'All') {
      result = result.filter((d) => d.tags?.includes(selectedTag));
    }

    // Sort
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
    // Optimistic UI update
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
      showToast(
        !currentState ? 'Added to favorites' : 'Removed from favorites',
        'info'
      );
    } catch {
      // Revert optimistic update
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isFavorite: currentState } : d))
      );
      showToast('Failed to update favorite', 'error');
    }
  };

  // Update metadata (notes or tags)
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
      showToast('Failed to update metadata', 'error');
    }
  };

  // Delete confirmed
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
        showToast(`"${doc.name}" deleted successfully`, 'success');
      } else {
        throw new Error(data.error || 'Failed to delete');
      }
    } catch (err) {
      showToast((err as Error).message || 'Failed to delete file', 'error');
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
      }, idx * 300);
    });
    showToast(`Downloading ${selectedDocs.length} documents...`, 'info');
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected documents?`)) {
      return;
    }

    let deleted = 0;
    for (const id of selectedIds) {
      try {
        await fetch(`/api/documents/${encodeURIComponent(id)}`, { method: 'DELETE' });
        deleted++;
      } catch {
        // Continue
      }
    }

    showToast(`Deleted ${deleted} documents`, 'success');
    setSelectedIds([]);
    refreshDocuments();
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
        isCloud={stats.isCloud}
        totalDocs={stats.fileCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Storage Stats Bar */}
        <StorageStats stats={stats} />

        {/* Upload Drawer / Section (Collapsible / Dynamic) */}
        {isUploadOpen ? (
          <div className="animate-in fade-in slide-in-from-top-3 duration-300">
            <DropZone
              onUploadSuccess={refreshDocuments}
              onClose={() => setIsUploadOpen(false)}
            />
          </div>
        ) : (
          <div
            onClick={() => setIsUploadOpen(true)}
            className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-indigo-500/50 transition-all cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  Need to upload more files?
                </p>
                <p className="text-xs text-zinc-400">
                  Click here or drag & drop PDFs anywhere to upload immediately
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-200 group-hover:bg-indigo-600 group-hover:text-white transition-all"
            >
              Open Uploader
            </button>
          </div>
        )}

        {/* Action Toolbar: Filter Chips, Sort, View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Tag & Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedTag('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'All'
                  ? 'bg-zinc-100 text-zinc-950 shadow-md'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800/80'
              }`}
            >
              All Files ({documents.length})
            </button>

            <button
              onClick={() => setSelectedTag('Favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === 'Favorites'
                  ? 'bg-amber-400 text-zinc-950 shadow-md'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800/80'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Starred ({stats.favoriteCount})
            </button>

            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Right Controls: Bulk action, Sort, View Switch, Refresh */}
          <div className="flex items-center justify-between md:justify-end gap-2.5">
            {/* Bulk Actions if items selected */}
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-2 py-1">
                <span className="text-xs font-semibold text-indigo-300 px-1">
                  {selectedIds.length} selected
                </span>
                <button
                  type="button"
                  onClick={handleBulkDownload}
                  title="Download selected"
                  className="p-1 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-600 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  title="Delete selected"
                  className="p-1 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800/80 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort documents"
                className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer pr-1"
              >
                <option value="newest" className="bg-zinc-900 text-zinc-200">Newest first</option>
                <option value="oldest" className="bg-zinc-900 text-zinc-200">Oldest first</option>
                <option value="name-asc" className="bg-zinc-900 text-zinc-200">Name (A-Z)</option>
                <option value="name-desc" className="bg-zinc-900 text-zinc-200">Name (Z-A)</option>
                <option value="size-desc" className="bg-zinc-900 text-zinc-200">Size (Largest)</option>
                <option value="size-asc" className="bg-zinc-900 text-zinc-200">Size (Smallest)</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs List */}
            <div className="flex items-center bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="List view"
                aria-label="List view"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={refreshDocuments}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-400 hover:text-zinc-100 transition-colors"
              title="Refresh documents"
              aria-label="Refresh documents"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Document Grid / List or Empty State */}
        {isLoading && documents.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm text-zinc-400">Loading documents from storage...</p>
          </div>
        ) : filteredAndSortedDocs.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
          /* Empty State */
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 sm:p-16 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center mb-4 text-zinc-400">
              <FileQuestion className="w-8 h-8" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              {searchQuery || selectedTag !== 'All'
                ? 'No documents found'
                : 'No PDF documents yet'}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-sm">
              {searchQuery || selectedTag !== 'All'
                ? 'No PDFs match your search query or filter. Try clearing the filters.'
                : 'Upload your first PDF document to store it securely in the cloud with instant reader previews.'}
            </p>

            {searchQuery || selectedTag !== 'All' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-colors"
              >
                Reset Search & Filters
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload PDF Document</span>
              </button>
            )}
          </div>
        )}
      </main>

      {/* PDF Fullscreen Viewer Modal */}
      <PDFViewerModal
        document={previewDoc}
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        onToggleFavorite={handleToggleFavorite}
        onUpdateMetadata={handleUpdateMetadata}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        document={deleteDoc}
        isOpen={!!deleteDoc}
        onClose={() => setDeleteDoc(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/60 py-6 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 HorizonVault • High-Speed PDF Cloud Storage</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Powered by Vercel Blob</span>
            <span>•</span>
            <span>1 GB Free Quota</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Ready for Production</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
