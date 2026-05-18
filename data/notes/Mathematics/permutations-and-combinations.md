---
id: permutations-and-combinations
title: "Permutations and Combinations"
subject: "Mathematics"
chapter: "Algebra"
lastUpdated: "2026-05-17T23:40:00Z"
order: 4
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
---

# Algebra: Permutations & Combinations

## 1. Principles of Counting
### 1.1 Standard Rules
- **Multiplication (AND):** Total ways $m \times n$.
- **Addition (OR):** Total ways $m + n$ (if disjoint).
- **Bijection:** Total ways = Total - Restricted ways.

### 1.2 Arrangements (Permutations)
- **Distinct Objects:** $n$ objects in $r$ spots: $^nP_r = \frac{n!}{(n-r)!}$.
- **Identical Objects:** If $p$ are of one kind, $q$ of another: $\frac{n!}{p!q!}$.
- **Circular:** $(n-1)!$ for distinct. For identical (beads in necklace): $\frac{(n-1)!}{2}$.
- **Gap Method:** Place objects with restrictions in gaps between unrestricted ones.
- **String Method:** Tie objects together if they must stay together.

## 2. Selections (Combinations)
### 2.1 Fundamental Selection
- **Selection of $r$ from $n$:** $^nC_r = \frac{n!}{r!(n-r)!}$.
- **Pascal's Identity:** $^nC_r + ^nC_{r-1} = ^{n+1}C_r$.
- **Selection of Any Number:** $^nC_0 + ^nC_1 + \dots + ^nC_n = 2^n$.

### 2.2 Distributing Items (Beggar's Method)
- **Identical Items into Distinct Bins:** $^{n+r-1}C_{r-1}$.
- **Each bin gets at least 1:** $^{n-1}C_{r-1}$.
- **Distinct Items into Distinct Bins:** $r^n$ ways.

## 3. Advanced Counting
- **Derangements ($D_n$):** No object in its correct spot. $D_n = n! [1 - 1/1! + 1/2! - \dots + (-1)^n/n!]$.
- **Group Distribution:** Distributing $n+m+p$ items into groups of $n, m, p$ is $\frac{(n+m+p)!}{n!m!p!}$. (Divide by $3!$ if groups are identical size and not named).

## 4. Visual Aids & Diagrams
*(Imagine a tree diagram branching out at every decision point, illustrating the multiplication rule. Visualize $n$ people around a circular table; if you rotate the table, the arrangement remains the same unless you fix one person's position—that's $(n-1)!$. For the "Gap Method," imagine 5 girls sitting in the 6 gaps created by 5 boys to ensure no two girls are together. See the distribution of 10 identical candies into 3 boxes as 10 balls and 2 "dividers" being arranged in a line.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Word Arrangements (Gap Method)
**Q1.** Find the number of ways to arrange the letters of the word 'ASSASSINATION' such that no two 'S' are together.
**Concept:** Unrestricted letters first, then use gaps for 'S'.
**Solution:**
1. Count: A:3, S:4, I:2, N:2, T:1, O:1. Total = 13.
2. Arrange non-S letters (9): $\frac{9!}{3! 2! 2!} = 15120$.
3. Number of gaps between 9 letters = 10.
4. Choose 4 gaps for 'S': $^{10}C_4 = 210$.
5. Total $= 15120 \times 210 = 3175200$.

### Type 2: Sum of Digits
**Q1.** Find the sum of all 4-digit numbers that can be formed using digits $1, 2, 3, 4$ without repetition.
**Concept:** Sum $= (\text{Total numbers} / n) \times (\sum \text{digits}) \times (111\dots1)$.
**Solution:**
1. Total numbers $= 4! = 24$.
2. Each digit appears at every position $24/4 = 6$ times.
3. Sum $= 6(1+2+3+4)(1111) = 6(10)(1111) = 66660$.

### Type 3: Beggar's Method with Constraints
**Q1.** Number of non-negative integer solutions to $x_1 + x_2 + x_3 = 10$.
**Concept:** $^{n+r-1}C_{r-1}$.
**Solution:**
1. $n=10, r=3$.
2. Ways $= ^{10+3-1}C_{3-1} = ^{12}C_2 = \frac{12 \times 11}{2} = 66$.
