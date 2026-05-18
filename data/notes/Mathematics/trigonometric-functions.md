---
id: trigonometric-functions
title: "Trigonometric Functions & Identities"
subject: "Mathematics"
chapter: "Trigonometry"
lastUpdated: "2026-05-17T22:35:00Z"
order: 13
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Trigonometry: Identities & Equations

## 1. Trigonometric Identities
### 1.1 Compound Angles & Multiple Angles
- **Compound:** $\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B}$.
- **Multiple Angles:**
    - $\sin 3\theta = 3 \sin \theta - 4 \sin^3 \theta$.
    - $\cos 3\theta = 4 \cos^3 \theta - 3 \cos \theta$.
    - $\tan 3\theta = \frac{3 \tan \theta - \tan^3 \theta}{1 - 3 \tan^2 \theta}$.
- **Conditional Identities (If $A+B+C = \pi$):**
    - $\sum \tan A = \prod \tan A$.
    - $\sum \sin 2A = 4 \sin A \sin B \sin C$.

### 1.2 Summation of Series
- **Sine Series:** $\sum_{r=0}^{n-1} \sin(a + r\beta) = \frac{\sin(n\beta/2)}{\sin(\beta/2)} \sin \left( a + \frac{(n-1)\beta}{2} \right)$.
- **Cosine Series:** $\sum_{r=0}^{n-1} \cos(a + r\beta) = \frac{\sin(n\beta/2)}{\sin(\beta/2)} \cos \left( a + \frac{(n-1)\beta}{2} \right)$.

## 2. Trigonometric Equations
### 2.1 General Solutions
- **Linear Form:** $a \cos \theta + b \sin \theta = c$. Divide by $\sqrt{a^2+b^2}$ to convert to $\cos(\theta - \alpha) = d$.
- **Square Form:** $\sin^2 \theta = \sin^2 \alpha \Rightarrow \theta = n\pi \pm \alpha$.

### 2.2 Maximum and Minimum Values
- $y = a \cos \theta + b \sin \theta + c$ has range $[c - \sqrt{a^2+b^2}, c + \sqrt{a^2+b^2}]$.

## 3. Properties and Graphs
- **Domain & Range:**
    - $\sec \theta, \tan \theta$: $\theta \neq (2n+1)\pi/2$.
    - $\operatorname{cosec} \theta, \cot \theta$: $\theta \neq n\pi$.
- **Periods:** $\sin, \cos, \sec, \operatorname{cosec}$ have period $2\pi$. $\tan, \cot$ have period $\pi$. $|\sin x|$ has period $\pi$.

## 4. Visual Aids & Diagrams
*(Imagine a unit circle where $(\cos \theta, \sin \theta)$ represents any point on the circumference. Visualize the graph of $\sin x$ waving smoothly between $1$ and $-1$, while $\tan x$ has vertical asymptotes at every odd multiple of $\pi/2$. For compound angles, see the rotation of a vector in the complex plane.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Value of Products (Special Form)
**Q1.** Find the value of $\cos \frac{\pi}{7} \cos \frac{2\pi}{7} \cos \frac{4\pi}{7}$.
**Concept:** $\prod_{r=0}^{n-1} \cos(2^r \theta) = \frac{\sin(2^n \theta)}{2^n \sin \theta}$.
**Solution:**
1. Here $\theta = \pi/7, n=3$.
2. $Value = \frac{\sin(8\pi/7)}{8 \sin(\pi/7)} = \frac{\sin(\pi + \pi/7)}{8 \sin(\pi/7)} = \frac{-\sin(\pi/7)}{8 \sin(\pi/7)} = -1/8$.

### Type 2: Summation of Series
**Q1.** Solve $\sin \frac{\pi}{n} + \sin \frac{2\pi}{n} + \dots + \sin \frac{(n-1)\pi}{n}$.
**Concept:** Sine series with $a = \pi/n, \beta = \pi/n$, terms $= n-1$.
**Solution:**
1. $Sum = \frac{\sin((n-1)\pi/2n)}{\sin(\pi/2n)} \sin \left[ \frac{\pi}{n} + \frac{(n-2)\pi}{2n} \right]$.
2. $= \frac{\sin(\pi/2 - \pi/2n)}{\sin(\pi/2n)} \sin(\pi/2) = \frac{\cos(\pi/2n)}{\sin(\pi/2n)} = \cot \frac{\pi}{2n}$.

### Type 3: General Solution with Constraints
**Q1.** Find the number of solutions of $\sin 2x - \cos x = 0$ in $[0, 2\pi]$.
**Concept:** $2 \sin x \cos x - \cos x = 0 \Rightarrow \cos x (2 \sin x - 1) = 0$.
**Solution:**
1. $\cos x = 0 \Rightarrow x = \pi/2, 3\pi/2$.
2. $\sin x = 1/2 \Rightarrow x = \pi/6, 5\pi/6$.
3. Total solutions $= 4$.
