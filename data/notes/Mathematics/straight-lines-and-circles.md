---
id: straight-lines-and-circles
title: "Straight Lines and Circles"
subject: "Mathematics"
chapter: "Coordinate Geometry"
lastUpdated: "2026-05-17T23:20:00Z"
order: 10
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Coordinate Geometry: Lines & Circles

## 1. Straight Lines
### 1.1 Fundamental Formulas
- **Distance and Section:** Distance $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. Section $P = \frac{m\vec{x}_2 \pm n\vec{x}_1}{m \pm n}$.
- **Slope ($m$):** $\tan \theta$. Perpendicular lines: $m_1 m_2 = -1$.
- **Area of Triangle:** $\frac{1}{2} |\sum x_1(y_2-y_3)|$.

### 1.2 Lines & Points
- **Foot of Perpendicular ($h, k$):** $\frac{h-x_1}{a} = \frac{k-y_1}{b} = -\frac{ax_1+by_1+c}{a^2+b^2}$.
- **Image of Point ($h, k$):** $\frac{h-x_1}{a} = \frac{k-y_1}{b} = -2\frac{ax_1+by_1+c}{a^2+b^2}$.
- **Angle Bisectors:** $\frac{ax+by+c}{\sqrt{a^2+b^2}} = \pm \frac{a'x+b'y+c'}{\sqrt{a'^2+b'^2}}$. Use $aa'+bb'$ sign to identify acute/obtuse.

## 2. Circle Theory
### 2.1 Equations and Tangents
- **Standard Circle:** $x^2 + y^2 + 2gx + 2fy + c = 0$. Center $(-g, -f)$, $r = \sqrt{g^2+f^2-c}$.
- **Tangent at $(x_1, y_1)$:** $xx_1 + yy_1 + g(x+x_1) + f(y+y_1) + c = 0$.
- **Director Circle:** $x^2 + y^2 = 2r^2$. Locus of points from which perpendicular tangents can be drawn.

### 2.2 System of Circles
- **Radical Axis:** $S_1 - S_2 = 0$. Perpendicular to the line joining centers.
- **Orthogonality:** $2g_1g_2 + 2f_1f_2 = c_1 + c_2$.
- **Common Tangents:** 
    - If $d > r_1+r_2$: 4 common tangents (2 direct, 2 transverse).
    - If $d = r_1+r_2$: 3 common tangents.
    - If $d = |r_1-r_2|$: 1 common tangent.

## 3. Visual Aids & Diagrams
*(Imagine a line as a path and its image across another line as a mirror reflection. Visualize the radical axis of two circles as the line where tangents drawn to both circles have equal length. See the angle bisectors as two lines splitting the four angles formed by an intersection into equal halves. For common tangents, visualize two gears connected by an external and internal belt.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Image of a Point
**Q1.** Find the image of point $(1, 2)$ in the line $x - 3y + 4 = 0$.
**Concept:** Image formula with $-2$ multiplier.
**Solution:**
1. $\frac{h-1}{1} = \frac{k-2}{-3} = -2 \frac{1-3(2)+4}{1^2+(-3)^2} = -2 \frac{-1}{10} = 1/5$.
2. $h-1 = 1/5 \Rightarrow h = 6/5$.
3. $k-2 = -3/5 \Rightarrow k = 7/5$.
4. Image: $(1.2, 1.4)$.

### Type 2: Orthogonal Circles
**Q1.** Find $k$ if $x^2 + y^2 + kx + 4y - 5 = 0$ and $x^2 + y^2 - 2x + y + 1 = 0$ are orthogonal.
**Concept:** $2g_1g_2 + 2f_1f_2 = c_1 + c_2$.
**Solution:**
1. $g_1 = k/2, f_1 = 2, c_1 = -5$.
2. $g_2 = -1, f_2 = 0.5, c_2 = 1$.
3. $2(k/2)(-1) + 2(2)(0.5) = -5 + 1$.
4. $-k + 2 = -4 \Rightarrow k = 6$.

### Type 3: Length of Tangent
**Q1.** Find the length of tangent from $(5, 4)$ to the circle $x^2 + y^2 - 4x - 2y - 11 = 0$.
**Concept:** $L = \sqrt{S_1}$.
**Solution:**
1. $S_1 = 5^2 + 4^2 - 4(5) - 2(4) - 11 = 25 + 16 - 20 - 8 - 11 = 41 - 39 = 2$.
2. $L = \sqrt{2}$.
