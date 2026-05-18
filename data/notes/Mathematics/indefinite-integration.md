---
id: indefinite-integration
title: "Indefinite Integration"
subject: "Mathematics"
chapter: "Calculus"
lastUpdated: "2026-05-17T23:05:00Z"
order: 8
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Calculus: Indefinite Integration

## 1. Advanced Substitution Techniques
### 1.1 Special Substitutions
- **Bi-quadratics:** For $\int \frac{x^2 \pm 1}{x^4 + kx^2 + 1} dx$. Divide by $x^2$ and substitute $x \mp 1/x = t$.
- **Rational/Irrational Combination:**
    - $\int \frac{dx}{(ax+b)\sqrt{cx+d}}$: Substitute $\sqrt{cx+d} = t$.
    - $\int \frac{dx}{(ax^2+b)\sqrt{cx^2+d}}$: Substitute $x = 1/t$.

### 1.2 Euler's Substitution
Used for $\int \sqrt{ax^2+bx+c} dx$. Substitutions depend on the sign of $a$ and roots of the quadratic.

## 2. Integration by Parts & Partial Fractions
### 2.1 Integration by Parts (IBP)
- **Standard:** $\int uv dx = u\int v dx - \int (u' \int v dx) dx$.
- **Integral of $e^x(f(x) + f'(x))$:** $e^x f(x) + C$.
- **Integral of $f(\ln x) + f'(\ln x)$:** $x f(\ln x) + C$.

### 2.2 Partial Fractions
- **Case 1 (Linear):** $\frac{1}{(x-a)(x-b)} = \frac{1}{a-b} [\frac{1}{x-a} - \frac{1}{x-b}]$.
- **Case 2 (Quadratic):** For non-factorable $ax^2+bx+c$, use $\frac{Ax+B}{ax^2+bx+c}$.

## 3. Standard Trigonometric Forms
- $\int \frac{dx}{a + b\cos x + c\sin x}$: Use $\tan(x/2) = t$.
- $\int \sin^m x \cos^n x dx$: 
    - If $m$ is odd, let $\cos x = t$.
    - If $n$ is odd, let $\sin x = t$.
    - If both even, use double angle formulas.

## 4. Visual Aids & Diagrams
*(Imagine a family of parallel curves shifting vertically—each one is an anti-derivative differing by a constant $C$. Visualize the area "sweeping" under a curve as the variable upper limit of an integral. For partial fractions, see a complex rational function being "broken down" into simpler building blocks whose integrals are standard logs or inverse tans.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Bi-quadratic Form
**Q1.** Evaluate $\int \frac{x^2 + 1}{x^4 + 1} dx$.
**Concept:** Divide by $x^2$.
**Solution:**
1. $I = \int \frac{1 + 1/x^2}{x^2 + 1/x^2} dx$.
2. Let $x - 1/x = t \Rightarrow (1 + 1/x^2) dx = dt$.
3. $x^2 + 1/x^2 = t^2 + 2$.
4. $I = \int \frac{dt}{t^2 + 2} = \frac{1}{\sqrt{2}} \tan^{-1} \left( \frac{t}{\sqrt{2}} \right) + C$.
5. $I = \frac{1}{\sqrt{2}} \tan^{-1} \left( \frac{x^2-1}{x\sqrt{2}} \right) + C$.

### Type 2: Integration by Parts (Advanced)
**Q1.** Evaluate $\int e^x \frac{x-1}{(x+1)^3} dx$.
**Concept:** Express as $e^x(f(x) + f'(x))$.
**Solution:**
1. $\frac{x-1}{(x+1)^3} = \frac{(x+1)-2}{(x+1)^3} = \frac{1}{(x+1)^2} - \frac{2}{(x+1)^3}$.
2. Let $f(x) = \frac{1}{(x+1)^2}$. Then $f'(x) = -\frac{2}{(x+1)^3}$.
3. $I = e^x \frac{1}{(x+1)^2} + C$.

### Type 3: Special Substitution $x=1/t$
**Q1.** Evaluate $\int \frac{dx}{x^2 \sqrt{1+x^2}}$.
**Concept:** Let $x = 1/t \Rightarrow dx = -dt/t^2$.
**Solution:**
1. $I = \int \frac{-dt/t^2}{(1/t^2) \sqrt{1+1/t^2}} = -\int \frac{dt}{\frac{1}{t} \sqrt{t^2+1}} = -\int \frac{t dt}{\sqrt{t^2+1}}$.
2. Let $t^2+1 = z^2 \Rightarrow t dt = z dz$.
3. $I = -\int dz = -z + C = -\sqrt{t^2+1} + C = -\sqrt{1/x^2+1} + C = -\frac{\sqrt{1+x^2}}{x} + C$.
