'use client';

import React from 'react';
import { PDFDocument } from '@/types/document';
import { formatBytes, formatDate } from '@/lib/utils';
import {
  FileText,
  Star,
  Download,
  Eye,
  Trash2,
  Share2,
} from 'lucide-react';
import { useToast } from './Toast';

interface DocumentCardProps {
  document: PDFDocument;
  onPreview: (doc: PDFDocument) => void;
  onDelete: (doc: PDFDocument) => void;
  onToggleFavorite: (id: string, currentState: boolean) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onPreview,
  onDelete,
  onToggleFavorite,
  isSelected,
  onSelect,
}) => {
  const { showToast } = useToast();

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const fullUrl = document.url.startsWith('http')
        ? document.url
        : `${window.location.origin}${document.url}`;
      await navigator.clipboard.writeText(fullUrl);
      showToast('Link copied to clipboard', 'success');
    } catch {
      showToast('Could not copy link', 'error');
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = window.document.createElement('a');
    link.href = document.downloadUrl;
    link.download = document.name;
    link.target = '_blank';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div
      onClick={() => onPreview(document)}
      className={`group relative flex flex-col justify-between bg-zinc-900/40 hover:bg-zinc-900/80 border rounded-xl p-4 transition-colors cursor-pointer ${
        isSelected
          ? 'border-zinc-500 bg-zinc-900/90'
          : 'border-zinc-800/80 hover:border-zinc-700'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2.5">
            {onSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onSelect(document.id)}
                aria-label={`Select ${document.name}`}
                className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-0 cursor-pointer"
              />
            )}
            <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
              <FileText className="w-4 h-4 text-zinc-300" />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(document.id, document.isFavorite);
            }}
            title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1 rounded transition-colors ${
              document.isFavorite
                ? 'text-amber-400'
                : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${document.isFavorite ? 'fill-amber-400' : ''}`}
            />
          </button>
        </div>

        {/* Title */}
        <h3
          title={document.name}
          className="text-xs font-medium text-zinc-200 group-hover:text-white line-clamp-2 leading-relaxed mb-1"
        >
          {document.name}
        </h3>

        {/* Notes preview */}
        {document.notes && (
          <p className="text-[11px] text-zinc-400 line-clamp-1 mb-2">
            {document.notes}
          </p>
        )}

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {document.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] text-zinc-400 bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
            {document.tags.length > 3 && (
              <span className="text-[10px] text-zinc-400">
                +{document.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-zinc-800/80 mt-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2 font-mono">
          <span>{formatBytes(document.size)}</span>
          <span>{formatDate(document.uploadedAt)}</span>
        </div>

        <div className="flex items-center justify-between gap-1 text-zinc-400">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(document);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-normal transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download PDF"
            aria-label="Download PDF"
            className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy link"
            aria-label="Copy link"
            className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(document);
            }}
            title="Delete"
            aria-label="Delete"
            className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
