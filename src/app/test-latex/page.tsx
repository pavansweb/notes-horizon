"use client";
import { Latex } from "@/components/latex";

export default function TestPage() {
  return (
    <div className="p-20 space-y-10">
      <div>
        <h2 className="text-xl font-bold">Test 1: Single Dollar</h2>
        <Latex>{"$E = mc^2$"}</Latex>
      </div>
      <div>
        <h2 className="text-xl font-bold">Test 2: Double Dollar</h2>
        <Latex>{"$$E = mc^2$$"}</Latex>
      </div>
      <div>
        <h2 className="text-xl font-bold">Test 4: Backslash Vector</h2>
        <Latex>{"$\\vec{v}$"}</Latex>
      </div>
      <div>
        <h2 className="text-xl font-bold">Test 5: Double Backslash Vector</h2>
        <Latex>{"$$\\vec{v}$$"}</Latex>
      </div>
    </div>
  );
}
