---
id: thermodynamics-and-thermochemistry
title: "Thermodynamics and Thermochemistry"
subject: "Chemistry"
chapter: "Physical Chemistry"
lastUpdated: "2026-05-17T15:19:31.000Z"
order: 5
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Thermodynamics and Thermochemistry

## Topic Breakdown
### 1. Basic Concepts and Zeroth Law
#### 1.1 System and Surroundings
- Types of Systems: Open, Closed, and Isolated.
- State Functions vs. Path Functions: State functions (U, H, S, G) depend only on the state of the system, not the path taken.
#### 1.2 Intensive and Extensive Properties
- Extensive: Mass, Volume, Internal Energy.
- Intensive: Temperature, Pressure, Density, Molar Heat Capacity.

### 2. First Law of Thermodynamics
#### 2.1 Internal Energy and Enthalpy
- Internal Energy ($U$): Sum of all microscopic energies.
- Enthalpy ($H$): $H = U + PV$.
#### 2.2 Work and Heat
- PV Work: $w = -P_{ext}\Delta V$.
- Sign Convention: $w > 0$ if work is done on the system; $q > 0$ if heat is absorbed by the system.

### 3. Thermochemistry
#### 3.1 Enthalpy of Reaction
- Standard Enthalpy of Formation ($\Delta_f H^\circ$).
- Hess's Law of Constant Heat Summation.
#### 3.2 Bond Enthalpy
- Calculation of $\Delta_r H$ using bond energies: $\Delta_r H = \sum \text{Bond energies (Reactants)} - \sum \text{Bond energies (Products)}$.

### 4. Second and Third Laws
#### 4.1 Entropy ($S$)
- Spontaneity and Entropy change of the universe: $\Delta S_{univ} = \Delta S_{sys} + \Delta S_{surr} > 0$.
#### 4.2 Gibbs Free Energy ($G$)
- Criterion for spontaneity: $\Delta G = \Delta H - T\Delta S < 0$ at constant $T$ and $P$.

## Formulas & Laws
- **First Law:** $\Delta U = q + w$
- **Enthalpy-Internal Energy Relation:** $\Delta H = \Delta U + \Delta n_g RT$
- **Heat Capacity:** $C_p - C_v = R$ (for 1 mole of ideal gas)
- **Kirchhoff's Equation:** $\Delta H_{T_2} = \Delta H_{T_1} + \Delta C_p(T_2 - T_1)$
- **Gibbs-Helmholtz Equation:** $\Delta G = \Delta H - T\Delta S$
- **Standard Free Energy and Equilibrium:** $\Delta G^\circ = -RT \ln K = -2.303 RT \log K$

## JEE Focus & Common Traps
- **Sign Convention:** Always be careful with the sign of work ($w$). In chemistry, $w = -P\Delta V$ (IUPAC).
- **State vs. Path:** Remember that $q$ and $w$ are path functions, but $q + w$ (which is $\Delta U$) is a state function.
- **Standard States:** $\Delta_f H^\circ$ for elements in their most stable state at 1 bar and 298K is zero (e.g., $O_2(g)$, $C(\text{graphite})$).
- **Reversible vs. Irreversible:** Reversible work is the maximum work (expansion): $w_{rev} = -2.303 nRT \log \frac{V_2}{V_1}$.
\n\n## Typed Problems (JEE Main PYQ Based)
### Type 1: Enthalpy of Combustion
- **Q1.** The enthalpy of combustion of methane, graphite and dihydrogen at $298 K$ are $-890.3 kJ/mol$, $-393.5 kJ/mol$ and $-285.8 kJ/mol$ respectively. Calculate enthalpy of formation of $CH_4(g)$.
- **Concept:** $\Delta_f H^o = \sum \Delta H_{comb}(Reactants) - \sum \Delta H_{comb}(Products)$.
- **Solution:**
  1. $C(s) + 2H_2(g) \rightarrow CH_4(g)$.
  2. $\Delta_f H = \Delta H_{comb}(C) + 2\Delta H_{comb}(H_2) - \Delta H_{comb}(CH_4)$.
  3. $\Delta_f H = -393.5 + 2(-285.8) - (-890.3) = -393.5 - 571.6 + 890.3 = -74.8 kJ/mol$.

### Type 2: Gibbs Free Energy and Spontaneity
- **Q1.** For a reaction, $\Delta H = 400 kJ/mol$ and $\Delta S = 0.2 kJ/mol\cdot K$. Above what temperature will the reaction be spontaneous?
- **Concept:** Spontaneous if $\Delta G < 0$. $\Delta G = \Delta H - T\Delta S$.
- **Solution:**
  1. $0 = 400 - T(0.2) \implies T = 400 / 0.2 = 2000 K$.
  2. Spontaneous above $2000 K$.
