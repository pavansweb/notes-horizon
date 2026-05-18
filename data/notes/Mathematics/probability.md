---
id: probability
title: "Probability"
subject: "Mathematics"
chapter: "Algebra"
lastUpdated: "2026-05-17T23:45:00Z"
order: 5
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Algebra: Probability Theory

## 1. Event Operations & Independence
### 1.1 Fundamental Rules
- **Classical Probability:** $P(A) = n(A)/n(S)$.
- **Inclusion-Exclusion:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- **Independent Events:** $P(A \cap B) = P(A)P(B)$.
- **Mutually Exclusive:** $P(A \cap B) = 0$.

### 1.2 Conditional Probability
- **Definition:** $P(A|B) = \frac{P(A \cap B)}{P(B)}$.
- **Multiplication Theorem:** $P(A \cap B) = P(B)P(A|B) = P(A)P(B|A)$.

## 2. Advanced Theorems
### 2.1 Bayes' Theorem
- **Total Probability:** $P(A) = \sum P(E_i)P(A|E_i)$.
- **Bayes' Rule:** $P(E_i|A) = \frac{P(E_i)P(A|E_i)}{\sum P(E_j)P(A|E_j)}$. Used to find the "cause" probability given an "effect".

### 2.2 Binomial Distribution
- **Bernoulli Trials:** $P(X=r) = {}^nC_r p^r q^{n-r}$ (where $q = 1-p$).
- **Mean:** $np$. **Variance:** $npq$.

## 3. Visual Aids & Diagrams
*(Imagine a Venn Diagram with two circles; the intersection is $A \cap B$ and the entire colored region is $A \cup B$. Visualize a "Probability Tree" where each branch represents an outcome and the product of path probabilities gives the joint probability. For the Binomial distribution, see a Bell Curve showing the most likely number of successes in a large number of trials.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Bayes' Theorem (Incomplete Information)
**Q1.** A man is known to speak truth 3 out of 4 times. He throws a die and reports that it is a six. Find the probability that it is actually a six.
**Concept:** $E_1$: six occurs, $E_2$: six doesn't occur. $A$: he reports six.
**Solution:**
1. $P(E_1) = 1/6, P(E_2) = 5/6$.
2. $P(A|E_1) = 3/4$ (Truth). $P(A|E_2) = 1/4$ (Lie).
3. $P(E_1|A) = \frac{(1/6)(3/4)}{(1/6)(3/4) + (5/6)(1/4)} = \frac{3}{3+5} = 3/8$.

### Type 2: Binomial Distribution (At least one)
**Q1.** A pair of dice is thrown 7 times. If getting a total of 7 is considered a success, find the probability of at least 6 successes.
**Concept:** $P(X \ge 6) = P(X=6) + P(X=7)$.
**Solution:**
1. Success $p = 6/36 = 1/6, q = 5/6, n=7$.
2. $P(X=6) = {}^7C_6 (1/6)^6 (5/6)^1 = 7 \cdot 5 / 6^7 = 35/6^7$.
3. $P(X=7) = {}^7C_7 (1/6)^7 = 1/6^7$.
4. Sum $= 36/6^7 = 6^2/6^7 = 1/6^5$.

### Type 3: Geometrical Probability
**Q1.** A point $(x, y)$ is chosen inside a rectangle with vertices $(0,0), (2,0), (2,1), (0,1)$. Find the probability that $x^2 < y$.
**Concept:** $P = \text{Area of favorable region} / \text{Total Area}$.
**Solution:**
1. Total Area $= 2 \times 1 = 2$.
2. Favorable Area: $y > x^2$ inside the rectangle.
3. Curve $y=x^2$ meets $y=1$ at $x=1$.
4. Area $= \int_0^1 (1 - x^2) dx = [x - x^3/3]_0^1 = 2/3$.
5. $P = (2/3) / 2 = 1/3$.
