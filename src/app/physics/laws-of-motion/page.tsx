'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Zap, AlertCircle, BookOpen, Grid3x3, Settings, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Latex } from "@/components/latex"

export default function LawsOfMotionRevision() {
  const [expandedTrap, setExpandedTrap] = useState<number | null>(null)
  const [expandedFormula, setExpandedFormula] = useState<number | null>(null)
  const [expandedQuiz, setExpandedQuiz] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* HEADER SECTION */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative px-6 py-20 text-center border-b border-cyan-500/20 bg-gradient-to-b from-slate-900/50 to-slate-950/50"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-7xl font-black mb-4 tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
          >
            Laws of Motion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl text-cyan-300 font-light tracking-wide"
          >
            Forces don&apos;t create motion. They create acceleration.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-violet-500 mt-8 mx-auto max-w-xs"
          />
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* TOP 10 CONCEPTS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Top 10 Most Repeated Concepts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { topic: "Newton's Laws", difficulty: "Very High" },
              { topic: "Free Body Diagrams", difficulty: "Very High" },
              { topic: "Friction Direction", difficulty: "High" },
              { topic: "Static vs Kinetic Friction", difficulty: "Very High" },
              { topic: "Pseudo Force", difficulty: "High" },
              { topic: "Pulley Systems", difficulty: "Very High" },
              { topic: "Inclined Plane Problems", difficulty: "Very High" },
              { topic: "Tension Concepts", difficulty: "High" },
              { topic: "Normal Reaction Variations", difficulty: "High" },
              { topic: "Elevator Problems", difficulty: "Medium" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 p-4 rounded-lg hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-cyan-200">{item.topic}</span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.difficulty === 'Very High'
                        ? 'bg-red-500/20 text-red-300'
                        : item.difficulty === 'High'
                        ? 'bg-orange-500/20 text-orange-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}
                  >
                    {item.difficulty}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* NEWTON'S LAWS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Newton&apos;s Laws of Motion</h2>
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">First Law: Inertia</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                An object continues in its state of rest or motion unless acted upon by a net external force. <strong>Key insight:</strong> It&apos;s not about motion itself—it&apos;s about <em>resisting change</em> in motion.
              </p>
              <div className="bg-slate-900/50 p-4 rounded border-l-4 border-cyan-400 space-y-2">
                <p className="text-sm text-cyan-300 font-semibold">⚡ Physical Intuition:</p>
                <p className="text-slate-400 text-sm">When you brake suddenly, your body wants to keep moving forward (inertia). This isn&apos;t a force—it&apos;s the absence of one!</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Second Law: Acceleration</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                The acceleration of an object is directly proportional to the net force and inversely proportional to mass.
              </p>
              <Latex>{"$$\\vec{F}_{net} = m\\vec{a}$$"}</Latex>
              <div className="mt-4 bg-slate-900/50 p-4 rounded border-l-4 border-cyan-400 space-y-2">
                <p className="text-sm text-cyan-300 font-semibold">⚡ Critical Point:</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• <strong>Direction matters:</strong> Acceleration follows net force direction</li>
                  <li>• <strong>Net force is key:</strong> Multiple forces can sum to zero (balanced forces = zero acceleration)</li>
                  <li>• <strong>Mass resists change:</strong> Larger mass needs more force for same acceleration</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Third Law: Action-Reaction</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                For every action force, there&apos;s an equal and opposite reaction force.
              </p>
              <Latex>{"$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$"}</Latex>
              <div className="mt-4 bg-red-950/30 border border-red-500/30 p-4 rounded">
                <p className="text-sm text-red-300 font-semibold mb-2">🚨 CRITICAL MISCONCEPTION:</p>
                <p className="text-slate-300 text-sm">
                  Action-reaction pairs act on <strong>different bodies</strong>. They NEVER cancel! If they could cancel, nothing would ever move. One force acts on object A, the reaction acts on object B.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* FREE BODY DIAGRAM */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Free Body Diagram (FBD)</h2>
          <p className="text-lg text-slate-300">This is THE most important skill in mechanics. Master FBD, master 80% of the chapter.</p>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-cyan-400/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-300 mb-6">Step-by-Step FBD Strategy</h3>
            <div className="space-y-4">
              {[
                { step: "1", title: "Isolate the Body", desc: "Draw the object as a point or simple shape. Ignore everything else." },
                { step: "2", title: "Identify All Forces", desc: "Weight (mg), Normal reaction (N), Tension (T), Friction (f), Applied forces" },
                { step: "3", title: "Draw Force Arrows", desc: "Direction & magnitude matter. Longer arrow = larger force" },
                { step: "4", title: "Choose Smart Axes", desc: "Align axes with forces when possible (reduces components)" },
                { step: "5", title: "Apply Newton's 2nd Law", desc: "Sum forces in each direction: ΣF = ma" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-cyan-300">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-bold text-cyan-200">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-red-950/30 border border-red-500/30 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-red-300 mb-4">Common FBD Mistakes</h3>
            <ul className="space-y-2 text-slate-300">
              <li>❌ Including action-reaction pairs on same FBD (they belong to different bodies)</li>
              <li>❌ Forgetting normal force on curved/inclined surfaces</li>
              <li>❌ Drawing friction in wrong direction (opposes motion/tendency)</li>
              <li>❌ Making tension different for same string/cable (it&apos;s uniform if massless)</li>
              <li>❌ Not considering pseudo forces in accelerating frames</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <p className="text-sm text-slate-300 italic">
              💡 <strong>Interactive Element:</strong> In real system, use draggable force arrows, hover-highlight individual forces, and show real-time component calculations as angles change.
            </p>
          </motion.div>
        </motion.section>

        {/* TYPES OF FORCES */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Types of Forces</h2>
          <div className="grid gap-6">
            {[
              {
                name: "Weight (mg)",
                direction: "Vertically downward",
                trap: "Always acts downward, even if object is moving upward"
              },
              {
                name: "Normal Reaction (N)",
                direction: "Perpendicular to surface",
                trap: "NOT always equal to mg. On inclines: N = mg cos θ. On elevator: N varies with acceleration"
              },
              {
                name: "Tension (T)",
                direction: "Along string (away from object)",
                trap: "If string is massless and ideal, tension is uniform. Tension can only pull, never push"
              },
              {
                name: "Friction (f)",
                direction: "Opposes relative motion/tendency",
                trap: "Direction depends on relative motion, not on applied force direction. Static friction self-adjusts!"
              },
              {
                name: "Spring Force (F_s)",
                direction: "Opposite to compression/extension",
                trap: "F = -kx. Always restoring force. Negative sign matters!"
              },
              {
                name: "Pseudo Force (F_p)",
                direction: "Opposite to frame&apos;s acceleration",
                trap: "Only exists in non-inertial frames. F = -ma (frame). Doesn&apos;t exist for observer in inertial frame"
              }
            ].map((force, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-slate-800/50 border border-cyan-500/20 p-5 rounded-lg hover:border-cyan-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-cyan-300">{force.name}</h4>
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded">Direction</span>
                </div>
                <p className="text-slate-400 mb-3 text-sm">{force.direction}</p>
                <div className="bg-yellow-950/30 border-l-2 border-yellow-600 pl-3 py-2">
                  <p className="text-yellow-300 text-sm"><strong>⚠️ Student Trap:</strong> {force.trap}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FRICTION SECTION */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Friction (MOST IMPORTANT)</h2>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-orange-400/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-orange-300 mb-4">Static vs Kinetic Friction</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-cyan-200 mb-2">Static Friction (f_s)</p>
                <p className="text-slate-400 text-sm mb-3">Prevents motion when no relative motion exists yet</p>
                <Latex>{"$$f_s \\le \\mu_s N$$"}</Latex>
                <p className="text-slate-400 text-sm mt-3">
                  <strong>Key:</strong> f_s self-adjusts to equal applied force (up to maximum limit). Always less than or equal to μ_s N.
                </p>
              </div>
              <div>
                <p className="font-bold text-cyan-200 mb-2">Kinetic Friction (f_k)</p>
                <p className="text-slate-400 text-sm mb-3">Opposes motion when object is sliding</p>
                <Latex>{"$$f_k = \\mu_k N$$"}</Latex>
                <p className="text-slate-400 text-sm mt-3">
                  <strong>Key:</strong> f_k is constant (independent of velocity). Always μ_k N. Usually μ_k &lt; μ_s.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Friction vs Applied Force Graph</h3>
            <div className="bg-slate-900/50 p-4 rounded mb-4">
              <p className="text-slate-300 text-sm mb-2">Graph shows friction force magnitude vs applied force:</p>
              <p className="text-slate-400 text-xs italic">
                0 to F_max: Line increases (static friction = applied force)<br/>
                At F_max: Sudden drop (transition to kinetic)<br/>
                After F_max: Constant line (kinetic friction = μ_k N)
              </p>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              <strong>Why?</strong> Static friction is intelligent—it exactly opposes applied force until it reaches its limit (μ_s N). Then object breaks free, kinetic friction takes over (constant value μ_k N).
            </p>
            <p className="text-cyan-300 text-sm">
              💡 <strong>Interactive:</strong> Slider to adjust roughness, live graph updating, force arrow animations showing magnitude changes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Friction Direction (Most Confused Topic)</h3>
            <div className="space-y-3">
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="font-semibold text-cyan-200 text-sm mb-1">Rule:</p>
                <p className="text-slate-400 text-sm">Friction opposes <strong>relative motion</strong> or <strong>tendency</strong> of relative motion</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="font-semibold text-cyan-200 text-sm mb-1">Example 1: Block on moving belt</p>
                <p className="text-slate-400 text-sm">If belt moves right and block starts at rest, friction acts RIGHT (same direction as belt motion)</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="font-semibold text-cyan-200 text-sm mb-1">Example 2: Block on stationary surface with applied force</p>
                <p className="text-slate-400 text-sm">If you push block to the right, friction acts LEFT (opposing your push)</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* INCLINED PLANE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Inclined Plane Problems</h2>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-400/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-300 mb-4">Force Decomposition on Incline</h3>
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Weight mg decomposes into two components along smart axes:</p>
              <div className="bg-slate-900/50 p-4 rounded space-y-2">
                <p className="text-cyan-200 font-semibold">Parallel to incline (down the slope):</p>
                <Latex>{"$$F_{\\parallel} = mg \\sin \\theta$$"}</Latex>
              </div>
              <div className="bg-slate-900/50 p-4 rounded space-y-2">
                <p className="text-cyan-200 font-semibold">Perpendicular to incline (into surface):</p>
                <Latex>{"$$F_{\\perp} = mg \\cos \\theta$$"}</Latex>
              </div>
              <p className="text-slate-400 text-sm italic mt-4">
                Normal force N = mg cos θ (equilibrium perpendicular to surface). Friction depends on N.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Acceleration on Frictionless Incline</h3>
            <Latex>{"$$a = g \\sin \\theta$$"}</Latex>
            <p className="text-slate-400 text-sm mt-4">
              Only mg sin θ component accelerates the block. Steeper angle → larger acceleration. At θ = 90°, a = g (free fall).
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">With Friction</h3>
            <Latex>{"$$a = g(\\sin \\theta - \\mu_k \\cos \\theta)$$"}</Latex>
            <p className="text-slate-400 text-sm mt-4">
              For block to slide: mg sin θ must exceed maximum static friction μ_s mg cos θ, i.e., tan θ &gt; μ_s
            </p>
            <p className="text-cyan-300 text-sm mt-3">
              💡 <strong>Interactive:</strong> Angle slider adjusts incline in real-time, force vectors decompose dynamically, acceleration updates live.
            </p>
          </motion.div>
        </motion.section>

        {/* PULLEY SYSTEMS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Pulley Systems</h2>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-green-400/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-300 mb-4">Key Assumptions (JEE Level)</h3>
            <ul className="space-y-2 text-slate-300">
              <li>✓ String is massless (no tension loss along string)</li>
              <li>✓ String is inextensible (length constant → acceleration constraint)</li>
              <li>✓ Pulley is massless (no rotational inertia)</li>
              <li>✓ Pulley is frictionless (tension same on both sides)</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Acceleration Constraint</h3>
            <p className="text-slate-300 text-sm mb-3">
              For Atwood machine (two masses): If one moves down distance d, other moves up distance d. <strong>Accelerations are equal in magnitude.</strong>
            </p>
            <Latex>{"$$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}$$"}</Latex>
            <p className="text-slate-400 text-sm mt-3">
              Tension: <Latex>{"$$T = \\frac{2m_1 m_2 g}{m_1 + m_2}$$"}</Latex>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <p className="text-sm text-slate-300 italic">
              💡 <strong>Interactive:</strong> Animated pulley system showing synchronized body movements, tension lines updating with mass changes, acceleration values computing live.
            </p>
          </motion.div>
        </motion.section>

        {/* CIRCULAR MOTION FORCES */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Circular Motion: Force Perspective</h2>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Centripetal Force (Net Force Inward)</h3>
            <Latex>{"$$F_c = \\frac{mv^2}{r} = m\\omega^2 r$$"}</Latex>
            <p className="text-slate-400 text-sm mt-4 mb-3">
              This is <strong>NOT a separate force</strong>. It's the <strong>net</strong> force pointing toward center. Could be tension, friction, normal force, gravity, or combination.
            </p>
            <div className="bg-red-950/30 border border-red-500/30 p-4 rounded">
              <p className="text-red-300 text-sm font-semibold">🚨 CRITICAL:</p>
              <p className="text-slate-300 text-sm">
                Don&apos;t add centripetal force separately. Identify actual forces (T, N, f, mg), resolve toward center, set sum equal to mv²/r.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Banking Basics</h3>
            <p className="text-slate-300 text-sm mb-3">
              For ideal banking angle (no friction needed):
            </p>
            <Latex>{"$$\\tan \\theta = \\frac{v^2}{rg}$$"}</Latex>
            <p className="text-slate-400 text-sm mt-3">
              Normal force component provides centripetal force. At this angle, car doesn&apos;t need friction to stay on track.
            </p>
          </motion.div>
        </motion.section>

        {/* PSEUDO FORCE */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Pseudo Force & Non-Inertial Frames</h2>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-purple-400/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-purple-300 mb-4">Elevator Problem (Classic Example)</h3>
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-4 rounded">
                <p className="font-bold text-cyan-200 mb-2">Inside elevator (non-inertial frame):</p>
                <p className="text-slate-400 text-sm">Pseudo force acts on person = -ma (downward if accelerating up, upward if accelerating down)</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded">
                <p className="font-bold text-cyan-200 mb-2">Apparent weight:</p>
                <Latex>{"$$N = m(g + a) \\text{ (accelerating up)}$$"}</Latex>
                <Latex>{"$$N = m(g - a) \\text{ (accelerating down)}$$"}</Latex>
              </div>
              <div className="bg-slate-900/50 p-4 rounded">
                <p className="font-bold text-cyan-200 mb-2">From ground (inertial frame):</p>
                <p className="text-slate-400 text-sm">Just apply Newton&apos;s 2nd law: N - mg = ma</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Pseudo Force in Accelerating Car</h3>
            <p className="text-slate-300 text-sm mb-3">
              Car accelerates forward at a. Observer inside car (non-inertial) sees pseudo force pushing him backward: F_p = -ma (opposite to car&apos;s acceleration).
            </p>
            <p className="text-cyan-300 text-sm">
              💡 <strong>Interactive:</strong> Visual showing reference frame switching, force diagrams changing perspective, pseudo forces appearing/disappearing.
            </p>
          </motion.div>
        </motion.section>

        {/* COMMON TRAPS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold tracking-tight text-red-400">Common JEE Traps</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                trap: "Friction direction wrong",
                detail: "Friction opposes motion/tendency, not force direction. Block on belt moving right, friction on block is rightward."
              },
              {
                trap: "Action-reaction pair confusion",
                detail: "Pairs act on DIFFERENT bodies. They don't cancel. Your weight pulls Earth down just as much as Earth pulls you down."
              },
              {
                trap: "Tension unequal assumption",
                detail: "For ideal massless string, tension is uniform throughout. Only different if string has mass or pulley has friction."
              },
              {
                trap: "Normal force always equals mg",
                detail: "WRONG. On incline: N = mg cos θ. In elevator: N = m(g ± a). On curved surface: N = mg + mv²/r."
              },
              {
                trap: "Static friction always μN",
                detail: "WRONG. Static friction is at most μ_s N. It self-adjusts to balance applied force (0 to μ_s N)."
              },
              {
                trap: "Centripetal force is separate",
                detail: "NO. It's the net inward force. Use T, N, f, mg components. Don't add a sixth force."
              }
            ].map((item, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => setExpandedTrap(expandedTrap === idx ? null : idx)}
                className="w-full text-left"
              >
                <div className="bg-gradient-to-r from-red-950/40 to-slate-900/50 border border-red-500/30 p-4 rounded-lg hover:border-red-400/50 transition-all flex justify-between items-start"
                >
                  <div>
                    <p className="font-bold text-red-300">{item.trap}</p>
                    {expandedTrap === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-slate-400 text-sm mt-2"
                      >
                        {item.detail}
                      </motion.p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-red-400 flex-shrink-0 transition-transform ${
                      expandedTrap === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* GRAPHS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold tracking-tight text-cyan-300">Key Graphs</h2>
          </div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Friction vs Applied Force</h3>
            <div className="bg-slate-900/50 p-6 rounded h-64 flex items-end justify-start gap-1 border border-slate-700">
              <p className="absolute top-2 left-2 text-xs text-slate-400">f (force)</p>
              <div className="flex-1 bg-cyan-500/30 rounded-t" style={{ height: '20%' }}></div>
              <div className="flex-1 bg-cyan-500/30 rounded-t" style={{ height: '40%' }}></div>
              <div className="flex-1 bg-cyan-500/30 rounded-t" style={{ height: '60%' }}></div>
              <div className="flex-1 bg-orange-500/30 rounded-t" style={{ height: '75%' }}></div>
              <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: '50%' }}></div>
              <div className="flex-1 bg-red-500/30 rounded-t" style={{ height: '50%' }}></div>
              <p className="absolute bottom-2 right-2 text-xs text-slate-400">F (applied)</p>
            </div>
            <p className="text-slate-400 text-sm mt-3 italic">
              Shape: Linear increase (static), peak (limiting friction), then drop and plateau (kinetic). This is THE friction graph JEE loves.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Force vs Acceleration</h3>
            <Latex>{"$$a = \\frac{F_{net}}{m}$$"}</Latex>
            <p className="text-slate-400 text-sm mt-3">Linear relationship. Slope = 1/m. Passes through origin. Steeper for lighter objects.</p>
            <p className="text-cyan-300 text-sm mt-3">
              💡 <strong>Interactive:</strong> Change mass with slider, see slope adjust. Plot updates live.
            </p>
          </motion.div>
        </motion.section>

        {/* MCQ TRICKS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold tracking-tight text-yellow-400">Fast MCQ Elimination Tricks</h2>
          </div>

          <div className="grid gap-4">
            {[
              {
                trick: "No net force → no acceleration",
                hint: "If option says balanced forces cause motion, eliminate."
              },
              {
                trick: "Static friction self-adjusts",
                hint: "If option assumes static friction is always μN, eliminate."
              },
              {
                trick: "Acceleration direction = net force direction",
                hint: "Check force direction, not object's motion direction."
              },
              {
                trick: "Action-reaction act on different bodies",
                hint: "If option says they cancel, eliminate immediately."
              },
              {
                trick: "Centripetal acceleration always inward",
                hint: "Never outward. If outward centrifugal mentioned in inertial frame, eliminate."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-slate-800/50 border border-yellow-500/20 p-4 rounded-lg hover:border-yellow-400/50 transition-all"
              >
                <p className="font-bold text-yellow-300">{item.trick}</p>
                <p className="text-slate-400 text-sm mt-2">⚡ {item.hint}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FORMULA CHEAT SHEET */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-violet-400" />
            <h2 className="text-4xl font-bold tracking-tight text-violet-300">Formula Cheat Sheet</h2>
          </div>

          <div className="space-y-2">
            {[
              {
                title: "Newton's Laws",
                formulas: [
                  { eq: "\\vec{F}_{net} = m\\vec{a}", desc: "2nd Law" },
                  { eq: "\\vec{F}_{AB} = -\\vec{F}_{BA}", desc: "3rd Law" }
                ]
              },
              {
                title: "Friction",
                formulas: [
                  { eq: "f_s \\le \\mu_s N", desc: "Static" },
                  { eq: "f_k = \\mu_k N", desc: "Kinetic" }
                ]
              },
              {
                title: "Incline",
                formulas: [
                  { eq: "mg \\sin \\theta \\text{ and } mg \\cos \\theta", desc: "Components" },
                  { eq: "a = g(\\sin \\theta - \\mu_k \\cos \\theta)", desc: "With friction" }
                ]
              },
              {
                title: "Circular Motion",
                formulas: [
                  { eq: "F_c = \\frac{mv^2}{r} = m\\omega^2 r", desc: "Centripetal" },
                  { eq: "\\tan \\theta = \\frac{v^2}{rg}", desc: "Banking" }
                ]
              },
              {
                title: "Pulley (Atwood)",
                formulas: [
                  { eq: "a = \\frac{(m_1 - m_2)g}{m_1 + m_2}", desc: "Acceleration" },
                  { eq: "T = \\frac{2m_1 m_2 g}{m_1 + m_2}", desc: "Tension" }
                ]
              },
              {
                title: "Pseudo Force",
                formulas: [
                  { eq: "F_p = -m a_{frame}", desc: "In non-inertial frame" },
                  { eq: "N = m(g \\pm a)", desc: "Elevator" }
                ]
              }
            ].map((category, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => setExpandedFormula(expandedFormula === idx ? null : idx)}
                className="w-full text-left"
              >
                <div className="bg-gradient-to-r from-violet-950/40 to-slate-900/50 border border-violet-500/30 p-4 rounded-lg hover:border-violet-400/50 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-violet-300">{category.title}</p>
                    <ChevronDown
                      className={`w-5 h-5 text-violet-400 transition-transform ${
                        expandedFormula === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {expandedFormula === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-2"
                    >
                      {category.formulas.map((formula, fidx) => (
                        <div key={fidx} className="flex items-start justify-between text-sm bg-slate-900/50 p-2 rounded">
                          <Latex>{`$$${formula.eq}$$`}</Latex>
                          <span className="text-slate-400 ml-2">{formula.desc}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* QUIZ SECTION */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Grid3x3 className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl font-bold tracking-tight text-green-300">Quick MCQ Quiz</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "A block lies on a surface. You apply 5N force, no motion. You apply 10N, still no motion. You apply 12N, block slides. What was the friction at 10N?",
                options: ["Equal to 12N", "Equal to 10N", "Equal to applied force (10N)", "Greater than 12N"],
                correctIdx: 2,
                explanation: "Static friction self-adjusts to match applied force (up to its limit). At 10N applied, friction is exactly 10N to maintain equilibrium."
              },
              {
                question: "In an Atwood machine, m₁ = 5kg hangs on one side, m₂ = 3kg on other. Which statement is TRUE?",
                options: ["Both accelerate at g", "Tensions on both sides are different", "Accelerations have same magnitude but different body velocity changes", "System doesn't accelerate"],
                correctIdx: 2,
                explanation: "Accelerations have same magnitude (one up, one down). Tensions are same (ideal massless string). Different masses lead to different net forces, but constraint keeps |a| equal."
              },
              {
                question: "An elevator accelerates upward at 2 m/s². Person of mass 60kg inside. Normal force on person?",
                options: ["600N", "720N", "480N", "Zero"],
                correctIdx: 1,
                explanation: "N = m(g + a) = 60(10 + 2) = 60 × 12 = 720N. Person feels heavier (apparent weight increases) during upward acceleration."
              }
            ].map((quiz, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onClick={() => setExpandedQuiz(expandedQuiz === idx ? null : idx)}
                className="w-full text-left"
              >
                <div className="bg-gradient-to-r from-green-950/40 to-slate-900/50 border border-green-500/30 p-6 rounded-lg hover:border-green-400/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-bold text-green-300 flex-1">{`Q${idx + 1}: ${quiz.question}`}</p>
                    <ChevronDown
                      className={`w-5 h-5 text-green-400 flex-shrink-0 transition-transform ${
                        expandedQuiz === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedQuiz === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-3"
                    >
                      <div className="space-y-2">
                        {quiz.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-3 rounded text-sm transition-all ${
                              optIdx === quiz.correctIdx
                                ? 'bg-green-500/20 border border-green-400 text-green-300 font-semibold'
                                : 'bg-slate-800/50 text-slate-400'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="bg-slate-900/50 border-l-4 border-green-400 p-3 rounded mt-4">
                        <p className="text-sm text-green-300 font-semibold mb-1">Explanation:</p>
                        <p className="text-slate-400 text-sm">{quiz.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  )
}

