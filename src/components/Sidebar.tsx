'use client';

import React from 'react';
import {
  Folder,
  Star,
  Clock,
  BookOpen,
  FlaskConical,
  Award,
  GraduationCap,
  Sparkles,
  ChevronRight,
  HardDrive,
  X,
  Bot,
} from 'lucide-react';
import { StorageInfo } from '@/types/document';
import { formatBytes } from '@/lib/utils';

export interface SidebarCategory {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  count?: number;
  badge?: string;
  color?: string;
}

interface SidebarProps {
  currentPath: string;
  onNavigatePath: (path: string) => void;
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  selectedClass: string;
  onSelectClass: (className: string) => void;
  stats: StorageInfo;
  isStarredView: boolean;
  onSelectStarredView: () => void;
  isRecentView: boolean;
  onSelectRecentView: () => void;
  isOpen: boolean;
  onClose: () => void;
  categoryCounts: Record<string, number>;
  browseMode?: 'subject' | 'type';
  onBrowseModeChange?: (mode: 'subject' | 'type') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigatePath,
  selectedSubject,
  onSelectSubject,
  selectedClass,
  onSelectClass,
  stats,
  isStarredView,
  onSelectStarredView,
  isRecentView,
  onSelectRecentView,
  isOpen,
  onClose,
  categoryCounts,
  browseMode = 'subject',
  onBrowseModeChange,
}) => {
  const isPWActive = currentPath === 'Physics Wallah Content' || currentPath.startsWith('Physics Wallah Content/');
  const isAgyActive = currentPath === 'agy ai genrated' || currentPath.startsWith('agy ai genrated/');

  const subjectSections: SidebarCategory[] = [
    {
      id: 'physics',
      name: 'Physics',
      path: 'Physics Wallah Content/Physics',
      icon: <span className="text-sky-400">⚡</span>,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      path: 'Physics Wallah Content/Chemistry',
      icon: <span className="text-emerald-400">🧪</span>,
    },
    {
      id: 'maths',
      name: 'Maths',
      path: 'Physics Wallah Content/Maths',
      icon: <span className="text-indigo-400">📐</span>,
    },
  ];

  const pwSections: SidebarCategory[] = [
    {
      id: 'mindmaps',
      name: 'Mindmaps & Flowcharts',
      path: 'Physics Wallah Content/Mindmaps & Flowcharts',
      icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      id: 'short-notes',
      name: 'Short Notes',
      path: 'Physics Wallah Content/Short Notes',
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      id: 'formula-sheets',
      name: 'Formula Sheets',
      path: 'Physics Wallah Content/Formula Sheets',
      icon: <FlaskConical className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'question-papers',
      name: 'Question Papers',
      path: 'Physics Wallah Content/Question Papers',
      icon: <Award className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      id: 'teacher-kits',
      name: 'Teacher Kits',
      path: 'Physics Wallah Content/Teacher Kits',
      icon: <GraduationCap className="w-3.5 h-3.5 text-violet-400" />,
    },
    {
      id: 'syllabus',
      name: 'Syllabus',
      path: 'Physics Wallah Content/Syllabus',
      icon: <Folder className="w-3.5 h-3.5 text-zinc-400" />,
    },
  ];

  const teacherKits =
    browseMode === 'subject'
      ? [
          { name: 'Ashish Sir (Maths)', path: 'Physics Wallah Content/Maths/Teacher Kits/Ashish Sirs Maths Kit' },
          { name: 'Saleem Sir (Physics)', path: 'Physics Wallah Content/Physics/Teacher Kits/Saleem Sirs Physics Kit' },
          { name: 'Pankaj Sir (Org Chem)', path: 'Physics Wallah Content/Chemistry/Teacher Kits/Pankaj Sirs Organic Chemistry Kit' },
          { name: 'Rohit Sir (Org Chem)', path: 'Physics Wallah Content/Chemistry/Teacher Kits/Rohit Sirs Organic Chemistry Kit' },
        ]
      : [
          { name: 'Ashish Sir (Maths)', path: 'Physics Wallah Content/Teacher Kits/Maths/Ashish Sirs Maths Kit' },
          { name: 'Saleem Sir (Physics)', path: 'Physics Wallah Content/Teacher Kits/Physics/Saleem Sirs Physics Kit' },
          { name: 'Pankaj Sir (Org Chem)', path: 'Physics Wallah Content/Teacher Kits/Chemistry/Pankaj Sirs Organic Chemistry Kit' },
          { name: 'Rohit Sir (Org Chem)', path: 'Physics Wallah Content/Teacher Kits/Chemistry/Rohit Sirs Organic Chemistry Kit' },
        ];

  const percentUsed = Math.min(
    100,
    parseFloat(((stats.usedBytes / stats.maxBytes) * 100).toFixed(1))
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 md:z-30 h-[calc(100vh-4rem)] w-64 shrink-0 bg-zinc-950/95 md:bg-transparent border-r border-zinc-900 md:border-r-0 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-5">
          {/* Mobile close button */}
          <div className="flex items-center justify-between md:hidden pb-2 border-b border-zinc-900">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Access */}
          <div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
              Quick Views
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  onNavigatePath('');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  !isStarredView && !isRecentView && currentPath === ''
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Library Root</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {stats.fileCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectStarredView();
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isStarredView
                    ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span>Starred Files</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {stats.favoriteCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectRecentView();
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isRecentView
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Recent Uploads</span>
                </div>
              </button>
            </div>
          </div>

          {/* Root Content Folders */}
          <div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
              Root Folders
            </div>
            <div className="space-y-1">
              {/* Physics Wallah Content Folder */}
              <button
                type="button"
                onClick={() => {
                  onNavigatePath('Physics Wallah Content');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isPWActive
                    ? 'bg-amber-500/15 text-amber-200 font-semibold border border-amber-500/30'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Physics Wallah</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 shrink-0 bg-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800">
                  {stats.fileCount}
                </span>
              </button>

              {/* PW Sub-sections (Nested under PW Content) */}
              <div className="pl-3 space-y-0.5 border-l border-zinc-900 ml-3">
                {/* Arrangement Toggle Link */}
                {onBrowseModeChange && (
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-1 mb-1 border-b border-zinc-900 px-1">
                    <span>Arranged by:</span>
                    <button
                      type="button"
                      onClick={() => onBrowseModeChange(browseMode === 'subject' ? 'type' : 'subject')}
                      className="text-amber-400 hover:text-amber-300 transition-colors font-semibold cursor-pointer"
                      title="Click to toggle between Subject view and Format view"
                    >
                      {browseMode === 'subject' ? '⚡ Subjects' : '📚 Format'} ⇄
                    </button>
                  </div>
                )}

                {(browseMode === 'subject' ? subjectSections : pwSections).map((section) => {
                  const isActive =
                    !isStarredView &&
                    !isRecentView &&
                    (currentPath === section.path || currentPath.startsWith(section.path + '/'));
                  const count = categoryCounts[section.name] || 0;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => {
                        onNavigatePath(section.path);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-zinc-800 text-white font-medium border border-zinc-700/60'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-1">
                        {section.icon}
                        <span className="truncate">{section.name}</span>
                      </div>
                      {count > 0 && (
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* AGY AI Generated Folder */}
              <button
                type="button"
                onClick={() => {
                  onNavigatePath('agy ai genrated');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isAgyActive
                    ? 'bg-violet-500/15 text-violet-200 font-semibold border border-violet-500/30'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <Bot className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="truncate">agy ai genrated</span>
                </div>
                <span className="text-[10px] font-mono text-violet-300 shrink-0 bg-violet-500/20 px-1.5 py-0.2 rounded border border-violet-500/30">
                  AI
                </span>
              </button>
            </div>
          </div>

          {/* Quick Teacher Kits Access */}
          <div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
              Teacher Kits
            </div>
            <div className="space-y-0.5 pl-1">
              {teacherKits.map((kit) => {
                const isActive = currentPath === kit.path || currentPath.startsWith(kit.path + '/');
                return (
                  <button
                    key={kit.path}
                    type="button"
                    onClick={() => {
                      onNavigatePath(kit.path);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-violet-500/15 text-violet-300 font-semibold border border-violet-500/30'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    <span className="truncate">{kit.name}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-600" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Pills Filter */}
          <div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
              Filter by Subject
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              {[
                { label: 'All', value: 'All' },
                { label: 'Physics', value: 'Physics', icon: '⚡' },
                { label: 'Chemistry', value: 'Chemistry', icon: '🧪' },
                { label: 'Maths', value: 'Maths', icon: '📐' },
              ].map((subj) => (
                <button
                  key={subj.value}
                  type="button"
                  onClick={() => onSelectSubject(subj.value)}
                  className={`flex items-center justify-center gap-1 py-1 px-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedSubject === subj.value
                      ? 'bg-zinc-200 text-zinc-950 font-semibold shadow-xs'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {subj.icon && <span>{subj.icon}</span>}
                  <span>{subj.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Class Filter */}
          <div>
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
              Class Level
            </div>
            <div className="flex gap-1 px-1">
              {['All', 'Class 11', 'Class 12'].map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => onSelectClass(cls)}
                  className={`flex-1 py-1 px-2 rounded-md text-[11px] font-medium transition-colors text-center cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-zinc-200 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Storage info */}
        <div className="pt-4 mt-4 border-t border-zinc-900/80 px-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
              <span>Storage (2 TB)</span>
            </span>
            <span>{percentUsed}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(percentUsed, 1)}%` }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 font-mono mt-1 text-right">
            {formatBytes(stats.usedBytes)} of {formatBytes(stats.maxBytes)}
          </p>
        </div>
      </aside>
    </>
  );
};
