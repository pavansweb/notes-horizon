'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, AlertCircle, Zap, BookOpen } from 'lucide-react'

// Inline Collapsible component
function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-colors text-left"
      >
        <span className="font-bold text-lg text-white">{title}</span>
        <ChevronDown
          size={20}
          className={`transform transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-slate-900/50 border-t border-slate-700 space-y-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

// Inline ConceptBlock component
function ConceptBlock({
  concept,
  weight,
  details,
}: {
  concept: string
  weight: 'Very High' | 'High' | 'Medium'
  details: string[]
}) {
  const weightColor =
    weight === 'Very High'
      ? 'bg-red-500/20 border-red-500 text-red-300'
      : weight === 'High'
        ? 'bg-orange-500/20 border-orange-500 text-orange-300'
        : 'bg-blue-500/20 border-blue-500 text-blue-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-cyan-300">{concept}</h3>
        <span
          className={`text-xs px-2 py-1 rounded border font-semibold whitespace-nowrap ${weightColor}`}
        >
          {weight}
        </span>
      </div>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="text-sm text-slate-300 flex gap-2">
            <span className="text-cyan-400 mt-0.5 flex-shrink-0">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// Inline QuizBlock component
function QuizBlock({
  question,
  options,
  correctIndex,
  explanation,
}: {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-4"
    >
      <p className="font-semibold text-slate-100">{question}</p>
      <div className="space-y-2">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full p-3 text-left rounded border transition-all text-sm ${
              selected === i
                ? i === correctIndex
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : 'bg-red-500/20 border-red-500 text-red-300'
                : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-blue-200"
        >
          <p className="font-semibold mb-2">Explanation:</p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

// Inline MistakeBlock component
function MistakeBlock({
  title,
  mistake,
  correction,
}: {
  title: string
  mistake: string
  correction: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3"
    >
      <h4 className="font-bold text-red-300 flex items-center gap-2">
        <AlertCircle size={18} />
        {title}
      </h4>
      <div className="space-y-2">
        <p className="text-sm text-slate-400">
          <span className="text-red-400 font-semibold">❌ Wrong:</span> {mistake}
        </p>
        <p className="text-sm text-slate-300">
          <span className="text-green-400 font-semibold">✓ Correct:</span> {correction}
        </p>
      </div>
    </motion.div>
  )
}

// Inline TrickBlock component
function TrickBlock({ trick, tip }: { trick: string; tip: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-2"
    >
      <p className="font-semibold text-amber-300 flex items-center gap-2">
        <Zap size={18} />
        {trick}
      </p>
      <p className="text-sm text-slate-300">{tip}</p>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 border-b border-slate-800/50 pb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Motion in One Dimension
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Kinematics essentials for JEE. Master velocity-time graphs, sign conventions, equations of motion, and more.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Top 10 Concepts */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen size={28} className="text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">
                Top 10 Most Repeated JEE Concepts
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ConceptBlock
                concept="Velocity-Time Graph Area"
                weight="Very High"
                details={['Area under v-t = displacement (NOT distance)', 'Sign matters: positive/negative regions', 'Total area = net displacement']}
              />
              <ConceptBlock
                concept="Position-Time Graph Slope"
                weight="Very High"
                details={['Slope = velocity (v = dx/dt)', 'Steep = fast, flat = slow', 'Curved line = acceleration present']}
              />
              <ConceptBlock
                concept="Free Fall Sign Convention"
                weight="Very High"
                details={['Choose upward as positive', 'a = -g (always downward)', 'At highest point: v=0 but a≠0']}
              />
              <ConceptBlock
                concept="Relative Velocity in 1D"
                weight="High"
                details={['v_AB = v_A - v_B', 'Use relative reference frames', 'Critical for collision problems']}
              />
              <ConceptBlock
                concept="Equations of Motion"
                weight="Very High"
                details={['Valid ONLY for constant a', 'Multi-stage: break into segments', 'Each stage: independent u,v,a,t']}
              />
              <ConceptBlock
                concept="Distance vs Displacement"
                weight="High"
                details={['Distance ≥ displacement always', 'Distance = scalar (positive)', 'Displacement = vector (signed)']}
              />
              <ConceptBlock
                concept="Velocity Zero ≠ No Acceleration"
                weight="Very High"
                details={['At turning point: v=0, a≠0', 'Body momentarily stops but still accelerates', '#1 student misconception']}
              />
              <ConceptBlock
                concept="Retardation/Deceleration"
                weight="High"
                details={['Negative a ≠ slowing down', 'v and a can have opposite signs', 'Depends on reference direction']}
              />
              <ConceptBlock
                concept="nth Second Formula"
                weight="High"
                details={['s_n = u + (a/2)(2n-1)', 'From time (n-1) to n', 'For discrete time intervals']}
              />
              <ConceptBlock
                concept="Piecewise Motion"
                weight="High"
                details={['Break into distinct segments', 'Each: independent kinematics', 'Connect via continuity']}
              />
            </div>
          </motion.section>

          {/* Core Formulas */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">Core Formulas</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'First Equation', f: 'v = u + at', badge: 'Fundamental' },
                { label: 'Second Equation', f: 's = ut + \\frac{1}{2}at^2', badge: 'Fundamental' },
                { label: 'Third Equation', f: 'v^2 = u^2 + 2as', badge: 'Most Used' },
                { label: 'Average Velocity', f: 's = \\frac{u+v}{2} \\cdot t', badge: 'Graph Based' },
                { label: 'Velocity', f: 'v = \\frac{dx}{dt}', badge: 'Calculus' },
                { label: 'Acceleration', f: 'a = \\frac{dv}{dt}', badge: 'Calculus' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="p-5 bg-slate-800/50 border border-slate-700 rounded-lg space-y-2"
                >
                  <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">{item.badge}</span>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <code className="text-cyan-300 font-mono text-sm block">$${item.f}$$</code>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Graph Interpretation */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">Graph Interpretation</h2>
            <div className="space-y-3">
              <Collapsible title="Position-Time (x-t) Graph" defaultOpen>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                    <p className="font-semibold text-blue-300 text-sm">Slope = Velocity</p>
                    <p className="text-sm text-slate-300">Slope = v = dx/dt. Steeper = faster.</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                    <p className="font-semibold text-blue-300 text-sm">Graph Shapes</p>
                    <p className="text-sm text-slate-300">Straight = constant v. Curve up = positive a. Curve down = negative a.</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded">
                    <p className="font-semibold text-amber-300 text-sm">⚠️ Trap</p>
                    <p className="text-sm text-slate-300">Negative slope ≠ slowing down. It means moving in negative direction.</p>
                  </div>
                </div>
              </Collapsible>

              <Collapsible title="Velocity-Time (v-t) Graph">
                <div className="space-y-2">
                  <div className="p-3 bg-cyan-500/10 border-l-4 border-cyan-500 rounded">
                    <p className="font-semibold text-cyan-300 text-sm">Slope = Acceleration</p>
                    <p className="text-sm text-slate-300">Slope = a = dv/dt. Horizontal = constant a.</p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border-l-4 border-cyan-500 rounded">
                    <p className="font-semibold text-cyan-300 text-sm">Area = Displacement</p>
                    <p className="text-sm text-slate-300">Area above x-axis = +ve displacement. Below = -ve. Net area = total displacement.</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded">
                    <p className="font-semibold text-amber-300 text-sm">⚠️ Critical Trap</p>
                    <p className="text-sm text-slate-300">At v=0, the line doesn&apos;t stop. Acceleration continues.</p>
                  </div>
                </div>
              </Collapsible>

              <Collapsible title="Acceleration-Time (a-t) Graph">
                <div className="space-y-2">
                  <div className="p-3 bg-green-500/10 border-l-4 border-green-500 rounded">
                    <p className="font-semibold text-green-300 text-sm">Area = Change in Velocity</p>
                    <p className="text-sm text-slate-300">Area under a-t = Δv = v_final - v_initial</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border-l-4 border-green-500 rounded">
                    <p className="font-semibold text-green-300 text-sm">Constant Acceleration</p>
                    <p className="text-sm text-slate-300">Horizontal line. Area = a × t = Δv</p>
                  </div>
                </div>
              </Collapsible>
            </div>
          </motion.section>

          {/* Free Fall */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400">Free Fall & Sign Convention</h2>
            <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3">
              <p className="font-semibold text-slate-200">Standard Convention: Upward Positive</p>
              <div className="space-y-2">
                <div className="p-3 bg-slate-700/50 rounded border-l-4 border-blue-500">
                  <p className="text-sm"><span className="font-semibold text-blue-300">u {'>'} 0:</span> Initial velocity upward</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded border-l-4 border-blue-500">
                  <p className="text-sm"><span className="font-semibold text-blue-300">v {'<'} 0 (upward motion):</span> Velocity becomes more negative</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded border-l-4 border-red-500">
                  <p className="text-sm"><span className="font-semibold text-red-300">a = -g (always):</span> Downward, never stops</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded border-l-4 border-amber-500">
                  <p className="text-sm"><span className="font-semibold text-amber-300">At highest point:</span> v = 0 but a = -g ≠ 0</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <MistakeBlock
                title="Acceleration Zero at Top"
                mistake="At highest point, both v and a become zero"
                correction="NO! v = 0 but a = -g throughout. Acceleration is constant, never zero."
              />
              <TrickBlock
                trick="Sign Pattern Rule"
                tip="Upward motion: v and a opposite signs. Downward: same signs. Use this to check answers!"
              />
            </div>
          </motion.section>

          {/* Formula Selection */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">Which Formula to Use?</h2>
            <Collapsible title="Decision Tree">
              <div className="space-y-3">
                <div className="p-3 bg-slate-700/50 rounded">
                  <p className="font-semibold text-cyan-300 mb-2 text-sm">Have TIME (t)?</p>
                  <p className="text-sm text-slate-300">Yes → v = u + at or s = ut + ½at² | No → v² = u² + 2as</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded">
                  <p className="font-semibold text-cyan-300 mb-2 text-sm">Distance in nth SECOND?</p>
                  <p className="text-sm text-slate-300">Use: s_n = u + (a/2)(2n-1)</p>
                </div>
                <div className="p-3 bg-slate-700/50 rounded">
                  <p className="font-semibold text-cyan-300 mb-2 text-sm">Multi-stage motion?</p>
                  <p className="text-sm text-slate-300">Break into segments. Each has constant a.</p>
                </div>
              </div>
            </Collapsible>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400">Common Traps</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <MistakeBlock
                title="Steeper Slope = More Acceleration"
                mistake="In x-t graph, steeper means more acceleration"
                correction="In x-t graph, slope = VELOCITY, not acceleration. Use v-t graph for acceleration comparison."
              />
              <MistakeBlock
                title="Negative Acceleration = Slowing Down"
                mistake="Negative a always means object is slowing"
                correction="Depends on velocity direction. If v and a same sign, speeding up. Opposite sign, slowing down."
              />
              <MistakeBlock
                title="Area in v-t = Distance"
                mistake="Reading area directly as distance"
                correction="Above axis = +displacement, below = -displacement. Total area = displacement, not distance."
              />
              <TrickBlock
                trick="Dimension Checking"
                tip="Immediately eliminate options with wrong dimensions. v=[LT⁻¹], a=[LT⁻²], s=[L]"
              />
            </div>
          </motion.section>

          {/* Quick Reference */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">Complete Formula Table</h2>
            <Collapsible title="All Kinematics Formulas">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-600">
                    <tr>
                      <th className="text-left p-2 text-cyan-300">Formula</th>
                      <th className="text-left p-2 text-cyan-300">When to Use</th>
                      <th className="text-left p-2 text-cyan-300">Gives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: 'v = u + at', when: 'Know u, a, t', gives: 'Final velocity' },
                      { f: 's = ut + ½at²', when: 'Know u, a, t', gives: 'Displacement' },
                      { f: 'v² = u² + 2as', when: 'Know u, a, s (no t)', gives: 'Final velocity' },
                      { f: 's = [(u+v)/2]t', when: 'Know u, v, t', gives: 'Displacement' },
                      { f: 's_n = u + (a/2)(2n-1)', when: 'nth second distance', gives: 'Distance in specific interval' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-700">
                        <td className="p-2 text-yellow-300 font-mono text-xs">{row.f}</td>
                        <td className="p-2 text-slate-400 text-xs">{row.when}</td>
                        <td className="p-2 text-slate-300 text-xs">{row.gives}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Collapsible>
          </motion.section>

          {/* Quiz */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">Test Your Understanding</h2>
            <div className="space-y-4">
              <QuizBlock
                question="A ball thrown upward with u=20m/s. At highest point, which is true?"
                options={[
                  'Both v and a are zero',
                  'v = 0, a = -10 m/s²',
                  'Both v and a are non-zero',
                  'v is maximum, a is zero',
                ]}
                correctIndex={1}
                explanation="At highest point, velocity momentarily becomes zero, but gravity (-g) continues to act. Acceleration = -10 m/s². This is the key concept!"
              />
              <QuizBlock
                question="Which graph directly gives displacement as area under the curve?"
                options={['x-t graph', 'v-t graph', 'a-t graph', 's-t graph']}
                correctIndex={1}
                explanation="In v-t graph, area = ∫v dt = displacement. In a-t graph, area = Δv (change in velocity). In x-t graph, area has no meaning."
              />
              <QuizBlock
                question="Object travels 100m in 5th second (u=0). What is acceleration?"
                options={['18 m/s²', '20 m/s²', '22 m/s²', '25 m/s²']}
                correctIndex={1}
                explanation="Using s_n = u + (a/2)(2n-1): 100 = 0 + (a/2)(9) → a = 200/9 ≈ 20 m/s². The nth-second formula is essential!"
              />
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-8"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
              Next: Motion in 2D →
            </button>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}

