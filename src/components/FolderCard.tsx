'use client';

import React from 'react';
import { Folder, ChevronRight } from 'lucide-react';
import { FolderNode } from '@/types/document';

interface FolderCardProps {
  folder: FolderNode;
  onClick: (path: string) => void;
  isRootCard?: boolean;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick, isRootCard }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(folder.path)}
      className={`group relative text-left flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-150 cursor-pointer w-full ${
        isRootCard ? 'p-4 sm:p-5' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div className="w-9 h-9 shrink-0 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
          <Folder className="w-4 h-4 text-zinc-300" />
        </div>

        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
            {folder.name}
          </h3>

          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500 font-mono">
            {folder.subfolderCount > 0 && (
              <span>
                {folder.subfolderCount} {folder.subfolderCount === 1 ? 'folder' : 'folders'}
              </span>
            )}
            {folder.subfolderCount > 0 && folder.totalFileCount > 0 && <span>•</span>}
            {folder.totalFileCount > 0 && (
              <span>
                {folder.totalFileCount} {folder.totalFileCount === 1 ? 'file' : 'files'}
              </span>
            )}
            {folder.totalFileCount === 0 && folder.subfolderCount === 0 && (
              <span className="text-zinc-500">Empty</span>
            )}
          </div>
        </div>
      </div>

      <div className="shrink-0 pl-1 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
};
