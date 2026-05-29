# Mobile UX Audit

**Audited:** 2026-05-29  
**Device target:** 375px wide (iPhone SE-sized)  
**Auditor:** TARS (frontend/mobile UX)  

---

## Critical Issues (blocks users)

### 1. Hamburger menu can't be dismissed by tapping outside

**Location:** `app/layout.tsx` (lines 56–72) — mobile hamburger uses `<details>` + `<summary>`  
**Problem:** The native `<details>` element only closes when the `<summary>` is tapped again. Tapping outside the menu, on the page content, or on the overlay region does nothing. On mobile, users instinctively tap outside an open menu to dismiss it. This causes confusion and friction — the nav menu stays open, blocking/content is visible underneath but the menu overlay persists until the user finds and re-taps the hamburger icon.  
**Fix:** Replace `<details>` with a state-driven approach (React state + a backdrop overlay). Example:
```tsx
const [menuOpen, setMenuOpen] = useState(false)

/* In JSX: */
{menuOpen && (
  <div
    className="fixed inset-0 z-40" /* backdrop */
    onClick={() => setMenuOpen(false)}
  />
)}
<div className={`absolute right-0 top-12 w-48 ... ${menuOpen ? 'block' : 'hidden'}`}>
  ...
</div>
```
Each nav link should also call `setMenuOpen(false)` on click for SPA-like navigation.

### 2. Admin content editor: grid columns break on 375px

**Location:** `app/companion/admin/page.tsx` (lines 246, 256)  
**Problem:** Two sections use `grid-cols-2` and `grid-cols-3` on the content editor form *without* responsive prefixes. On a 375px screen, `grid-cols-2` forces the Slug/Title fields into 50% columns (~140px each) and `grid-cols-3` forces Type/Access/Book selects into ~85px columns. Both cause clipped labels, truncated placeholder text, and overlapping inputs.  
**Fix:** Add responsive breakpoints:
```tsx
// Line 246 — slug/title
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

// Line 256 — type/access/book
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
```

---

## High Priority (significant friction)

### 3. Missing `autocomplete` attributes on all form inputs

**Location:** Multiple files:
- `app/companion/signin/page.tsx` — email + password fields
- `app/companion/redeem/page.tsx` — email, password fields
- `app/companion/settings/page.tsx` — all three password fields
**Problem:** None of the form inputs have `autocomplete` attributes. On mobile, this means:
- The OS keyboard doesn't show the right keys (email keyboard with @, password manager integration)
- Password managers can't offer to save/fill credentials
- Autofill for the code input is not prevented when it should be
**Fix:** Add `autocomplete` to each field:
- Sign-in email: `autoComplete="email"`
- Sign-in password: `autoComplete="current-password"`
- Redeem code: `autoComplete="off"`
- Redeem email: `autoComplete="email"`
- Redeem password: `autoComplete="new-password"`
- Settings current password: `autoComplete="current-password"`
- Settings new password: `autoComplete="new-password"`
- Settings confirm password: `autoComplete="new-password"`

### 4. Redeem page code input: placeholder overflow risk

**Location:** `app/companion/redeem/page.tsx` (line 70)  
**Problem:** The code input uses `tracking-[0.15em]` (15% letter spacing). The placeholder `"DKLND-XXXX-XXXX-XXXX"` at ~14px with 2.1px inter-letter spacing has a rendered width of roughly 250–270px. On a 375px screen, after accounting for section padding (48px) + plaque padding (24px) + inner plaque padding (24px), the available input width is ~279px. This is extremely tight — on slightly smaller screens or with larger font sizes (accessibility settings), the placeholder will overflow and be cut off.  
**Fix:** Either reduce the letter spacing on mobile (use `tracking-[0.1em]` or `md:tracking-[0.15em]`), or widen the input area by reducing nested padding on mobile (e.g., `p-4 md:p-6` instead of `p-6 md:p-8` on both plaques). Also consider adding `text-ellipsis overflow-hidden whitespace-nowrap` as a safety net.

### 5. No access to main site from companion pages

**Location:** `app/companion/layout.tsx` (entire file)  
**Problem:** The companion layout replaces all navigation chrome other than the fixed header (which exists but provides no "back to main site" link from within the companion). On mobile, once a user navigates into `/companion/*`, the only way to return to the public site is to tap the hamburger menu in the main header (which has "Home" etc.) or use the browser's back button. There is no companion-side breadcrumb or link back to the main site. This is especially confusing for first-time users who land on `/companion/signin` via a redirect.  
**Fix:** Add a small "← Main Site" or "J.L. Allred" link in the companion header bar (companion/layout.tsx), e.g.:
```tsx
<a href="/" className="font-mono text-xs text-parchment-500 hover:text-parchment-300">
  ← J.L. Allred
</a>
```
(Authenticated companion pages already have "Back to Archive" for internal navigation, which is good.)

