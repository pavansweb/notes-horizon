---
id: sequences-series-and-binomial-theorem
title: "Sequences, Series and Binomial Theorem"
subject: "Mathematics"
chapter: "Algebra"
lastUpdated: "2026-05-17T23:35:00Z"
order: 3
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Sequences, Series & Binomial Theorem

## 1. Progressions & Sums
### 1.1 Progressions (AP, GP, HP)
- **AP:** $a, a+d, a+2d, \dots$. Sum $S_n = \frac{n}{2}[2a+(n-1)d]$.
- **GP:** $a, ar, ar^2, \dots$. Sum $S_n = a(r^n-1)/(r-1)$. Infinite sum $S_\infty = a/(1-r)$ ($|r|<1$).
- **HP:** Reciprocals are in AP. $HM = \frac{2ab}{a+b}$.
- **AM-GM-HM Inequality:** $\frac{a+b}{2} \ge \sqrt{ab} \ge \frac{2ab}{a+b}$. (Equality holds if $a=b$).

### 1.2 Special Series
- **Sum of Powers:** $\sum n = \frac{n(n+1)}{2}$, $\sum n^2 = \frac{n(n+1)(2n+1)}{6}$, $\sum n^3 = (\frac{n(n+1)}{2})^2$.
- **Arithmetico-Geometric (AGP):** $a, (a+d)r, (a+2d)r^2, \dots$. Solve by multiplying by $r$ and subtracting.
- **Method of Differences:** For series where $T_n$ is a polynomial, or $T_n = V_r - V_{r-1}$ (telescoping).

## 2. Binomial Theorem
### 2.1 Standard Expansion
- **Formula:** $(x+y)^n = \sum_{r=0}^n {}^nC_r x^{n-r} y^r$. 
- **General Term:** $T_{r+1} = {}^nC_r x^{n-r} y^r$.
- **Middle Term:** If $n$ is even, $T_{n/2+1}$. If $n$ is odd, $T_{(n+1)/2}$ and $T_{(n+3)/2}$.

### 2.2 Binomial Coefficients
- **Calculus Method:**
    - $\sum_{r=0}^n {}^nC_r = 2^n$.
    - $\sum_{r=1}^n r \cdot {}^nC_r = n \cdot 2^{n-1}$ (Differentiate $(1+x)^n$).
    - $\sum_{r=0}^n \frac{{}^nC_r}{r+1} = \frac{2^{n+1}-1}{n+1}$ (Integrate $(1+x)^n$).
- **Remainder Problems:** $(1+x)^n = 1 + nx + \dots$. Useful for $a^n \pmod b$.

## 3. Visual Aids & Diagrams
*(Imagine a sequence of dots forming a triangle for AP and a fractal-like scaling for GP. Visualize Pascal's Triangle as a pyramid where each number is the sum of the two above it, revealing binomial coefficients in each row. For the AM-GM inequality, see a semi-circle where the radius is the AM and the perpendicular height to the diameter is the GM.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Remainder using Binomial
**Q1.** Find the remainder when $7^{103}$ is divided by $25$.
**Concept:** Express as $(a \pm 1)^n$.
**Solution:**
1. $7^{103} = 7 \cdot (7^2)^{51} = 7 \cdot (49)^{51} = 7 \cdot (50 - 1)^{51}$.
2. Expansion: $7 [ (50)^{51} - 51(50)^{50} + \dots + 51(50) - 1]$.
3. All terms except the last are divisible by 25.
4. $7 [ 25k - 1 ] = 175k - 7 = 175k - 25 + 18$.
5. Remainder is $18$.

### Type 2: Summation of Binomial Series
**Q1.** Find the sum $\sum_{r=1}^{10} r^2 \cdot {}^{10}C_r$.
**Concept:** $r^2 = r(r-1) + r$.
**Solution:**
1. $\sum r(r-1) {}^{10}C_r + \sum r {}^{10}C_r$.
2. $= 10 \cdot 9 \cdot 2^8 + 10 \cdot 2^9 = 90 \cdot 256 + 10 \cdot 512$.
3. $= 23040 + 5120 = 28160$.

### Type 3: AM-GM Application
**Q1.** If $x, y, z > 0$ and $x+y+z = 18$, find the maximum value of $x^2 y^3 z$.
**Concept:** Weighted AM-GM on $(x/2, x/2, y/3, y/3, y/3, z)$.
**Solution:**
1. Use $6$ terms. $\frac{x/2 + x/2 + y/3 + y/3 + y/3 + z}{6} \ge ( (x/2)^2 (y/3)^3 z )^{1/6}$.
2. $\frac{18}{6} \ge ( \frac{x^2 y^3 z}{4 \cdot 27} )^{1/6} \Rightarrow 3^6 \ge \frac{x^2 y^3 z}{108}$.
3. Max value $= 108 \times 3^6$.
