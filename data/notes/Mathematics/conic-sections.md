---
id: conic-sections
title: "Conic Sections"
subject: "Mathematics"
chapter: "Coordinate Geometry"
lastUpdated: "2026-05-17T23:25:00Z"
order: 11
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Coordinate Geometry: Conics (Parabola, Ellipse, Hyperbola)

## 1. Parabola ($e=1$)
### 1.1 Standard Equations
- $y^2 = 4ax$: Focus $(a, 0)$, Directrix $x = -a$, LR length $4a$.
- **Parametric Form:** $(at^2, 2at)$.
- **Tangent (Slope $m$):** $y = mx + a/m$.
- **Normal (Slope $m$):** $y = mx - 2am - am^3$.

### 1.2 Key Properties
- **Focal Chord:** If $(at_1^2, 2at_1)$ and $(at_2^2, 2at_2)$ are ends of a focal chord, then $t_1 t_2 = -1$.
- **Reflection:** Rays from focus reflect parallel to the axis.

## 2. Ellipse ($e < 1$)
### 2.1 Standard Equations
- $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$: $b^2 = a^2(1-e^2)$. Foci $(\pm ae, 0)$.
- **Parametric Form:** $(a \cos \theta, b \sin \theta)$.
- **Tangent (Slope $m$):** $y = mx \pm \sqrt{a^2m^2 + b^2}$.
- **Normal (at $\theta$):** $\frac{ax}{\cos \theta} - \frac{by}{\sin \theta} = a^2 - b^2$.

### 2.2 Key Properties
- **Focal Property:** $PS_1 + PS_2 = 2a$ (sum of distances from foci is constant).
- **Director Circle:** $x^2 + y^2 = a^2 + b^2$.

## 3. Hyperbola ($e > 1$)
### 3.1 Standard Equations
- $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$: $b^2 = a^2(e^2-1)$. Foci $(\pm ae, 0)$.
- **Conjugate Hyperbola:** $-\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.
- **Rectangular Hyperbola ($e = \sqrt{2}$):** $x^2 - y^2 = a^2$ OR $xy = c^2$.

### 3.2 Tangents & Asymptotes
- **Tangent (Slope $m$):** $y = mx \pm \sqrt{a^2m^2 - b^2}$.
- **Asymptotes:** $y = \pm \frac{b}{a} x$. The angle between them is $2\tan^{-1}(b/a)$.

## 4. Visual Aids & Diagrams
*(Imagine a cone being sliced at different angles: a parallel slice is a circle, a tilted slice is an ellipse, a slice parallel to the side is a parabola, and a steep vertical slice is a hyperbola. Visualize the "focal property" of an ellipse as a gardener drawing a circle with two stakes and a loose loop of string. For hyperbola, see the curve approaching its asymptotes but never touching them.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Tangent to Parabola
**Q1.** Find the equation of common tangent to $y^2 = 4x$ and $x^2 = 32y$.
**Concept:** $y = mx + 1/m$ must also touch $x^2 = 32y$.
**Solution:**
1. Tangent to $y^2=4x$ is $y = mx + 1/m$.
2. Sub into $x^2 = 32y$: $x^2 = 32(mx + 1/m) \Rightarrow x^2 - 32mx - 32/m = 0$.
3. For tangency, $D = 0 \Rightarrow (32m)^2 - 4(1)(-32/m) = 0$.
4. $32^2 m^2 + 128/m = 0 \Rightarrow 1024 m^3 + 128 = 0 \Rightarrow m^3 = -1/8 \Rightarrow m = -1/2$.
5. Tangent: $y = -x/2 - 2 \Rightarrow x + 2y + 4 = 0$.

### Type 2: Eccentricity of Hyperbola
**Q1.** If the latus rectum of a hyperbola is half of its transverse axis, find its eccentricity.
**Concept:** $2b^2/a = a \Rightarrow 2b^2 = a^2$.
**Solution:**
1. $b^2 = a^2(e^2-1) \Rightarrow a^2/2 = a^2(e^2-1)$.
2. $1/2 = e^2 - 1 \Rightarrow e^2 = 3/2 \Rightarrow e = \sqrt{3/2}$.

### Type 3: Area of Triangle (Coordinate Geometry)
**Q1.** Find the area of the triangle formed by the tangent to $x^2/a^2 + y^2/b^2 = 1$ at $(a \cos \theta, b \sin \theta)$ with the coordinate axes.
**Concept:** Tangent is $x \cos \theta / a + y \sin \theta / b = 1$.
**Solution:**
1. X-intercept: $x = a / \cos \theta$. Y-intercept: $y = b / \sin \theta$.
2. Area $= 1/2 |xy| = 1/2 |ab / (\sin \theta \cos \theta)| = |ab / \sin 2\theta|$.
3. Min area is $ab$ when $\theta = 45^circ$.
