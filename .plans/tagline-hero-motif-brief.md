# Frontend Brief: Tagline, Hero Subtitle & Decorative Motif

**Filed by:** Strategist subagent  
**Date:** 2026-05-26  
**Approved by:** Allred  

---

## Overview

Three targeted changes to the Darkland Saga author website homepage. All changes are independent, low-risk, and can be applied in any order.

**Theme reference:** bg `#0f0d08` (parchment-950), amber/ember accents, parchment text, DM Serif Display headings, JetBrains Mono accent. Minimalist, text-focused, warm dark aesthetic.

**Constraint:** Tailwind only, no new dependencies, keep it simple.

---

## Change 1 — Tagline (`lib/constants.ts`)

**File:** `lib/constants.ts`  
**Target:** `SITE.tagline` property  

### Current value
```
"Stories from the dark, for those walking toward the dawn."
```

### New value
```
"Stories from the dark, for those struggling toward the dawn."
```

### Why
Replaces "walking" with "struggling" — names the strain, says the journey is hard and the light isn't guaranteed, but you keep moving anyway. This directly captures the "light under pressure" motif.

### Implementation
Single line change in the `SITE` object:

```diff
- tagline: "Stories from the dark, for those walking toward the dawn.",
+ tagline: "Stories from the dark, for those struggling toward the dawn.",
```

### Risk
Minimal. The tagline is referenced in the hero section of `app/page.tsx` (the `h1` text) and in the nav layout. Both will automatically pick up the change at build time.

---

## Change 2 — Hero Subtitle (`app/page.tsx`)

**File:** `app/page.tsx`  
**Target:** The second `<p>` tag inside the hero overlay (after the `h1` tagline block)

### Current content
```
<p className="mt-3 text-sm sm:text-base text-parchment-300 leading-relaxed max-w-xl">
  Epic fantasy tales of living darkness, impossible choices, and the enduring struggle between hope and despair.
</p>
```

### New content
```
<p className="mt-3 text-sm sm:text-base text-parchment-300 leading-relaxed max-w-xl">
  Epic tales of living darkness, impossible choices, and light that pushes back.
</p>
```

### Why
Rewrites the original to front-load vivid imagery while replacing "enduring struggle between hope and despair" with "light that pushes back" — active, hopeful, and directly aligned with the "light under pressure" motif.

### Implementation
Find the exact `<p>` element inside the hero overlay's `absolute` div (at ~line 30-32 of `app/page.tsx`). Replace the children text only; keep all Tailwind classes, wrapping structure, and surrounding elements unchanged.

### Risk
Minimal. Pure text swap in a client-visible paragraph. No structural or layout changes.

---

## Change 3 — Decorative SVG Lantern/Ember Motif (`app/page.tsx`)

**File:** `app/page.tsx`  
**Target:** The tagline blockquote `<section>` at the bottom of the page (lines ~120-130)

**Placement:** Insert a small decorative SVG element **above** the `<blockquote>` element, inside the tagline section's `<div className="border-t border-ember-dim pt-12">`.

### SVG Element Spec

A symmetrical, minimal lantern-with-ember motif that fits the dark-and-dawn theme. Single color (ember-400 `#b8944f`), works at small scale (~32×48px), Tailwind-compatible:

```tsx
<svg
  className="mx-auto mb-6 h-12 w-8 text-ember-400"
  viewBox="0 0 32 48"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
  {/* Hanging loop */}
  <path d="M16 4v3" />
  <path d="M10 7h12" />
  {/* Lantern body trapezoid */}
  <path d="M8 10l3 18h18l3-18z" />
  {/* Horizontal divider */}
  <line x1="12" y1="18" x2="28" y2="18" />
  {/* Base */}
  <path d="M12 28l-2 4h20l-2-4" />
  {/* Ember glow inside */}
  <circle cx="20" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
  <circle cx="16" cy="22" r="1" fill="currentColor" opacity="0.6" />
  {/* Radiant lines from inner ember */}
  <path d="M20 8v-1" opacity="0.4" />
  <path d="M24 11l1-1" opacity="0.3" />
</svg>
```

### Why
The tagline blockquote section is the visual "seal" of the homepage — a closing quotation from the saga itself. The lantern motif reinforces the "dawn" and "light in darkness" imagery that permeates the Darkland Saga, and provides a small visual ornament at the bottom of the page where the eye naturally rests. No color needed beyond `text-ember-400` — it integrates with the existing palette.

### Implementation
Within the tagline `<section>` (currently):
```tsx
<section className="mx-auto max-w-3xl px-6 py-20 text-center">
  <div className="border-t border-ember-dim pt-12">
    <blockquote ...
```

Insert the SVG between the `<div>` and the `<blockquote>`:
```tsx
  <div className="border-t border-ember-dim pt-12">
    {/* ⬇ INSERT SVG HERE ⬇ */}
    ...
    <blockquote ...
```

### Visual effect
- Symmetrical, centered above the quote
- At `h-12 w-8` (~48×32px), it's unobtrusive — a deliberate design detail, not a banner
- Single color (`text-ember-400`) fits the amber palette
- `aria-hidden="true"` for accessibility (purely decorative)

### Alternatives considered
- **Full flame graphic:** Too large, competes with the text
- **Single tiny ember dot:** Too subtle, easily overlooked
- **Asterism / three-dot motif:** Inline variant considered for the `— The Darkland Saga` attribution, but judged harder to implement cleanly. The lantern works better as a section header ornament.

---

## Implementation Order (Recommended)

1. **Tagline** (`lib/constants.ts`) — one-word change, propagates everywhere
2. **Hero subtitle** (`app/page.tsx`) — text change in hero section
3. **Lantern SVG** (`app/page.tsx`) — decorative insertion in tagline section

No build issues expected. Run `npm run dev` (pnpm dev) to verify visually after changes.

---

## Design Review Notes

- The lantern SVG uses `stroke="currentColor"` so it inherits the parent text color — wrap it in `text-ember-400` for amber, consistent with the tagline's blockquote text color
- If ember-400 looks too dim at small scale, switch the SVG's container class to `text-ember-300` (`#d4b778`) for slightly brighter amber
- The ember dots inside the lantern (`fill="currentColor"`) should be small and subtle — they suggest warmth, not brightness. If they're too faint, bump opacity to 1.0 on `<circle>` elements
- The `mx-auto` on the SVG element keeps it centered in the blockquote column
- The `border-t border-ember-dim pt-12` div provides a natural visual anchor — the lantern sits centered above the quote within that container