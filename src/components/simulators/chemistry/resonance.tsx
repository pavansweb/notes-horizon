"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResonanceVisualizer() {
  const [isShifted, setIsShifted] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 p-6 items-center">
      <div className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">
        Allyl Carbocation Resonance
      </div>

      <div className="relative w-full h-48 bg-zinc-900/50 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
        {/* Molecule Base */}
        <div className="relative flex items-center justify-center gap-12 font-mono text-3xl font-bold text-white z-10">
          <div className="relative w-16 text-center">
            CH₂
            <AnimatePresence>
              {isShifted && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-4 right-0 w-6 h-6 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center text-sm text-red-400"
                >
                  +
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-8 text-center">CH</div>

          <div className="relative w-16 text-center">
            CH₂
            <AnimatePresence>
              {!isShifted && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-4 right-0 w-6 h-6 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center text-sm text-red-400"
                >
                  +
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sigma Bonds (Fixed) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 w-48 z-0">
          <div className="h-1 w-full bg-white/20 rounded-full" />
          <div className="h-1 w-full bg-white/20 rounded-full" />
        </div>

        {/* Pi Bond (Animated) */}
        <motion.div 
          layout
          className="absolute top-1/2 -translate-y-4 h-1 w-16 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] z-0"
          animate={{
            left: isShifted ? "calc(50% + 24px)" : "calc(50% - 88px)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* Electron Push Arrow (Animated) */}
        <AnimatePresence mode="wait">
          {!isShifted ? (
            <motion.svg 
              key="arrow1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 pointer-events-none z-20"
            >
              <path 
                d="M 120 40 Q 150 20 180 40" 
                fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-yellow)" 
              />
            </motion.svg>
          ) : (
            <motion.svg 
              key="arrow2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 pointer-events-none z-20"
            >
              <path 
                d="M 240 40 Q 210 20 180 40" 
                fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-yellow)" 
              />
            </motion.svg>
          )}
        </AnimatePresence>

        <svg className="absolute w-0 h-0">
          <defs>
            <marker id="arrow-yellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
          </defs>
        </svg>

      </div>

      <Button 
        onClick={() => setIsShifted(!isShifted)}
        variant="outline"
        className="gap-2 border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 rounded-full px-8"
      >
        <ArrowRightLeft className="w-4 h-4" />
        {isShifted ? "Shift Electrons Left" : "Shift Electrons Right"}
      </Button>
    </div>
  );
}
