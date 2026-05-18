---
id: electrochemistry-and-redox
title: "Electrochemistry and Redox"
subject: "Chemistry"
chapter: "Physical Chemistry"
lastUpdated: "2026-05-17T15:19:31.000Z"
order: 7
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Electrochemistry and Redox

## Topic Breakdown
### 1. Redox Reactions
#### 1.1 Oxidation and Reduction
- Oxidation: Loss of electrons or increase in oxidation number.
- Reduction: Gain of electrons or decrease in oxidation number.
#### 1.2 Balancing Redox Reactions
- Half-reaction method and Oxidation number method in acidic and basic media.

### 2. Electrochemical Cells
#### 2.1 Galvanic (Voltaic) Cells
- Transformation of chemical energy into electrical energy.
- Components: Anode (Oxidation, negative), Cathode (Reduction, positive), Salt Bridge.
#### 2.2 Electrode Potential and EMF
- Standard Hydrogen Electrode (SHE) as reference ($E^\circ = 0$).
- $E_{cell} = E_{cathode} - E_{anode}$ (using reduction potentials).
#### 2.3 Nernst Equation
- Effect of concentration and temperature on electrode potential.

### 3. Electrolytic Cells and Electrolysis
#### 3.1 Faraday's Laws of Electrolysis
- First Law: Mass deposited is proportional to charge ($W = ZQ = ZIt$).
- Second Law: Mass deposited is proportional to chemical equivalent weight ($W \propto E_{eq}$).
#### 3.2 Electrolytic Conductance
- Resistance ($R$), Conductance ($G$), Specific Conductance ($\kappa$).
- Molar Conductivity ($\Lambda_m$) and Equivalent Conductivity ($\Lambda_{eq}$).
- Kohlrausch's Law of Independent Migration of Ions.

## Formulas & Laws
- **Nernst Equation (at 298 K):** $E = E^\circ - \frac{0.0591}{n} \log Q$
- **Gibbs Free Energy and Cell Potential:** $\Delta G = -nFE_{cell}$
- **Equilibrium Constant and $E^\circ$:** $\log K = \frac{n E_{cell}^\circ}{0.0591}$
- **Faraday's Constant:** $1F \approx 96487 \text{ C mol}^{-1}$ (charge on 1 mole of electrons)
- **Molar Conductivity:** $\Lambda_m = \frac{\kappa \times 1000}{M}$
- **Kohlrausch's Law:** $\Lambda_m^\circ = \nu_+ \lambda_+^\circ + \nu_- \lambda_-^\circ$

## JEE Focus & Common Traps
- **Sign Conventions:** In Galvanic cells, Anode is $(-)$ and Cathode is $(+)$. In Electrolytic cells, Anode is $(+)$ and Cathode is $(-)$. Remember: **ANOX** (Anode Oxidation) and **REDCAT** (Reduction Cathode) always apply.
- **Extensive vs Intensive:** $E_{cell}$ is an intensive property (doesn't depend on reaction size), but $\Delta G$ is extensive. You can add $\Delta G$ values for coupled reactions, but not $E_{cell}$ values directly.
- **Dilution Effects:** For all electrolytes, $\Lambda_m$ increases with dilution. However, $\kappa$ (conductivity) decreases because the number of ions per unit volume decreases.
- **Standard Reduction Potentials:** Always ensure you are using reduction potentials. If oxidation potential is given, reverse the sign: $E^\circ_{red} = -E^\circ_{ox}$.
\n\n## Typed Problems (JEE Main PYQ Based)
### Type 1: Nernst Equation
- **Q1.** Calculate the EMF of the cell $Zn|Zn^{2+}(0.1M) || Cu^{2+}(0.01M)|Cu$ at $298 K$. ($E^o_{cell} = 1.10 V$).
- **Concept:** $E_{cell} = E^o_{cell} - \frac{0.0591}{n} \log\frac{[Zn^{2+}]}{[Cu^{2+}]}$.
- **Solution:**
  1. $n=2$.
  2. $E_{cell} = 1.10 - \frac{0.0591}{2} \log\frac{0.1}{0.01} = 1.10 - 0.0295 \log(10)$.
  3. $E_{cell} = 1.10 - 0.0295 = 1.0705 V$.

### Type 2: Faraday's Laws
- **Q1.** How much electricity in Coulombs is required to reduce $1$ mole of $Al^{3+}$ to $Al$?
- **Concept:** $Q = nF$.
- **Solution:**
  1. $Al^{3+} + 3e^- \rightarrow Al$.
  2. $n=3$, $F = 96500 C/mol$.
  3. $Q = 3 \times 96500 = 289500 C$.
