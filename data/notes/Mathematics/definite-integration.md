---
id: definite-integration
title: "Definite Integration"
subject: "Mathematics"
chapter: "Calculus"
lastUpdated: "2026-05-17T23:10:00Z"
order: 9
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Calculus: Definite Integration & Area

## 1. Fundamental Properties
### 1.1 The "King" and "Queen" Properties
- **King's Property:** $\int_a^b f(x) dx = \int_a^b f(a+b-x) dx$. (Master this for JEE).
- **Queen's Property:** $\int_0^{2a} f(x) dx = 2\int_0^a f(x) dx$ if $f(2a-x) = f(x)$, and $0$ if $f(2a-x) = -f(x)$.
- **Periodic Property:** If $f(x)$ has period $T$, then $\int_a^{a+nT} f(x) dx = n \int_0^T f(x) dx$.

### 1.2 Leibniz Rule
- **Formula:** $\frac{d}{dx} \int_{g(x)}^{h(x)} f(t) dt = f(h(x))h'(x) - f(g(x))g'(x)$.
- Used to find limits of integrals and to differentiate integral functions.

## 2. Integration as a Limit of Sum
- **The Series Formula:** $\lim_{n \to \infty} \frac{1}{n} \sum_{r=1}^{n} f(r/n) = \int_0^1 f(x) dx$.
- **Steps:** 
    1. Express series in $\sum$ form.
    2. Replace $r/n$ with $x$ and $1/n$ with $dx$.
    3. Set limits based on $r/n$.

## 3. Applications: Area Under Curves
- **Area between two curves:** $A = \int_a^b |f(x) - g(x)| dx$.
- **Area with y-axis:** $A = \int_c^d x dy = \int_c^d f^{-1}(y) dy$.
- **Average Value:** $f_{avg} = \frac{1}{b-a} \int_a^b f(x) dx$.

## 4. Visual Aids & Diagrams
*(Imagine the area under a curve as a series of infinitely thin rectangles being summed up. Visualize King's property as flipping the graph about the midpoint of the interval $[a, b]$—the area remains identical. See the area between two intersecting parabolas as the region "trapped" between them. For the limit of sum, visualize the rectangles getting thinner and thinner until they perfectly fill the area.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Leibniz Rule Application
**Q1.** Find $\lim_{x \to 0} \frac{\int_0^{x^2} \sin \sqrt{t} dt}{x^3}$.
**Concept:** $0/0$ form, use L'Hopital and Leibniz Rule.
**Solution:**
1. Diff top: $\sin(\sqrt{x^2}) \cdot (2x) = x \sin x \cdot 2$.
2. Diff bottom: $3x^2$.
3. Limit $= \lim_{x \to 0} \frac{2x \sin x}{3x^2} = \frac{2}{3} \lim_{x \to 0} \frac{\sin x}{x} = 2/3$.

### Type 2: Sum of Series as Integral
**Q1.** Evaluate $\lim_{n \to \infty} \left[ \frac{1}{n+1} + \frac{1}{n+2} + \dots + \frac{1}{2n} \right]$.
**Concept:** $\lim \frac{1}{n} \sum \frac{1}{1+r/n} = \int_0^1 \frac{dx}{1+x}$.
**Solution:**
1. Series $= \sum_{r=1}^n \frac{1}{n+r} = \frac{1}{n} \sum_{r=1}^n \frac{1}{1+r/n}$.
2. Integral $= \int_0^1 \frac{dx}{1+x} = [\ln(1+x)]_0^1 = \ln 2$.

### Type 3: Area between Curves
**Q1.** Find the area bounded by $y^2 = x$ and $y = x^2$.
**Concept:** $\int_a^b (f_{upper} - f_{lower}) dx$.
**Solution:**
1. Points of intersection: $x^2 = \sqrt{x} \Rightarrow x^4 = x \Rightarrow x(x^3-1) = 0 \Rightarrow x=0, 1$.
2. Area $= \int_0^1 (\sqrt{x} - x^2) dx = [\frac{2}{3}x^{3/2} - \frac{x^3}{3}]_0^1 = 2/3 - 1/3 = 1/3$.
