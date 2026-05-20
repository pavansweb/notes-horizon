"use client";

import React from "react";
import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
import { RainManSimulator } from "@/components/simulators/physics/rain-man";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Atom, BookOpen, Zap } from "lucide-react";
import { Latex } from "@/components/latex";
import Link from "next/link";

export default function KinematicsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 py-12">
      <header className="mb-16 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-blue-400">
          < BookOpen className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Physics / Chapter 03</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Motion in 2D.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-xl text-zinc-500 max-w-2xl leading-relaxed"
        >
          The geometry of motion. Learn to visualize displacement, velocity, and acceleration vectors in 1D and 2D space.
        </motion.p>
      </header>

      <ConceptBlock 
        title="Relative Motion: Rain Man Problem"
        description="Understanding how moving observers perceive moving objects. Adjust the sliders to see how the apparent angle of the rain changes based on your walking speed."
        visual={<RainManSimulator />}
      >
        <div className="space-y-4">
          <Latex>
            {"When you run in the rain, the rain appears to hit you at an angle. This is because you are observing the rain's velocity relative to yourself: $\\vec{v}_{rm} = \\vec{v}_r - \\vec{v}_m$."}
          </Latex>
          <Latex>
            {"To avoid getting wet, you must hold your umbrella in the direction of the relative velocity vector $\\vec{v}_{rm}$. The angle $\\theta$ from the vertical is given by $\\tan(\\theta) = v_m / v_r$."}
          </Latex>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Subtract the Observer!"
        example="Relative velocity = (Velocity of Object) - (Velocity of Observer). Always flip the observer's vector and add it."
      />

      <MistakeBlock 
        title="Umbrella Angle Trap"
        commonMistake="Holding the umbrella at an angle $\\tan(\\theta) = v_r / v_m$"
        correction="The angle is measured with the vertical. It should be $\\tan(\\theta) = v_m / v_r$. Think about it: if you stop ($v_m=0$), the angle is $0$ (straight up)."
      />

      <QuizBlock 
        question="If rain is falling vertically at 10 km/h and you run horizontally at 10 km/h, at what angle should you hold your umbrella to the vertical?"
        options={["0°", "30°", "45°", "45° in the direction of motion"]}
        correctAnswer={3}
        explanation="$\\tan(\\theta) = 10/10 = 1$. Therefore, $\\theta = 45^\\circ$. You must tilt the umbrella forward into the direction you are running."
      />

      <div className="mt-20 flex flex-col items-center gap-4">
        <Link href="/physics/laws-of-motion">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg font-bold shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95">
            Next: Laws of Motion
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
