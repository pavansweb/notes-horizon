---
id: electrostatics-and-capacitance
title: "Electrostatics and Capacitance"
subject: "Physics"
chapter: "Electrodynamics"
lastUpdated: "2026-05-17T21:20:00.000Z"
order: 10
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Electrostatics & Capacitance

## 1. Electric Fields and Potentials
### 1.1 Coulomb's Law & Field
- **Superposition:** Net force/field is the vector sum of individual contributions.
- **Continuous Charge Distributions:**
    - **Thin Ring (Axial):** $E = \frac{kQx}{(R^2+x^2)^{3/2}}$. Max at $x = R/\sqrt{2}$.
    - **Infinite Sheet:** $E = \sigma / 2\epsilon_0$. Independent of distance.
    - **Spherical Shell:** $E_{in} = 0$, $E_{out} = kQ/r^2$.
    - **Solid Sphere (Non-conducting):** $E_{in} = \frac{kQr}{R^3}$, $E_{out} = kQ/r^2$.

### 1.2 Electric Potential ($V$)
- **Relation with Field:** $\vec{E} = -\vec{\
abla} V = - \left( \frac{\partial V}{\partial x} \hat{i} + \frac{\partial V}{\partial y} \hat{j} + \frac{\partial V}{\partial z} \hat{k} \right)$.
- **Potential of Dipole:** $V = \frac{kp \cos \theta}{r^2}$.
- **Electrostatic PE of System:** $U = \sum \frac{k q_i q_j}{r_{ij}}$. For a continuous sphere, self-energy $U = \frac{3}{5} \frac{kQ^2}{R}$.

## 2. Gauss's Law & Conductors
- **Gauss's Law:** $\oint \vec{E} \cdot d\vec{A} = \frac{q_{encl}}{\epsilon_0}$.
- **Conductors in Equilibrium:**
    - $E = 0$ inside a conductor.
    - Excess charge resides only on the surface.
    - $E$ at surface is $\sigma/\epsilon_0$ and perpendicular to surface.

## 3. Capacitance & Dielectrics
### 3.1 Parallel Plate Capacitor
- $C = \frac{\epsilon_0 A}{d}$.
- **Energy Density:** $u = \frac{1}{2} \epsilon_0 E^2$.
- **Force between plates:** $F = \frac{Q^2}{2\epsilon_0 A}$.

### 3.2 Dielectrics
- **Dielectric Insertion:**
    - **Battery Disconnected:** $Q$ constant. $V \rightarrow V/K$, $C \rightarrow KC$, $E \rightarrow E/K$, $U \rightarrow U/K$.
    - **Battery Connected:** $V$ constant. $Q \rightarrow KQ$, $C \rightarrow KC$, $E$ unchanged, $U \rightarrow KU$.
- **Partially Filled Slab:** $C = \frac{\epsilon_0 A}{d - t(1 - 1/K)}$.

## 4. Visual Aids & Diagrams
*(Imagine the electric field lines emanating from a positive charge and terminating on a negative one. For a dipole, visualize the "butterfly" pattern of field lines. In a capacitor, see the uniform field lines between the plates and the "fringing" at the edges. For Gauss's Law, visualize a cylindrical Gaussian surface around an infinite wire.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Field from Potential Gradient
**Q1.** The electric potential in a region is $V = 4x^2 \text{ V}$. Find the electric field at $(1, 0, 2) \text{ m}$.
**Concept:** $E_x = -dV/dx$.
**Solution:**
1. $E_x = -d(4x^2)/dx = -8x$.
2. At $x=1$, $E_x = -8 \text{ V/m}$.
3. $\vec{E} = -8\hat{i} \text{ V/m}$.

### Type 2: Dielectric Slab (Energy Change)
**Q1.** A capacitor of $C=10 \mu F$ is charged to $100 \text{ V}$. The battery is removed and a dielectric of $K=5$ is inserted. Find the work done in inserting the slab.
**Concept:** $W = \Delta U = U_f - U_i$.
**Solution:**
1. $Q = CV = 10 \times 100 = 1000 \mu C$.
2. $U_i = Q^2/2C = (1000^2)/(2 \times 10) = 50,000 \mu J = 0.05 \text{ J}$.
3. $U_f = U_i/K = 0.05/5 = 0.01 \text{ J}$.
4. $W = 0.01 - 0.05 = -0.04 \text{ J}$. (Negative work means the capacitor pulls the slab in).

### Type 3: Charge Redistribution
**Q1.** Two capacitors $C_1=2 \mu F$ (charged to $10 \text{ V}$) and $C_2=3 \mu F$ (charged to $20 \text{ V}$) are connected in parallel with like plates together. Find common potential and heat loss.
**Concept:** $V_{com} = \frac{C_1V_1 + C_2V_2}{C_1+C_2}$, $\Delta H = \frac{1}{2} \frac{C_1C_2}{C_1+C_2}(V_1-V_2)^2$.
**Solution:**
1. $V_{com} = \frac{2(10) + 3(20)}{2+3} = \frac{80}{5} = 16 \text{ V}$.
2. $\Delta H = \frac{1}{2} \frac{2 \times 3}{2+3}(10-20)^2 = \frac{3}{5} \times 100 = 60 \mu J$.
