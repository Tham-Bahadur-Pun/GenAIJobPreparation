# The Design System: Operational Excellence for CV Scan

## 1. Overview & Creative North Star: "The Intelligent Canvas"

This design system is built to transcend the "generic SaaS" aesthetic. Our Creative North Star is **The Intelligent Canvas**. In a recruitment landscape cluttered with dense grids and loud alerts, this system acts as a high-end editorial gallery for human potential.

We move beyond standard UI by embracing **Soft Minimalism**. This isn't just about removing elements; it’s about intentionality. We utilize asymmetric layouts to guide the eye toward AI-driven insights, overlapping surfaces to create a sense of tactile depth, and a dramatic typography scale that feels more like a premium broadsheet than a database. We prioritize "breathable" white space over functional density, ensuring that every CV scan feels like a high-stakes consultation, not a mechanical process.

---

## 2. Colors & Surface Philosophy

The color palette is rooted in a monochromatic foundation to project authority, punctuated by a singular "AI Intelligence" accent.

### Surface Hierarchy & The "No-Line" Rule

To achieve a premium, seamless feel, we strictly prohibit 1px solid borders for sectioning. Structural boundaries are defined exclusively through background shifts.

- **Base Layer:** `surface` (#FCF9F8) or `surface-container-lowest` (#FFFFFF).
- **Secondary Sections:** Use `surface-container-low` (#F6F3F2) to pull content into a soft focus.
- **Embedded Modules:** Use `surface-container` (#F0EDED) for inner components like sidebar navigation or utility panels.
- **The Glass & Gradient Rule:** For floating modals or "AI Processing" states, use `surface-container-highest` at 80% opacity with a `24px` backdrop-blur. Apply a subtle linear gradient (from `secondary` to `secondary-dim`) for primary CTAs to inject "soul" into the monochrome environment.

---

## 3. Typography: Editorial Authority

We use **Inter** as our typographic backbone. The goal is to create a clear "Information Scent" through aggressive scale contrasts.

| Role         | Token         | Size      | Tracking | Weight     | Usage                                 |
| :----------- | :------------ | :-------- | :------- | :--------- | :------------------------------------ |
| **Display**  | `display-lg`  | 3.5rem    | -0.04em  | 700        | Hero metrics, Scan match percentages. |
| **Headline** | `headline-md` | 1.75rem   | -0.02em  | 600        | Page headers, Candidate names.        |
| **Title**    | `title-md`    | 1.125rem  | -0.01em  | 500        | Card titles, Section headers.         |
| **Body**     | `body-md`     | 0.875rem  | 0        | 400        | Standard descriptions, Resume text.   |
| **Label**    | `label-sm`    | 0.6875rem | +0.05em  | 600 (Caps) | Metadata, Statuses, Micro-copy.       |

**The Hierarchy Rule:** Never use two adjacent sizes in the same container. If the Title is `title-md`, the supporting text must skip down to `body-sm` to create intentional, high-contrast visual tension.

---

## 4. Elevation & Depth: Tonal Layering

Traditional box-shadows are often a crutch for poor layout. In this system, depth is earned through **Tonal Layering**.

- **The Layering Principle:** Place a `surface-container-lowest` card (Pure White) on a `surface-container-low` background. This creates a natural "lift" that feels physical and high-end without the "muddy" look of shadows.
- **Ambient Shadows:** Only use shadows for floating elements (e.g., Popovers). Shadows must be diffused: `0px 20px 40px rgba(0, 0, 0, 0.04)`. The shadow color should be a tinted version of `on-surface` (#323233) to feel like natural light.
- **The Ghost Border:** If a boundary is strictly required for accessibility, use `outline-variant` (#B3B2B1) at **15% opacity**. 100% opaque borders are forbidden as they "trap" the user's eye and break the canvas flow.

---

## 5. Components

### Buttons: High-Contrast Interaction

- **Primary:** `secondary` (#4A4BD7) background with `on-secondary` text. Roundedness: `md` (0.75rem). Use a 2px "inner-glow" (a slightly lighter top border) to mimic a physical button.
- **Secondary:** `surface-container-high` background. No border. This allows it to sit quietly until hovered.
- **Ghost:** `on-surface` text with no background. Interaction is shown through a subtle shift to `surface-container-low`.

### Cards & Lists: The "No-Divider" Mandate

- **Forbid Divider Lines.** Use vertical white space from our spacing scale (`spacing-6` or `spacing-8`) to separate list items.
- **Status Chips:** Use `tertiary-container` (#69F6B8) for "Matched" and `error-container` (#FE8983) for "Rejected". Keep labels in `label-sm` for an understated, professional look.

### Input Fields: The Focused State

Inputs should use `surface-container-lowest` with a "Ghost Border." Upon focus, the border opacity increases to 40% and a subtle `secondary` outer glow (4px blur) signifies AI-readiness.

### Additional Signature Component: The "Intelligence Rail"

A vertical progress indicator for CV parsing. It uses a `secondary` gradient line that glows as it passes through different document sections, using `secondary-fixed-dim` for the inactive track.

---

## 6. Do’s and Don’ts

### Do:

- **Use Asymmetry:** Place important "Match Scores" off-center to create a dynamic, editorial layout.
- **Prioritize Breath:** If a section feels crowded, double the spacing token (e.g., move from `spacing-4` to `spacing-8`).
- **Use Tonal Shifts:** Use `surface-dim` to signal "Disabled" or "Past" states rather than reducing opacity, which can lead to muddy colors.

### Don’t:

- **Don't use 1px lines:** Do not use lines to separate content. Use space or background shifts.
- **Don't use pure black for text:** Always use `on-surface` (#323233) for body text to maintain a premium, softer reading experience.
- **Don't use sharp corners:** This system is human-centric. Stick to the `md` (0.75rem) and `lg` (1rem) roundedness tokens to maintain a "soft-tech" feel.
- **Don't over-animate:** Micro-interactions should be 150ms-200ms. If the user notices the animation, it’s too slow. It should feel like a physical response, not a cinematic event.
