'use client';

import React from 'react';
import { ChevronRight, Home, ArrowLeft, ArrowUpDown, LayoutGrid, List as ListIcon, RefreshCw } from 'lucide-react';
import { SortOption, ViewMode } from '@/types/document';

interface BreadcrumbNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  itemCount: number;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRefresh: () => void;
  isLoading: boolean;
  showAllNested: boolean;
  onToggleShowAllNested: (show: boolean) => void;
  hasSubfolders: boolean;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  currentPath,
  onNavigate,
  itemCount,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  onRefresh,
  isLoading,
  showAllNested,
  onToggleShowAllNested,
  hasSubfolders,
}) => {
  const parts = currentPath ? currentPath.split('/').filter(Boolean) : [];

  const handleGoUp = () => {
    if (parts.length === 0) return;
    const parentPath = parts.slice(0, -1).join('/');
    onNavigate(parentPath);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
      {/* Left: Breadcrumbs trail & back button */}
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
        {parts.length > 0 && (
          <button
            type="button"
            onClick={handleGoUp}
            title="Go up one folder (Backspace)"
            aria-label="Go up one folder"
            className="p-1 rounded-md text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors mr-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onNavigate('')}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            parts.length === 0
              ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>

        {parts.map((part, index) => {
          const partPath = parts.slice(0, index + 1).join('/');
          const isLast = index === parts.length - 1;

          return (
            <React.Fragment key={partPath}>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              <button
                type="button"
                onClick={() => onNavigate(partPath)}
                className={`px-2 py-1 rounded-md text-xs font-medium truncate max-w-[160px] sm:max-w-[220px] transition-colors cursor-pointer ${
                  isLast
                    ? 'bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
                title={part}
              >
                {part}
              </button>
            </React.Fragment>
          );
        })}

        <span className="text-[11px] font-mono text-zinc-400 ml-1 bg-zinc-900/80 border border-zinc-800 px-1.5 py-0.5 rounded">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Right: Controls & Toggles */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        {/* Toggle recursive flat view vs folder view if in subfolder */}
        {hasSubfolders && (
          <label className="flex items-center gap-1.5 text-[11px] text-zinc-400 cursor-pointer bg-zinc-900/60 border border-zinc-800/80 px-2 py-1 rounded-md hover:text-zinc-300 transition-colors">
            <input
              type="checkbox"
              checked={showAllNested}
              onChange={(e) => onToggleShowAllNested(e.target.checked)}
              className="w-3 h-3 rounded border-zinc-700 bg-zinc-800 text-white focus:ring-0 cursor-pointer"
            />
            <span className="select-none">Include subfolder files</span>
          </label>
        )}

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-xs text-zinc-400">
          <ArrowUpDown className="w-3 h-3 text-zinc-500" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort by"
            className="bg-transparent text-[11px] text-zinc-300 focus:outline-none cursor-pointer"
          >
            <option value="chapter-asc" className="bg-zinc-950">Chapter / A-Z</option>
            <option value="name-desc" className="bg-zinc-950">Name (Z-A)</option>
            <option value="newest" className="bg-zinc-950">Newest First</option>
            <option value="oldest" className="bg-zinc-950">Oldest First</option>
            <option value="size-desc" className="bg-zinc-950">Size (Largest)</option>
            <option value="size-asc" className="bg-zinc-950">Size (Smallest)</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-1 rounded transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-1 rounded transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="List view"
            aria-label="List view"
          >
            <ListIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Refresh library"
          aria-label="Refresh library"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
