'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PDFDocument } from '@/types/document';
import { formatBytes, formatDate } from '@/lib/utils';
import {
  X,
  Download,
  Share2,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Tag,
  Star,
  Check,
} from 'lucide-react';
import { useToast } from './Toast';

interface PDFViewerModalProps {
  document: PDFDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string, currentState: boolean) => void;
  onUpdateMetadata: (id: string, updates: { notes?: string; tags?: string[] }) => void;
}

interface ViewerContentProps {
  document: PDFDocument;
  onClose: () => void;
  onToggleFavorite: (id: string, currentState: boolean) => void;
  onUpdateMetadata: (id: string, updates: { notes?: string; tags?: string[] }) => void;
}

const ViewerContent: React.FC<ViewerContentProps> = ({
  document,
  onClose,
  onToggleFavorite,
  onUpdateMetadata,
}) => {
  const { showToast } = useToast();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [notesInput, setNotesInput] = useState(document.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleCopyLink = async () => {
    try {
      const fullUrl = document.url.startsWith('http')
        ? document.url
        : `${window.location.origin}${document.url}`;
      await navigator.clipboard.writeText(fullUrl);
      showToast('Public link copied to clipboard!', 'success');
    } catch {
      showToast('Could not copy link', 'error');
    }
  };

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.downloadUrl;
    link.download = document.name;
    link.target = '_blank';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    showToast(`Downloading ${document.name}...`, 'info');
  };

  const handleSaveNotes = () => {
    onUpdateMetadata(document.id, { notes: notesInput });
    setIsEditingNotes(false);
    showToast('Document notes updated!', 'success');
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b border-zinc-800/80 bg-zinc-900/90 shrink-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-rose-400" />
          </div>

          <div className="min-w-0">
            <h2
              id="pdf-viewer-title"
              className="text-sm sm:text-base font-bold text-white truncate max-w-md"
              title={document.name}
            >
              {document.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-0.5">
              <span>{formatBytes(document.size)}</span>
              <span>•</span>
              <span>{formatDate(document.uploadedAt)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(document.id, document.isFavorite)}
            className={`p-1.5 rounded-lg transition-colors ml-1 ${
              document.isFavorite
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-800'
            }`}
            title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-4 h-4 ${document.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-zinc-800/80 border border-zinc-700/60 rounded-xl px-1.5 py-1 mr-1 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
              className="p-1 hover:text-white text-zinc-400 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-zinc-300 min-w-[42px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
              className="p-1 hover:text-white text-zinc-400 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 hover:text-white text-zinc-400 transition-colors ml-1 border-l border-zinc-700 pl-1.5"
              title="Reset zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Open in new tab */}
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Open in new window"
            aria-label="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            title="Copy share link"
            aria-label="Copy share link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors ml-1"
            title="Close viewer (Esc)"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main PDF View Area */}
      <div className="flex-1 bg-zinc-950 relative overflow-auto flex items-center justify-center p-2 sm:p-4">
        <div
          className="w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner flex flex-col transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          <object
            data={document.url}
            type="application/pdf"
            className="w-full h-full flex-1"
          >
            {/* Fallback if browser cannot display PDF inside object */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-zinc-300">
              <FileText className="w-16 h-16 text-rose-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                PDF Preview
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mb-6">
                Your browser does not support embedded PDF rendering directly. You can open it in a new tab or download it directly.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download File
                </button>
              </div>
            </div>
          </object>
        </div>
      </div>

      {/* Bottom Notes & Details Footer */}
      <div className="border-t border-zinc-800/80 bg-zinc-900/90 px-4 py-3 sm:px-6 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-semibold text-zinc-300 shrink-0">Notes:</span>
          {isEditingNotes ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add notes about this document..."
                className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 flex-1 max-w-lg"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingNotes(false)}
                className="text-zinc-500 hover:text-zinc-300 px-1 py-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingNotes(true)}
              className="cursor-pointer hover:text-zinc-200 truncate flex-1"
              title="Click to edit notes"
            >
              {document.notes ? (
                <span className="italic">&ldquo;{document.notes}&rdquo;</span>
              ) : (
                <span className="text-zinc-600 italic hover:text-zinc-400">Click to add notes...</span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="flex items-center gap-1.5 shrink-0">
            {document.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  document,
  isOpen,
  onClose,
  onToggleFavorite,
  onUpdateMetadata,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && document) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen, document]);

  if (!document) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="pdf-viewer-title"
      className="m-auto rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm p-0 overflow-hidden w-[95vw] max-w-6xl h-[92vh] max-h-[92vh] flex flex-col focus:outline-none"
      style={{
        overscrollBehavior: 'contain',
      }}
    >
      <ViewerContent
        key={document.id}
        document={document}
        onClose={onClose}
        onToggleFavorite={onToggleFavorite}
        onUpdateMetadata={onUpdateMetadata}
      />
    </dialog>
  );
};
