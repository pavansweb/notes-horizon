---
id: modern-physics
title: "Modern Physics"
subject: "Physics"
chapter: "Modern Physics"
lastUpdated: "2026-05-17T22:00:00.000Z"
order: 14
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Quantum Physics & Nuclear Transformations

## 1. Dual Nature of Radiation & Matter
### 1.1 Photoelectric Effect (PEE)
- **Einstein's Equation:** $hf = \phi + K_{max} = \phi + eV_0$.
- **Threshold Frequency ($f_0$):** $f_0 = \phi/h$.
- **Graphs:**
    - **$V_0$ vs. $f$:** Slope is $h/e$, intercept on $f$-axis is $f_0$.
    - **Current vs. Intensity:** Linear relationship.
    - **Current vs. Potential:** Shows saturation current and stopping potential.

### 1.2 Matter Waves
- **de Broglie Wavelength:** $\lambda = \frac{h}{p} = \frac{h}{\sqrt{2mK}} = \frac{h}{\sqrt{2mqV}}$.
- For electrons: $\lambda \approx \sqrt{\frac{150}{V}} \text{ \AA}$.

## 2. Atomic Physics
### 2.1 Bohr's Model
- **Postulates:** $mvr = n\frac{h}{2\pi}$.
- **Energy:** $E_n = -13.6 \frac{Z^2}{n^2} \text{ eV}$.
- **Spectral Lines:** $1/\lambda = RZ^2(1/n_1^2 - 1/n_2^2)$.
- **Recoil of Atom:** When a photon is emitted, the atom recoils to conserve momentum. $p_{atom} = p_{photon} = h/\lambda$.

### 2.2 X-Rays
- **Continuous X-rays:** $\lambda_{min} = \frac{hc}{eV} \approx \frac{12400}{V} \text{ \AA}$.
- **Moseley's Law:** $\sqrt{\
u} = a(Z-b)$. For $K_\alpha$ lines, $b=1$.

## 3. Nuclear Physics
### 3.1 Radioactivity
- **Decay Law:** $N = N_0 e^{-\lambda t}$. $T_{1/2} = 0.693/\lambda$.
- **Activity:** $A = \lambda N$. Unit is Becquerel (Bq) or Curie (Ci).
- **Successive Decay:** If $A \xrightarrow{\lambda_1} B \xrightarrow{\lambda_2} C$, then $N_B$ is max when $\frac{dN_B}{dt} = 0$.

### 3.2 Nuclear Reactions
- **Binding Energy ($BE$):** $\Delta m \cdot c^2$. Stability $\propto BE/A$.
- **Q-value:** Energy released/absorbed. $Q = (m_i - m_f)c^2$.

## 4. Visual Aids & Diagrams
*(Imagine a graph of stopping potential vs frequency starting from a non-zero threshold frequency. Visualize the Bohr atom as a tiny solar system where electrons can only exist in "allowed" orbits. For nuclear decay, see an exponential curve dropping towards zero. For X-rays, visualize a broad continuous spectrum with sharp characteristic peaks.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Photoelectric Effect (Graph Analysis)
**Q1.** The stopping potential for a surface is $V_1$ at $\lambda_1$ and $V_2$ at $\lambda_2$. Find the Planck constant.
**Concept:** $eV_1 = hc/\lambda_1 - \phi$ and $eV_2 = hc/\lambda_2 - \phi$.
**Solution:**
1. $e(V_1 - V_2) = hc(1/\lambda_1 - 1/\lambda_2)$.
2. $h = \frac{e(V_1 - V_2)}{c(1/\lambda_1 - 1/\lambda_2)}$.

### Type 2: Bohr Model (Recoil Velocity)
**Q1.** A hydrogen atom in its ground state absorbs a photon of energy $12.09 \text{ eV}$. Find the change in its angular momentum.
**Concept:** $E_n = -13.6/n^2$. $E_{abs} = 13.6(1 - 1/n^2)$.
**Solution:**
1. $12.09 = 13.6(1 - 1/n^2) \Rightarrow 1 - 1/n^2 = 0.889 \Rightarrow 1/n^2 = 0.111 = 1/9$.
2. $n = 3$.
3. $\Delta L = (n-1)h/2\pi = 2(h/2\pi) = h/\pi$.

### Type 3: Radioactive Decay (Parallel Paths)
**Q1.** A substance has two decay paths with half-lives $T_1$ and $T_2$. Find the effective half-life.
**Concept:** $\lambda_{eff} = \lambda_1 + \lambda_2$.
**Solution:**
1. $1/T_{eff} = 1/T_1 + 1/T_2$.
2. $T_{eff} = \frac{T_1 T_2}{T_1 + T_2}$.
