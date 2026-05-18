---
id: alternating-current
title: "Alternating Current"
subject: "Physics"
chapter: "Electrodynamics"
lastUpdated: "2026-05-17T21:40:00.000Z"
order: 14
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Alternating Current (AC) & Oscillations

## 1. AC Fundamentals and Phasors
### 1.1 Average and RMS Values
- **Peak Value ($I_0$):** Maximum magnitude.
- **RMS Value ($I_{rms}$):** $I_0/\sqrt{2}$. It is the value of DC that produces the same heating effect.
- **Average Value ($I_{avg}$):** $2I_0/\pi$ (over half cycle).

### 1.2 Pure Circuit Components
- **Pure R:** $V$ and $I$ in phase. $Z = R$.
- **Pure L:** $V$ leads $I$ by $90^\circ$. Reactance $X_L = \omega L$.
- **Pure C:** $V$ lags $I$ by $90^\circ$. Reactance $X_C = 1/\omega C$.

## 2. LCR Circuits and Resonance
### 2.1 Series LCR Circuit
- **Impedance ($Z$):** $\sqrt{R^2 + (X_L - X_C)^2}$.
- **Phase Angle ($\phi$):** $\tan \phi = \frac{X_L - X_C}{R}$.

### 2.2 Resonance (Deep Dive)
- **Condition:** $X_L = X_C \Rightarrow \omega_0 = 1/\sqrt{LC}$. At resonance, $Z = R$ (minimum) and $I = I_{max}$.
- **Bandwidth:** $\Delta \omega = \omega_2 - \omega_1 = R/L$.
- **Quality Factor ($Q$):** $Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}$. It measures the sharpness of resonance.

## 3. Power in AC Circuits
- **Instantaneous Power:** $P = VI$.
- **Average Power:** $P_{avg} = V_{rms} I_{rms} \cos \phi$.
- **Power Factor:** $\cos \phi = R/Z$. For pure L or C, $\cos \phi = 0$ (Wattless current).

## 4. Transformers & LC Oscillations
### 4.1 Ideal Transformer
- **Ratio:** $\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$.
- **Efficiency:** $\eta = \frac{P_{out}}{P_{in}}$. Real losses include copper loss, iron loss, and flux leakage.

### 4.2 LC Oscillations
- Energy alternates between Electric ($Q^2/2C$) and Magnetic ($LI^2/2$).
- Angular frequency $\omega = 1/\sqrt{LC}$. Total energy is conserved.

## 5. Visual Aids & Diagrams
*(Imagine a phasor diagram as a clock hand rotating counter-clockwise. For LCR, $V_L$ points up, $V_C$ points down, and $V_R$ points right. The resultant $V$ is the vector sum. Visualize the resonance curve as a peak; higher Q-factor means a narrower, taller peak. For LC oscillations, see the charge on the capacitor and current in the inductor oscillating like a pendulum.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Resonance and Q-factor
**Q1.** A series LCR circuit has $L=1 \text{ mH}$, $C=1 \mu F$, and $R=10 \Omega$. Find the Q-factor.
**Concept:** $Q = \frac{1}{R}\sqrt{L/C}$.
**Solution:**
1. $Q = \frac{1}{10} \sqrt{\frac{10^{-3}}{10^{-6}}} = \frac{1}{10} \sqrt{1000} = \frac{10\sqrt{10}}{10} \approx 3.16$.

### Type 2: Power and Wattless Current
**Q1.** In an AC circuit, $V = 100 \sin(100t) \text{ V}$ and $I = 2 \sin(100t + \pi/3) \text{ A}$. Find the average power.
**Concept:** $P_{avg} = \frac{1}{2} V_0 I_0 \cos \phi$.
**Solution:**
1. $V_0 = 100, I_0 = 2, \phi = \pi/3$.
2. $P_{avg} = \frac{1}{2} \times 100 \times 2 \times \cos(60^\circ) = 100 \times 0.5 = 50 \text{ W}$.

### Type 3: LC Oscillation Energy
**Q1.** An LC circuit contains a $20 \text{ mH}$ inductor and a $50 \mu F$ capacitor. The initial charge is $10 \text{ mC}$. Find the max current.
**Concept:** $\frac{1}{2} L I_{max}^2 = \frac{1}{2} \frac{Q_0^2}{C}$.
**Solution:**
1. $I_{max}^2 = \frac{Q_0^2}{LC} = \frac{(10^{-2})^2}{(20 \times 10^{-3})(50 \times 10^{-6})} = \frac{10^{-4}}{10^{-6}} = 100$.
2. $I_{max} = 10 \text{ A}$.
