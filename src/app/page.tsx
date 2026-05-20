"use client";

import React from "react";
import { SYLLABUS } from "@/lib/syllabus";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Target, Brain, Rocket, Atom, FlaskConical, Sigma } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 py-12">
      <header className="mb-16">
        <Badge variant="outline" className="mb-4 text-blue-400 border-blue-400/30 bg-blue-400/5">
          Interactive Platform
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Master JEE. <br />
          <span className="text-zinc-500">Stop memorizing. Start seeing.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          The ultimate visual learning system for JEE Main & Advanced. Choose a subject 
          below to dive into intuitive, dopamine-friendly interactive modules.
        </p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(SYLLABUS).map(([key, subject]) => {
          const Icon = key === "physics" ? Atom : key === "chemistry" ? FlaskConical : Sigma;
          const iconColor = subject.color === "blue" ? "text-blue-400" : subject.color === "emerald" ? "text-emerald-400" : "text-purple-400";
          const bgGradient = subject.color === "blue" ? "from-blue-600 to-transparent" : subject.color === "emerald" ? "from-emerald-600 to-transparent" : "from-purple-600 to-transparent";

          return (
            <motion.div key={key} variants={item}>
              <Card className="bg-white/5 border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden group h-full flex flex-col">
                <div className="h-48 bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                  <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", bgGradient)} />
                  <Icon className={cn("w-20 h-20 opacity-20 group-hover:scale-110 transition-transform duration-500", iconColor)} />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/50 backdrop-blur-md border-white/10 text-white">
                      {subject.chapters.length} Chapters
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-4">{subject.name}</h3>
                  <div className="space-y-2 mb-6 flex-1">
                    {subject.chapters.filter(c => c.isNew).map(chapter => (
                      <Link key={chapter.id} href={`/${key}/${chapter.id}`} className="block">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between group/link">
                          <span className="text-sm font-medium text-zinc-300">{chapter.name}</span>
                          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/link:text-white transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white" variant="ghost">
                    View Full Syllabus
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
