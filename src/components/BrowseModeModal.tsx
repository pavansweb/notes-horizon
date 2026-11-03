'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { BrowseMode } from '@/types/document';

interface BrowseModeModalProps {
  isOpen: boolean;
  currentMode: BrowseMode;
  onSelect: (mode: BrowseMode) => void;
  onClose: () => void;
}

export const BrowseModeModal: React.FC<BrowseModeModalProps> = ({
  isOpen,
  currentMode,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="browse-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-6">
          <h2
            id="browse-modal-title"
            className="text-base font-semibold text-white tracking-tight"
          >
            Arrange Notes
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Choose how you want to sort and explore documents:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Option A: Subject */}
          <button
            type="button"
            onClick={() => {
              onSelect('subject');
              onClose();
            }}
            className={`text-left p-4 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between min-h-[120px] ${
              currentMode === 'subject'
                ? 'bg-zinc-900 border-zinc-600 text-white'
                : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">By Subject</span>
                {currentMode === 'subject' && (
                  <Check className="w-3.5 h-3.5 text-zinc-300" />
                )}
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Physics, Chemistry, Maths &rarr; Class 11, Class 12 &rarr; Notes & Papers.
              </p>
            </div>
          </button>

          {/* Option B: Format */}
          <button
            type="button"
            onClick={() => {
              onSelect('type');
              onClose();
            }}
            className={`text-left p-4 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between min-h-[120px] ${
              currentMode === 'type'
                ? 'bg-zinc-900 border-zinc-600 text-white'
                : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">By Format</span>
                {currentMode === 'type' && (
                  <Check className="w-3.5 h-3.5 text-zinc-300" />
                )}
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Mindmaps, Flowcharts, Short Notes, Question Papers &rarr; Subjects.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
