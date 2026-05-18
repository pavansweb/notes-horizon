---
id: statistics-and-mathematical-reasoning-essentials
title: "Statistics and Mathematical Reasoning"
subject: "Mathematics"
chapter: "Statistics"
lastUpdated: "2026-05-17T23:50:00Z"
order: 14
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Statistics & Mathematical Reasoning

## 1. Statistics (Data Analysis)
### 1.1 Central Tendency & Dispersion
- **Mean ($\bar{x}$):** $\frac{\sum x_i}{n}$.
- **Variance ($\sigma^2$):** $\frac{\sum x_i^2}{n} - (\bar{x})^2$. (Most important for JEE).
- **Standard Deviation ($\sigma$):** $\sqrt{\text{Variance}}$.
- **Combined Mean/Variance:** For two groups $(n_1, \bar{x}_1, \sigma_1)$ and $(n_2, \bar{x}_2, \sigma_2)$.

### 1.2 Effects of Data Transformation
If every observation $x_i$ is replaced by $ax_i + b$:
- **New Mean:** $a\bar{x} + b$.
- **New Variance:** $a^2 \sigma^2$ (Independent of $b$).
- **New SD:** $|a| \sigma$.

## 2. Mathematical Reasoning (Logic)
### 2.1 Logical Connectives
- **Conjunction ($p \land q$):** True if both true.
- **Disjunction ($p \lor q$):** True if at least one true.
- **Implication ($p \to q$):** Equivalent to $\sim p \lor q$.
- **Contrapositive:** $\sim q \to \sim p$ (Equivalent to $p \to q$).

### 2.2 Algebra of Statements
- **De Morgan's Laws:** $\sim(p \land q) \equiv \sim p \lor \sim q$.
- **Tautology:** Statement which is always true.
- **Fallacy:** Statement which is always false.

## 3. Visual Aids & Diagrams
*(Imagine a Truth Table with columns for p, q, and their various combinations, filled with T and F. Visualize a "Frequency Histogram" where the center of mass is the Mean. See a set of data points on a line; if you shift them all by $b$, the "spread" (variance) stays exactly the same, but the "center" (mean) shifts by $b$. For logic, visualize a "Switching Circuit" where series is AND and parallel is OR.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Combined Variance
**Q1.** Two sets of data have sizes $10$ and $20$, means $5$ and $5$, and variances $2$ and $3$. Find the combined variance.
**Concept:** Since means are equal, $\sigma^2 = \frac{n_1 \sigma_1^2 + n_2 \sigma_2^2}{n_1 + n_2}$.
**Solution:**
1. $\sigma^2 = \frac{10(2) + 20(3)}{10 + 20} = \frac{20 + 60}{30} = 80/30 = 2.67$.

### Type 2: Data Transformation
**Q1.** The mean and variance of 5 observations are 4 and 5.2. If three are 1, 2, 6, find the other two.
**Concept:** Use $\sum x_i$ and $\sum x_i^2$.
**Solution:**
1. $\sum x_i = 5 \times 4 = 20 \Rightarrow 1+2+6+x+y = 20 \Rightarrow x+y = 11$.
2. $\sum x_i^2 / 5 - 16 = 5.2 \Rightarrow \sum x_i^2 = 5 \times 21.2 = 106$.
3. $1^2+2^2+6^2+x^2+y^2 = 106 \Rightarrow 41+x^2+y^2 = 106 \Rightarrow x^2+y^2 = 65$.
4. Solve: $x+y=11, x^2+y^2=65 \Rightarrow x(11-x) = (121-65)/2 = 28 \Rightarrow x^2-11x+28=0 \Rightarrow x=4, y=7$.

### Type 3: Logical Equivalence
**Q1.** What is the contrapositive of "If $2+2=5$, then I am the Pope"?
**Concept:** $p \to q \equiv \sim q \to \sim p$.
**Solution:** "If I am not the Pope, then $2+2 \
eq 5$".
