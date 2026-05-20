"use client";

import React, { useState } from "react";
import { ConceptBlock, QuizBlock, MistakeBlock, TrickBlock } from "@/components/learning-blocks";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, ChevronDown } from "lucide-react";
import { Latex } from "@/components/latex";
import Link from "next/link";

// Interactive components (placeholders - replace with actual interactive versions)
const VectorVisualization = () => (
  <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 h-64 flex items-center justify-center">
    <div className="text-center text-white">
      <p className="text-sm text-gray-300 mb-2">Interactive Vector Visualization</p>
      <p className="text-2xl font-bold">Drag to explore vector components</p>
    </div>
  </div>
);

const ProjectileAnimator = () => (
  <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-lg p-8 h-64 flex items-center justify-center">
    <div className="text-center text-white">
      <p className="text-sm text-gray-300 mb-2">Interactive Projectile Motion</p>
      <p className="text-2xl font-bold">Adjust velocity & angle with sliders</p>
    </div>
  </div>
);

const CircularMotionVisualizer = () => (
  <div className="bg-gradient-to-br from-red-900 to-orange-900 rounded-lg p-8 h-64 flex items-center justify-center">
    <div className="text-center text-white">
      <p className="text-sm text-gray-300 mb-2">Uniform Circular Motion</p>
      <p className="text-2xl font-bold">Rotating particle with velocity vectors</p>
    </div>
  </div>
);

