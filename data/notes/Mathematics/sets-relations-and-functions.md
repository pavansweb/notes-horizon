---
id: sets-relations-and-functions
title: "Sets, Relations and Functions"
subject: "Mathematics"
chapter: "Algebra"
lastUpdated: "2026-05-17T22:30:00Z"
order: 1
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Sets, Relations & Function Theory

## 1. Set Theory & Cardinality
### 1.1 Types of Sets
- **Power Set ($P(A)$):** Set of all subsets. If $n(A) = m$, then $n(P(A)) = 2^m$.
- **Universal Set ($U$):** The set containing all possible elements under consideration.

### 1.2 Operations and Properties
- **De Morgan's Laws:** $(A \cup B)' = A' \cap B'$ and $(A \cap B)' = A' \cup B'$.
- **Cardinality of 3 Sets:** $n(A \cup B \cup C) = n(A) + n(B) + n(C) - n(A \cap B) - n(B \cap C) - n(C \cap A) + n(A \cap B \cap C)$.

## 2. Relations
### 2.1 Classification of Relations
Let $R$ be a relation on set $A$ ($n(A) = n$):
- **Reflexive:** $(a, a) \in R$ for all $a \in A$. Number of reflexive relations $= 2^{n^2-n}$.
- **Symmetric:** $(a, b) \in R \implies (b, a) \in R$. Number of symmetric relations $= 2^{n(n+1)/2}$.
- **Transitive:** $(a, b) \in R, (b, c) \in R \implies (a, c) \in R$.
- **Equivalence:** Reflexive + Symmetric + Transitive. Partition of set $A$ into equivalence classes.

## 3. Functions (Deep Dive)
### 3.1 Domain and Range
- **Greatest Integer Function (GIF):** $f(x) = [x]$. $x-1 < [x] \le x$.
- **Fractional Part:** $\{x\} = x - [x]$. Range is $[0, 1)$. Period $= 1$.
- **Signum Function:** $sgn(x) = 1$ (if $x>0$), $0$ (if $x=0$), $-1$ (if $x<0$).

### 3.2 Classification and Counting
- **One-one (Injective):** $f(x_1) = f(x_2) \implies x_1 = x_2$. Number of injections (A to B) $= ^nP_m$ ($m \le n$).
- **Onto (Surjective):** Range = Codomain. Number of surjections $= n^m - ^nC_1(n-1)^m + ^nC_2(n-2)^m - \dots$
- **Periodic Functions:** $f(x+T) = f(x)$. If $f(x)$ has period $T$, then $f(ax+b)$ has period $T/|a|$.

## 4. Composition and Inverse
- **Composition:** $(g \circ f)(x) = g(f(x))$. Domain of $g \circ f$ is $\{x \in D_f : f(x) \in D_g\}$.
- **Inverse:** Defined only for bijections. Graph of $f^{-1}$ is the reflection of $f$ about $y=x$.

## 5. Visual Aids & Diagrams
*(Imagine a Venn Diagram with three intersecting circles A, B, and C. The central region is $A \cap B \cap C$. Visualize the graph of $f(x) = [x]$ as a series of steps (staircase). For mappings, see a set of arrows from set A to set B; if every element in B has at least one arrow pointing to it, it's surjective. If no two arrows point to the same element in B, it's injective.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Domain of Log-Square Root Function
**Q1.** Find the domain of $f(x) = \sqrt{\log_{0.4} \left( \frac{x-1}{x+5} \right)}$.
**Concept:** Argument of log $>0$, and since base $<1$, $\log_{0.4}(\dots) \ge 0 \implies$ argument $\le 1$.
**Solution:**
1. $(x-1)/(x+5) > 0 \implies x \in (-\infty, -5) \cup (1, \infty)$.
2. $(x-1)/(x+5) \le 1 \Rightarrow (x-1-x-5)/(x+5) \le 0 \Rightarrow -6/(x+5) \le 0 \Rightarrow x+5 > 0 \Rightarrow x > -5$.
3. Intersecting: $x \in (1, \infty)$.

### Type 2: Equivalence Relations
**Q1.** Let $R = \{(a, b) : a^2 - b^2 \text{ is divisible by } 5\}$ on the set of integers. Is $R$ an equivalence relation?
**Concept:** Check Reflexive, Symmetric, Transitive.
**Solution:**
1. **Reflexive:** $a^2 - a^2 = 0$, which is $5 \times 0$. Yes.
2. **Symmetric:** If $a^2 - b^2 = 5k$, then $b^2 - a^2 = 5(-k)$. Yes.
3. **Transitive:** If $a^2 - b^2 = 5k$ and $b^2 - c^2 = 5m$, then $a^2 - c^2 = 5(k+m)$. Yes.
4. Conclusion: It is an equivalence relation.

### Type 3: Inverse of a Function
**Q1.** Find $f^{-1}(x)$ for $f(x) = \frac{2^x - 2^{-x}}{2^x + 2^{-x}}$.
**Concept:** Set $y = f(x)$ and solve for $x$.
**Solution:**
1. $y = \frac{2^{2x}-1}{2^{2x}+1} \Rightarrow y \cdot 2^{2x} + y = 2^{2x} - 1$.
2. $2^{2x}(y-1) = -1-y \Rightarrow 2^{2x} = \frac{1+y}{1-y}$.
3. $2x = \log_2 \left( \frac{1+y}{1-y} \right) \Rightarrow x = \frac{1}{2} \log_2 \left( \frac{1+y}{1-y} \right)$.
4. $f^{-1}(x) = \frac{1}{2} \log_2 \left( \frac{1+x}{1-x} \right)$.
