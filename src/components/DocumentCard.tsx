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
  Tag,
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
      showToast('Shareable link copied to clipboard!', 'success');
    } catch {
      showToast('Could not copy link to clipboard', 'error');
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
    showToast(`Downloading ${document.name}...`, 'info');
  };

  return (
    <div
      onClick={() => onPreview(document)}
      className={`group relative flex flex-col justify-between bg-zinc-900/80 hover:bg-zinc-900 border rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden ${
        isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-500/30'
          : 'border-zinc-800/80 hover:border-zinc-700'
      }`}
    >
      {/* Background glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 group-hover:bg-indigo-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

      {/* Top Header: Select Checkbox, PDF Type Icon, Favorite Star */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            {onSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onSelect(document.id)}
                aria-label={`Select ${document.name}`}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-indigo-500/20 border border-rose-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5 text-rose-400" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(document.id, document.isFavorite);
              }}
              title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-lg transition-colors ${
                document.isFavorite
                  ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                  : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-800'
              }`}
            >
              <Star
                className={`w-4 h-4 ${document.isFavorite ? 'fill-amber-400' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          title={document.name}
          className="text-sm font-semibold text-zinc-100 group-hover:text-white line-clamp-2 leading-snug mb-1.5 transition-colors"
        >
          {document.name}
        </h3>

        {/* Notes Preview if available */}
        {document.notes && (
          <p className="text-xs text-zinc-400 line-clamp-1 italic mb-2">
            &ldquo;{document.notes}&rdquo;
          </p>
        )}

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {document.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
            {document.tags.length > 3 && (
              <span className="text-[10px] text-zinc-500 px-1 py-0.5">
                +{document.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="pt-3 border-t border-zinc-800/80 mt-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-3 font-mono">
          <span>{formatBytes(document.size)}</span>
          <span>{formatDate(document.uploadedAt)}</span>
        </div>

        <div className="flex items-center justify-between gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(document);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-zinc-800/80 hover:bg-indigo-600 text-zinc-300 hover:text-white text-xs font-medium transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download PDF"
            aria-label="Download PDF"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy share link"
            aria-label="Copy share link"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(document);
            }}
            title="Delete document"
            aria-label="Delete document"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
