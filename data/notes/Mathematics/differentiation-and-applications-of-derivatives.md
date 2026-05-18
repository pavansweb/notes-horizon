---
id: differentiation-and-applications-of-derivatives
title: "Differentiation and Applications of Derivatives"
subject: "Mathematics"
chapter: "Calculus"
lastUpdated: "2026-05-17T23:00:00Z"
order: 7
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Calculus: AOD & Differentiation

## 1. Advanced Differentiation Methods
### 1.1 Special Functions
- **Logarithmic Differentiation:** Used for $y = [f(x)]^{g(x)}$. $\ln y = g(x) \ln f(x) \Rightarrow \frac{dy}{dx} = y [g'(x)\ln f(x) + g(x)f'(x)/f(x)]$.
- **Infinite Series:** If $y = \sqrt{f(x) + y}$, then $\frac{dy}{dx} = \frac{f'(x)}{2y-1}$.
- **Inverse Functions:** $\frac{dx}{dy} = 1 / \frac{dy}{dx}$. $\frac{d^2x}{dy^2} = -\frac{d^2y/dx^2}{(dy/dx)^3}$.

## 2. Tangents & Normals
### 2.1 Equations and Geometric Lengths
- **Tangent:** $y - y_1 = f'(x_1)(x - x_1)$.
- **Normal:** $y - y_1 = -\frac{1}{f'(x_1)}(x - x_1)$.
- **Lengths at $(x_1, y_1)$ (where $m = f'(x_1)$):**
    - **Sub-tangent:** $|y_1/m|$.
    - **Sub-normal:** $|y_1 m|$.
    - **Tangent Length ($L_T$):** $|y_1| \sqrt{1+1/m^2}$.
    - **Normal Length ($L_N$):** $|y_1| \sqrt{1+m^2}$.

## 3. Monotonicity and Maxima/Minima
### 3.1 Monotonicity
- **Increasing:** $f'(x) \ge 0$ (Equality only at isolated points).
- **Decreasing:** $f'(x) \le 0$.

### 3.2 Extrema
- **Critical Points:** $f'(x) = 0$ OR $f'(x)$ is undefined.
- **Stationary Points:** $f'(x) = 0$.
- **Point of Inflection:** Where concavity changes ($f''(x) = 0$ and $f'''(x) \
eq 0$).
- **Greatest/Least Value:** Check critical points AND endpoints in a closed interval $[a, b]$.

## 4. Visual Aids & Diagrams
*(Imagine a smooth curve with a line touching it at one point—that's the tangent. The line perpendicular to it is the normal. Visualize a "peak" (maxima) and a "valley" (minima) where the tangent is perfectly horizontal. For concavity, see a cup facing up ($f''>0$) or down ($f''<0$), with the inflection point as the transition between them.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Tangent to Curve
**Q1.** Find the point on $y^2 = 8x$ where the tangent is inclined at $45^\circ$ to the x-axis.
**Concept:** $dy/dx = \tan 45^\circ = 1$.
**Solution:**
1. $2y (dy/dx) = 8 \Rightarrow y(1) = 4 \Rightarrow y = 4$.
2. $y^2 = 8x \Rightarrow 16 = 8x \Rightarrow x = 2$.
3. Point: $(2, 4)$.

### Type 2: Monotonicity Intervals
**Q1.** Find the interval where $f(x) = x^3 - 3x^2 - 9x + 5$ is increasing.
**Concept:** $f'(x) \ge 0$.
**Solution:**
1. $f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x-3)(x+1)$.
2. $f'(x) \ge 0 \Rightarrow (x-3)(x+1) \ge 0$.
3. $x \in (-\infty, -1] \cup [3, \infty)$.

### Type 3: Global Maxima/Minima
**Q1.** Find the minimum value of $f(x) = x + 1/x$ for $x > 0$.
**Concept:** AM-GM inequality or $f'(x)=0$.
**Solution:**
1. $f'(x) = 1 - 1/x^2 = 0 \Rightarrow x^2 = 1 \Rightarrow x = 1$ (since $x>0$).
2. $f(1) = 1 + 1 = 2$.
3. $f''(x) = 2/x^3 \Rightarrow f''(1) = 2 > 0$ (Minima).
4. Min value is $2$.
