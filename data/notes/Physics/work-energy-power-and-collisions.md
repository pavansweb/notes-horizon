---
id: work-energy-power-and-collisions
title: "Work, Energy, Power and Collisions"
subject: "Physics"
chapter: "Mechanics"
lastUpdated: "2026-05-17T21:10:00.000Z"
order: 4
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Work, Energy, Power & Collisions

## 1. Work and Energy
### 1.1 Work Done
- **Constant Force:** $W = \vec{F} \cdot \vec{d} = Fd \cos \theta$.
- **Variable Force:** $W = \int_{x_i}^{x_f} F(x) dx$.
- **Area under F-x Graph:** Gives the work done.

### 1.2 Energy Theorems
- **Work-Energy Theorem:** $W_{all} = \Delta K = K_f - K_i$. (Applicable to all types of forces).
- **Conservative Forces:** Work depends only on initial and final positions (Gravity, Spring). $F = -\frac{dU}{dx}$.
- **Conservation of Mechanical Energy:** $K_i + U_i = K_f + U_f$ (if $W_{nc} = 0$).

## 2. Power
- **Definition:** Rate of doing work. $P = \frac{dW}{dt} = \vec{F} \cdot \vec{v}$.
- **Efficiency:** $\eta = \frac{P_{out}}{P_{in}} \times 100\%$.

## 3. Collisions (Deep Dive)
### 3.1 Linear Momentum Conservation
In the absence of external impulsive forces, $\sum m_i \vec{u}_i = \sum m_i \vec{v}_i$.

### 3.2 Types of Collisions
- **Elastic ($e=1$):** Both momentum and KE are conserved.
- **Inelastic ($0 < e < 1$):** Only momentum is conserved. Some KE is lost (heat, sound).
- **Perfectly Inelastic ($e=0$):** Bodies stick together after collision.
- **Coefficient of Restitution ($e$):** $e = \frac{\text{velocity of separation}}{\text{velocity of approach}} = \frac{v_2 - v_1}{u_1 - u_2}$.

### 3.3 Oblique Collisions
Conservation of momentum is applied along the line of impact. Velocities perpendicular to the line of impact remain unchanged (if surfaces are smooth).

## 4. Vertical Circular Motion
- **Critical Velocity at bottom:** $v_{min} = \sqrt{5gL}$ to complete the circle.
- **Tension at bottom:** $T = \frac{mv^2}{L} + mg$.

## 5. Visual Aids & Diagrams
*(Imagine a collision between two spheres. The "Line of Impact" is the common normal at the point of contact. In vertical circular motion, visualize the tension vector $T$ changing direction while $mg$ always points down, creating a varying net centripetal force.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Work-Energy Theorem (Variable Force)
**Q1.** A force $F = (2 + x) \text{ N}$ acts on a particle of mass $1 \text{ kg}$ to move it from $x=0$ to $x=2 \text{ m}$. If it starts from rest, find its final speed.
**Concept:** $W = \int F dx = \Delta K$.
**Solution:**
1. $W = \int_0^2 (2+x) dx = [2x + x^2/2]_0^2 = 4 + 2 = 6 \text{ J}$.
2. $\Delta K = \frac{1}{2} m v^2 = \frac{1}{2}(1)v^2 = 6$.
3. $v^2 = 12 \Rightarrow v = \sqrt{12} \approx 3.46 \text{ m/s}$.

### Type 2: 1D Elastic Collision
**Q1.** A ball of mass $m$ moving with $u$ hits another identical ball at rest elastically. Find their final velocities.
**Concept:** Momentum and KE conservation.
**Solution:**
1. For identical masses in 1D elastic collision, velocities are interchanged.
2. $v_1 = 0$, $v_2 = u$.

### Type 3: Coefficient of Restitution (Successive Bounces)
**Q1.** A ball is dropped from height $h$ on a floor ($e < 1$). Find the height reached after $n$ bounces.
**Concept:** Velocity after $n^{th}$ bounce is $v_n = e^n v_0$.
**Solution:**
1. $v_0 = \sqrt{2gh}$.
2. After 1st bounce, $v_1 = e\sqrt{2gh} \Rightarrow h_1 = \frac{v_1^2}{2g} = e^2 h$.
3. After $n$ bounces, $h_n = e^{2n} h$.
