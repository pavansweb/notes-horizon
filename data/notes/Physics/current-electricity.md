---
id: current-electricity
title: "Current Electricity"
subject: "Physics"
chapter: "Electrodynamics"
lastUpdated: "2026-05-17T21:25:00.000Z"
order: 11
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Current Electricity & DC Circuits

## 1. Electric Current & Microscopic View
### 1.1 Drift Velocity and Mobility
- **Drift Velocity ($v_d$):** The average velocity acquired by free electrons in a conductor. $v_d = \frac{eE\tau}{m}$.
- **Relation with Current:** $I = n e A v_d$.
- **Current Density ($\vec{J}$):** $\vec{J} = n e \vec{v}_d = \sigma \vec{E}$ (Microscopic Ohm's Law).
- **Relaxation Time ($\tau$):** Average time between two successive collisions. Decreases as temperature increases.

### 1.2 Resistance and Resistivity
- **Temperature Dependence:** $\rho_t = \rho_0[1 + \alpha(t-t_0)]$. For semiconductors, $\alpha$ is negative.
- **Color Coding:** BBROY of Great Britain has a Very Good Wife (Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White).

## 2. DC Circuit Analysis
### 2.1 Kirchhoff's Laws
- **KCL (Junction Rule):** Based on conservation of charge. $\sum I_{node} = 0$.
- **KVL (Loop Rule):** Based on conservation of energy. $\sum V_{loop} = 0$.

### 2.2 Combination of Cells
- **Series:** $E_{eq} = \sum E_i$, $r_{eq} = \sum r_i$.
- **Parallel (Different EMFs):** $E_{eq} = \frac{E_1/r_1 + E_2/r_2}{1/r_1 + 1/r_2}$, $r_{eq} = \frac{r_1 r_2}{r_1 + r_2}$.

### 2.3 Maximum Power Transfer Theorem
Power dissipated in external resistance $R$ is maximum when $R = r$ (internal resistance). $P_{max} = \frac{E^2}{4r}$.

## 3. Measuring Instruments
### 3.1 Potentiometer
- **Principle:** $V \propto l$ (potential gradient $k = V/L$).
- **Internal Resistance:** $r = R \left( \frac{l_1}{l_2} - 1 \right)$.

### 3.2 Galvanometer Conversion
- **To Ammeter:** Shunt $S = \frac{I_g G}{I - I_g}$ in parallel.
- **To Voltmeter:** Resistance $R = \frac{V}{I_g} - G$ in series.

## 4. RC Circuits (Transient State)
### 4.1 Charging of Capacitor
- $q(t) = Q_0(1 - e^{-t/RC})$, where $\tau = RC$ is the time constant.
- Current $I(t) = \frac{E}{R} e^{-t/RC}$.

### 4.2 Discharging of Capacitor
- $q(t) = Q_0 e^{-t/RC}$.

## 5. Visual Aids & Diagrams
*(Imagine a complex circuit mesh. Use Nodal analysis by assuming one node as 0V and applying KCL to find others. Visualize a Potentiometer as a long wire where a jockey slides to find the "null point"—the position where no current flows through the galvanometer. For RC circuits, see the exponential growth/decay curves.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Nodal Analysis
**Q1.** Find the current in a $2 \Omega$ resistor connected between two nodes of potential $10 \text{ V}$ and $4 \text{ V}$.
**Concept:** $I = \Delta V / R$.
**Solution:**
1. $\Delta V = 10 - 4 = 6 \text{ V}$.
2. $I = 6/2 = 3 \text{ A}$.

### Type 2: Potentiometer (Comparing EMFs)
**Q1.** A potentiometer wire of length $10 \text{ m}$ has a resistance of $20 \Omega$. It is connected in series with a battery of $3 \text{ V}$ and resistance $10 \Omega$. Find the potential gradient.
**Concept:** $k = V_{wire} / L_{wire}$.
**Solution:**
1. $I_{total} = 3 / (20 + 10) = 0.1 \text{ A}$.
2. $V_{wire} = I \times R_{wire} = 0.1 \times 20 = 2 \text{ V}$.
3. $k = 2 / 10 = 0.2 \text{ V/m}$.

### Type 3: RC Circuit (Time Constant)
**Q1.** A $2 \mu F$ capacitor is charged through a $1 M\Omega$ resistor. How much time does it take to reach $63\%$ of its maximum charge?
**Concept:** At $t = \tau = RC$, $q = 0.63 Q_0$.
**Solution:**
1. $\tau = RC = (1 \times 10^6) \times (2 \times 10^{-6}) = 2 \text{ seconds}$.
2. The answer is $2 \text{ s}$.
