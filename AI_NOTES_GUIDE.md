# AI Instructions: JEE Notes Generation

You are tasked with generating interactive JEE study modules for "Notes Horizon". Follow these rules strictly to ensure compatibility with our React/Next.js rendering engine.

## 1. File Structure
*   Location: `src/app/[subject]/[chapter-id]/page.tsx`
*   Format: TypeScript JSX (`.tsx`)
*   Template:
    ```tsx
    "use client";
    import React from "react";
    import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
    import { motion } from "framer-motion";
    import { BookOpen } from "lucide-react";
    import { Latex } from "@/components/latex";
    import Link from "next/link";
    import { Button } from "@/components/ui/button";

    export default function ChapterPage() {
      return (
        <div className="max-w-4xl mx-auto p-8 py-12">
          {/* Header */}
          <header className="mb-16 space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Physics / Chapter 01</span>
            </motion.div>
            <h1 className="text-6xl font-black text-white">Title.</h1>
          </header>

          {/* Content Blocks */}
          <ConceptBlock title="Concept Name" description="Hook.">
            <Latex>{"Definition with $formula$."}</Latex>
          </ConceptBlock>

          {/* Repeat Blocks */}
        </div>
      );
    }
    ```

## 2. Formatting Rules (CRITICAL)
*   **LaTeX**: Always use single dollar signs `$ ... $` for math.
*   **Escaping**: You MUST use double backslashes for LaTeX commands: `\\vec{v}`, `\\theta`, `\\frac{a}{b}`.
*   **JSX Strings**: Wrap all text containing math or special characters in `{" "}` to avoid JSX parsing errors.
    *   *Correct*: `<Latex>{"The angle is $\\theta$."}</Latex>`
*   **Short Explanations**: Avoid walls of text. Use bullet points and bold highlights.

## 3. Component Usage
*   `ConceptBlock`: For core theory. Use the `visual` prop if a simulator exists.
*   `QuizBlock`: Exactly 4 options. Index-based `correctAnswer`.
*   `MistakeBlock`: Focus on "JEE Traps".
*   `TrickBlock`: For mnemonics or shortcuts.

## 4. Chapter IDs
Refer to `src/lib/syllabus.ts` for the correct `chapter-id` and `subject` paths.

## 5. Content Philosophy (VERY IMPORTANT)

This is NOT a textbook.
This is NOT coaching material.

The goal is:
FAST JEE REVISION + VISUAL UNDERSTANDING.

Rules:
* Keep explanations SHORT.
* Maximum 3–5 bullet points per concept.
* Prioritize intuition over derivations.
* Focus on high-weightage JEE Main patterns.
* Avoid unnecessary theory.
* Include memory tricks whenever possible.
* Include common mistakes students make.
* Prefer visuals/interactions over paragraphs.

Every concept should answer:
“What actually matters for solving questions?”

## 6. Interactive Priorities

Whenever possible, attach a visual or interactive simulator.

Examples:
* relative velocity animation
* projectile simulator
* electric field visualizer
* matrix transformation animation
* graph transformation visualizer
* orbital hybridization visualizer

## 7. JEE Main Focus

Prioritize:
* PYQ patterns
* repeated concepts
* formula applications
* shortcut recognition
* traps and misconceptions

Do NOT deeply cover:
* advanced JEE Advanced-only derivations
* olympiad-style theory
* unnecessary proofs

## 8. Writing Style

Write like a smart senior teaching quick revision.

Avoid:
* textbook wording
* long introductions
* generic definitions

**Good**: "Transpose = flip across diagonal."
**Bad**: "The transpose operation in matrix algebra refers to..."
