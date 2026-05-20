"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, MoveRight, RotateCw } from "lucide-react";

export const IvsJVisualizer = () => {
  const [hovered, setHovered] = useState<{ i: number; j: number } | null>(null);
  const size = 3;

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: size * size }).map((_, idx) => {
          const i = Math.floor(idx / size) + 1;
          const j = (idx % size) + 1;
          const isDiagonal = i === j;
          const isUpper = i < j;
          const isLower = i > j;

          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHovered({ i, j })}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "w-16 h-16 rounded-lg border flex items-center justify-center text-sm font-mono cursor-pointer transition-all duration-300",
                isDiagonal ? "bg-blue-500/20 border-blue-500/50 text-blue-400" :
                isUpper ? "bg-purple-500/10 border-purple-500/30 text-purple-400" :
                "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                hovered?.i === i && hovered?.j === j ? "scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10" : ""
              )}
            >
              a({i},{j})
            </motion.div>
          );
        })}
      </div>
      <div className="h-20 text-center space-y-2">
        {hovered ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-white font-bold text-xl">
              i = {hovered.i}, j = {hovered.j}
            </p>
            <p className="text-muted-foreground">
              {hovered.i === hovered.j ? "Diagonal Element (i = j)" : 
               hovered.i < hovered.j ? "Upper Triangular (i < j)" : 
               "Lower Triangular (i > j)"}
            </p>
          </motion.div>
        ) : (
          <p className="text-zinc-500 italic">Hover over elements to explore indices</p>
        )}
      </div>
    </div>
  );
};

export const TransposeVisualizer = () => {
  const [isTransposed, setIsTransposed] = useState(false);
  const matrix = [
    [1, 2, 3],
    [4, 5, 6]
  ];

  return (
    <div className="flex flex-col items-center gap-8 p-4 w-full">
      <div className="relative h-48 w-full flex items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          {matrix.map((row, i) => 
            row.map((val, j) => (
              <motion.div
                key={`${i}-${j}`}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  gridColumn: isTransposed ? i + 1 : j + 1,
                  gridRow: isTransposed ? j + 1 : i + 1,
                }}
                className={cn(
                  "w-12 h-12 rounded-lg border flex items-center justify-center font-bold",
                  isTransposed ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-white"
                )}
              >
                {val}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <Button 
        onClick={() => setIsTransposed(!isTransposed)}
        variant="outline"
        className="gap-2 border-white/10 hover:bg-white/5"
      >
        <ArrowRightLeft className="w-4 h-4" />
        {isTransposed ? "Original Matrix" : "Transpose Matrix"}
      </Button>
    </div>
  );
};

export const DeterminantVisualizer = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="relative font-mono text-2xl p-6 border-l-2 border-r-2 border-white/20">
        <div className="grid grid-cols-2 gap-8">
          <motion.span animate={{ color: step === 1 ? "#60a5fa" : "#fff" }}>a</motion.span>
          <motion.span animate={{ color: step === 2 ? "#f87171" : "#fff" }}>b</motion.span>
          <motion.span animate={{ color: step === 2 ? "#f87171" : "#fff" }}>c</motion.span>
          <motion.span animate={{ color: step === 1 ? "#60a5fa" : "#fff" }}>d</motion.span>
        </div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <AnimatePresence>
            {step === 1 && (
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                x1="25%" y1="25%" x2="75%" y2="75%" 
                stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2"
              />
            )}
            {step === 2 && (
              <motion.line 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                x1="75%" y1="25%" x2="25%" y2="75%" 
                stroke="#f87171" strokeWidth="2" strokeDasharray="4 2"
              />
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className="text-center space-y-4">
        <div className="text-2xl font-bold flex items-center justify-center gap-2">
          det = 
          <span className={cn(step === 1 ? "text-blue-400" : "text-white")}>ad</span>
          <span>-</span>
          <span className={cn(step === 2 ? "text-red-400" : "text-white")}>bc</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => setStep(1)} className={step === 1 ? "bg-blue-500/10 text-blue-400" : ""}>Step 1: ad</Button>
          <Button size="sm" variant="ghost" onClick={() => setStep(2)} className={step === 2 ? "bg-red-500/10 text-red-400" : ""}>Step 2: bc</Button>
          <Button size="sm" variant="ghost" onClick={() => setStep(0)}>Reset</Button>
        </div>
      </div>
    </div>
  );
};
