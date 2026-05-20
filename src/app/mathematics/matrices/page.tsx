"use client";

import React from "react";
import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
import { IvsJVisualizer, TransposeVisualizer, DeterminantVisualizer } from "@/components/matrix-visualizers";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import { Latex } from "@/components/latex";

export default function MatricesPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 py-12">
      <header className="mb-16 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-purple-400">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Mathematics / Chapter 11</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Matrices.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-xl text-zinc-500 max-w-2xl leading-relaxed"
        >
          The building blocks of linear transformations. Master the structure, 
          operations, and secrets of rectangular arrays.
        </motion.p>
      </header>

      <ConceptBlock 
        title="Understanding i vs j"
        description="Every element in a matrix is located by its row (i) and column (j)."
        visual={<IvsJVisualizer />}
      >
        <div className="space-y-4">
          <Latex>
            {"In a matrix $A = [a_{ij}]$, the first subscript $i$ denotes the row, and the second subscript $j$ denotes the column."}
          </Latex>
          <ul className="space-y-2">
            <li className="flex gap-2 text-zinc-400">
              <span className="text-blue-400 font-bold">i = j:</span>
              <span>Principal Diagonal elements.</span>
            </li>
            <li className="flex gap-2 text-zinc-400">
              <span className="text-purple-400 font-bold">i &lt; j:</span>
              <span>Elements above the diagonal.</span>
            </li>
            <li className="flex gap-2 text-zinc-400">
              <span className="text-emerald-400 font-bold">i &gt; j:</span>
              <span>Elements below the diagonal.</span>
            </li>
          </ul>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Rows run across, Columns run down. (R-C Order)"
        example="A(2,3) = 2nd row, 3rd column. Remember: 'Racing Cars' (RC)"
      />

      <ConceptBlock 
        title="The Transpose Operation"
        description="Flipping a matrix over its diagonal. Rows become columns, and columns become rows."
        visual={<TransposeVisualizer />}
      >
        <div className="space-y-4">
          <Latex>
            {"The transpose of a matrix $A$ is denoted by $A^T$. Mathematically, if $A = [a_{ij}]$, then $A^T = [a_{ji}]$."}
          </Latex>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 font-mono text-sm text-zinc-400">
            Properties:<br/>
            1. $(A + B)^T = A^T + B^T$<br/>
            2. $(kA)^T = kA^T$<br/>
            3. $(AB)^T = B^T A^T$ (Reversal Law!)
          </div>
        </div>
      </ConceptBlock>

      <MistakeBlock 
        title="Transpose Order"
        commonMistake="$(AB)^T = A^T B^T$"
        correction="Always reverse the order: $(AB)^T = B^T A^T$. This is a common trap in JEE Advanced."
      />

      <ConceptBlock 
        title="The Determinant (2x2)"
        description="A scalar value encoding transformation properties."
        visual={<DeterminantVisualizer />}
      >
        <Latex>
          {"For a $2 \\times 2$ matrix, the determinant is calculated by the difference of the product of the diagonals: $\\Delta = ad - bc$."}
        </Latex>
      </ConceptBlock>

      <QuizBlock 
        question="What is the transpose of a Symmetric Matrix?"
        options={["The identity matrix", "The matrix itself (A)", "The negative of the matrix (-A)", "A zero matrix"]}
        correctAnswer={1}
        explanation="By definition, a symmetric matrix is one where $A^T = A$. Flipping it over the diagonal doesn't change it!"
      />

      <div className="mt-20 flex flex-col items-center gap-4">
        <Link href="/mathematics/determinants">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-8 h-14 text-lg font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95">
            Next: Determinants
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
