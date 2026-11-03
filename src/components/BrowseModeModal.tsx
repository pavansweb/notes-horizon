'use client';

import React from 'react';
import { Atom, BookOpen, Sparkles, X, ArrowRight, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/80 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="browse-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium font-mono mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Welcome to JEE Horizon</span>
          </div>
          <h2
            id="browse-modal-title"
            className="text-lg sm:text-xl font-bold text-white tracking-tight"
          >
            How would you like to explore your notes?
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Choose how you want to sort and navigate your study materials. You can easily switch this anytime using the toggle in the headbar.
          </p>
        </div>

        {/* The Two Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Option A: Subject-wise */}
          <button
            type="button"
            onClick={() => {
              onSelect('subject');
              onClose();
            }}
            className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[170px] ${
              currentMode === 'subject'
                ? 'bg-gradient-to-br from-amber-500/15 via-zinc-900/90 to-zinc-950 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <Atom className="w-5 h-5" />
                </div>
                {currentMode === 'subject' ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Recommended
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                Subject-wise
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                <strong className="text-zinc-300">Physics • Chemistry • Maths</strong> &rarr; Class 11, Class 12 &rarr; Mindmaps, Notes, Formula Sheets & Questions.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mt-3 pt-2.5 border-t border-zinc-800/60">
              <span>Select Subject View</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Option B: By Mindmaps & Flowcharts */}
          <button
            type="button"
            onClick={() => {
              onSelect('type');
              onClose();
            }}
            className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[170px] ${
              currentMode === 'type'
                ? 'bg-gradient-to-br from-sky-500/15 via-zinc-900/90 to-zinc-950 border-sky-500/50 shadow-lg shadow-sky-500/10'
                : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                {currentMode === 'type' && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-sky-300 bg-sky-500/20 border border-sky-500/30 px-2 py-0.5 rounded-full font-semibold">
                    <Check className="w-3 h-3" /> Active
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                Mindmaps & Flowcharts
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                <strong className="text-zinc-300">Mindmaps • Short Notes • Formula Sheets • Teacher Kits</strong> &rarr; Class 11, Class 12 &rarr; Subjects.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mt-3 pt-2.5 border-t border-zinc-800/60">
              <span>Select Format View</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-zinc-400 text-center font-mono">
          Tip: Look for the <span className="text-zinc-300">⚡ Subject / 🧠 Mindmaps</span> toggle in the top bar to switch anytime.
        </p>
      </div>
    </div>
  );
};
