---
id: semiconductors
title: "Semiconductors"
subject: "Physics"
chapter: "Modern Physics"
lastUpdated: "2026-05-17T22:05:00.000Z"
order: 15
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Semiconductor Electronics & Logic Gates

## 1. Materials and Junctions
### 1.1 Types of Semiconductors
- **Intrinsic:** Pure Ge or Si. $n_e = n_h = n_i$. $n_e n_h = n_i^2$ (Mass Action Law).
- **Extrinsic:**
    - **n-type:** Doped with Pentavalent (P, As, Sb). $n_e \gg n_h$.
    - **p-type:** Doped with Trivalent (B, Al, In). $n_h \gg n_e$.

### 1.2 P-N Junction
- **Depletion Layer:** Region near junction devoid of mobile carriers. Barrier potential $V_b$ prevents further diffusion.
- **Forward Bias:** P to $(+)$, N to $(-)$. Depletion layer thins, $R$ decreases, current flows.
- **Reverse Bias:** P to $(-)$, N to $(+)$. Depletion layer thickens, $R$ increases, no current (except saturation current).

## 2. Diode Applications
### 2.1 Rectifiers
- **Half Wave:** Efficiency $\eta \approx 40.6\%$.
- **Full Wave:** Efficiency $\eta \approx 81.2\%$. Ripple factor is lower.

### 2.2 Special Purpose Diodes
- **Zener Diode:** Operates in reverse breakdown. Used as a **Voltage Regulator**.
- **Photodiode:** Reverse biased. Conducts when light falls on it.
- **LED:** Forward biased. Emits light via electron-hole recombination.

## 3. Digital Electronics (Logic Gates)
### 3.1 Basic Gates
- **OR ($A+B$):** Output high if any input is high.
- **AND ($A\cdot B$):** Output high only if both inputs are high.
- **NOT ($\bar{A}$):** Inverts input.

### 3.2 Universal Gates
- **NAND ($\overline{A \cdot B}$):** AND + NOT.
- **NOR ($\overline{A + B}$):** OR + NOT.
- **De Morgan's Laws:** $\overline{A+B} = \bar{A} \cdot \bar{B}$ and $\overline{A\cdot B} = \bar{A} + \bar{B}$.

## 4. Visual Aids & Diagrams
*(Imagine the energy band diagram of a semiconductor with a narrow gap between conduction and valence bands. Visualize a P-N junction with negative ions on the P-side and positive ions on the N-side of the depletion layer. For logic gates, see a circuit with two switches in series for AND, and in parallel for OR.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Zener Regulator
**Q1.** A Zener diode of $V_z = 10 \text{ V}$ is used in a circuit with input $V_{in} = 20 \text{ V}$ and series resistor $R_s = 500 \Omega$. Find the current through the Zener if load $R_L = 1 k\Omega$.
**Concept:** $V_L = V_z$ (if $V_{in} > V_z$). $I_s = I_z + I_L$.
**Solution:**
1. $I_s = (20-10)/500 = 0.02 \text{ A} = 20 \text{ mA}$.
2. $I_L = 10/1000 = 0.01 \text{ A} = 10 \text{ mA}$.
3. $I_z = I_s - I_L = 20 - 10 = 10 \text{ mA}$.

### Type 2: Logic Gate Combination
**Q1.** What is the output of a NAND gate whose both inputs are tied together?
**Concept:** $\overline{A \cdot A} = \bar{A}$.
**Solution:** It behaves as a **NOT** gate.

### Type 3: Mass Action Law
**Q1.** In a doped semiconductor, $n_i = 10^{16} \text{ m}^{-3}$ and $n_e = 10^{22} \text{ m}^{-3}$. Find the hole concentration.
**Concept:** $n_e n_h = n_i^2$.
**Solution:**
1. $10^{22} \times n_h = (10^{16})^2 = 10^{32}$.
2. $n_h = 10^{10} \text{ m}^{-3}$.
