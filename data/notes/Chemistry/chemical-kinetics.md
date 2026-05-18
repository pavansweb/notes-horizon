---
id: chemical-kinetics
title: "Chemical Kinetics"
subject: "Chemistry"
chapter: "Physical Chemistry"
lastUpdated: "2026-05-17T15:19:31.000Z"
order: 8
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Chemical Kinetics

## Topic Breakdown
### 1. Rate of Reaction
- **Average vs. Instantaneous Rate**.
- **Factors Affecting Rate**: Concentration, temperature, catalyst, and surface area.

### 2. Rate Law and Order
- **Order of Reaction**: Sum of exponents in the rate law (determined experimentally).
- **Molecularity**: Number of reacting species in an elementary step.

### 3. Integrated Rate Equations
- **Zero-order Reactions**: Concentration decreases linearly with time.
- **First-order Reactions**: Concentration decreases exponentially.

### 4. Collision Theory and Arrhenius Equation
- **Activation Energy ($E_a$)**: Minimum energy for effective collisions.
- **Temperature Dependence**: Frequency factor ($A$) and the exponential term.

## Formulas & Laws
- **Rate Law**: $\text{Rate} = k [A]^x [B]^y$
- **Zero Order**: $[A]_t = [A]_0 - kt$, $t_{1/2} = \frac{[A]_0}{2k}$
- **First Order**: $k = \frac{2.303}{t} \log \frac{[A]_0}{[A]_t}$, $t_{1/2} = \frac{0.693}{k}$
- **Arrhenius Equation**: $k = A e^{-E_a/RT}$
- **Temperature Coefficient**: $\log \frac{k_2}{k_1} = \frac{E_a}{2.303 R} \left( \frac{T_2 - T_1}{T_1 T_2} \right)$

## JEE Focus & Common Traps
- **Order vs. Molecularity**: Order can be zero, fractional, or negative, and is determined for the whole reaction. Molecularity is always a positive integer and only applies to elementary steps.
- **Unit of Rate Constant ($k$)**: $k$ has units of $(mol \cdot L^{-1})^{1-n} s^{-1}$, where $n$ is the order.
- **First-order Half-life**: Remember it is INDEPENDENT of the initial concentration. If a problem states $t_{1/2}$ changes with $[A]_0$, it is NOT first-order.
- **Parallel Reactions**: In a parallel reaction $A \to B$ ($k_1$) and $A \to C$ ($k_2$), the overall rate constant $k = k_1 + k_2$, and the ratio of products is $[B]/[C] = k_1/k_2$.
\n\n## Typed Problems (JEE Main PYQ Based)
### Type 1: First Order Kinetics
- **Q1.** A first order reaction is $25\%$ complete in $40$ minutes. Calculate the time required for $50\%$ completion.
- **Concept:** $k = \frac{2.303}{t} \log\frac{[A]_0}{[A]}$.
- **Solution:**
  1. Case 1: $k = \frac{2.303}{40} \log\frac{100}{75} = \frac{2.303}{40} \log(1.33)$.
  2. Case 2: $k = \frac{2.303}{t_{1/2}} \log(2) \implies t_{1/2} = \frac{0.693}{k}$.
  3. Calculate $k$ first, then $t_{1/2}$. $k = 0.00718 min^{-1} \implies t_{1/2} = \frac{0.693}{0.00718} \approx 96.5 min$.

### Type 2: Arrhenius Equation
- **Q1.** The rate constant of a reaction doubles when the temperature increases from $300 K$ to $310 K$. Calculate $E_a$.
- **Concept:** $\log\frac{k_2}{k_1} = \frac{E_a}{2.303R} \left( \frac{T_2 - T_1}{T_1 T_2} \right)$.
- **Solution:**
  1. $\log(2) = \frac{E_a}{2.303 \times 8.314} \left( \frac{10}{300 \times 310} \right)$.
  2. $0.301 = \frac{E_a}{19.147} \times 1.075 \times 10^{-4}$.
  3. $E_a \approx 53.6 kJ/mol$.
