'use client';

import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, X, Plus, Tag } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';

interface DropZoneProps {
  onUploadSuccess: () => void;
  onClose?: () => void;
}

const DEFAULT_TAGS = ['Work', 'Study', 'Finance', 'Personal', 'Research', 'Invoices'];

export const DropZone: React.FC<DropZoneProps> = ({ onUploadSuccess, onClose }) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateAndAddFiles = useCallback(
    (files: FileList | File[]) => {
      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
          if (file.size > 50 * 1024 * 1024) {
            invalidFiles.push(`${file.name} (exceeds 50MB limit)`);
          } else {
            validFiles.push(file);
          }
        } else {
          invalidFiles.push(`${file.name} (not a PDF)`);
        }
      });

      if (invalidFiles.length > 0) {
        showToast(`Skipped: ${invalidFiles.join(', ')}`, 'error');
      }

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
      }
    },
    [showToast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        validateAndAddFiles(e.dataTransfer.files);
      }
    },
    [validateAndAddFiles]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const tag = customTagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
      setCustomTagInput('');
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#ec4899', '#38bdf8', '#10b981'],
      });
    } catch {
      // Ignore if canvas-confetti fails
    }
  };

  const handleUploadSubmit = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(10);

    let successCount = 0;
    const total = selectedFiles.length;

    try {
      for (let i = 0; i < total; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tags', JSON.stringify(selectedTags));
        formData.append('notes', notes);

        const response = await fetch('/api/documents', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || `Failed to upload ${file.name}`);
        }

        successCount++;
        setUploadProgress(Math.round(((i + 1) / total) * 100));
      }

      showToast(`Successfully uploaded ${successCount} PDF document${successCount > 1 ? 's' : ''}!`, 'success');
      triggerConfetti();

      // Reset
      setSelectedFiles([]);
      setSelectedTags([]);
      setNotes('');
      setUploadProgress(0);
      onUploadSuccess();
      if (onClose) onClose();
    } catch (error) {
      showToast((error as Error).message || 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full bg-zinc-900/90 rounded-2xl border border-zinc-800/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Upload PDF Documents</h2>
            <p className="text-xs text-zinc-400">Secure storage on Vercel Blob with instant preview</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-zinc-700/80 hover:border-indigo-500/60 bg-zinc-950/40 hover:bg-zinc-950/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isDragging
                ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/30'
                : 'bg-zinc-800/80 text-zinc-300'
            }`}
          >
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-200">
              Drag & drop your PDF documents here, or{' '}
              <span className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300">
                browse files
              </span>
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Supports multiple files • Maximum 50 MB per file
            </p>
          </div>
        </div>
      </div>

      {/* Selected Files Queue */}
      {selectedFiles.length > 0 && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
            <span>Ready for upload ({selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''})</span>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-rose-400 hover:text-rose-300 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-zinc-950/70 border border-zinc-800/80 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate font-medium">{file.name}</span>
                  <span className="text-zinc-400 text-[11px] font-mono shrink-0">
                    {formatBytes(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="text-zinc-500 hover:text-rose-400 p-1 rounded-lg transition-colors ml-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Tags Section */}
          <div className="pt-2 border-t border-zinc-800/80">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-2">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Add Tags & Categories (Optional)
            </label>

            <div className="flex flex-wrap items-center gap-1.5">
              {DEFAULT_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80'
                    }`}
                  >
                    {isSelected ? '✓ ' : ''}{tag}
                  </button>
                );
              })}

              {/* Custom tag input */}
              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={handleAddCustomTag}
                  placeholder="Custom tag..."
                  className="bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-24"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="text-zinc-400 hover:text-indigo-400 p-0.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Notes or Description (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Q3 quarterly financial report or lecture summary"
              className="w-full bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 rounded-xl px-3.5 py-2 border border-zinc-800 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-300 font-medium">
                <span>Uploading to cloud storage...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex justify-end gap-3 pt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleUploadSubmit}
              disabled={isUploading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length > 1 ? 's' : ''}`}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
