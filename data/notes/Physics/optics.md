---
id: optics
title: "Optics"
subject: "Physics"
chapter: "Optics"
lastUpdated: "2026-05-17T21:45:00.000Z"
order: 13
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Ray & Wave Optics

## 1. Geometrical (Ray) Optics
### 1.1 Reflection and Refraction
- **Spherical Mirrors:** Mirror formula $\frac{1}{v} + \frac{1}{u} = \frac{1}{f}$. Magnification $m = -v/u$.
- **Refraction:** Snell's law $n_1 \sin \theta_1 = n_2 \sin \theta_2$.
- **Apparent Depth:** $h' = h/n_{rel}$. **Normal Shift:** $S = t(1 - 1/n)$.
- **Total Internal Reflection (TIR):** $\sin \theta_c = n_2/n_1$. Critical angle condition: denser to rarer medium.

### 1.2 Lenses and Prisms
- **Lens Maker's Formula:** $\frac{1}{f} = (\mu-1) \left[ \frac{1}{R_1} - \frac{1}{R_2} \right]$.
- **Prism Formula:** $\mu = \frac{\sin((A+\delta_m)/2)}{\sin(A/2)}$. For small $A$, $\delta = A(\mu-1)$.
- **Silvering of Lens:** Acts as a mirror. $P_{eq} = 2P_l + P_m$.

### 1.3 Optical Instruments
- **Compound Microscope:** $M = m_o \times m_e = \left( \frac{v_o}{u_o} \right) \left( \frac{D}{f_e} \right)$ (at infinity).
- **Astronomical Telescope:** $M = f_o/f_e$. Length of tube $L = f_o + f_e$.

## 2. Physical (Wave) Optics
### 2.1 Interference (YDSE)
- **Conditions:** Constructive ($\Delta \phi = 2n\pi$, $\Delta x = n\lambda$), Destructive ($\Delta \phi = (2n+1)\pi$).
- **Fringe Width:** $\beta = \frac{\lambda D}{d}$.
- **Shift due to Slab:** Shift $S = \frac{D}{d}(\mu-1)t$.

### 2.2 Diffraction & Polarization
- **Single Slit:** First minima at $d \sin \theta = \lambda$. Width of central maxima $w = \frac{2\lambda D}{d}$.
- **Brewster's Law:** $\mu = \tan i_p$. At Brewster's angle, reflected and refracted rays are perpendicular.

## 3. Visual Aids & Diagrams
*(Imagine a ray of light bending towards the normal as it enters a denser medium. Visualize a prism dispersing white light into a rainbow (VIBGYOR). In YDSE, see the overlapping circular wave ripples creating a pattern of bright and dark bands on the screen. For Brewster's law, visualize a ray hitting glass at an angle such that the reflected ray is purely polarized horizontally.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Lens Maker and Combinations
**Q1.** A convex lens of focal length $20 \text{ cm}$ in air is immersed in water ($\mu=4/3$). Find its new focal length. ($\mu_g = 3/2$).
**Concept:** $\frac{f_w}{f_a} = \frac{(\mu_g-1)}{(\mu_g/\mu_w - 1)}$.
**Solution:**
1. $f_w / 20 = (1.5-1) / (1.5/1.33 - 1) = 0.5 / (1.125 - 1) = 0.5 / 0.125 = 4$.
2. $f_w = 4 \times 20 = 80 \text{ cm}$.

### Type 2: YDSE (Fringe Shift)
**Q1.** In YDSE, a glass slab of $\mu=1.5$ and thickness $t = 2 \mu m$ is placed in front of one slit. If $\lambda = 500 \text{ nm}$, find the number of fringes shifted.
**Concept:** $Shift = n \beta \Rightarrow (\mu-1)t = n \lambda$.
**Solution:**
1. $n = \frac{(\mu-1)t}{\lambda} = \frac{(1.5-1) \times 2 \times 10^{-6}}{500 \times 10^{-9}} = \frac{10^{-6}}{5 \times 10^{-7}} = 2$.
2. The pattern shifts by 2 fringes.

### Type 3: Minimum Deviation in Prism
**Q1.** A prism has refracting angle $A=60^\circ$ and $\mu = \sqrt{3}$. Find the angle of minimum deviation.
**Concept:** $\mu = \frac{\sin((A+\delta_m)/2)}{\sin(A/2)}$.
**Solution:**
1. $\sqrt{3} = \frac{\sin((60+\delta_m)/2)}{\sin(30^\circ)} = \frac{\sin(30+\delta_m/2)}{0.5}$.
2. $\sin(30+\delta_m/2) = \sqrt{3}/2 = \sin(60^\circ)$.
3. $30 + \delta_m/2 = 60 \Rightarrow \delta_m/2 = 30 \Rightarrow \delta_m = 60^\circ$.
