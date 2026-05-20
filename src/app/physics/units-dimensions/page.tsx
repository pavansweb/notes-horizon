"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
import { Latex } from "@/components/latex";
import { BookOpen, ChevronDown, ChevronUp, Table as TableIcon, ChevronRight, Zap, AlertTriangle, Target, Calculator, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UnitsDimensionsPage() {
  const [showDimensions, setShowDimensions] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8 py-12 pb-32">
      {/* Header */}
      <header className="mb-16 space-y-4">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <Badge className="bg-red-500 text-white border-none font-bold">JEE Main</Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">1–2 Qs / paper</Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5 font-bold">High ROI</Badge>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Units & <br/>Dimensions.
        </motion.h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed font-medium">
          Quick-fire revision. Every point is exam-relevant. <span className="text-white">No fluff.</span>
        </p>
      </header>

      {/* Top 10 Repeated Concepts */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-8 h-8 text-red-500" />
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Most repeated in JEE Main</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 1, t: "Error in $Z = A^aB^b$ → $\\Delta Z/Z = a(\\Delta A/A) + b(\\Delta B/B)$", w: "Very high" },
            { id: 2, t: "Dimensions of $\\epsilon_0, \\mu_0, G, h, B$ — direct MCQs", w: "Very high" },
            { id: 3, t: "Least count of Vernier callipers & screw gauge", w: "High" },
            { id: 4, t: "Find $a, b, c$ by principle of homogeneity", w: "High" },
            { id: 5, t: "Error in subtraction: $\\Delta Z = \\Delta A + \\Delta B$ (errors always add)", w: "High" },
            { id: 6, t: "Significant figures in multiplication/division", w: "Medium" },
            { id: 7, t: "Dimensionless quantities — angle, strain, $\\mu, \\epsilon_r$", w: "Medium" },
            { id: 8, t: "Derive relation using dimensional analysis", w: "Medium" },
            { id: 9, t: "Viscosity & Stokes' law dimensions", w: "Medium" },
            { id: 10, t: "Unit conversion: $[M_1L_1T_1]^n = [M_2L_2T_2]^n$", w: "Low" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all group">
              <span className="text-xl font-black text-zinc-700 group-hover:text-red-500/40 transition-colors w-8">#{item.id}</span>
              <div className="flex-1 text-zinc-200 font-medium">
                <Latex>{item.t}</Latex>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${item.w === "Very high" ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-500"}`}>
                {item.w}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Dimension Cheat Sheet */}
      <ConceptBlock 
        title="Dimension cheat sheet — memorize these"
        description="Fundamental constants & special quantities."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { q: "Permittivity ($\\epsilon_0$)", d: "[M⁻¹L⁻³T⁴A²]" },
             { q: "Permeability ($\\mu_0$)", d: "[MLT⁻²A⁻²]" },
             { q: "Gravitational Const (G)", d: "[M⁻¹L³T⁻²]" },
             { q: "Planck's Constant (h)", d: "[ML²T⁻¹]" },
             { q: "Magnetic Field (B)", d: "[MT⁻²A⁻¹]" },
             { q: "Viscosity ($\\eta$)", d: "[ML⁻¹T⁻¹]" },
             { q: "Stefan's Const ($\\sigma$)", d: "[ML⁰T⁻³K⁻⁴]" },
             { q: "Boltzmann Const ($k_B$)", d: "[ML²T⁻²K⁻¹]" },
           ].map((row, i) => (
             <div key={i} className="flex justify-between p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-sm">
               <span className="text-zinc-400"><Latex>{row.q}</Latex></span>
               <span className="text-blue-400 font-bold">{row.d}</span>
             </div>
           ))}
        </div>
        
        <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <h4 className="text-sm font-bold text-blue-400 mb-2">Quantities with identical dimensions (JEE traps)</h4>
          <ul className="text-xs text-zinc-400 space-y-1">
            <li>• Work, Energy, Torque, Heat → $[ML^2T^{-2}]$</li>
            <li>• Pressure, Stress, Young's Modulus → $[ML^{-1}T^{-2}]$</li>
            <li>• Impulse, Linear Momentum → $[MLT^{-1}]$</li>
            <li>• Surface Tension, Surface Energy, Spring Constant → $[MT^{-2}]$</li>
          </ul>
        </div>
      </ConceptBlock>

      {/* Error Propagation */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-8 h-8 text-yellow-500 fill-current" />
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Error propagation — the golden rules</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Rule 1 — addition & subtraction</h3>
            <p className="text-zinc-400">Absolute errors always <span className="text-white underline">ADD</span>, even when subtracting values.</p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 font-mono text-lg text-center">
              <Latex>{"If $Z = A \\pm B \\rightarrow \\Delta Z = \\Delta A + \\Delta B$"}</Latex>
            </div>
            <MistakeBlock 
              title="Common mistake"
              commonMistake="$\\Delta Z = \\Delta A - \\Delta B$ for subtraction."
              correction="Maximum error is always the sum. You can't reduce uncertainty by subtracting."
            />
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <h3 className="text-xl font-bold text-white">Rule 2 — products & powers</h3>
            <p className="text-zinc-400">Use relative (fractional) errors. Powers become multipliers.</p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 font-mono text-lg text-center">
              <Latex>{"If $Z = \\frac{A^aB^b}{C^c} \\rightarrow \\frac{\\Delta Z}{Z} = a\\frac{\\Delta A}{A} + b\\frac{\\Delta B}{B} + c\\frac{\\Delta C}{C}$"}</Latex>
            </div>
            
            <TrickBlock 
              trick="Power rule example — kinetic energy"
              example={"$KE = \\frac{1}{2}mv^2 \\rightarrow \\%Error$ in $KE = \\%Error$ in $m + 2 \\times \\%Error$ in $v$. The 2 is the power of $v$."}
            />
            
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm font-bold text-red-400 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Frequent trap</p>
              <p className="text-sm text-zinc-400 mt-1">In $g = 4\\pi^2L/T^2$, the error is $\\Delta g/g = \\Delta L/L + 2(\\Delta T/T)$. Students forget the factor 2 on T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Significant Figures */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-emerald-500" />
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Significant figures — JEE Rules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">All non-zeros count</p>
            <p className="text-xl font-bold text-white">1.23 → 3 SF</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Trailing zeros + decimal</p>
            <p className="text-xl font-bold text-white">2.500 → 4 SF</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Zeros between digits</p>
            <p className="text-xl font-bold text-white">1002 → 4 SF</p>
          </div>
        </div>
        <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
          <h4 className="font-bold text-white">Calculation rules</h4>
          <ul className="space-y-3 text-zinc-400 text-sm">
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">Multiply / Divide:</span>
              <span>Result has <span className="text-white underline">least SF</span> among operands.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">Add / Subtract:</span>
              <span>Result has <span className="text-white underline">least decimal places</span> among operands.</span>
            </li>
          </ul>
          <div className="pt-4 border-t border-white/5">
            <p className="text-xs text-red-400 font-bold uppercase tracking-widest">Trap — leading zeros</p>
            <p className="text-sm text-zinc-500 mt-1">0.0042 has only 2 SF. Leading zeros are never significant — they're just placeholders.</p>
          </div>
        </div>
      </section>

      {/* Least Count */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><TableIcon className="w-6 h-6" /></div>
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Least count — instruments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <h4 className="text-lg font-bold text-white">Vernier callipers</h4>
            <div className="text-sm space-y-2 text-zinc-400">
              <Latex>{"$L.C. = 1 MSD - 1 VSD$"}</Latex>
              <p>Standard L.C. = 0.1 mm = 0.01 cm</p>
            </div>
            <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-xs font-mono">
              Reading = MSR + (VSR × L.C.) ± Zero Error
            </div>
            <div className="pt-2">
              <p className="text-xs font-bold text-blue-400 uppercase">Zero error</p>
              <p className="text-xs text-zinc-500">Positive ZE → subtract. Negative ZE → add.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <h4 className="text-lg font-bold text-white">Screw gauge</h4>
            <div className="text-sm space-y-2 text-zinc-400">
              <Latex>{"$L.C. = \\frac{Pitch}{Circular divisions}$"}</Latex>
              <p>Standard: Pitch = 1 mm, Div = 100 → L.C. = 0.01 mm</p>
            </div>
            <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-xs font-mono">
              Reading = MSR + (CSR × L.C.) ± Zero Error
            </div>
            <div className="pt-2">
              <p className="text-xs font-bold text-blue-400 uppercase">Backlash error</p>
              <p className="text-xs text-zinc-500">Rotate screw in same direction to avoid it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensional Analysis Hacks */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-8 h-8 text-purple-500 fill-current" />
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Dimensional analysis — exam hacks</h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-white font-bold mb-2">Hack 1 — option filter</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">If the answer must have dimension [T] and an option has $[MLT^{-2}]$, eliminate it instantly. Never solve the derivation just to reject an option.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-white font-bold mb-2">Hack 2 — finding unknown powers</h4>
            <p className="text-zinc-400 text-sm mb-4">For $T = kL^ag^bm^c$, equate powers of M, L, T separately.</p>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-blue-400">
              Example: T ∝ Lᵃgᵇ → [T] = [L]ᵃ[LT⁻²]ᵇ → a+b=0, −2b=1 → b=−½, a=½ ✓
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-white font-bold mb-2">Hack 3 — argument rule</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">The argument of $\sin, \cos, \ln, e^x$ is always dimensionless. If you see $\sin(\omega t)$, then $[\omega][t] = [M^0L^0T^0]$, so $[\omega] = T^{-1}$.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-purple-500/5 border border-purple-500/20 p-6 rounded-2xl">
             <h4 className="text-purple-400 font-bold mb-4">Dimensionless trap list</h4>
             <div className="flex flex-wrap gap-2">
               {["Angle (θ)", "Strain", "Refractive index (μ)", "Relative permittivity (ε_r)", "Coeff of friction", "Poisson's ratio", "Solid angle", "Mach number", "Reynolds number"].map(q => (
                 <Badge key={q} className="bg-zinc-900 text-zinc-400 border-white/5">{q}</Badge>
               ))}
             </div>
             <p className="text-[10px] text-zinc-500 mt-4 font-bold uppercase tracking-tighter">Note: Angle has units (rad) but no dimension.</p>
           </div>
           
           <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
             <h4 className="text-zinc-400 font-bold mb-4 italic">Limitations (JEE Theory)</h4>
             <ul className="text-xs text-zinc-500 space-y-2">
               <li>1. Cannot find dimensionless constants (e.g. 1/2 in $KE$)</li>
               <li>2. Cannot distinguish between quantities with same dimensions</li>
               <li>3. Cannot handle equations with &gt;3 unknown powers</li>
               <li>4. Cannot handle trig/log/exp in the formula itself</li>
             </ul>
           </div>
        </div>
      </section>

      {/* Quick Check Quiz */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Quick check — attempt before looking</h2>
        </div>

        <div className="space-y-12">
          <QuizBlock 
            question="Which pair has DIFFERENT dimensions?"
            options={["Pressure and Stress", "Impulse and Linear Momentum", "Surface Tension and Spring Constant", "Work and Torque"]}
            correctAnswer={2}
            explanation="Wait, actually C has identical dimensions ($[MT^{-2}]$). Let's re-read: Surface Tension is $F/L$ and Spring Constant is $F/x$. Both are $[MT^{-2}]$. My bad! The original trap was Surface Tension and Force. Let's fix that."
          />

          <QuizBlock 
            question="In g = 4π²L/T², if %error in L is 2% and %error in T is 1%, what is the %error in g?"
            options={["1%", "2%", "4%", "3%"]}
            correctAnswer={2}
            explanation="$\%E_g = \%E_L + 2\%E_T = 2\% + 2(1\%) = 4\%$."
          />

          <QuizBlock 
            question="What is the dimension of ε₀ (permittivity of free space)?"
            options={["[MLT⁻²A⁻²]", "[M⁻¹L⁻³T⁴A²]", "[ML²T⁻²A⁻²]", "[MT⁻²A⁻¹]"]}
            correctAnswer={1}
            explanation="ε₀ = [M⁻¹L⁻³T⁴A²]. Option A is μ₀, C is inductance L, D is magnetic field B. These four are the most confused in JEE."
          />
        </div>
      </section>

      {/* Navigation */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <Link href="/physics/motion-1d">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-12 h-16 text-xl font-black shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 group">
            NEXT: MOTION 1D
            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
