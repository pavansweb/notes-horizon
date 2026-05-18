---
id: differential-equations
title: "Differential Equations"
subject: "Mathematics"
chapter: "Calculus"
lastUpdated: "2026-05-17T23:15:00Z"
order: 9
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Calculus: Differential Equations

## 1. Formation & Properties
### 1.1 Order and Degree
- **Order:** Highest derivative order in the equation.
- **Degree:** Highest power of the highest order derivative, provided the equation is a polynomial in derivatives. 
    - Note: If $y'$ is inside a $\sin, \log$, or $e$, degree is **undefined**.
- **Formation:** To form a DE for a family with $n$ arbitrary constants, differentiate $n$ times and eliminate the constants.

## 2. Solving Methods
### 2.1 Variable Separable & Reducible
- **Separable:** $f(x) dx = g(y) dy$.
- **Reducible:** For $y' = f(ax+by+c)$, substitute $ax+by+c = t$.

### 2.2 Linear Differential Equation (LDE)
- **Form:** $\frac{dy}{dx} + Py = Q$, where $P, Q$ are functions of $x$.
- **Integrating Factor ($IF$):** $IF = e^{\int P dx}$.
- **Solution:** $y \cdot IF = \int (Q \cdot IF) dx + C$.
- **Bernoulli's Equation:** $\frac{dy}{dx} + Py = Qy^n$. Divide by $y^n$ and substitute $y^{1-n} = t$ to make it LDE.

### 2.3 Inspection Method (Exact Form)
Use standard differentials to solve quickly:
- $x dy + y dx = d(xy)$
- $\frac{y dx - x dy}{y^2} = d(x/y)$
- $\frac{x dy - y dx}{x^2 + y^2} = d(\tan^{-1}(y/x))$

## 3. Visual Aids & Diagrams
*(Imagine a direction field where tiny arrows represent the slope $dy/dx$ at each point $(x, y)$. The solution curve is like a stream flowing through these arrows, following their direction. Visualize the "Orthogonal Trajectories" of a family of circles (lines passing through the origin) intersecting every circle at a right angle.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Linear DE with Initial Conditions
**Q1.** Solve $\frac{dy}{dx} + \frac{y}{x} = x^2$ given $y(1) = 1/4$.
**Concept:** $P = 1/x, Q = x^2$.
**Solution:**
1. $IF = e^{\int (1/x) dx} = e^{\ln x} = x$.
2. $y \cdot x = \int (x^2 \cdot x) dx = \int x^3 dx = \frac{x^4}{4} + C$.
3. At $x=1, y=1/4$: $(1/4)(1) = 1/4 + C \Rightarrow C = 0$.
4. $yx = x^4/4 \Rightarrow y = x^3/4$.

### Type 2: Bernoulli's Equation
**Q1.** Solve $y' + \frac{y}{x} = y^2 \ln x$.
**Concept:** $n=2$, substitute $t = y^{-1}$.
**Solution:**
1. Divide by $y^2$: $y^{-2} y' + \frac{y^{-1}}{x} = \ln x$.
2. Let $t = y^{-1} \Rightarrow dt/dx = -y^{-2} y'$.
3. $-dt/dx + t/x = \ln x \Rightarrow dt/dx - t/x = -\ln x$.
4. $IF = e^{\int (-1/x) dx} = 1/x$.
5. $t(1/x) = \int -\frac{\ln x}{x} dx = -\frac{(\ln x)^2}{2} + C$.
6. $\frac{1}{xy} = C - \frac{(\ln x)^2}{2}$.

### Type 3: Formation of DE
**Q1.** Find the DE of circles passing through the origin and having centers on the x-axis.
**Concept:** Center $(a, 0)$, Equation $(x-a)^2 + y^2 = a^2$.
**Solution:**
1. $x^2 - 2ax + a^2 + y^2 = a^2 \Rightarrow x^2 + y^2 = 2ax$.
2. Diff w.r.t $x$: $2x + 2yy' = 2a$.
3. Sub $2a$ back into original: $x^2 + y^2 = x(2x + 2yy')$.
4. $x^2 + y^2 = 2x^2 + 2xyy' \Rightarrow y^2 - x^2 = 2xyy'$.
