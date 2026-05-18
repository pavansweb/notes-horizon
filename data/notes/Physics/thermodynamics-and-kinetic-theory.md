---
id: thermodynamics-and-kinetic-theory
title: "Thermodynamics and Kinetic Theory"
subject: "Physics"
chapter: "Thermal Physics"
lastUpdated: "2026-05-17T21:55:00.000Z"
order: 8
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Thermodynamics & Kinetic Theory of Gases

## 1. Kinetic Theory of Gases (KTG)
### 1.1 Ideal Gas Laws
- **Equation of State:** $PV = nRT = Nk_BT$.
- **Gas Speeds:**
    - **RMS Speed:** $v_{rms} = \sqrt{\frac{3RT}{M}} = \sqrt{\frac{3k_BT}{m}}$.
    - **Average Speed:** $v_{avg} = \sqrt{\frac{8RT}{\pi M}}$.
    - **Most Probable:** $v_{mp} = \sqrt{\frac{2RT}{M}}$.
- **Mean Free Path:** $\lambda = \frac{1}{\sqrt{2}\pi d^2 n}$, where $n$ is number density.

### 1.2 Internal Energy and Equipartition
- **Degrees of Freedom ($f$):** Monoatomic ($f=3$), Diatomic ($f=5$), Non-linear ($f=6$).
- **Internal Energy ($U$):** $U = \frac{f}{2} nRT$.
- **Molar Heat Capacities:** $C_v = \frac{f}{2}R$, $C_p = (\frac{f}{2} + 1)R$. $\gamma = 1 + 2/f$.

## 2. Laws of Thermodynamics
### 2.1 First Law
- **Equation:** $Q = \Delta U + W$.
- **Work Done:** $W = \int P dV$.
    - **Isothermal ($T$ const):** $W = nRT \ln(V_2/V_1)$. $\Delta U = 0$.
    - **Adiabatic ($Q=0$):** $PV^\gamma = \text{const}$. $W = \frac{P_1V_1 - P_2V_2}{\gamma-1}$.
    - **Isobaric ($P$ const):** $W = P(V_2-V_1) = nR \Delta T$.

### 2.2 Heat Engines and II Law
- **Efficiency ($\eta$):** $\eta = \frac{W}{Q_{in}} = 1 - \frac{Q_{out}}{Q_{in}}$.
- **Carnot Engine:** $\eta = 1 - T_L/T_H$.
- **Refrigerator (COP $\beta$):** $\beta = \frac{Q_L}{W} = \frac{T_L}{T_H - T_L}$.

## 3. Visual Aids & Diagrams
*(Imagine a P-V diagram with an Isothermal curve (gentle slope) and an Adiabatic curve (steep slope). For a cyclic process, visualize the area enclosed by the path as the net work done. See the KTG model as billions of tiny spheres colliding elastically with the walls, creating pressure.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Mixture of Gases
**Q1.** $2 \text{ moles}$ of Helium (monoatomic) are mixed with $3 \text{ moles}$ of Hydrogen (diatomic). Find the equivalent $\gamma$ of the mixture.
**Concept:** $C_{v,eq} = \frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2}$, $\gamma_{eq} = 1 + R/C_{v,eq}$.
**Solution:**
1. $C_{v1} = 3/2 R$, $C_{v2} = 5/2 R$.
2. $C_{v,eq} = \frac{2(3/2 R) + 3(5/2 R)}{5} = \frac{3R + 7.5R}{5} = 2.1R$.
3. $\gamma_{eq} = 1 + R/(2.1R) = 1 + 1/2.1 \approx 1.47$.

### Type 2: Adiabatic Process
**Q1.** An ideal gas at $27^\circ\text{C}$ is compressed adiabatically to $8/27$ of its original volume. If $\gamma=5/3$, find the final temperature.
**Concept:** $TV^{\gamma-1} = \text{const}$.
**Solution:**
1. $T_1 V_1^{2/3} = T_2 V_2^{2/3}$.
2. $300 (V)^{2/3} = T_2 (8/27 V)^{2/3}$.
3. $300 = T_2 (2/3)^2 = T_2 (4/9)$.
4. $T_2 = (300 \times 9)/4 = 675 \text{ K} = 402^\circ\text{C}$.

### Type 3: Carnot Efficiency
**Q1.** A Carnot engine works between $600 \text{ K}$ and $300 \text{ K}$. It performs $1000 \text{ J}$ of work per cycle. Find the heat rejected.
**Concept:** $W/Q_{in} = 1 - T_L/T_H$.
**Solution:**
1. $\eta = 1 - 300/600 = 0.5$.
2. $Q_{in} = W/\eta = 1000/0.5 = 2000 \text{ J}$.
3. $Q_{out} = Q_{in} - W = 2000 - 1000 = 1000 \text{ J}$.
