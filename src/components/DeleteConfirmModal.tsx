'use client';

import React, { useEffect, useRef } from 'react';
import { PDFDocument } from '@/types/document';
import { formatBytes } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface DeleteConfirmModalProps {
  document: PDFDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (doc: PDFDocument) => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  document,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && document) {
      if (!dialog.open) {
        dialog.showModal();
        cancelBtnRef.current?.focus();
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
      aria-labelledby="delete-confirm-title"
      className="m-auto rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop:bg-black/75 p-5 max-w-sm w-full focus:outline-none"
      style={{
        overscrollBehavior: 'contain',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-400">
          <AlertCircle className="w-4 h-4 text-zinc-300" />
        </div>

        <div className="flex-1">
          <h2 id="delete-confirm-title" className="text-sm font-semibold text-white mb-1">
            Delete file?
          </h2>
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Permanently delete <span className="text-zinc-200 font-medium">&ldquo;{document.name}&rdquo;</span> ({formatBytes(document.size)})?
          </p>

          <div className="flex items-center justify-end gap-2">
            <button
              ref={cancelBtnRef}
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-3 py-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(document)}
              disabled={isDeleting}
              className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
