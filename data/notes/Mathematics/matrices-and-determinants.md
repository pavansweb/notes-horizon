---
id: matrices-and-determinants
title: "Matrices and Determinants"
subject: "Mathematics"
chapter: "Algebra"
lastUpdated: "2026-05-17T22:50:00Z"
order: 5
sources:
  - "https://jeemain.nta.nic.in"
  - "https://jeeadv.ac.in"
  - "https://ncert.nic.in/textbook.php"
---

# Linear Algebra: Matrices & Determinants

## 1. Matrix Theory & Operations
### 1.1 Special Square Matrices
- **Orthogonal:** $A A^T = I \Rightarrow |A| = \pm 1$.
- **Idempotent:** $A^2 = A$.
- **Involutory:** $A^2 = I$.
- **Nilpotent:** $A^k = O$ for some $k \in \mathbb{N}$.
- **Skew-Symmetric:** $A^T = -A$. Diagonal elements are always zero. Determinant of odd-order skew-symmetric matrix is zero.

### 1.2 Adjoint and Inverse Properties
Let $A$ be a non-singular matrix of order $n$:
- $A(adj A) = (adj A)A = |A|I$.
- $|adj A| = |A|^{n-1}$.
- $adj(adj A) = |A|^{n-2}A$.
- $|adj(adj A)| = |A|^{(n-1)^2}$.
- $(adj A)^{-1} = adj(A^{-1}) = \frac{A}{|A|}$.

## 2. Determinants (Deep Dive)
### 2.1 Advanced Properties
- **Differentiation:** $\frac{d}{dx} |F(x)|$ is the sum of determinants where one row is differentiated at a time.
- **Multiplication:** $|AB| = |A||B|$.
- **Cayley-Hamilton Theorem:** Every square matrix satisfies its own characteristic equation $|A - \lambda I| = 0$. Used to find $A^{-1}$ and $A^n$.

## 3. System of Linear Equations
### 3.1 Non-Homogeneous ($AX = B$)
- **Unique Solution:** $\Delta \neq 0$.
- **Infinite Solutions:** $\Delta = 0$ AND $\Delta_x = \Delta_y = \Delta_z = 0$ (Cramer's) or $(adj A)B = O$.
- **No Solution:** $\Delta = 0$ AND at least one $\Delta_i \neq 0$.

### 3.2 Homogeneous ($AX = O$)
- **Trivial Solution ($X=O$):** $|A| \neq 0$.
- **Non-Trivial Solutions:** $|A| = 0$.

## 4. Visual Aids & Diagrams
*(Imagine a matrix transformation rotating a unit square in the 2D plane. Visualize a system of 3 linear equations as 3 planes in 3D space; if they intersect at a point, it's a unique solution. If they intersect along a line, infinite solutions. If two are parallel or they form a triangular prism, no solution.)*

## Typed Problems (JEE Main PYQ Based)

### Type 1: Adjoint Properties
**Q1.** If $A$ is a $3 \times 3$ matrix such that $|A| = 2$, find $|adj(3 adj(2A))|$.
**Concept:** $|kA| = k^n|A|$ and $|adj A| = |A|^{n-1}$.
**Solution:**
1. $|2A| = 2^3 |A| = 8 \times 2 = 16$.
2. $|adj(2A)| = |2A|^{3-1} = 16^2 = 256$.
3. $|3 adj(2A)| = 3^3 |adj(2A)| = 27 \times 256 = 6912$.
4. $|adj(3 adj(2A))| = |3 adj(2A)|^{3-1} = 6912^2$.

### Type 2: Cayley-Hamilton Application
**Q1.** If $A = \begin{bmatrix} 1 & 0 \\ 2 & 3 \end{bmatrix}$, find $A^{-1}$ using Cayley-Hamilton.
**Concept:** Characteristic equation $|A - \lambda I| = 0$.
**Solution:**
1. $(1-\lambda)(3-\lambda) - 0 = 0 \Rightarrow \lambda^2 - 4\lambda + 3 = 0$.
2. By CH theorem: $A^2 - 4A + 3I = O$.
3. Multiply by $A^{-1}$: $A - 4I + 3A^{-1} = O$.
4. $A^{-1} = \frac{1}{3}(4I - A) = \frac{1}{3} \left( \begin{bmatrix} 4 & 0 \\ 0 & 4 \end{bmatrix} - \begin{bmatrix} 1 & 0 \\ 2 & 3 \end{bmatrix} \right) = \frac{1}{3} \begin{bmatrix} 3 & 0 \\ -2 & 1 \end{bmatrix}$.

### Type 3: System of Equations (Infinite Solutions)
**Q1.** Find $k$ if $x+y+z=1, x+2y+4z=k, x+4y+10z=k^2$ has infinite solutions.
**Concept:** $\Delta = 0$ and $\Delta_x = 0$.
**Solution:**
1. $\Delta = \begin{vmatrix} 1 & 1 & 1 \\ 1 & 2 & 4 \\ 1 & 4 & 10 \end{vmatrix} = (20-16) - (10-4) + (4-2) = 4 - 6 + 2 = 0$. (Confirmed).
2. $\Delta_x = \begin{vmatrix} 1 & 1 & 1 \\ k & 2 & 4 \\ k^2 & 4 & 10 \end{vmatrix} = 1(20-16) - 1(10k-4k^2) + 1(4k-2k^2) = 4 - 10k + 4k^2 + 4k - 2k^2 = 2k^2 - 6k + 4 = 0$.
3. $k^2 - 3k + 2 = 0 \Rightarrow k = 1, 2$.
