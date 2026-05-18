---
id: vectors-and-three-dimensional-geometry
title: "Vectors and Three-Dimensional Geometry"
subject: "Mathematics"
chapter: "Coordinate Geometry"
lastUpdated: "2026-05-17T23:30:00Z"
order: 12
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Vectors & 3D Geometry

## 1. Vector Algebra (Deep Dive)
### 1.1 Multi-Vector Products
- **Scalar Triple Product (STP):** $[\vec{a} \vec{b} \vec{c}] = \vec{a} \cdot (\vec{b} \times \vec{c})$. 
    - Volume of parallelepiped $= |[\vec{a} \vec{b} \vec{c}]|$.
    - If $[\vec{a} \vec{b} \vec{c}] = 0$, vectors are coplanar.
- **Vector Triple Product (VTP):** $\vec{a} \times (\vec{b} \times \vec{c}) = (\vec{a} \cdot \vec{c})\vec{b} - (\vec{a} \cdot \vec{b})\vec{c}$.
    - Note: It is a vector in the plane of $\vec{b}$ and $\vec{c}$.

### 1.2 Geometrical Applications
- **Area of Triangle:** $\frac{1}{2} |\vec{a} \times \vec{b}|$.
- **Area of Parallelogram:** $|\vec{a} \times \vec{b}|$ (sides) or $\frac{1}{2} |\vec{d}_1 \times \vec{d}_2|$ (diagonals).

## 2. Three-Dimensional Geometry
### 2.1 Lines in 3D
- **Vector Eq:** $\vec{r} = \vec{a} + \lambda \vec{b}$.
- **Shortest Distance (Skew Lines):** $d = \frac{|(\vec{a}_2 - \vec{a}_1) \cdot (\vec{b}_1 \times \vec{b}_2)|}{|\vec{b}_1 \times \vec{b}_2|}$.
- **Shortest Distance (Parallel Lines):** $d = \frac{|(\vec{a}_2 - \vec{a}_1) \times \vec{b}|}{|\vec{b}|}$.

### 2.2 Planes
- **General Eq:** $ax + by + cz + d = 0$. Normal vector $\vec{n} = a\hat{i} + b\hat{j} + c\hat{k}$.
- **Foot of Perpendicular from $(x_1, y_1, z_1)$:** $\frac{x-x_1}{a} = \frac{y-y_1}{b} = \frac{z-z_1}{c} = -\frac{ax_1+by_1+cz_1+d}{a^2+b^2+c^2}$.
- **Angle between Line and Plane:** $\sin \theta = \frac{|\vec{b} \cdot \vec{n}|}{|\vec{b}||\vec{n}|}$.

## 3. Visual Aids & Diagrams
*(Imagine two lines in space that are not parallel and never intersect—these are skew lines. Visualize the shortest distance as the length of the common perpendicular. See a plane as a flat sheet and the normal vector as a flagpole sticking straight up from it. For STP, visualize a 3D box (parallelepiped) whose edges are the three vectors; the product is the volume of this box.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Shortest Distance between Skew Lines
**Q1.** Find the distance between $L_1: \frac{x-1}{2} = \frac{y-2}{3} = \frac{z-3}{4}$ and $L_2: \frac{x-2}{3} = \frac{y-4}{4} = \frac{z-5}{5}$.
**Concept:** $d = |[\vec{a}_2-\vec{a}_1, \vec{b}_1, \vec{b}_2]| / |\vec{b}_1 \times \vec{b}_2|$.
**Solution:**
1. $\vec{a}_2 - \vec{a}_1 = (1, 2, 2)$. $\vec{b}_1 = (2, 3, 4), \vec{b}_2 = (3, 4, 5)$.
2. $\vec{b}_1 \times \vec{b}_2 = \begin{vmatrix} i & j & k \\ 2 & 3 & 4 \\ 3 & 4 & 5 \end{vmatrix} = (-1, 2, -1)$.
3. $[\vec{a}_2-\vec{a}_1, \vec{b}_1, \vec{b}_2] = (1)(-1) + (2)(2) + (2)(-1) = -1 + 4 - 2 = 1$.
4. $d = 1 / \sqrt{1+4+1} = 1/\sqrt{6}$.

### Type 2: Image of Point in Plane
**Q1.** Find the image of $(1, 3, 4)$ in the plane $2x - y + z + 3 = 0$.
**Concept:** Use the foot formula with $-2$ factor.
**Solution:**
1. $\frac{x-1}{2} = \frac{y-3}{-1} = \frac{z-4}{1} = -2 \frac{2(1)-3+4+3}{4+1+1} = -2 \frac{6}{6} = -2$.
2. $x-1 = -4 \Rightarrow x = -3$.
3. $y-3 = 2 \Rightarrow y = 5$.
4. $z-4 = -2 \Rightarrow z = 2$.
5. Image: $(-3, 5, 2)$.

### Type 3: Vector Triple Product
**Q1.** If $\vec{a}, \vec{b}, \vec{c}$ are unit vectors such that $\vec{a} \times (\vec{b} \times \vec{c}) = \frac{1}{2} \vec{b}$, find angles $\vec{a}$ makes with $\vec{b}$ and $\vec{c}$.
**Concept:** $(\vec{a} \cdot \vec{c})\vec{b} - (\vec{a} \cdot \vec{b})\vec{c} = 1/2 \vec{b}$.
**Solution:**
1. Comparing coefficients: $\vec{a} \cdot \vec{c} = 1/2$ and $\vec{a} \cdot \vec{b} = 0$.
2. Angle with $\vec{c}$ is $60^\circ$ (since $\cos \theta = 1/2$).
3. Angle with $\vec{b}$ is $90^\circ$ (since $\cos \theta = 0$).
