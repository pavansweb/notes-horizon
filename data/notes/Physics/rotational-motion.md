---
id: rotational-motion
title: "Rotational Motion"
subject: "Physics"
chapter: "Mechanics"
lastUpdated: "2026-05-17T21:15:00.000Z"
order: 5
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Rotational Dynamics of Rigid Bodies

## 1. Moment of Inertia (MOI)
### 1.1 Fundamental Definition
- **Discrete Particles:** $I = \sum m_i r_i^2$.
- **Continuous Body:** $I = \int r^2 dm$.
- **Radius of Gyration ($k$):** $I = Mk^2 \Rightarrow k = \sqrt{I/M}$.

### 1.2 Key Theorems
- **Parallel Axis Theorem:** $I = I_{cm} + Md^2$. (CM must be the reference for $I_{cm}$).
- **Perpendicular Axis Theorem:** $I_z = I_x + I_y$ (Valid ONLY for 2D/planar objects).

## 2. Torque and Angular Momentum
### 2.1 Torque ($\vec{\tau}$)
- $\vec{\tau} = \vec{r} \times \vec{F} = I\vec{\alpha}$.
- Torque is the rotational analogue of Force.

### 2.2 Angular Momentum ($\vec{L}$)
- For a particle: $\vec{L} = \vec{r} \times \vec{p}$.
- For a rigid body (fixed axis): $\vec{L} = I\vec{\omega}$.
- **Conservation Principle:** If $\vec{\tau}_{ext} = 0$, then $\vec{L} = \text{const}$.

## 3. Rolling Motion
### 3.1 Kinematics of Pure Rolling
- Condition for no slipping: $v_{cm} = R\omega$ and $a_{cm} = R\alpha$.
- **Velocity of any point P:** $\vec{v}_P = \vec{v}_{cm} + \vec{v}_{P/cm}$. Magnitude: $v_P = \sqrt{v_{cm}^2 + (\omega r)^2 + 2v_{cm}\omega r \cos \theta}$.

### 3.2 Dynamics of Rolling
- Total Kinetic Energy: $K = \frac{1}{2} M v_{cm}^2 + \frac{1}{2} I_{cm} \omega^2 = \frac{1}{2} M v_{cm}^2 [1 + k^2/R^2]$.
- **Rolling on Incline:** $a = \frac{g \sin \theta}{1 + I/MR^2}$.

## 4. Visual Aids & Diagrams
*(Imagine a rolling disc. The top point has velocity $2v_{cm}$ while the bottom point (contact) has $0$ velocity. In angular momentum conservation, visualize a spinning ice skater bringing their arms in: $I$ decreases, so $\omega$ must increase to keep $L$ constant.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Moment of Inertia (Theorem Application)
**Q1.** Find the MOI of a uniform disc of mass $M$ and radius $R$ about an axis passing through its tangent in its plane.
**Concept:** Perpendicular + Parallel axis theorems.
**Solution:**
1. $I_{cm}$ (about diameter) $= \frac{1}{4} MR^2$ (from perpendicular axis theorem: $I_z = I_x + I_y \Rightarrow MR^2/2 = 2I_{dia}$).
2. Using parallel axis theorem: $I_{tan} = I_{dia} + MR^2 = \frac{1}{4} MR^2 + MR^2 = \frac{5}{4} MR^2$.

### Type 2: Conservation of Angular Momentum
**Q1.** A horizontal circular platform of mass $M$ and radius $R$ is rotating at $\omega_0$. A person of mass $m$ stands at the edge. If the person moves to the center, find the new angular velocity.
**Concept:** $I_1 \omega_1 = I_2 \omega_2$.
**Solution:**
1. $I_1 = \frac{1}{2} MR^2 + mR^2$.
2. $I_2 = \frac{1}{2} MR^2 + 0$ (since person is at $r=0$).
3. $\omega_2 = \frac{I_1}{I_2} \omega_0 = \frac{M/2 + m}{M/2} \omega_0 = (1 + 2m/M) \omega_0$.

### Type 3: Rolling on an Incline
**Q1.** A solid sphere and a hollow sphere of same mass and radius roll down an incline. Which reaches the bottom first?
**Concept:** $a = \frac{g \sin \theta}{1 + k^2/R^2}$. Smaller $k^2/R^2 \Rightarrow$ larger acceleration.
**Solution:**
1. Solid sphere: $k^2/R^2 = 2/5 = 0.4$.
2. Hollow sphere: $k^2/R^2 = 2/3 \approx 0.67$.
3. Solid sphere has higher acceleration and reaches first.
