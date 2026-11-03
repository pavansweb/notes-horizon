'use client';

import React, { useEffect, useRef } from 'react';
import { PDFDocument } from '@/types/document';
import { formatBytes } from '@/lib/utils';
import { AlertTriangle, Trash2 } from 'lucide-react';

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
      className="m-auto rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm p-6 max-w-md w-full focus:outline-none"
      style={{
        overscrollBehavior: 'contain',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
        </div>

        <div className="flex-1">
          <h2 id="delete-confirm-title" className="text-base font-bold text-white mb-1">
            Delete Document?
          </h2>
          <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
            Are you sure you want to permanently delete{' '}
            <span className="font-semibold text-zinc-200">&ldquo;{document.name}&rdquo;</span>{' '}
            ({formatBytes(document.size)})? This action cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 mt-5">
            <button
              ref={cancelBtnRef}
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(document)}
              disabled={isDeleting}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-lg shadow-rose-600/25 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Deleting...' : 'Delete Permanently'}</span>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
