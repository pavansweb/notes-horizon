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
  Folder,
} from 'lucide-react';
import { useToast } from './Toast';

interface DocumentCardProps {
  document: PDFDocument;
  onPreview: (doc: PDFDocument) => void;
  onDelete: (doc: PDFDocument) => void;
  onToggleFavorite: (id: string, currentState: boolean) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onNavigateFolder?: (folderPath: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onPreview,
  onDelete,
  onToggleFavorite,
  isSelected,
  onSelect,
  onNavigateFolder,
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
    window.location.href = document.downloadUrl;
  };

  // Determine subject colors
  let subjectBadgeColor = 'text-zinc-400 bg-zinc-800/80 border-zinc-700/50';
  let iconColor = 'text-zinc-300';
  if (document.subject === 'Physics') {
    subjectBadgeColor = 'text-sky-300 bg-sky-500/10 border-sky-500/20';
    iconColor = 'text-sky-400';
  } else if (document.subject === 'Chemistry') {
    subjectBadgeColor = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
    iconColor = 'text-emerald-400';
  } else if (document.subject === 'Maths') {
    subjectBadgeColor = 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20';
    iconColor = 'text-indigo-400';
  }

  // Filter out internal "Relative path:" string from user notes display
  const userNotes = document.notes && !document.notes.startsWith('Relative path:')
    ? document.notes
    : null;

  return (
    <div
      onClick={() => onPreview(document)}
      className={`group relative flex flex-col justify-between bg-zinc-900/40 hover:bg-zinc-900/80 border rounded-xl p-4 transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'border-zinc-500 bg-zinc-900/90 shadow-md'
          : 'border-zinc-800/80 hover:border-zinc-700 hover:-translate-y-0.5'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2.5 mb-2.5">
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
              <FileText className={`w-4 h-4 ${iconColor}`} />
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

        {/* Folder badge if document has a path */}
        {document.folderPath && (
          <div className="mb-1.5 flex items-center">
            {onNavigateFolder ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateFolder(document.folderPath!);
                }}
                className="flex items-center text-[10px] text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-1.5 py-0.5 rounded font-mono truncate max-w-full text-left transition-colors cursor-pointer"
                title={`Open folder: ${document.folderPath}`}
              >
                <Folder className="w-3 h-3 text-zinc-500 mr-1 shrink-0" />
                <span className="truncate">{document.folderPath.split('/').slice(-2).join(' / ')}</span>
              </button>
            ) : (
              <span className="flex items-center text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded font-mono truncate max-w-full">
                <Folder className="w-3 h-3 text-zinc-500 mr-1 shrink-0" />
                <span className="truncate">{document.folderPath.split('/').slice(-2).join(' / ')}</span>
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          title={document.name}
          className="text-xs font-medium text-zinc-200 group-hover:text-white line-clamp-2 leading-relaxed mb-1"
        >
          {document.name}
        </h3>

        {/* Notes preview */}
        {userNotes && (
          <p className="text-[11px] text-zinc-400 line-clamp-1 mb-2">
            {userNotes}
          </p>
        )}

        {/* Tags / Subject */}
        <div className="flex flex-wrap gap-1 mb-2">
          {document.subject && document.subject !== 'General' && (
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${subjectBadgeColor}`}
            >
              {document.subject}
            </span>
          )}
          {document.classLevel && (
            <span className="text-[10px] text-zinc-400 bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded">
              {document.classLevel}
            </span>
          )}
          {document.tags &&
            document.tags
              .filter((t) => t !== document.subject && t !== document.classLevel)
              .slice(0, 2)
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-zinc-400 bg-zinc-800/60 border border-zinc-800 px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
        </div>
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
