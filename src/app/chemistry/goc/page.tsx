"use client";

import React from "react";
import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
import { ResonanceVisualizer } from "@/components/simulators/chemistry/resonance";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, FlaskConical, BookOpen } from "lucide-react";
import { Latex } from "@/components/latex";
import Link from "next/link";

export default function GOCPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 py-12">
      <header className="mb-16 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Chemistry / Chapter 22</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          General Organic Chemistry.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-xl text-zinc-500 max-w-2xl leading-relaxed"
        >
          The logic of electron flow. Stop memorizing reactions and start understanding 
          where the electrons want to go.
        </motion.p>
      </header>

      <ConceptBlock 
        title="Resonance & Electron Delocalization"
        description="Electrons in pi bonds and lone pairs can move across adjacent p-orbitals, stabilizing the molecule."
        visual={<ResonanceVisualizer />}
      >
        <div className="space-y-4">
          <Latex>
            {"Resonance isn't a molecule flipping back and forth between structures. It's a single, stable hybrid structure."}
          </Latex>
          <Latex>
            {"In an allyl carbocation ($CH_2=CH-CH_2^+$), the empty p-orbital attracts the adjacent pi electrons. The electrons shift over, creating a new pi bond and moving the positive charge to the other side."}
          </Latex>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Follow the Electrons, Not the Atoms!"
        example="Arrows ALWAYS start from a source of electrons (pi bond, lone pair, negative charge) and point to an electron sink (empty orbital, positive charge)."
      />

      <MistakeBlock 
        title="Breaking Sigma Bonds"
        commonMistake="Drawing a resonance structure where a single (sigma) bond is broken."
        correction="Resonance ONLY involves the movement of pi electrons and lone pairs. The atomic skeleton must remain exactly the same."
      />

      <QuizBlock 
        question="Which of the following makes a resonance structure MORE stable (a major contributor)?"
        options={[
          "More formal charges",
          "Incomplete octets",
          "Maximum number of covalent bonds (full octets)",
          "Negative charge on the least electronegative atom"
        ]}
        correctAnswer={2}
        explanation="Structures with full octets and more covalent bonds are always the most stable major contributors, even if they have formal charges!"
      />

      <div className="mt-20 flex flex-col items-center gap-4">
        <Link href="/chemistry/hydrocarbons">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 h-14 text-lg font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95">
            Next: Hydrocarbons
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
