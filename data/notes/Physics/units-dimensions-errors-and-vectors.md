---
id: units-dimensions-errors-and-vectors
title: "Units, Dimensions, Errors and Vectors"
subject: "Physics"
chapter: "Basic Physics"
lastUpdated: "2026-05-17T22:25:00.000Z"
order: 1
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Mathematical Tools for Physics

## 1. Units and Dimensions
### 1.1 Dimensional Analysis
- **Fundamental Quantities:** [M], [L], [T], [A], [K], [mol], [cd].
- **Principle of Homogeneity:** Every term in a physical equation must have the same dimension. Used to check correctness and derive formulas.
- **Dimensionless Quantities:** Plane angle, Solid angle, Refractive index, Strain, Relative density.

### 1.2 Important Dimensions
- Gravitational Constant ($G$): $[M^{-1}L^3T^{-2}]$.
- Permittivity ($\epsilon_0$): $[M^{-1}L^{-3}T^4A^2]$.
- Planck's Constant ($h$): $[ML^2T^{-1}]$ (Same as Angular Momentum).

## 2. Errors and Measurements
### 2.1 Propagation of Errors
- **Addition/Subtraction:** $\Delta z = \Delta x + \Delta y$.
- **Multiplication/Division:** $\frac{\Delta z}{z} = \frac{\Delta x}{x} + \frac{\Delta y}{y}$.
- **Powers ($z = A^n B^m$):** $\frac{\Delta z}{z} = |n|\frac{\Delta A}{A} + |m|\frac{\Delta B}{B}$.

### 2.2 Precision Instruments
- **Vernier Calipers:** Least Count $LC = 1 \text{ MSD} - 1 \text{ VSD}$. Reading $= \text{MSR} + (\text{VSR} \times LC)$.
- **Screw Gauge:** $LC = \text{Pitch} / \text{Divisions on circular scale}$. Zero error must be subtracted from observed reading.

## 3. Vector Algebra
### 3.1 Operations
- **Addition:** $R = \sqrt{A^2 + B^2 + 2AB \cos \theta}$. $\tan \alpha = \frac{B \sin \theta}{A + B \cos \theta}$.
- **Dot Product:** $\vec{A} \cdot \vec{B} = AB \cos \theta$. Result is scalar. $\vec{A} \perp \vec{B} \Rightarrow \vec{A} \cdot \vec{B} = 0$.
- **Cross Product:** $\vec{A} \times \vec{B} = (AB \sin \theta) \hat{n}$. Result is vector perpendicular to both. $\vec{A} \parallel \vec{B} \Rightarrow \vec{A} \times \vec{B} = 0$.

## 4. Visual Aids & Diagrams
*(Imagine a vector triangle where the closing side represents the resultant. Visualize a Vernier Caliper's main scale and sliding scale aligning at a specific division. See a vector "projected" onto another axis to find its component. For errors, visualize the "range" of uncertainty around a measured value.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Dimensional Analysis (Finding Constants)
**Q1.** The force between two charges is $F = k q_1 q_2 / r^2$. Find the dimensions of $k$.
**Concept:** $[k] = [F][L]^2 / [Q]^2$.
**Solution:**
1. $[F] = [MLT^{-2}]$, $[L]^2 = [L^2]$, $[Q]^2 = [AT]^2 = [A^2T^2]$.
2. $[k] = [MLT^{-2}][L^2] / [A^2T^2] = [ML^3T^{-4}A^{-2}]$.

### Type 2: Error Propagation
**Q1.** The resistance $R = V/I$. If $V = (100 \pm 5) \text{ V}$ and $I = (10 \pm 0.2) \text{ A}$, find the percentage error in $R$.
**Concept:** $\% \text{ error} = \Delta V/V \times 100 + \Delta I/I \times 100$.
**Solution:**
1. $\Delta V/V = 5/100 = 5\%$.
2. $\Delta I/I = 0.2/10 = 2\%$.
3. Total error $= 5\% + 2\% = 7\%$.

### Type 3: Screw Gauge Measurement
**Q1.** A screw gauge has pitch $0.5 \text{ mm}$ and $50$ divisions on its circular scale. What is the thickness of a plate if MSR is $2 \text{ mm}$ and CSR is $25$ divisions?
**Concept:** $LC = 0.5/50 = 0.01 \text{ mm}$. Reading $= \text{MSR} + \text{CSR} \times LC$.
**Solution:**
1. Reading $= 2 + (25 \times 0.01) = 2 + 0.25 = 2.25 \text{ mm}$.
