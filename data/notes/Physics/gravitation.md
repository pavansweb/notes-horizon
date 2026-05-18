---
id: gravitation
title: "Gravitation"
subject: "Physics"
chapter: "Mechanics"
lastUpdated: "2026-05-17T22:15:00.000Z"
order: 6
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Planetary Motion & Universal Gravitation

## 1. Newton's Law & Field
### 1.1 Universal Law
- **Force:** $F = \frac{Gm_1m_2}{r^2}$. Always attractive. Scalar form is used for superposition.
- **Gravitational Field Intensity ($E$):** $E = \frac{F}{m}$. 
    - **Spherical Shell:** $E_{in} = 0$, $E_{out} = \frac{GM}{r^2}$.
    - **Solid Sphere:** $E_{in} = \frac{GMr}{R^3}$, $E_{out} = \frac{GM}{r^2}$.

### 1.2 Gravitational Potential ($V$)
- **Relation:** $E = -\frac{dV}{dr}$.
- **Potential:** $V = -\frac{GM}{r}$. (Reference $V=0$ at $\infty$).
- **Potential Energy ($U$):** $U = -\frac{Gm_1m_2}{r}$. For a system of masses, $U = \sum \text{pairs}$.

## 2. Acceleration due to Gravity ($g$)
### 2.1 Variation on Earth
- **Altitude ($h$):** $g_h = \frac{g}{(1+h/R)^2}$. For $h \ll R$, $g_h \approx g(1 - 2h/R)$.
- **Depth ($d$):** $g_d = g(1 - d/R)$. (Linear decrease).
- **Latitude ($\phi$):** $g' = g - R\omega^2 \cos^2 \phi$. At poles ($\phi=90^\circ$), $g' = g$. At equator ($\phi=0^\circ$), $g' = g - R\omega^2$.

## 3. Satellite Dynamics
### 3.1 Orbital Parameters
- **Orbital Velocity ($v_o$):** $\sqrt{\frac{GM}{r}}$. Near surface: $v_o = \sqrt{gR} \approx 7.9 \text{ km/s}$.
- **Time Period ($T$):** $\frac{2\pi r}{v_o} \Rightarrow T^2 = \frac{4\pi^2}{GM} r^3$ (Kepler's III Law).
- **Escape Velocity ($v_e$):** $\sqrt{\frac{2GM}{R}} = \sqrt{2} v_o \approx 11.2 \text{ km/s}$.

### 3.2 Satellite Energy
- **Kinetic Energy:** $K = \frac{GMm}{2r}$.
- **Potential Energy:** $U = -\frac{GMm}{r}$.
- **Total Energy:** $E = K + U = -\frac{GMm}{2r} = \frac{U}{2} = -K$.
- **Binding Energy:** $-E = \frac{GMm}{2r}$.

## 4. Visual Aids & Diagrams
*(Imagine a satellite in an elliptical orbit; as it gets closer to the planet (perigee), it speeds up to conserve angular momentum. Visualize the Earth as a slightly bulging sphere where $g$ is stronger at the poles than the equator. For potential energy, see the "Gravity Well"—a deep pit where energy is needed to climb out to infinity.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Variation of g
**Q1.** At what height $h$ from the surface of Earth is the value of $g$ same as at depth $d=100 \text{ km}$? (Assume $h \ll R$).
**Concept:** $g(1 - 2h/R) = g(1 - d/R)$.
**Solution:**
1. $2h/R = d/R \Rightarrow h = d/2$.
2. $h = 100/2 = 50 \text{ km}$.

### Type 2: Orbital Energy Change
**Q1.** Find the energy required to shift a satellite of mass $m$ from a circular orbit of radius $2R$ to $3R$.
**Concept:** $\Delta E = E_f - E_i$.
**Solution:**
1. $E_i = -GMm / (2 \times 2R) = -GMm / 4R$.
2. $E_f = -GMm / (2 \times 3R) = -GMm / 6R$.
3. $\Delta E = GMm/R \times (-1/6 + 1/4) = GMm/R \times (1/12)$.
4. $\Delta E = \frac{GMm}{12R} = \frac{mgR}{12}$.

### Type 3: Escape Velocity from Another Planet
**Q1.** A planet has mass $2M$ and radius $4R$ (where $M, R$ are Earth's mass/radius). Find escape velocity of the planet in terms of $v_e$ (Earth).
**Concept:** $v \propto \sqrt{M/R}$.
**Solution:**
1. $v_p / v_e = \sqrt{(2M/4R) / (M/R)} = \sqrt{2/4} = 1/\sqrt{2}$.
2. $v_p = v_e / \sqrt{2}$.
