---
id: limits-continuity-and-differentiability
title: "Limits, Continuity and Differentiability"
subject: "Mathematics"
chapter: "Calculus"
lastUpdated: "2026-05-17T22:55:00Z"
order: 6
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Calculus: Limits & Continuity

## 1. Limits (The Foundation)
### 1.1 Existence & Standard Forms
- **Existence:** $\lim_{x \to a} f(x) = L \iff LHL = RHL = L$.
- **Standard Indeterminate Forms:** $0/0$ and $\infty/\infty$ (Use L'Hopital or Expansions).
- **Exponential Form ($1^\infty$):** If $\lim f = 1$ and $\lim g = \infty$, then $\lim f^g = e^{\lim(f-1)g}$.
- **Sandwich Theorem:** If $g(x) \le f(x) \le h(x)$ and $\lim g = \lim h = L$, then $\lim f = L$.

### 1.2 Taylor Expansions (Essential for JEE)
- $\sin x = x - x^3/3! + x^5/5! - \dots$
- $\cos x = 1 - x^2/2! + x^4/4! - \dots$
- $e^x = 1 + x + x^2/2! + \dots$
- $\ln(1+x) = x - x^2/2 + x^3/3 - \dots$

## 2. Continuity & Differentiability
### 2.1 Types of Discontinuity
- **Removable:** $\lim f(x)$ exists but $\
eq f(a)$.
- **Non-Removable:** 
    - **Jump:** $LHL \
eq RHL$.
    - **Essential:** At least one limit is infinite or oscillates.

### 2.2 Differentiability
- **Geometric Meaning:** Existence of a unique tangent. Non-differentiable at corners (cusps) or vertical tangents.
- **Chain Rule & Implicit Diff:** $\frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)$.
- **Derivatives of GIF and Modulus:** Always check $LHD$ and $RHD$ at "critical points" (integers for $[x]$, zero for $|x|$).

## 3. Mean Value Theorems
- **Rolle's Theorem:** If $f(a)=f(b)$ on $[a, b]$, then $f'(c)=0$ for some $c \in (a, b)$.
- **Lagrange's MVT:** $f'(c) = \frac{f(b)-f(a)}{b-a}$.

## 4. Visual Aids & Diagrams
*(Imagine the graph of $|x|$—it's continuous at $0$ but has a "V" shape sharp corner, meaning no single tangent exists. Visualize a "step function" $[x]$ jumping at every integer, showing jump discontinuity. See the Sandwich theorem as two outer functions "squeezing" the middle one through a narrow gate at the limit point.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: $1^\infty$ Limit Form
**Q1.** Evaluate $\lim_{x \to 0} (\cos x)^{1/x^2}$.
**Concept:** $e^{\lim (\cos x - 1)/x^2}$.
**Solution:**
1. Use expansion: $\cos x - 1 \approx -x^2/2$.
2. Limit $= e^{\lim (-x^2/2)/x^2} = e^{-1/2}$.
3. Answer: $1/\sqrt{e}$.

### Type 2: Pointwise Differentiability
**Q1.** Is $f(x) = x|x|$ differentiable at $x=0$?
**Concept:** Check $LHD$ and $RHD$.
**Solution:**
1. $f(x) = x^2$ (for $x\ge 0$) and $-x^2$ (for $x<0$).
2. $f'(x) = 2x$ (for $x>0$) and $-2x$ (for $x<0$).
3. At $x=0$, $LHD = 0, RHD = 0$. Yes, it is differentiable.

### Type 3: Rolle's Theorem Application
**Q1.** For $f(x) = x(x-1)(x-2)$ on $[0, 2]$, find $c$ such that $f'(c)=0$.
**Concept:** $f(0)=0, f(2)=0$. Roots of $f'(x)=0$ must lie in $(0, 2)$.
**Solution:**
1. $f(x) = x^3 - 3x^2 + 2x$.
2. $f'(x) = 3x^2 - 6x + 2 = 0$.
3. $x = \frac{6 \pm \sqrt{36-24}}{6} = 1 \pm \frac{\sqrt{12}}{6} = 1 \pm \frac{1}{\sqrt{3}}$.
4. Both values lie in $(0, 2)$.
