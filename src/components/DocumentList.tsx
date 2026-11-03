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

interface DocumentListProps {
  documents: PDFDocument[];
  onPreview: (doc: PDFDocument) => void;
  onDelete: (doc: PDFDocument) => void;
  onToggleFavorite: (id: string, currentState: boolean) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onPreview,
  onDelete,
  onToggleFavorite,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const { showToast } = useToast();
  const allSelected = documents.length > 0 && selectedIds.length === documents.length;

  const handleCopyLink = async (e: React.MouseEvent, doc: PDFDocument) => {
    e.stopPropagation();
    try {
      const fullUrl = doc.url.startsWith('http')
        ? doc.url
        : `${window.location.origin}${doc.url}`;
      await navigator.clipboard.writeText(fullUrl);
      showToast('Link copied', 'success');
    } catch {
      showToast('Could not copy link', 'error');
    }
  };

  const handleDownload = (e: React.MouseEvent, doc: PDFDocument) => {
    e.stopPropagation();
    const link = window.document.createElement('a');
    link.href = doc.downloadUrl;
    link.download = doc.name;
    link.target = '_blank';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-zinc-900/30 rounded-xl border border-zinc-800/80 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/40 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              <th className="py-2.5 pl-3.5 pr-2 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all documents"
                  className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3 hidden md:table-cell">Tags</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Date</th>
              <th className="py-2.5 px-3 text-right">Size</th>
              <th className="py-2.5 px-3 text-center w-10"></th>
              <th className="py-2.5 pl-3 pr-4 text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs text-zinc-200">
            {documents.map((doc) => {
              const isSelected = selectedIds.includes(doc.id);
              return (
                <tr
                  key={doc.id}
                  onClick={() => onPreview(doc)}
                  className={`group hover:bg-zinc-900/60 transition-colors cursor-pointer ${
                    isSelected ? 'bg-zinc-900/80' : ''
                  }`}
                >
                  <td className="py-2.5 pl-3.5 pr-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(doc.id)}
                      aria-label={`Select ${doc.name}`}
                      className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-0 cursor-pointer"
                    />
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-400">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-zinc-200 group-hover:text-white truncate max-w-xs sm:max-w-md">
                          {doc.name}
                        </p>
                        {doc.notes && (
                          <p className="text-[11px] text-zinc-400 truncate max-w-xs sm:max-w-md">
                            {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags?.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-700/50 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {doc.tags && doc.tags.length > 2 && (
                        <span className="text-[10px] text-zinc-400">
                          +{doc.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 hidden sm:table-cell font-mono text-zinc-400 text-[11px]">
                    {formatDate(doc.uploadedAt)}
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono text-zinc-400 text-[11px]">
                    {formatBytes(doc.size)}
                  </td>

                  <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(doc.id, doc.isFavorite)}
                      title={doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      aria-label={doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      className={`p-1 rounded transition-colors ${
                        doc.isFavorite
                          ? 'text-amber-400'
                          : 'text-zinc-600 hover:text-zinc-300'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  </td>

                  <td className="py-2.5 pl-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-zinc-400">
                      <button
                        type="button"
                        onClick={() => onPreview(doc)}
                        title="Open PDF"
                        aria-label="Open PDF"
                        className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, doc)}
                        title="Download"
                        aria-label="Download"
                        className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, doc)}
                        title="Copy link"
                        aria-label="Copy link"
                        className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(doc)}
                        title="Delete"
                        aria-label="Delete"
                        className="p-1 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
