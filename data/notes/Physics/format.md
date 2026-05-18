---
id: format
title: "format"
subject: "Physics"
chapter: "format"
lastUpdated: "2026-05-17T12:27:39.621Z"
order: 999
sources:

---

Generate JEE (Physics/Chemistry/Maths) quick revision notes in clean Markdown with LaTeX.

Strict requirements:
- Keep it concise (1-page revision style)
- No long explanations
- No paragraphs
- Use bullet points wherever possible
- Focus on formulas, results, and problem-solving insights
- Output must be clean Markdown + LaTeX only (no extra text)

FORMAT:

# {Chapter Name}

## Key Concepts
- Short bullet points (max 5–6)
- Each point ≤ 1 line

## Core Formulae
- List only the most important formulas
- Each formula in LaTeX block:
$$ ... $$

## Derived Results / Standard Results
- Important results used directly in problems
- Use LaTeX blocks

## Special Cases / Exceptions
- Edge cases, boundary conditions
- Important theoretical facts

## Graphs / Trends (if applicable)
- Write relationships like:
- $y \propto x^2$
- Mention behavior (increasing/decreasing)

## Tricks / Shortcuts
- Problem-solving hacks
- Symmetry, approximations, substitutions

## Common Mistakes
- Typical student errors in exams

## Units / Dimensions (if applicable)
- Important units or dimensional formulas

STYLE RULES:
- No derivations
- No proofs
- No storytelling
- No emojis
- Maximize readability for quick revision
- Prefer formulas over text
- Keep everything exam-focused (JEE Main + Advanced)

EXAMPLE OUTPUT STYLE:

# Electrostatics

## Core Formulae
$$
F = k \frac{q_1 q_2}{r^2}
$$

$$
E = \frac{F}{q}
$$

## Tricks / Shortcuts
- Use symmetry to cancel electric field
- Check limiting cases ($r \to \infty$)

Now generate notes for: {TOPIC NAME}
