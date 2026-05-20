"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, CheckCircle2, XCircle, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Latex } from "@/components/latex";

interface ConceptBlockProps {
  title: string;
  description: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
}

export const ConceptBlock = ({ title, description, children, visual }: ConceptBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <Card className="border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-all duration-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-400/5">Concept</Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-zinc-300">
              {typeof children === "string" ? <Latex>{children}</Latex> : children}
            </div>
            {visual && (
              <div className="relative aspect-square rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center overflow-hidden">
                {visual}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface QuizBlockProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QuizBlock = ({ question, options, correctAnswer, explanation }: QuizBlockProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  };

  return (
    <Card className="my-8 border-white/5 bg-zinc-900/40 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400/30 bg-purple-400/5">Quick Quiz</Badge>
        </div>
        <CardTitle className="text-xl text-white">
          <Latex>{question}</Latex>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(index)}
            className={cn(
              "w-full p-4 rounded-xl text-left border transition-all duration-200",
              selectedOption === null
                ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                : index === correctAnswer
                ? "border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                : index === selectedOption
                ? "border-red-500/50 bg-red-500/10 text-red-400"
                : "border-white/5 bg-white/5 text-zinc-500 opacity-50"
            )}
          >
            <div className="flex items-center justify-between">
              <Latex>{option}</Latex>
              {selectedOption !== null && index === correctAnswer && <CheckCircle2 className="w-5 h-5" />}
              {selectedOption === index && index !== correctAnswer && <XCircle className="w-5 h-5" />}
            </div>
          </motion.button>
        ))}

        <AnimatePresence>
          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20"
            >
              <div className="flex gap-3">
                <BrainCircuit className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-semibold text-blue-400">Explanation</p>
                  <div className="text-zinc-400 text-sm">
                    <Latex>{explanation}</Latex>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export const MistakeBlock = ({ title, commonMistake, correction }: { title: string, commonMistake: string, correction: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="my-6 border-l-4 border-red-500/50 bg-red-500/5 p-6 rounded-r-2xl"
    >
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="text-red-500 w-6 h-6" />
        <h4 className="text-lg font-bold text-red-500 uppercase tracking-wider">{title}</h4>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-bold text-red-400/60 mb-1">COMMON MISTAKE</p>
          <div className="text-zinc-300 italic">
            <Latex>{commonMistake}</Latex>
          </div>
        </div>
        <div className="pt-4 border-t border-red-500/10">
          <p className="text-xs font-bold text-green-400/60 mb-1">CORRECT APPROACH</p>
          <div className="text-zinc-200 font-medium">
            <Latex>{correction}</Latex>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TrickBlock = ({ trick, example }: { trick: string, example: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="my-6 glass p-6 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute -right-4 -top-4 opacity-10">
        <Lightbulb className="w-24 h-24 text-yellow-400" />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <Lightbulb className="text-yellow-400 w-6 h-6" />
        <h4 className="text-lg font-bold text-yellow-400 tracking-wider">MEMORY TRICK</h4>
      </div>
      <div className="text-xl font-medium text-white mb-4 leading-snug">
        <Latex>{trick}</Latex>
      </div>
      <div className="bg-white/5 p-3 rounded-lg border border-white/5">
        <div className="text-zinc-400 text-sm">
          <Latex>{example}</Latex>
        </div>
      </div>
    </motion.div>
  );
};
