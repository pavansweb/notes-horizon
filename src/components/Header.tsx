'use client';

import React from 'react';
import { FileText, UploadCloud, Search, Cloud, HardDrive, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUpload: () => void;
  isCloud: boolean;
  totalDocs: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenUpload,
  isCloud,
  totalDocs,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-rose-500 via-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Horizon<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Vault</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  PRO
                </span>
                <span className="text-[11px] text-zinc-500 font-mono hidden md:inline">
                  • {totalDocs} {totalDocs === 1 ? 'document' : 'documents'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Ultra-fast PDF Storage & Reader
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search PDF documents or tags..."
                className="w-full bg-zinc-900/90 text-sm text-zinc-200 placeholder-zinc-500 rounded-xl pl-10 pr-10 py-2.5 border border-zinc-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 px-1.5 py-0.5 rounded bg-zinc-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="flex items-center gap-3">
            {/* Storage Provider Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
              {isCloud ? (
                <>
                  <Cloud className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>Vercel Blob</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                  <span>Local Mode</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="relative group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 hover:from-indigo-500 hover:to-rose-400 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Upload PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search documents or tags..."
              className="w-full bg-zinc-900/90 text-sm text-zinc-200 placeholder-zinc-500 rounded-xl pl-10 pr-10 py-2 border border-zinc-800 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 px-1.5 py-0.5 rounded bg-zinc-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
