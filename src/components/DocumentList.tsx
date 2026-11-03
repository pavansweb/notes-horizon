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
      showToast('Shareable link copied!', 'success');
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
    showToast(`Downloading ${doc.name}...`, 'info');
  };

  return (
    <div className="w-full bg-zinc-900/80 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-xl backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-semibold text-zinc-400">
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all documents"
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3">Document Name</th>
              <th className="py-3.5 px-3 hidden md:table-cell">Tags</th>
              <th className="py-3.5 px-3 hidden sm:table-cell">Date</th>
              <th className="py-3.5 px-3 text-right">Size</th>
              <th className="py-3.5 px-3 text-center w-12">Fav</th>
              <th className="py-3.5 pl-3 pr-4 text-right w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs text-zinc-200">
            {documents.map((doc) => {
              const isSelected = selectedIds.includes(doc.id);
              return (
                <tr
                  key={doc.id}
                  onClick={() => onPreview(doc)}
                  className={`group hover:bg-zinc-800/40 transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-500/10' : ''
                  }`}
                >
                  <td className="py-3 pl-4 pr-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(doc.id)}
                      aria-label={`Select ${doc.name}`}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-rose-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate max-w-xs sm:max-w-md">
                          {doc.name}
                        </p>
                        {doc.notes && (
                          <p className="text-[11px] text-zinc-500 truncate max-w-xs sm:max-w-md">
                            {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags?.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {t}
                        </span>
                      ))}
                      {doc.tags && doc.tags.length > 2 && (
                        <span className="text-[10px] text-zinc-500">
                          +{doc.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 hidden sm:table-cell font-mono text-zinc-400">
                    {formatDate(doc.uploadedAt)}
                  </td>

                  <td className="py-3 px-3 text-right font-mono text-zinc-400">
                    {formatBytes(doc.size)}
                  </td>

                  <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(doc.id, doc.isFavorite)}
                      title={doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      aria-label={doc.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      className={`p-1 rounded-md transition-colors ${
                        doc.isFavorite
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-zinc-600 hover:text-amber-400'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  </td>

                  <td className="py-3 pl-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onPreview(doc)}
                        title="Preview PDF"
                        aria-label="Preview PDF"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, doc)}
                        title="Download PDF"
                        aria-label="Download PDF"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, doc)}
                        title="Copy share link"
                        aria-label="Copy share link"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(doc)}
                        title="Delete document"
                        aria-label="Delete document"
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
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
