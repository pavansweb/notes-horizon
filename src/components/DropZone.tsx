'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, Plus } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { useToast } from './Toast';

interface DropZoneProps {
  onUploadSuccess: () => void;
  onClose?: () => void;
}

const DEFAULT_TAGS = [
  'Physics',
  'Chemistry',
  'Maths',
  'Notes',
  'PYQs',
  'Formula Sheet',
  'Mock Tests',
];

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

      showToast(`Uploaded ${successCount} PDF${successCount > 1 ? 's' : ''}`, 'success');

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
    <div className="w-full bg-zinc-900/60 rounded-xl border border-zinc-800 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-zinc-200">
          Upload PDF Files
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-zinc-500 bg-zinc-800/40'
            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-950/60'
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

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Upload className="w-4 h-4" />
          </div>

          <p className="text-xs text-zinc-300 font-medium">
            Drag & drop PDF files here, or <span className="text-zinc-100 underline underline-offset-2">browse</span>
          </p>
          <p className="text-[11px] text-zinc-500">
            Up to 50 MB per file
          </p>
        </div>
      </div>

      {/* Selected Files Queue */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span>Selected ({selectedFiles.length})</span>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-zinc-950/80 border border-zinc-800/80 rounded-lg px-3 py-2 text-xs text-zinc-200"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-zinc-500 text-[10px] font-mono shrink-0">
                    {formatBytes(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="text-zinc-500 hover:text-zinc-300 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-2 border-t border-zinc-800/80">
            <label className="text-[11px] text-zinc-400 block mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-1">
              {DEFAULT_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                      isSelected
                        ? 'bg-zinc-200 text-zinc-950'
                        : 'bg-zinc-800/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}

              <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md px-1.5 py-0.5">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={handleAddCustomTag}
                  placeholder="Add custom..."
                  className="bg-transparent text-[11px] text-zinc-200 placeholder-zinc-500 focus:outline-none w-20"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Description or notes (optional)..."
              className="w-full bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 rounded-lg px-3 py-1.5 border border-zinc-800 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-zinc-200 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleUploadSubmit}
              disabled={isUploading}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 disabled:opacity-50 transition-colors"
            >
              {isUploading ? 'Uploading...' : `Upload (${selectedFiles.length})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
