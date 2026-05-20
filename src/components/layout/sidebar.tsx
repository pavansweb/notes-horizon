"use client";

import React, { useState } from "react";
import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, Layers, BookOpen, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Sidebar() {
  const pathname = usePathname();
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({
    physics: false,
    chemistry: false,
    mathematics: false
  });

  const toggleSubject = (subjectId: string) => {
    setOpenSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };

  return (
    <aside className="w-72 fixed left-0 top-20 bottom-0 overflow-y-auto border-r border-white/5 bg-[#030303]/80 backdrop-blur-xl z-40 hidden md:block hide-scrollbar">
      <div className="p-6 space-y-8">
        {(Object.entries(SYLLABUS) as [keyof typeof SYLLABUS, typeof SYLLABUS[keyof typeof SYLLABUS]][]).map(([key, subject]) => {
          const isOpen = openSubjects[key];
          
          return (
            <div key={key} className="space-y-2">
              <button 
                onClick={() => toggleSubject(key)}
                className="w-full flex items-center justify-between text-sm font-bold tracking-widest uppercase mb-4 text-zinc-500 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    subject.color === "blue" ? "bg-blue-500" :
                    subject.color === "emerald" ? "bg-emerald-500" : "bg-purple-500"
                  )} />
                  {subject.name}
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")} />
              </button>

              {isOpen && (
                <div className="space-y-1 ml-4 border-l border-white/5 pl-4">
                  {subject.chapters.map((chapter) => {
                    const href = `/${key}/${chapter.id}`;
                    const isActive = pathname === href;
                    
                    return (
                      <Link key={chapter.id} href={href} className="block">
                        <div className={cn(
                          "px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group",
                          isActive 
                            ? "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}>
                          <span className="truncate pr-2">{chapter.name}</span>
                          {chapter.isNew && (
                            <Badge variant="outline" className={cn(
                              "text-[10px] px-1.5 py-0 border-current/20 bg-current/5",
                              subject.color === "blue" ? "text-blue-400" :
                              subject.color === "emerald" ? "text-emerald-400" : "text-purple-400"
                            )}>
                              NEW
                            </Badge>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
