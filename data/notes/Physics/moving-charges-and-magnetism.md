---
id: moving-charges-and-magnetism
title: "Moving Charges and Magnetism"
subject: "Physics"
chapter: "Electrodynamics"
lastUpdated: "2026-05-17T21:30:00.000Z"
order: 12
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Moving Charges & Magnetic Field Sources

## 1. Magnetic Force and Motion
### 1.1 Lorentz Force
- **General Force:** $\vec{F} = q(\vec{E} + \vec{v} \times \vec{B})$.
- **Motion in Uniform $\vec{B}$:**
    - **Case 1 ($\theta = 90^\circ$):** Circular motion. $r = \frac{mv}{qB}$.
    - **Case 2 (General $\theta$):** Helical motion. $r = \frac{mv \sin \theta}{qB}$, Pitch $P = \frac{2\pi mv \cos \theta}{qB}$.

### 1.2 Force on a Conductor
- **Magnetic Force:** $\vec{F} = \int I (d\vec{l} \times \vec{B})$. For a straight wire in uniform field: $\vec{F} = I(\vec{L} \times \vec{B})$.
- **Force between Parallel Wires:** $\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi d}$. Attractive if currents are in the same direction.

## 2. Magnetic Field Sources (Biot-Savart & Ampere)
### 2.1 Biot-Savart Law
- **Formula:** $d\vec{B} = \frac{\mu_0}{4\pi} \frac{I d\vec{l} \times \hat{r}}{r^2}$.
- **Finite Straight Wire:** $B = \frac{\mu_0 I}{4\pi d} (\sin \theta_1 + \sin \theta_2)$.
- **Circular Loop (Axial):** $B = \frac{\mu_0 I R^2}{2(R^2+x^2)^{3/2}}$. At center ($x=0$): $B = \frac{\mu_0 I}{2R}$.

### 2.2 Ampere's Circuital Law
- **Statement:** $\oint \vec{B} \cdot d\vec{l} = \mu_0 I_{encl}$.
- **Thick Wire ($r < R$):** $B = \frac{\mu_0 I r}{2\pi R^2}$. Inside a thick wire, $B$ is proportional to $r$.
- **Ideal Solenoid:** $B = \mu_0 n I$. **Toroid:** $B = \frac{\mu_0 N I}{2\pi r}$.

## 3. Magnetic Moments & Galvanometers
### 3.1 Magnetic Dipole Moment ($\vec{M}$)
- **Loop:** $\vec{M} = N I \vec{A}$.
- **Rotating Charge:** For a charge $q$ mass $m$ rotating in a circle: $\frac{M}{L} = \frac{q}{2m}$ (Gyromagnetic ratio).
- **Torque:** $\vec{\tau} = \vec{M} \times \vec{B}$. **Potential Energy:** $U = -\vec{M} \cdot \vec{B}$.

### 3.2 Moving Coil Galvanometer (MCG)
- **Principle:** $\tau = NIAB = k \phi$, where $k$ is torsional constant.
- **Sensitivity:**
    - **Current Sensitivity ($S_i$):** $\frac{\phi}{I} = \frac{NAB}{k}$.
    - **Voltage Sensitivity ($S_v$):** $\frac{\phi}{V} = \frac{NAB}{kR}$.

## 4. Visual Aids & Diagrams
*(Imagine a 3D coordinate system where a charge spirals into the page. Visualize the "Slinky" shape of a solenoid's field lines—uniform inside and near zero outside. For Biot-Savart, see the magnetic field "curling" around a current element using the right-hand thumb rule. In a Galvanometer, visualize the radial magnetic field ensuring $\tau$ is always maximum ($90^\circ$).)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Field from Thick Wire
**Q1.** A long straight wire of radius $R$ carries a current $I$ uniformly distributed across its cross-section. Find the magnetic field at distance $r = R/2$.
**Concept:** Ampere's Law for $r < R$.
**Solution:**
1. $I_{encl} = I \times \frac{\pi (R/2)^2}{\pi R^2} = I/4$.
2. $B(2\pi r) = \mu_0 (I/4) \Rightarrow B(2\pi R/2) = \mu_0 I/4$.
3. $B = \frac{\mu_0 I}{4\pi R}$.

### Type 2: Torque and Equilibrium
**Q1.** A circular loop of radius $R$ carrying current $I$ is placed in a uniform field $\vec{B}$. Find the work done in rotating it from stable to unstable equilibrium.
**Concept:** $W = U_f - U_i$. Stable ($\theta=0^\circ$), Unstable ($\theta=180^\circ$).
**Solution:**
1. $U_i = -MB \cos 0 = -MB$.
2. $U_f = -MB \cos 180 = +MB$.
3. $W = MB - (-MB) = 2MB = 2(I \cdot \pi R^2)B$.

### Type 3: Gyromagnetic Ratio Application
**Q1.** An electron ($q=e, m=m_e$) moves in a circle of radius $R$ with speed $v$. Find its magnetic moment.
**Concept:** $M = (q/2m)L$ and $L = mR v$.
**Solution:**
1. $L = m_e R v$.
2. $M = (e / 2m_e) \times (m_e R v) = \frac{eRv}{2}$.
