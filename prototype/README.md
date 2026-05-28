# Darkland Saga — Author Website Prototype v3

## Layered Entry Architecture

The homepage has been restructured from a 3-chamber prototype (Threshold, Grounding, Archive Entry) into a fully realized **7-chamber experiential journey** with differentiated emotional registers, varied pacing, and explicit directional choices at every level.

---

## Chamber Map

| # | Chamber | Emotional Register | Pacing | Purpose |
|---|---|---|---|---|
| 0 | Pre-threshold | Material weight, ephemeral | Instant (2s) | Establish physical presence |
| 1 | **The Threshold** | Reverent, still, anticipating | Slow. Held breath. | First contact. Emotional anchor. The visitor arrives and senses. |
| 2 | **Grounding** | Welcoming, orienting, open | Moderate. Generous. | Welcome, orientation, four explicit doors forward. |
| 3 | **Read the Saga** | Earnest, inviting, warm | Relaxed. Book-like. | Books, blurbs, excerpts with reading order guidance. |
| 4 | **Enter the Archive** | Curious, fragmentary, deep | Variable. Dense/sparse alternating. | Immersive artifact-driven lore experience. Silence interludes. |
| 5 | **The World** | Contemplative, restrained, evocative | Measured. Three cards. | Worldbuilding: geography, cultures, magic — presented as evocation, not compendium. |
| 6 | **Storyteller** | Reflective, personal, intimate | Quiet. Essay-like. | Author presence, themes, craft reflections. Three thematic cards. |
| 7 | **Coda** | Closing, threshold outward | Final breath. | Return to the world. Exit to action. Colophon. |

---

## Architectural Changes from v2

### What was added

1. **Chamber 3: Read the Saga** — New section. Book cards with excerpts, reading order guidance, "A taste" vignettes for each book. Clarifies entry points for new readers.

2. **Chamber 5: The World** — New section. Three cards (Geography, Peoples, Magic) presenting worldbuilding as restrained evocation rather than data dump. Intentional gaps and "unconfirmed" markers preserved.

3. **Chamber 6: Storyteller** — New section. Author presence through reflective prose and thematic essay cards. Three cards: "Light that holds" (themes), "Writing the threshold" (craft), "What lights the ember" (inspiration).

4. **Chamber 7: Coda** — New closing section. Final resonant quote, directional call to action ("Begin reading Darkness Kindled"), and colophon.

### What was enhanced

5. **Chamber 1 (Threshold)** now includes on-hero **choice buttons** — explicit "Enter / The Threshold" and "Read / The Saga" for immediate directional action without scrolling.

6. **Chamber 2 (Grounding)** now offers a full **choice row** of four directional cards (Read the Saga, Enter the Archive, The World, Storyteller) — the visitor chooses their path.

7. **Chamber 4 (Archive)** preserved from v2 with all artifact fragments, silence interludes, and pacing breathers intact.

### What was preserved

- Asset modularity: CSS textures and abstract forms serve as placeholders for future artwork
- Gap markers (`[ ... ]`) for obscured/incomplete lore
- Data-type attribute system for artifact categorization
- Noise overlay, emberlight glow, pillar forms
- All existing lore content (Pillar of Light, Storm and Bane, Hellcat, Four Nations, Bonding of Essence)

---

## Design Principles

### Chosen Immersion
The site now supports **chosen immersion** rather than forced immersion:
- Every chamber offers **directional choices** — explicit doors to other chambers
- The visitor decides how deep to go, in what order
- No single path is privileged; the Grounding chamber offers four equal paths
- The Coda offers an exit: "Begin reading Darkness Kindled"

### Differentiated Emotional Chambers
Each chamber has its own:
- **Emotional register** (see table above)
- **Pacing** (slow / moderate / variable / quiet)
- **Visual density** (sparse text, dense artifacts, card grids)
- **Background texture** (subtle rule lines, grid patterns, solid fields)

### Preserved Mystery
- Gap markers throughout
- Attributed but anonymous sources ("Author unknown," "Anonymous border keeper")
- "Unconfirmed" and "disputed" geographic markers
- Sealed/restricted record styling
- Silence interludes that create space for reflection

### Varied Pacing
The archive chamber (C4) alternates dense artifact cards with silence interludes — empty breather cells and blockquote still points. This prevents reader fatigue and creates rhythm.

---

## File Structure

```
darkland-saga-website/
├── conceptual-foundation.md   # Design philosophy document
├── build.py                   # Assembly script (optional)
├── css/
│   ├── base.css               # Core styles + chambers 1-4
│   └── extra.css              # Chambers 5-7 styles
├── segments/
│   ├── head.html              # HTML document head
│   ├── body_start.html        # Body: chambers 1-4 (start of C5)
│   └── body_end.html          # Body: chambers 5-7 (from C5 grid onward)
└── prototype/
    ├── index.html             # Complete assembled prototype
    └── README.md              # This file
```

To regenerate the prototype:
```bash
python3 build.py
```

---

## Asset Modularity

Every visual element is a CSS class. Any `.c4m`, `.c5m`, `.c3cv` slot can be replaced with an `<img>` for commissioned artwork, or removed entirely. The page holds its weight through typography, rhythm, and negative space alone.

**CSS placeholder textures available:**
- Map: warm gold lines and dots
- Document: ruled lines with red ink marks
- Environment: horizon gradient with amber seam
- Diagram: crosshatch with marker points
- Magic: radial symbol field
- Culture: repeating ledger lines

---

## Viewing

Open `prototype/index.html` in any modern browser. No build step required. Fonts load from Google Fonts (requires internet for first load). All styling is inline in the single-file prototype for now; the modular file structure can be used for production splitting.