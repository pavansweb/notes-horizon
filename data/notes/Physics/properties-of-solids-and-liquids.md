---
id: properties-of-solids-and-liquids
title: "Properties of Solids and Liquids"
subject: "Physics"
chapter: "Mechanics"
lastUpdated: "2026-05-17T22:20:00.000Z"
order: 7
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Mechanical Properties of Matter

## 1. Elasticity (Solids)
### 1.1 Stress and Strain
- **Hooke's Law:** Stress $\sigma = Y \epsilon$ (within elastic limit).
- **Moduli:** Young's ($Y$), Bulk ($B = -\Delta P / (\Delta V/V)$), Shear ($\eta$).
- **Poisson's Ratio ($\sigma$):** Lateral strain / Longitudinal strain. Limit: $-1$ to $0.5$.
- **Elastic Energy:** $U = \frac{1}{2} F \Delta L = \frac{1}{2} (Y A/L) (\Delta L)^2$. Energy density $u = \frac{1}{2} \times \text{Stress} \times \text{Strain}$.

## 2. Fluid Statics
### 2.1 Pressure and Buoyancy
- **Variation with Depth:** $P = P_0 + \rho g h$. In a container accelerating up ($a$): $g_{eff} = g+a$.
- **Archimedes' Principle:** Buoyant force $F_b = V_{sub} \rho_{liq} g$. Weight of displaced fluid.

## 3. Fluid Dynamics
### 3.1 Bernoulli's and Continuity
- **Continuity:** $A_1 v_1 = A_2 v_2$. (Conservation of mass).
- **Bernoulli's Equation:** $P + \frac{1}{2}\rho v^2 + \rho g h = \text{const}$. (Conservation of energy).
- **Efflux (Torricelli):** $v = \sqrt{2gh}$. Time to empty tank $t = \frac{A}{a}\sqrt{\frac{2h}{g}}$.

## 4. Viscosity and Surface Tension
### 4.1 Viscosity
- **Stokes' Law:** $F_d = 6\pi\eta r v$. 
- **Terminal Velocity:** $v_t = \frac{2r^2(\rho_s - \rho_l)g}{9\eta}$. (When $F_{drag} + F_{buoy} = mg$).

### 4.2 Surface Tension ($T$)
- **Surface Energy:** $U = T \Delta A$. For a soap bubble ($2$ surfaces), $U = T \times 2(4\pi R^2)$.
- **Excess Pressure:** Drop $\Delta P = 2T/R$; Bubble $\Delta P = 4T/R$.
- **Capillary Rise:** $h = \frac{2T \cos \theta}{r \rho g}$. Jurin's Law: $h \propto 1/r$.

## 5. Visual Aids & Diagrams
*(Imagine a wire being stretched until it snaps; visualize the stress-strain graph peaking and then dropping. See a tank with a hole at the bottom, light water jets shooting out faster as the water level increases. For surface tension, see a tiny needle floating on water or a liquid climbing up a thin glass tube against gravity.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Bernoulli's Principle (Venturi Meter)
**Q1.** A horizontal pipe of non-uniform cross-section has areas $10 \text{ cm}^2$ and $5 \text{ cm}^2$. The pressure difference is $600 \text{ Pa}$. Find the rate of flow of water.
**Concept:** $P_1 - P_2 = \frac{1}{2} \rho (v_2^2 - v_1^2)$ and $A_1 v_1 = A_2 v_2$.
**Solution:**
1. $v_1 = v, v_2 = 2v$.
2. $600 = 0.5 \times 1000 \times (4v^2 - v^2) = 500 \times 3v^2 = 1500 v^2$.
3. $v^2 = 0.4 \Rightarrow v \approx 0.63 \text{ m/s}$.
4. Flow rate $Q = A_1 v_1 = 10^{-3} \times 0.63 = 6.3 \times 10^{-4} \text{ m}^3/\text{s}$.

### Type 2: Surface Tension (Work Done)
**Q1.** Find the work done in blowing a soap bubble from radius $R$ to $2R$.
**Concept:** $W = T \Delta A_{total} = T \times 2 \times [4\pi(2R)^2 - 4\pi R^2]$.
**Solution:**
1. $\Delta A = 2 \times 4\pi(4R^2 - R^2) = 2 \times 4\pi \times 3R^2 = 24\pi R^2$.
2. $W = 24\pi R^2 T$.

### Type 3: Terminal Velocity
**Q1.** Two raindrops of same radii fall through air with terminal velocity $v$. If they coalesce, find the new terminal velocity.
**Concept:** $v_t \propto r^2$. New volume $V' = 2V \Rightarrow R^3 = 2r^3 \Rightarrow R = 2^{1/3} r$.
**Solution:**
1. $v' / v = (R/r)^2 = (2^{1/3})^2 = 2^{2/3} \approx 1.58$.
2. $v' = 2^{2/3} v$.