---

## Medium Priority (quality polish)

### 6. Hamburger touch target undersized (40px vs 44px)

**Location:** `app/layout.tsx` (line 60) — `w-10 h-10` on the hamburger summary/button  
**Problem:** The recommended minimum touch target for mobile is 44×44px (Apple HIG, Material Design). At 40×40px (`w-10 h-10` in Tailwind = 40px), the hamburger is 10% undersized. Users with larger fingers or in a moving environment (train, walking) may have difficulty tapping it precisely.  
**Fix:** Increase to `w-11 h-11` (44px) or `w-12 h-12` (48px). The icon inside can remain `w-5 h-5`; the padding will grow naturally. Also recommended to increase the hit area on the desktop nav links (currently `text-sm` links with no explicit padding — rely on the flex gap). Consider `py-2` on each.

### 7. Long content pages lack "Back to Top"

**Location:** 
- `app/world-of-eadrom/page.tsx` (very long — 7 sections, ~400 lines)
- `app/companion/[slug]/page.tsx` (content viewer — can be very long)
- `app/companion/page.tsx` (dashboard — moderate length)
**Problem:** On mobile, users scroll through very long content pages (lore, world-building, content viewer) and have no quick way to return to the top. Scrolling back manually through hundreds of lines is tedious.  
**Fix:** Add a floating "Back to Top" button that appears after scrolling past a threshold. Simple implementation:
```tsx
// In a Client Component wrapper or add to layout
"use client"
import { useEffect, useState } from "react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full border border-ember-dim bg-parchment-900/90 text-ember-400"
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
```

### 8. Companion pages rely on raw "Loading..." text during data fetches

