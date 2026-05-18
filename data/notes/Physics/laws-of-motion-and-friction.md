---
id: laws-of-motion-and-friction
title: "Laws of Motion and Friction"
subject: "Physics"
chapter: "Mechanics"
lastUpdated: "2026-05-17T21:05:00.000Z"
order: 3
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Laws of Motion & Dynamics

## 1. Newton's Laws and Applications
### 1.1 The Concept of Force
- **Inertia:** Resistance to change in state of motion. Mass is the quantitative measure of inertia.
- **Newton's II Law:** $\vec{F} = \frac{d\vec{p}}{dt} = m\vec{a}$.
- **Newton's III Law:** To every action, there is an equal and opposite reaction. (Note: They act on *different* bodies).

### 1.2 Free Body Diagrams (FBD)
Isolating a body and showing all forces acting on it. Forces include:
- **Weight ($mg$):** Always vertically downwards.
- **Normal Reaction ($N$):** Perpendicular to the surface of contact.
- **Tension ($T$):** Acts along the string, pulls away from the body.

### 1.3 Constrained Motion (Advanced)
- **String Constraint:** Length of an inextensible string remains constant. $\sum T_i \cdot v_i = 0$.
- **Wedge Constraint:** Components of velocity/acceleration of contact points along the common normal must be equal.

## 2. Friction: The Opposing Force
### 2.1 Types of Friction
- **Static Friction ($f_s$):** Self-adjusting. $0 \le f_s \le \mu_s N$.
- **Kinetic Friction ($f_k$):** Constant during sliding. $f_k = \mu_k N$.

### 2.2 Friction in Multi-Block Systems
Determining if blocks move together or slide relative to each other by comparing the required force with limiting friction.

## 3. Circular Motion Dynamics
- **Centripetal Force:** $F_c = \frac{mv^2}{r}$. It is not a new force but a requirement provided by other forces (Tension, Friction, Gravity).
- **Banking of Roads:** $\tan \theta = \frac{v^2}{rg}$. With friction: $v_{max} = \sqrt{rg \left( \frac{\mu + \tan \theta}{1 - \mu \tan \theta} \right)}$.

## 4. Visual Aids & Diagrams
*(Imagine a block on a rough wedge. The FBD shows $mg$ downwards, $N$ perpendicular to the wedge, and friction $f$ along the incline. For pulley systems, visualize the tension $T$ pulling upwards on the block and downwards on the pulley.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Constrained Motion (Pulley)
**Q1.** Two blocks of masses $m_1$ and $m_2$ are connected by a string over a frictionless pulley. Find the acceleration of the system.
**Concept:** $F_{net} = M_{total} a$.
**Solution:**
1. Let $m_1 > m_2$. $m_1 g - T = m_1 a$ and $T - m_2 g = m_2 a$.
2. Adding equations: $(m_1 - m_2)g = (m_1 + m_2)a$.
3. $a = \frac{m_1 - m_2}{m_1 + m_2}g$.

### Type 2: Two-Block System with Friction
**Q1.** A block of mass $m=2 \text{ kg}$ is placed on top of another block of mass $M=4 \text{ kg}$. $\mu = 0.4$ between the blocks. A force $F$ is applied on the lower block. Find the maximum $F$ such that they move together.
**Concept:** Friction provides acceleration for the upper block.
**Solution:**
1. Max acceleration of upper block $a_{max} = \frac{\mu mg}{m} = \mu g = 4 \text{ m/s}^2$.
2. Since they move together, $F = (M+m)a$.
3. $F_{max} = (4+2) \times 4 = 24 \text{ N}$.

### Type 3: Pseudo Force (Accelerating Frame)
**Q1.** A pendulum is hanging from the ceiling of a car accelerating at $a$. Find the angle $\theta$ it makes with the vertical.
**Concept:** In the car's frame, a pseudo force $ma$ acts opposite to acceleration.
**Solution:**
1. Forces on bob: $mg$ (down), $ma$ (pseudo, back), $T$ (along string).
2. $T \sin \theta = ma$ and $T \cos \theta = mg$.
3. $\tan \theta = a/g$.
