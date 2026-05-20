"use client";

import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 glass border-b border-white/5 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all">
          <Zap className="w-5 h-5 text-white fill-current" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Notes Horizon.</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/physics/motion-2d" className="hover:text-blue-400 transition-colors">Physics</Link>
          <Link href="/chemistry/goc" className="hover:text-emerald-400 transition-colors">Chemistry</Link>
          <Link href="/mathematics/matrices" className="hover:text-purple-400 transition-colors">Mathematics</Link>
        </div>
      </div>
    </nav>
  );
}
