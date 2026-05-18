---
id: inverse-trigonometric-functions
title: "Inverse Trigonometric Functions"
subject: "Mathematics"
chapter: "Trigonometry"
lastUpdated: "2026-05-17T22:40:00Z"
order: 14
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Inverse Trigonometric Functions (ITF)

## 1. Principal Value Ranges (PVR)
- **$\sin^{-1}x, \tan^{-1}x, \operatorname{cosec}^{-1}x$:** Range in $[-\pi/2, \pi/2]$ (Odd functions: $f(-x) = -f(x)$).
- **$\cos^{-1}x, \cot^{-1}x, \sec^{-1}x$:** Range in $[0, \pi]$ ($f(-x) = \pi - f(x)$).
- **Domain Check:** 
    - $\sin^{-1}x, \cos^{-1}x \in [-1, 1]$.
    - $\sec^{-1}x, \operatorname{cosec}^{-1}x \in (-\infty, -1] \cup [1, \infty)$.

## 2. Fundamental Properties
### 2.1 Complementary Relations
- $\sin^{-1}x + \cos^{-1}x = \pi/2$.
- $\tan^{-1}x + \cot^{-1}x = \pi/2$.
- $\sec^{-1}x + \operatorname{cosec}^{-1}x = \pi/2$.

### 2.2 Composition Properties
- **$f(f^{-1}x) = x$:** Always true for $x$ in domain.
- **$f^{-1}(fx) = x$:** ONLY true if $x$ is in the PVR. If $x \
otin$ PVR, use periodicity to bring it in.
    - Example: $\sin^{-1}(\sin 10) = \sin^{-1}(\sin(3\pi - 10)) = 3\pi - 10$.

## 3. Formulas and Series
### 3.1 Operations
- **$\tan^{-1}$ Sum:** $\tan^{-1}x + \tan^{-1}y = \tan^{-1} \left( \frac{x+y}{1-xy} \right) + k\pi$, where $k$ depends on the quadrant of $(x, y)$.
- **Multiple Angles:**
    - $2\tan^{-1}x = \sin^{-1} \frac{2x}{1+x^2} = \cos^{-1} \frac{1-x^2}{1+x^2} = \tan^{-1} \frac{2x}{1-x^2}$.

### 3.2 Summation of Inverse Series
- **Method of Differences:** Express general term as $T_r = \tan^{-1} \left( \frac{a_r - a_{r-1}}{1 + a_r a_{r-1}} \right) = \tan^{-1} a_r - \tan^{-1} a_{r-1}$.

## 4. Visual Aids & Diagrams
*(Imagine the graph of $\sin^{-1}x$—it's the graph of $\sin x$ reflected about $y=x$ but only between $-\pi/2$ and $\pi/2$. Visualize the "jagged" periodic graphs of $f^{-1}(fx)$ which look like a saw-tooth or mountain range. For summation of series, visualize a chain of terms where each middle term cancels out, leaving only the start and the end.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Evaluating $f^{-1}(fx)$ for large $x$
**Q1.** Find the value of $\cos^{-1}(\cos 12)$.
**Concept:** Range of $\cos^{-1}$ is $[0, \pi]$. $12 \approx 3.82\pi$. Close even multiple is $4\pi$.
**Solution:**
1. $\cos 12 = \cos(4\pi - 12)$.
2. Is $0 \le 4\pi - 12 \le \pi$? Yes ($0 \le 12.56-12 \le 3.14$).
3. $\cos^{-1}(\cos 12) = 4\pi - 12$.

### Type 2: Summation of $\tan^{-1}$ Series
**Q1.** Find $\sum_{r=1}^{n} \tan^{-1} \left( \frac{2r}{1 + r^2 + r^4} \right)$.
**Concept:** Factorize denominator: $1 + r^2 + r^4 = (r^2+r+1)(r^2-r+1)$.
**Solution:**
1. $T_r = \tan^{-1} \left[ \frac{(r^2+r+1) - (r^2-r+1)}{1 + (r^2+r+1)(r^2-r+1)} \right]$.
2. $T_r = \tan^{-1}(r^2+r+1) - \tan^{-1}(r^2-r+1)$.
3. Telescoping sum: $S_n = \tan^{-1}(n^2+n+1) - \tan^{-1}(1)$.
4. $S_n = \tan^{-1} \left( \frac{n^2+n}{n^2+n+2} \right)$.

### Type 3: Inverse Trigonometric Equations
**Q1.** Solve $\sin^{-1} x + \sin^{-1} 2x = \pi/3$.
**Concept:** Take $\sin$ on both sides or use $A+B$ formula.
**Solution:**
1. Let $\sin^{-1} x = \alpha, \sin^{-1} 2x = \beta \Rightarrow \alpha + \beta = \pi/3$.
2. $\sin(\alpha+\beta) = \sin \alpha \cos \beta + \cos \alpha \sin \beta = \sqrt{3}/2$.
3. $x \sqrt{1-4x^2} + 2x \sqrt{1-x^2} = \sqrt{3}/2$. Solve for $x$.
4. $x = \frac{1}{2} \sqrt{3/7}$ is a possible solution (verify domain).
