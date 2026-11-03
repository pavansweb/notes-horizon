'use client';

import React from 'react';
import { Search, Plus, FolderOpen, Menu } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { StorageInfo } from '@/types/document';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUpload: () => void;
  stats: StorageInfo;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenUpload,
  stats,
  onToggleSidebar,
}) => {
  const percentUsed = Math.min(
    100,
    parseFloat(((stats.usedBytes / stats.maxBytes) * 100).toFixed(1))
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-3 shrink-0">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="Toggle navigation menu"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 md:hidden cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
              <FolderOpen className="w-4 h-4 text-amber-400" />
            </div>

            <div className="hidden xs:block">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-zinc-100">
                  Notes Horizon
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                  {stats.fileCount}
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search resources, topics, or tags..."
                className="w-full bg-zinc-900/80 text-xs text-zinc-200 placeholder-zinc-400 rounded-lg pl-8 pr-12 py-1.5 border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="text-[10px] text-zinc-400 font-mono bg-zinc-800 border border-zinc-700/60 px-1.5 py-0.5 rounded">
                  /
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Controls: Storage Pill & Upload */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Storage Progress Pill */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <div className="w-14 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(percentUsed, 1)}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                {formatBytes(stats.usedBytes)} / {formatBytes(stats.maxBytes)}
              </span>
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden xs:inline">Upload PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-zinc-900 text-xs text-zinc-200 placeholder-zinc-400 rounded-lg pl-8 pr-3 py-2 border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