**Location:** 
- `app/companion/page.tsx` — No loading state shown (it's an async server component, but data comes from Prisma)
- `app/companion/redeem/page.tsx` (line 102): `"Loading..."` plain text
- `app/companion/admin/page.tsx` (line 24): `"Checking access..."` plain text
- `app/companion/admin/page.tsx` (UserManager, line 143): `"Loading..."` plain text
**Problem:** While functional, simple text like "Loading..." is unthemed and feels broken/unpolished on mobile. It breaks the visual consistency.  
**Fix:** Use themed skeleton placeholders matching the design language. At minimum, wrap in a themed container:
```tsx
<div className="flex items-center justify-center py-20">
  <div className="h-4 w-4 animate-pulse rounded-full bg-ember-600/50" />
  <span className="ml-3 text-sm text-parchment-500 font-mono">Loading...</span>
</div>
```
Or use a companion-themed pulsing plaque as a skeleton.

### 9. Companion prose: no `overflow-wrap` on body content

**Location:** `app/globals.css` (`.companion-prose` class, lines ~149–170)  
**Problem:** The `.companion-prose` class has no `overflow-wrap` or `word-break` properties. Long words, code blocks, or URLs in the companion content can overflow the viewport on narrow screens. This is especially problematic for code snippets, long character names, or unbroken strings in lore entries.  
**Fix:** Add to `.companion-prose`:
```css
overflow-wrap: break-word;
word-break: break-word; /* legacy support */
```
And specifically for `<pre>` and `<code>` blocks:
```css
.companion-prose pre {
  overflow-x: auto;
  white-space: pre-wrap;
}
```

### 10. Companion header bar text too small on mobile

**Location:** `app/companion/layout.tsx` (line 33): `text-[10px] tracking-[0.3em]`  
**Problem:** 10px font at 30% letter tracking produces tiny, cramped text on a small phone screen. The text "Secrets of the Darkland Saga · J.L. Allred" is borderline unreadable, especially on lower-resolution phones or for users with visual impairments.  
**Fix:** Increase to `text-[11px]` at minimum, and reduce tracking to `tracking-[0.2em]`. Consider wrapping in a `text-xs sm:text-[10px]` responsive pattern so it's readable on mobile without being too large on desktop.

### 11. Missing `inputMode` attribute on redeem code input

**Location:** `app/companion/redeem/page.tsx` (line 62): `<input id="code" ... />`  
**Problem:** The code input is alphanumeric (format: `DKLND-XXXX-XXXX-XXXX`) but has no `inputMode` attribute. On mobile, the default keyboard will show the standard alphanumeric keyboard. While not wrong, adding `inputMode="text"` is explicit. More importantly, for code entry, the input should use `autoCapitalize="characters"` — wait, it already calls `.toUpperCase()` in onChange. But adding `inputMode="text"` and `autoCapitalize="characters"` would give mobile users a better experience.  
**Fix:** Add `inputMode="text" autoCapitalize="characters"` to the code input.

---

## Low Priority (nice-to-have)

### 12. Fixed header takes significant vertical space on small phones

**Location:** `app/layout.tsx` (lines 47–73) — fixed header + `pt-16` on main  
**Problem:** On an iPhone SE (667px viewport height), the fixed header takes ~72px (py-4 = 32px + content + border). The companion pages add another ~44px for their decorative header bar. Combined, ~116px of chrome leaves only ~551px for content on a 667px viewport — 17% consumed by chrome.  
**Fix:** Consider making the header more compact on mobile (`py-2 md:py-4`), or reducing companion bar padding on mobile.

### 13. Companion dashboard date display uses tiny `text-[10px]`

**Location:** `app/companion/page.tsx` (line 167): `text-[10px] font-mono text-parchment-600`  
**Problem:** Content item dates are rendered at 10px. While they're secondary information, 10px is the smallest size that should ever be used for UI text.  
**Fix:** Keep at `text-[10px]` for now (acceptable for dates), but ensure they have sufficient contrast (current `text-parchment-600` is OK).

### 14. No password reveal toggle on password fields

**Location:** All form password fields (signin, redeem, settings)  
**Problem:** On mobile, typing a password without being able to see it increases error rates. Many users expect an eye icon toggle to show/hide the password.  
**Fix:** Add a password visibility toggle (eye icon) to each password input. This is a nice UX touch, especially on the redeem page where the user creates a password for the first time and may want to see what they typed.

### 15. Paginated / infinite scroll not available for companion content list

**Location:** `app/companion/page.tsx` (lines 28–44, Prisma query)  
**Problem:** If the companion archive grows to many items, the entire list loads at once. On mobile, this could mean a very long scroll or slow initial load over cellular.  
**Fix:** Add pagination or "Load More" to the content list. Not urgent now but worth planning for.

---

## Quick Wins (5-minute fixes)

The following can each be fixed in under 5 minutes and provide immediate improvement:

1. **Add `autocomplete` attributes** to all form fields (see #3 above). Search for `<input` in companion forms and add the right attribute. Time: ~3 min.

2. **Responsive grid fix** on admin page: Change `grid-cols-2` → `grid-cols-1 sm:grid-cols-2` and `grid-cols-3` → `grid-cols-1 sm:grid-cols-3`. Time: ~2 min.

3. **Redeem code input safety**: Add `text-ellipsis overflow-hidden whitespace-nowrap` to the code input. Time: ~1 min.

4. **Add `overflow-wrap: break-word`** to `.companion-prose` in globals.css. Time: ~1 min.

5. **Back-to-main-site link** in companion layout header bar. Time: ~3 min.

6. **Increase hamburger touch target** from `w-10 h-10` to `w-11 h-11`. Time: ~1 min.

7. **Add `inputMode="text"`** to redeem code input. Time: ~30 sec.

---

## Pages Summary

| Page | Mobile verdict | Key issues |
|------|---------------|------------|
| `/` Homepage | ✅ Good | None |
| `/books` | ✅ Good | None |
| `/world-of-eadrom` | ⚠️ Needs polish | Very long, no back-to-top (#7) |
| `/about` | ✅ Good | None |
| `/why-fantasy` | ✅ Good | None |
| `/support` | ✅ Good | None |
| `/companion` Dashboard | ⚠️ Needs polish | Tiny date text (#13), no back-to-top (#7), no main site link (#5) |
| `/companion/redeem` | ⚠️ Needs polish | Placeholder overflow (#4), missing autocomplete (#3), no inputMode (#11) |
| `/companion/signin` | ⚠️ Needs polish | Missing autocomplete (#3) |
| `/companion/settings` | ⚠️ Needs polish | Missing autocomplete (#3) |
| `/companion/forgot` | ✅ Good | Minimal page, fine on mobile |
| `/companion/error` | ✅ Good | Minimal page, fine on mobile |
| `/companion/admin` | 🔴 Fix needed | Grid columns broken on 375px (#2), loading text (#8) |
| `/companion/[slug]` | ⚠️ Needs polish | No overflow-wrap (#9), no back-to-top (#7) |

---

## Recommendations by severity priority

1. **🔴 Fix critical** — Hamburger dismissal (#1), admin grid (#2)
2. **🟠 Fix high** — Autocomplete (#3), placeholder overflow (#4), site navigation from companion (#5)
3. **🟡 Fix medium** — Touch target (#6), back-to-top (#7), loading states (#8), prose overflow (#9), companion header text (#10), inputMode (#11)
4. **🟢 Polish** — Vertical chrome (#12), date size (#13), password toggle (#14), pagination (#15)