const CollapsibleFormulas = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-blue-500 rounded-lg overflow-hidden bg-black/30 backdrop-blur">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-900/20 transition"
      >
        <span className="text-lg font-bold text-white">📋 Formula Cheat Sheet</span>
        <ChevronDown className={`w-5 h-5 text-blue-400 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="p-6 border-t border-blue-500/30 space-y-4 text-sm text-gray-300">
          <div>
            <p className="text-white font-semibold mb-2">VECTOR FORMULAS</p>
            <Latex>{`$|\\vec{A}| = \\sqrt{A_x^2 + A_y^2}$`}</Latex>
            <Latex>{`$A_x = A\\cos\\theta, \\quad A_y = A\\sin\\theta$`}</Latex>
            <Latex>{`$\\vec{R} = \\vec{A} + \\vec{B}, \\quad R = \\sqrt{A^2 + B^2 + 2AB\\cos\\alpha}$`}</Latex>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">PROJECTILE MOTION</p>
            <Latex>{`$T = \\frac{2v_0\\sin\\theta}{g}$`}</Latex>
            <Latex>{`$H = \\frac{v_0^2\\sin^2\\theta}{2g}$`}</Latex>
            <Latex>{`$R = \\frac{v_0^2\\sin(2\\theta)}{g}$`}</Latex>
            <Latex>{`$y = x\\tan\\theta - \\frac{gx^2}{2v_0^2\\cos^2\\theta}$`}</Latex>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">RELATIVE VELOCITY</p>
            <Latex>{`$\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B$`}</Latex>
            <Latex>{`$\\tan\\theta = \\frac{v_m}{v_r}$ (Rain Man)`}</Latex>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">CIRCULAR MOTION</p>
            <Latex>{`$v = r\\omega, \\quad a_c = \\frac{v^2}{r} = r\\omega^2$`}</Latex>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Motion2DPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 py-12">
      {/* HEADER */}
      <header className="mb-16 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-blue-400">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">JEE Main | Motion in 2D</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Motion in 2D.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          High-density revision for vectors, projectiles, relative motion & circular motion. Exam-focused intuition + traps.
        </motion.p>
      </header>

      {/* 1. VECTOR BASICS */}
      <ConceptBlock 
        title="1. Vector Basics (Foundation)"
        description="Scalars vs Vectors. Representation & Magnitude."
        visual={<VectorVisualization />}
      >
        <div className="space-y-4">
          <div>
            <p className="font-bold text-blue-300 mb-2">Key Definitions:</p>
            <Latex>{`$$\\textbf{Scalar:} magnitude only (speed, mass, energy). \\quad \\textbf{Vector:} magnitude + direction (velocity, force).$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Position & Unit Vectors:</p>
            <Latex>{`$$\\vec{r} = x\\hat{i} + y\\hat{j}, \\quad |\\vec{r}| = \\sqrt{x^2 + y^2}$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Direction Cosines (Quick):</p>
            <Latex>{`$$\\cos\\alpha = \\frac{x}{|\\vec{r}|}, \\quad \\cos\\beta = \\frac{y}{|\\vec{r}|}$$`}</Latex>
          </div>
        </div>
      </ConceptBlock>

      {/* 2. VECTOR RESOLUTION */}
      <ConceptBlock 
        title="2. Vector Resolution (Critical for Everything)"
        description="Breaking vectors into components. The MOST important skill in 2D motion."
      >
        <div className="space-y-4">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <p className="font-bold text-yellow-300 mb-2">⚡ Core Formula:</p>
            <Latex>{`$$A_x = A\\cos\\theta, \\quad A_y = A\\sin\\theta$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Quadrant Sign Convention:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>Q1: (+, +)</div>
              <div>Q2: (−, +)</div>
              <div>Q3: (−, −)</div>
              <div>Q4: (+, −)</div>
            </div>
          </div>
          <Latex>{`$$\\text{Inverse:} \\quad \\theta = \\tan^{-1}\\left(\\frac{A_y}{A_x}\\right) \\quad \\text{(watch quadrant!)} \\quad |\\vec{A}| = \\sqrt{A_x^2 + A_y^2}$$`}</Latex>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Sin-Cos Trap!"
        example="θ measured from x-axis: sin gives y-component, cos gives x-component. Measure from y-axis? FLIP IT."
      />

      <MistakeBlock 
        title="Calculator Angle Trap"
        commonMistake="Using tan⁻¹ without checking which quadrant you're in"
        correction="tan⁻¹ only gives angles in Q1 & Q4. If your vector is in Q2 or Q3, ADD 180° to your answer."
      />

      {/* 3. VECTOR ADDITION */}
      <ConceptBlock 
        title="3. Vector Addition (Triangle & Parallelogram Laws)"
        description="Adding vectors geometrically & algebraically."
      >
        <div className="space-y-4">
          <div>
            <p className="font-bold text-blue-300 mb-2">Algebraic Method (BEST):</p>
            <Latex>{`$$\\vec{R} = \\vec{A} + \\vec{B} = (A_x + B_x)\\hat{i} + (A_y + B_y)\\hat{j}$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Resultant Magnitude & Direction:</p>
            <Latex>{`$$R = \\sqrt{A^2 + B^2 + 2AB\\cos\\alpha}$$`}</Latex>
            <Latex>{`$$\\tan\\phi = \\frac{B\\sin\\alpha}{A + B\\cos\\alpha}$$`}</Latex>
            <p className="text-xs text-gray-400 mt-2">where α = angle between vectors A and B</p>
          </div>
          <TrickBlock 
            trick="Special Angles"
            example="α=0°: R=A+B (same dir). α=180°: R=|A−B| (opposite). α=90°: R=√(A²+B²) (perpendicular)."
          />
        </div>
      </ConceptBlock>

      {/* 4. RELATIVE VELOCITY IN 2D */}
      <ConceptBlock 
        title="4. Relative Velocity in 2D (Frame of Reference Magic)"
        description="Rain-Man & Boat-River problems. VERY HIGH PRIORITY."
      >
        <div className="space-y-4">
          <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
            <p className="font-bold text-yellow-300 mb-2">Core Equation:</p>
            <Latex>{`$$\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B \\quad \\text{(A relative to B)}$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Rain-Man Example:</p>
            <Latex>{`$$\\vec{v}_{rain,man} = \\vec{v}_{rain} - \\vec{v}_{man}$$`}</Latex>
            <Latex>{`$$\\text{Hold umbrella at angle:} \\quad \\tan\\theta = \\frac{v_m}{v_r} \\quad \\text{(from vertical)}$$`}</Latex>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Boat-River Problem:</p>
            <Latex>{`$$\\vec{v}_{boat,ground} = \\vec{v}_{boat,water} + \\vec{v}_{water,ground}$$`}</Latex>
            <p className="text-sm text-gray-400">To cross perpendicular: angle boat upstream = sin⁻¹(v_water/v_boat)</p>
          </div>
        </div>
      </ConceptBlock>

      <MistakeBlock 
        title="Relative Velocity Direction Trap"
        commonMistake="Using vAB = vA + vB instead of vA − vB"
        correction="Always: vAB = vA − vB. The minus sign flips the observer's velocity. Think: observer velocity goes backward in the frame."
      />

      {/* 5. PROJECTILE MOTION (BIGGEST SECTION) */}
      <ConceptBlock 
        title="5. Projectile Motion (The KING Topic)"
        description="Horizontal & vertical independence. Trajectory equations. Maximum height, range, time of flight."
        visual={<ProjectileAnimator />}
      >
        <div className="space-y-6">
          <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
            <p className="font-bold text-yellow-300 mb-3">Fundamental Principle:</p>
            <p className="text-sm mb-2">• Horizontal: NO acceleration → vₓ = v₀cosθ (CONSTANT)</p>
            <p className="text-sm mb-2">• Vertical: acceleration = −g → vᵧ = v₀sinθ − gt</p>
            <p className="text-xs text-gray-300 mt-3">Treat X and Y motions independently!</p>
          </div>

          <div>
            <p className="font-bold text-blue-300 mb-2">🎯 Key Formulas:</p>
            <Latex>{`$$\\text{Time of Flight:} \\quad T = \\frac{2v_0\\sin\\theta}{g}$$`}</Latex>
            <Latex>{`$$\\text{Max Height:} \\quad H = \\frac{v_0^2\\sin^2\\theta}{2g}$$`}</Latex>
            <Latex>{`$$\\text{Horizontal Range:} \\quad R = \\frac{v_0^2\\sin(2\\theta)}{g}$$`}</Latex>
            <Latex>{`$$\\text{Trajectory Equation:} \\quad y = x\\tan\\theta - \\frac{gx^2}{2v_0^2\\cos^2\\theta}$$`}</Latex>
          </div>

          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
            <p className="font-bold text-cyan-300 mb-2">At Highest Point (CRITICAL):</p>
            <Latex>{`$$v_y = 0 \\quad \\text{(only)}, \\quad v_x = v_0\\cos\\theta \\quad \\text{(unchanged)}, \\quad a = g \\quad \\text{(downward)}$$`}</Latex>
            <p className="text-xs text-gray-300 mt-2">Time to max height: t = v₀sinθ/g = T/2</p>
          </div>

          <div>
            <p className="font-bold text-blue-300 mb-2">Complementary Angles:</p>
            <Latex>{`$$\\text{Angles } \\theta \\text{ and } (90° - \\theta) \\text{ give SAME range:} \\quad \\sin(2\\theta) = \\sin(180° - 2\\theta)$$`}</Latex>
            <p className="text-sm text-gray-400">Max range at 45°, times of flight are different though!</p>
          </div>

          <div>
            <p className="font-bold text-blue-300 mb-2">Horizontal Projection from Height h:</p>
            <Latex>{`$$y = h - \\frac{1}{2}gt^2, \\quad x = v_0 t, \\quad \\text{Fall time:} t = \\sqrt{\\frac{2h}{g}}$$`}</Latex>
          </div>

          <div>
            <p className="font-bold text-blue-300 mb-2">Range on Inclined Plane (Basic):</p>
            <Latex>{`$$R = \\frac{2v_0^2\\sin\\theta\\cos(\\theta+\\alpha)}{g\\cos^2\\alpha} \\quad (\\alpha = \\text{plane angle})$$`}</Latex>
            <p className="text-xs text-gray-300">Derivation: resolve plane into x-y, apply projectile equations.</p>
          </div>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Highest Point Trick"
        example="At the peak: vᵧ = 0 ONLY. vₓ is still there! Many students forget vₓ ≠ 0. Also, a = g always (never zero)."
      />

      <MistakeBlock 
        title="Projectile Assumption Trap"
        commonMistake="Assuming different launch heights give same range at same angle"
        correction="Range formula R = v₀²sin(2θ)/g assumes launch & landing at SAME height. If different, recalculate using trajectory equation or parametric motion."
      />

      {/* 6. PROJECTILE GRAPHS */}
      <ConceptBlock 
        title="6. Projectile Motion Graphs (JEE Favorite)"
        description="x-t, y-t, vₓ-t, vᵧ-t, a-t graphs & their meanings."
      >
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="font-bold text-cyan-300 mb-2">x vs t:</p>
              <p className="text-sm text-gray-300">Straight line (constant vₓ). Slope = vₓ (constant). Area = range (at T).</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="font-bold text-cyan-300 mb-2">y vs t:</p>
              <p className="text-sm text-gray-300">Parabola (downward curve). Slope = vᵧ (changes). Peak at t = T/2.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="font-bold text-cyan-300 mb-2">vₓ vs t:</p>
              <p className="text-sm text-gray-300">Horizontal line at vₓ = v₀cosθ (constant). Area under = range.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="font-bold text-cyan-300 mb-2">vᵧ vs t:</p>
              <p className="text-sm text-gray-300">Straight line (slope = −g). Crosses zero at t = T/2. Area = vertical displacement.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="font-bold text-cyan-300 mb-2">a vs t:</p>
              <p className="text-sm text-gray-300">Flat line at −g (constant downward). Always true, even at peak!</p>
            </div>
          </div>
        </div>
      </ConceptBlock>

      {/* 7. UNIFORM CIRCULAR MOTION */}
      <ConceptBlock 
        title="7. Uniform Circular Motion (JEE Main Level)"
        description="Angular motion. Velocity always tangent, acceleration always toward center."
        visual={<CircularMotionVisualizer />}
      >
        <div className="space-y-4">
          <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
            <p className="font-bold text-yellow-300 mb-2">Core Insight:</p>
            <p className="text-sm text-gray-300">Speed is CONSTANT but velocity direction CHANGES → acceleration exists (centripetal).</p>
          </div>
          <div>
            <p className="font-bold text-blue-300 mb-2">Key Formulas:</p>
            <Latex>{"$\\text{Angular velocity:} \\quad \\omega = \\frac{\\theta}{t}, \\quad \\text{Period:} T = \\frac{2\\pi}{\\omega}$"}</Latex>
            <Latex>{"$\\text{Linear velocity:} \\quad v = r\\omega$"}</Latex>
            <Latex>{"$\\text{Centripetal acceleration:} \\quad a_c = \\frac{v^2}{r} = r\\omega^2$"}</Latex>
          </div>
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
            <p className="font-bold text-cyan-300 mb-2">Direction Rules:</p>
            <p className="text-sm text-gray-300 mb-2">• Velocity: Always TANGENT to circle (perpendicular to radius)</p>
            <p className="text-sm text-gray-300">• Acceleration: Always toward CENTER (perpendicular to velocity)</p>
            <p className="text-sm text-gray-300 mt-2">ω and a are perpendicular to the plane of motion (use right-hand rule).</p>
          </div>
        </div>
      </ConceptBlock>

      <TrickBlock 
        trick="Acceleration ≠ Speed Change"
        example="In uniform circular motion, speed is constant BUT velocity changes (direction). Acceleration exists even though speed doesn't change!"
      />

      {/* 8. COMMON JEE TRAPS */}
      <ConceptBlock 
        title="8. 🚨 Common JEE Traps (Must Know)"
        description="Mistakes that appear in 70% of wrong answers."
      >
        <div className="space-y-3 text-sm">
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Sin/Cos Confusion:</p>
            <p className="text-gray-300">Using sin for x-component or cos for y-component = instant wrong.</p>
          </div>
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Forgetting Signs:</p>
            <p className="text-gray-300">Vectors in Q2, Q3, Q4 need negative components. Not checking quadrant = lost marks.</p>
          </div>
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Highest Point vᵧ Assumption:</p>
            <p className="text-gray-300">At highest point, vᵧ = 0 but vₓ ≠ 0 and a ≠ 0! Not just "velocity is zero."</p>
          </div>
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Range Formula Wrong Heights:</p>
            <p className="text-gray-300">R = v₀²sin(2θ)/g only works if launch & landing at same height!</p>
          </div>
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Relative Velocity Sign Flip:</p>
            <p className="text-gray-300">vAB = vA − vB not vA + vB. Missing the minus = flipped direction.</p>
          </div>
          <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
            <p className="font-bold text-red-300">❌ Circular Motion Acceleration Zero Myth:</p>
            <p className="text-gray-300">Uniform circular motion = constant speed but a ≠ 0 (always pointing center).</p>
          </div>
        </div>
      </ConceptBlock>

      {/* 9. FAST MCQ TRICKS */}
      <ConceptBlock 
        title="9. ⚡ Fast MCQ Elimination Tricks"
        description="Save 30 seconds per question with these quick checks."
      >
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span><strong>At highest point:</strong> vy = 0 (only), vx ≠ 0, a = g (downward). Eliminate answers with vx = 0.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span><strong>Projectile horizontal velocity:</strong> Always constant throughout flight. If answer shows vx changing, eliminate.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span><strong>Complementary angles same range:</strong> 30° & 60° give same R at same v₀. Twins of 45°±α have same range.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span><strong>Circular motion acceleration:</strong> ALWAYS toward center. If answer shows outward or tangent, eliminate.</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span><strong>Vector dimensions:</strong> Can't add velocity + acceleration. Must be same type. Check units!</span>
          </div>
        </div>
      </ConceptBlock>

      {/* 10. FORMULA CHEAT SHEET */}
      <div className="my-12">
        <CollapsibleFormulas />
      </div>

      {/* 11. QUIZ SECTION */}
      <div className="space-y-8">
        <QuizBlock 
          question="A projectile is launched at 45° with v₀ = 20 m/s. At the highest point, what is true?"
          options={[
            "vx = 0, vy = 0",
            "vx = 10√2 m/s, vy = 0, a = 0",
            "vx = 10√2 m/s, vy = 0, a = 10 m/s² downward",
            "vx changes, vy = 0, a = g"
          ]}
          correctAnswer={2}
          explanation="At peak: vy = 0 (vertical velocity stops), vx = v₀cos45° = 20/√2 ≈ 10√2 m/s (horizontal unchanged), acceleration = g = 10 m/s² downward (always). Speed ≠ 0 at top!"
        />

        <QuizBlock 
          question="A boat wants to cross a river perpendicular to the flow. If vboat = 5 m/s and vriver = 3 m/s, at what angle upstream should the boat be pointed?"
          options={["sin⁻¹(3/5)", "cos⁻¹(3/5)", "tan⁻¹(3/5)", "90° − sin⁻¹(3/5)"]}
          correctAnswer={0}
          explanation="For perpendicular crossing: vboat upstream component = vriver. So sin(θ) = vriver/vboat = 3/5, thus θ = sin⁻¹(3/5) ≈ 37°."
        />

        <QuizBlock 
          question="Which graph shows vx for a projectile launched at angle θ (neglecting air resistance)?"
          options={[
            "Straight line increasing",
            "Horizontal line (constant)",
            "Parabola",
            "Straight line decreasing"
          ]}
          correctAnswer={1}
          explanation="Horizontal acceleration = 0, so vx = v₀cosθ stays constant throughout the flight. Graph is a horizontal line at height v₀cosθ."
        />
      </div>

      {/* FOOTER CTA */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <p className="text-center text-gray-400 max-w-2xl">
          Master these concepts with interactive simulations above. Practice projectile & relative velocity problems until they feel automatic.
        </p>
        <Link href="/physics/next-topic">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 text-lg font-bold shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95">
            Next Topic
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

