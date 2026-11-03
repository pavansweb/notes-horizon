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
      showToast('Link copied', 'success');
    } catch {
      showToast('Could not copy link', 'error');
    }
  };

  const handleDownload = () => {
    window.location.href = document.downloadUrl;
  };

  const handleSaveNotes = () => {
    onUpdateMetadata(document.id, { notes: notesInput });
    setIsEditingNotes(false);
    showToast('Notes saved', 'success');
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-zinc-950">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-300">
            <FileText className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0">
            <h2
              id="pdf-viewer-title"
              className="text-xs sm:text-sm font-medium text-white truncate max-w-sm sm:max-w-md"
              title={document.name}
            >
              {document.name}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span>{formatBytes(document.size)}</span>
              <span>•</span>
              <span>{formatDate(document.uploadedAt)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(document.id, document.isFavorite)}
            className={`p-1 rounded transition-colors ml-1 ${
              document.isFavorite
                ? 'text-amber-400'
                : 'text-zinc-600 hover:text-zinc-300'
            }`}
            title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-3.5 h-3.5 ${document.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-md px-1 py-0.5 text-xs text-zinc-400">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
              className="p-1 hover:text-white transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] min-w-[38px] text-center text-zinc-300">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
              className="p-1 hover:text-white transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-1 hover:text-white transition-colors ml-0.5 border-l border-zinc-800 pl-1"
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
            className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            title="Open in new window"
            aria-label="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            title="Copy link"
            aria-label="Copy link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors ml-1"
            title="Close (Esc)"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-zinc-950 relative overflow-hidden flex items-center justify-center p-2">
        <div
          className="w-full h-full rounded-md overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col transition-transform duration-150 relative"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          <iframe
            src={document.url}
            title={document.name}
            className="w-full h-full flex-1 border-0 bg-white"
          />
        </div>
      </div>

      {/* Footer / Notes & Tags */}
      <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[11px] text-zinc-500 shrink-0">Notes:</span>
          {isEditingNotes ? (
            <div className="flex items-center gap-1.5 flex-1 max-w-md">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add notes..."
                className="bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 flex-1"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-2 py-0.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded text-[11px] font-medium flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingNotes(false)}
                className="text-zinc-500 hover:text-zinc-300 text-[11px] px-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingNotes(true)}
              className="cursor-pointer hover:text-zinc-300 truncate text-[11px] text-zinc-400"
              title="Click to edit notes"
            >
              {document.notes ? (
                <span>{document.notes}</span>
              ) : (
                <span className="text-zinc-600">Click to add notes...</span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="flex items-center gap-1 shrink-0">
            {document.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
              >
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
      className="m-auto rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop:bg-black/80 p-0 overflow-hidden w-[95vw] max-w-5xl h-[90vh] max-h-[90vh] flex flex-col focus:outline-none"
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
