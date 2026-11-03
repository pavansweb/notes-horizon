'use client';

import React from 'react';
import { StorageInfo } from '@/types/document';
import { formatBytes } from '@/lib/utils';
import { Files, Star, HardDrive, Zap, ShieldCheck } from 'lucide-react';

interface StorageStatsProps {
  stats: StorageInfo;
}

export const StorageStats: React.FC<StorageStatsProps> = ({ stats }) => {
  const percentUsed = Math.min(
    100,
    parseFloat(((stats.usedBytes / stats.maxBytes) * 100).toFixed(2))
  );

  const remainingBytes = Math.max(0, stats.maxBytes - stats.usedBytes);

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 rounded-2xl border border-zinc-800/80 p-5 sm:p-6 shadow-xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative gradient glow in background */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top row: Storage Meter */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <HardDrive className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold text-zinc-200">
              Cloud Storage Allocation
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Free Tier (1 GB)
            </span>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            <span className="text-zinc-200 font-semibold">{formatBytes(stats.usedBytes)}</span> of{' '}
            <span>{formatBytes(stats.maxBytes)}</span> ({percentUsed}% used)
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-zinc-950/80 rounded-full overflow-hidden p-0.5 border border-zinc-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-rose-400 transition-all duration-700 ease-out"
            style={{ width: `${Math.max(percentUsed, 1)}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-2 text-[11px] text-zinc-400">
          <span>{formatBytes(remainingBytes)} available storage</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> No credit card required
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        <div className="bg-zinc-950/60 rounded-xl p-3.5 border border-zinc-800/60 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-medium">Total Files</span>
            <Files className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {stats.fileCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">PDF documents stored</p>
        </div>

        <div className="bg-zinc-950/60 rounded-xl p-3.5 border border-zinc-800/60 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-medium">Starred</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {stats.favoriteCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">Favorites pinned</p>
        </div>

        <div className="bg-zinc-950/60 rounded-xl p-3.5 border border-zinc-800/60 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-medium">Storage Used</span>
            <HardDrive className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {formatBytes(stats.usedBytes)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">{percentUsed}% of 1 GB quota</p>
        </div>

        <div className="bg-zinc-950/60 rounded-xl p-3.5 border border-zinc-800/60 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-xs font-medium">Storage Engine</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-white truncate">
            {stats.isCloud ? 'Vercel Blob' : 'Local Hybrid'}
          </div>
          <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Online & Ready
          </p>
        </div>
      </div>
    </div>
  );
};
