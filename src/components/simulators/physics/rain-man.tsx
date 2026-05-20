"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export function RainManSimulator() {
  const [manVelocity, setManVelocity] = useState(5); // km/h
  const [rainVelocity, setRainVelocity] = useState(10); // km/h (falling vertically)

  // Relative velocity calculation
  // V_rm = V_r - V_m
  // V_r is -y direction (down). V_m is +x direction (right).
  // So V_rm = -V_m i - V_r j
  // Magnitude: sqrt(V_r^2 + V_m^2)
  // Angle with vertical: tan(theta) = V_m / V_r
  const angleRad = Math.atan2(manVelocity, rainVelocity);
  const angleDeg = (angleRad * 180) / Math.PI;

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      {/* Simulation Area */}
      <div className="relative w-full aspect-video bg-zinc-900 rounded-xl border border-white/10 overflow-hidden flex flex-col justify-end">
        {/* Sky / Rain background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(${90 + angleDeg}deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)`,
          backgroundSize: "20px 20px"
        }} />

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-black/50 text-white">θ = {angleDeg.toFixed(1)}°</Badge>
          <Badge className="bg-black/50 text-white">|Vrm| = {Math.sqrt(manVelocity**2 + rainVelocity**2).toFixed(1)} km/h</Badge>
        </div>

        {/* Ground */}
        <div className="h-1/4 w-full bg-zinc-800 border-t border-white/10 relative flex justify-center">
          {/* Stick figure Man */}
          <div className="absolute bottom-full w-12 h-24 flex flex-col items-center origin-bottom">
            {/* Umbrella */}
            <div className="absolute -top-12 origin-bottom transition-transform duration-300" style={{ transform: `rotate(${angleDeg}deg)` }}>
              <div className="w-24 h-12 bg-blue-500 rounded-t-full relative">
                {/* Umbrella handle */}
                <div className="absolute top-12 left-1/2 -ml-0.5 w-1 h-12 bg-zinc-400" />
              </div>
            </div>
            {/* Head */}
            <div className="w-6 h-6 bg-white rounded-full mt-4" />
            {/* Body */}
            <div className="w-1 h-10 bg-white" />
            {/* Legs */}
            <div className="flex w-8 justify-between -mt-2">
              <div className="w-1 h-8 bg-white rotate-12" />
              <div className="w-1 h-8 bg-white -rotate-12" />
            </div>
          </div>
        </div>

        {/* Vector Diagram Overlay */}
        <div className="absolute right-4 bottom-1/4 mb-4 bg-black/80 p-4 rounded-xl border border-white/10">
          <div className="text-xs text-zinc-400 mb-2 font-bold uppercase tracking-wider text-center">Vector Diagram</div>
          <svg width="100" height="100" className="overflow-visible">
            {/* V_man (reversed for relative velocity: -V_m) */}
            <line x1="50" y1="20" x2={50 - manVelocity * 3} y2="20" stroke="#f87171" strokeWidth="2" markerEnd="url(#arrow-red)" />
            <text x={50 - manVelocity * 1.5} y="15" fill="#f87171" fontSize="10" textAnchor="middle">-Vm</text>

            {/* V_rain */}
            <line x1="50" y1="20" x2="50" y2={20 + rainVelocity * 3} stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrow-blue)" />
            <text x="55" y={20 + rainVelocity * 1.5} fill="#60a5fa" fontSize="10">Vr</text>

            {/* V_rm (Resultant) */}
            <line x1="50" y1="20" x2={50 - manVelocity * 3} y2={20 + rainVelocity * 3} stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrow-purple)" strokeDasharray="4" />
            
            {/* Angle Arc */}
            {angleDeg > 0 && (
              <path d={`M 50 40 A 20 20 0 0 1 ${50 - Math.sin(angleRad)*20} ${20 + Math.cos(angleRad)*20}`} fill="none" stroke="white" strokeWidth="1" />
            )}

            <defs>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Man Velocity ($V_m$)</span>
            <span className="font-mono text-white">{manVelocity} km/h</span>
          </div>
          <Slider 
            value={[manVelocity]} 
            onValueChange={(val: any) => setManVelocity(Array.isArray(val) ? val[0] : val)} 
            max={20} 
            step={1}
            className="[&_[role=slider]]:bg-red-500"
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Rain Velocity ($V_r$)</span>
            <span className="font-mono text-white">{rainVelocity} km/h</span>
          </div>
          <Slider 
            value={[rainVelocity]} 
            onValueChange={(val: any) => setRainVelocity(Array.isArray(val) ? val[0] : val)} 
            min={1}
            max={20} 
            step={1}
            className="[&_[role=slider]]:bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
