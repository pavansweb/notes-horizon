---
id: electromagnetic-induction
title: "Electromagnetic Induction"
subject: "Physics"
chapter: "Electrodynamics"
lastUpdated: "2026-05-17T21:35:00.000Z"
order: 13
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Electromagnetic Induction (EMI)

## 1. Faraday's Laws and Lenz's Law
### 1.1 Magnetic Flux ($\Phi_B$)
- $\Phi_B = \int \vec{B} \cdot d\vec{A} = BA \cos \theta$.
- Scalar quantity, SI unit is Weber (Wb).

### 1.2 Induced EMF
- **Faraday's Law:** $\epsilon = -\frac{d\Phi_B}{dt}$.
- **Lenz's Law:** The minus sign in Faraday's law represents that induced effects oppose the *change* in flux. (Conservation of Energy).
- **Induced Electric Field:** A changing magnetic field creates a non-conservative electric field. $\oint \vec{E} \cdot d\vec{l} = -\frac{d\Phi_B}{dt}$.

## 2. Motional EMF
### 2.1 Translational Motion
- Rod moving in uniform $\vec{B}$: $\epsilon = (\vec{v} \times \vec{B}) \cdot \vec{l}$. For $\vec{v} \perp \vec{B} \perp \vec{l}$: $\epsilon = Bvl$.
- Force required to maintain constant speed: $F = IlB = \frac{B^2l^2v}{R}$.

### 2.2 Rotational Motion
- Rod rotating in uniform $\vec{B}$ about one end: $\epsilon = \frac{1}{2} B \omega l^2$.
- Rotating Disc (Faraday Disc): $\epsilon = \frac{1}{2} B \omega R^2$.

## 3. Inductance
### 3.1 Self and Mutual Induction
- **Self Inductance ($L$):** $\Phi = LI \Rightarrow \epsilon = -L\frac{dI}{dt}$.
- **Mutual Inductance ($M$):** $\Phi_2 = MI_1$. Coefficient of coupling $k = \frac{M}{\sqrt{L_1 L_2}}$.
- **Energy Stored:** $U = \frac{1}{2} LI^2$. Energy density $u = \frac{B^2}{2\mu_0}$.

### 3.2 LR Circuit (Transients)
- **Growth of Current:** $I(t) = \frac{E}{R}(1 - e^{-t/\tau})$, where $\tau = L/R$.
- **Decay of Current:** $I(t) = I_0 e^{-t/\tau}$.

## 4. Visual Aids & Diagrams
*(Imagine a magnetic field increasing into the page. According to Lenz's law, the induced current in a loop will be counter-clockwise to create a field out of the page. Visualize a rod sliding on parallel rails—the area is increasing, hence flux is increasing. For LR circuits, see the current lagging behind the voltage due to the "back EMF" produced by the inductor.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Induced Electric Field
**Q1.** A magnetic field is given by $B = B_0 t$ in a cylindrical region of radius $R$. Find the induced electric field at distance $r < R$ from the axis.
**Concept:** $\oint E dl = -A(dB/dt)$.
**Solution:**
1. $E(2\pi r) = -\pi r^2 (B_0)$.
2. $E = -\frac{r B_0}{2}$.

### Type 2: Motional EMF (Inclined Rails)
**Q1.** A rod of mass $m$ and length $l$ slides down smooth conducting rails inclined at $\alpha$ in a vertical magnetic field $B$. Find its terminal velocity.
**Concept:** At terminal velocity, $F_{ext} = F_{mag} \cos \alpha$.
**Solution:**
1. $F_{grav} = mg \sin \alpha$.
2. $F_{mag} = I l B = \frac{B(l \cos \alpha) v}{R} l B = \frac{B^2 l^2 v \cos \alpha}{R}$.
3. Along incline: $mg \sin \alpha = F_{mag} \cos \alpha = \frac{B^2 l^2 v \cos^2 \alpha}{R}$.
4. $v = \frac{mg R \sin \alpha}{B^2 l^2 \cos^2 \alpha}$.

### Type 3: LR Circuit Energy
**Q1.** In an LR circuit with $L = 2 \text{ H}$ and $R = 10 \Omega$, find the time when the energy stored in the inductor is $1/4$ of its maximum value.
**Concept:** $U = \frac{1}{2} LI^2$. $U = U_{max}/4 \Rightarrow I = I_{max}/2$.
**Solution:**
1. $I(t) = I_{max}(1 - e^{-t/\tau})$.
2. $1/2 = 1 - e^{-t/\tau} \Rightarrow e^{-t/\tau} = 1/2$.
3. $t/\tau = \ln 2 \Rightarrow t = (L/R) \ln 2 = 0.2 \ln 2 \text{ seconds}$.
