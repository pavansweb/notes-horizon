'use client';

import React from 'react';
import {
  Folder,
  ChevronRight,
  Atom,
  FlaskConical,
  Calculator,
  BookOpen,
  FileText,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { FolderNode } from '@/types/document';

interface FolderCardProps {
  folder: FolderNode;
  onClick: (path: string) => void;
  isRootCard?: boolean;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick, isRootCard }) => {
  // Determine appropriate icon & subtle theme based on folder name or subject
  let icon = <Folder className="w-4 h-4 text-zinc-400" />;
  let accentBorder = 'border-zinc-800/80 hover:border-zinc-700';
  let iconBg = 'bg-zinc-800/80 border-zinc-700/60 text-zinc-300';

  if (folder.name === 'Physics' || folder.path === 'Physics') {
    icon = <Atom className="w-4 h-4 text-sky-400" />;
    iconBg = 'bg-sky-500/10 border-sky-500/20 text-sky-300';
    accentBorder = 'border-zinc-800 hover:border-sky-500/30';
  } else if (folder.name === 'Chemistry' || folder.path === 'Chemistry') {
    icon = <FlaskConical className="w-4 h-4 text-emerald-400" />;
    iconBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300';
    accentBorder = 'border-zinc-800 hover:border-emerald-500/30';
  } else if (folder.name === 'Maths' || folder.name === 'Math' || folder.path === 'Maths') {
    icon = <Calculator className="w-4 h-4 text-indigo-400" />;
    iconBg = 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300';
    accentBorder = 'border-zinc-800 hover:border-indigo-500/30';
  } else if (folder.name.includes('Mind Map') || folder.name.includes('Flowchart')) {
    icon = <BookOpen className="w-4 h-4 text-amber-400" />;
    iconBg = 'bg-amber-500/10 border-amber-500/20 text-amber-300';
  } else if (folder.name === 'Short Notes') {
    icon = <FileText className="w-4 h-4 text-cyan-400" />;
    iconBg = 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300';
  } else if (folder.name === 'Teacher Kits' || folder.path.includes('Teacher Kits')) {
    icon = <GraduationCap className="w-4 h-4 text-purple-400" />;
    iconBg = 'bg-purple-500/10 border-purple-500/20 text-purple-300';
  } else if (folder.name.includes('AI') || folder.name.includes('Summary')) {
    icon = <Sparkles className="w-4 h-4 text-violet-400" />;
    iconBg = 'bg-violet-500/10 border-violet-500/20 text-violet-300';
  }

  return (
    <button
      type="button"
      onClick={() => onClick(folder.path)}
      className={`group relative text-left flex items-center justify-between rounded-xl bg-zinc-900/40 hover:bg-zinc-900/80 border ${accentBorder} transition-all duration-150 cursor-pointer w-full ${
        isRootCard ? 'p-4 sm:p-5' : 'p-3.5'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <div
          className={`shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
            isRootCard ? 'w-10 h-10' : 'w-8 h-8'
          } ${iconBg}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h3
            className={`font-medium text-zinc-200 truncate group-hover:text-white transition-colors ${
              isRootCard ? 'text-sm sm:text-base font-semibold' : 'text-xs sm:text-sm'
            }`}
          >
            {folder.name}
          </h3>

          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400 font-mono">
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

      <div className="shrink-0 pl-1 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
};
