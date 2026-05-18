---
id: thermal-properties-of-matter
title: "Thermal Properties of Matter"
subject: "Physics"
chapter: "Thermal Physics"
lastUpdated: "2026-05-17T21:50:00.000Z"
order: 7
sources:
  - "https://jeemain.nta.nic.in"
  - "https://ncert.nic.in/textbook.php"
---

# Thermal Expansion, Calorimetry & Heat Transfer

## 1. Thermal Expansion
### 1.1 Solids and Liquids
- **Coefficients:** Linear ($\alpha$), Superficial ($\beta$), Volumetric ($\gamma$). $\alpha = \beta/2 = \gamma/3$.
- **Thermal Stress:** If a rod is fixed at ends and heated, stress $\sigma = Y \alpha \Delta T$.
- **Bimetallic Strip:** Bends towards the metal with lower $\alpha$ when heated.
- **Apparent Expansion (Liquids):** $\gamma_{real} = \gamma_{app} + \gamma_{vessel}$.

## 2. Calorimetry
- **Specific Heat ($c$):** $Q = mc \Delta T$. **Latent Heat ($L$):** $Q = mL$.
- **Water Equivalent:** Mass of water that absorbs same heat for same $\Delta T$.
- **Mixture Problems:** Use heat balance $\sum Q = 0$. Be careful with phase changes (check if enough heat exists to melt/boil).

## 3. Heat Transfer (The Three Modes)
### 3.1 Conduction
- **Rate of Flow:** $\frac{dQ}{dt} = \frac{kA(T_1-T_2)}{L}$.
- **Thermal Resistance:** $R_{th} = \frac{L}{kA}$. Series/Parallel combinations work like electrical resistors.

### 3.2 Radiation
- **Stefan-Boltzmann Law:** $P = e \sigma A T^4$. Net power loss $P_{net} = e \sigma A (T^4 - T_{surr}^4)$.
- **Wien's Displacement Law:** $\lambda_{max} T = b$ ($b \approx 2.89 \times 10^{-3} \text{ m K}$).
- **Newton's Law of Cooling:** $\frac{dT}{dt} = -k(T_{avg} - T_{surr})$. Valid for small $\Delta T$.

## 4. Visual Aids & Diagrams
*(Imagine a rod expanding and being compressed by rigid walls, creating tension. Visualize heat "flowing" through a series of copper and iron rods, with the temperature dropping across each "resistor". For radiation, see the blackbody spectrum shifting towards shorter wavelengths (blue) as temperature increases.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Mixture with Phase Change
**Q1.** Find the final temperature when $10 \text{ g}$ of ice at $-10^\circ\text{C}$ is mixed with $10 \text{ g}$ of steam at $100^\circ\text{C}$.
**Concept:** Step-by-step heat calculation. $L_f = 80, L_v = 540, c_{ice} = 0.5, c_w = 1 \text{ cal/g}^\circ\text{C}$.
**Solution:**
1. Heat to bring ice to $100^\circ\text{C}$ water: $10(0.5)(10) + 10(80) + 10(1)100 = 50 + 800 + 1000 = 1850 \text{ cal}$.
2. Heat from condensing steam: $10(540) = 5400 \text{ cal}$.
3. Since steam has more heat than needed, some steam remains. Final temp = $100^\circ\text{C}$.

### Type 2: Composite Rods (Conduction)
**Q1.** Two rods of same length and area but thermal conductivities $k$ and $2k$ are connected in series. Find equivalent $k_{eq}$.
**Concept:** $R_{eq} = R_1 + R_2$.
**Solution:**
1. $R_1 = L/kA$, $R_2 = L/(2k)A$.
2. $R_{eq} = \frac{2L}{k_{eq}A} = \frac{L}{kA} + \frac{L}{2kA} = \frac{3L}{2kA}$.
3. $k_{eq} = \frac{4}{3}k$.

### Type 3: Newton's Law of Cooling
**Q1.** A body cools from $60^\circ\text{C}$ to $50^\circ\text{C}$ in $10 \text{ min}$. How much time will it take to cool from $50^\circ\text{C}$ to $40^\circ\text{C}$ if the surrounding is at $20^\circ\text{C}$?
**Concept:** $\frac{\Delta T}{\Delta t} = K(T_{avg} - T_s)$.
**Solution:**
1. Case 1: $(60-50)/10 = K(55-20) \Rightarrow 1 = 35K$.
2. Case 2: $(50-40)/t = K(45-20) \Rightarrow 10/t = 25K$.
3. $t/10 = 35/25 = 7/5 \Rightarrow t = 14 \text{ minutes}$.
