# Implementation Plan — Intelekta Brand Alignment

**Date:** 2025-07-18
**Revision:** 3 (implementation complete)
**Priority:** Changes ordered by impact (highest first)
**Constraint:** No structural/architectural changes — brand adaptation only
**Reference:** See `brand-audit.md` for full divergence analysis

---

## Phase 0: Client Confirmations — ALL ANSWERED

| #  | Question                                                                                          | Answer                              |
| -- | ------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Q1 | **Phone number?**                                                                                 | (27) 98877-3890 ✅ IMPLEMENTED      |
| Q2 | **Age ranges?**                                                                                   | 5-12 / 13-17 ✅ IMPLEMENTED         |
| Q3 | **Programs?**                                                                                     | Re-evaluate, make specific ✅ DONE  |
| Q4 | **Saturday workshops?**                                                                           | Not yet (don't add)                 |
| Q5 | **Instagram handle?**                                                                             | Keep @psicointelekta ✅ Already OK  |
| Q6 | **93% stat?**                                                                                     | Fictional → removed ✅ IMPLEMENTED  |
| Q7 | **Musicoterapia mães e bebês?**                                                                   | Yes ✅ IMPLEMENTED                  |

---

## Implementation Status

### ✅ DONE — Phone Number Update (14+ replacements across 9 files)
- All instances of `99619-4455` → `98877-3890`
- All WhatsApp links `5527996194455` → `5527988773890`
- Files: layout.tsx, footer.tsx, header.tsx, hero.tsx, contact.tsx, cta.tsx, faq.tsx, privacidade/page.tsx, termos/page.tsx

### ✅ DONE — Age Range Fix
- FAQ: Updated from 5-10/11-17 to 5-12/13-17
- Schema.org FAQ: Updated to match

### ✅ DONE — 93% Stat Removal
- Removed fictional StatCard from hero.tsx
- Cleaned up unused TrendingUp import
- Adjusted stat cards container height

### ✅ DONE — Programs Section Redesign (programs.tsx)
- Replaced 5 generic "pillars" with 7 specific programs
- Programs: Neuroeducação, Xadrez Pedagógico, Musicoterapia, Cubo Mágico, Reforço Escolar, Neurolê, Psicopedagogia
- Each program has: icon, title, subtitle, description, image, tags
- Layout: 2 featured large cards + 3 medium cards + 2 highlight cards
- Age stage cards retained with updated descriptions and age labels

### ✅ DONE — Neurolê & Psicopedagogia Added
- footer.tsx: Added to programs navigation list
- contact.tsx: Added to PROGRAMS form dropdown
- layout.tsx: Added to Schema.org hasOfferCatalog

### ✅ DONE — Musicoterapia "Mães e Bebês"
- Schema.org: Updated description to include "Inclui programa especial para mães e bebês"
- Programs section: Included in Musicoterapia card tags

### ✅ DONE — Site Humanization
- **Hero eyebrow:** Changed from "Centro de desenvolvimento..." to "Idealizada por psicólogos e psicopedagogas"
- **Hero body copy:** Now mentions the team of psychologists with a warmer, human-focused tone
- **About section:** Updated headline to "acolhidas e transformadas", intro now mentions founders as psychologists/pedagogues
- **About values:** Replaced hardcoded Tailwind colors with brand tokens; new value "Olhar humano" emphasizing human connection
- **Methodology:** Replaced hardcoded gradient colors with brand tokens; added image strip with 3 activity photos; warmer copy
- **CTA:** Changed to "Vamos cuidar juntos do que mais importa" with personal touch
- **Schema.org:** Updated org description to mention "idealizado por psicólogos e psicopedagogas"

---

## Remaining (Not Implemented)

### Font Swap — Playfair Display → Baloo Chettan (Phase 1.3)
Not requested by client. Can be done if desired.

### Primary Color Adjustment (Phase 2.6)
Not requested. Current colors work well.

### Saturday Workshops (Phase 2.2)
Client said "not yet" — skip for now.

### Open Sans Body Text (Phase 3.1)
Optional. Inter is a strong choice already.

**Cascading changes:** Since the entire site uses `var(--primary)`, this single change propagates everywhere. However:

- Verify contrast ratios remain WCAG AA compliant (especially white text on primary backgrounds)
- Check the neural tree canvas in `neural-tree.tsx` still looks cohesive
- Review dark mode if applicable

### 2.7 Remove or Archive Legacy CSS (R7)

**`styles/globals.css`:**

- Verify this file is not imported anywhere (check `app/layout.tsx`, `next.config.mjs`)
- If confirmed unused, delete or move to `docs/legacy/`

### 2.8 Flag Unverifiable Stats (R8)

**`components/sections/hero.tsx`:**

- The "93% melhora relatada em 60 dias" stat card should be confirmed with the client
- If unverifiable, either remove or replace with a softer claim

### 2.9 Enrich Neuroeducação Description (R9)

**`app/layout.tsx`** (Schema.org) and **`components/sections/programs.tsx`:**

Add omitted official terms:

- "reabilitar" (rehabilitation, not just stimulation)
- "linguagem" and "coordenação" for children's benefits
- "atividades sensório-motoras" in methodology description
- "gestão do estresse" for adult benefits

---

## Phase 3: Optional Refinements

### 3.1 Consider Open Sans for Body Text (O1)

If fuller brand alignment is desired:

```diff
- import { Inter, Baloo_Chettan_2 } from "next/font/google";
+ import { Open_Sans, Baloo_Chettan_2 } from "next/font/google";
```

**Assessment:** Inter is a strong modern sans-serif. Unless the client specifically requires Open Sans, this can remain as-is.

### 3.2 Align Neural Tree Canvas Colors (O2)

**`components/neural-tree.tsx`:**

```diff
- const inactiveColor = 'rgb(55, 155, 130)';
- const activeColor = 'rgb(100, 200, 168)';
- const brightColor = 'rgb(160, 235, 205)';
+ // Map to brand palette:
+ const inactiveColor = 'rgb(32, 128, 127)';  // brand-teal #20807f
+ const activeColor = 'rgb(37, 158, 117)';    // brand-green #259e75
+ const brightColor = 'rgb(136, 192, 157)';   // brand-mint #88c09d
```

**Note:** Canvas API doesn't support CSS custom properties directly. Use the hex-to-RGB conversions of the brand palette.

### 3.3 Tokenize Hardcoded OKLCH Values (O3)

**`app/globals.css`:**

```diff
  @keyframes cta-pulse {
-   0%, 100% { box-shadow: 0 0 0 0 oklch(0.545 0.115 162 / 0.4); }
+   0%, 100% { box-shadow: 0 0 0 0 oklch(from var(--primary) l c h / 0.4); }
  }
```

**Note:** `oklch(from ...)` relative color syntax requires modern browser support. Verify browser support matrix before applying.

### 3.4 Dark Section Aesthetic (O5)

Consider lightening the dark sections to feel less corporate:

- Use `--dark-section` at higher lightness
- Or switch to a muted green-navy rather than pure navy

---

## Implementation Order Summary

```
Phase 0: Get answers to Q1–Q7
         ↓
Phase 1 (Critical):
  1.1 Phone number update         [~14 replacements, 9 files] — blocked by Q1
  1.2 Add Neurolê & Psicopedagogia [4 files: footer, contact, layout, programs] — blocked by Q3
  1.3 Font swap Playfair → Baloo   [2 files: layout.tsx, globals.css] + visual QA
  1.4 Unify age ranges             [2-3 files: hero, faq, layout] — blocked by Q2
         ↓
Phase 2 (Recommended):
  2.1 Musicoterapia mães e bebês   [1 file: layout.tsx] — blocked by Q7
  2.2 Saturday workshops           [1-2 files] — blocked by Q4
  2.3 Instagram handle             [1-2 files] — blocked by Q5
  2.4 Institutional tone           [2 files: about, hero]
  2.5 Brand token colors           [2 files: about, methodology]
  2.6 Primary color adjustment     [1 file: globals.css] + contrast audit
  2.7 Legacy CSS cleanup           [1 file: styles/globals.css]
  2.8 Verify stats                 [1 file: hero] — blocked by Q6
  2.9 Neuroeducação descriptions   [2 files: layout, programs]
         ↓
Phase 3 (Optional):
  3.1 Open Sans body font          [1 file: layout.tsx]
  3.2 Neural tree colors           [1 file: neural-tree.tsx]
  3.3 Tokenize OKLCH keyframes     [1 file: globals.css]
  3.4 Dark section aesthetic        [1 file: globals.css]
```

---

## Risk Assessment

| Change                    | Risk                                                                       | Mitigation                                         |
| ------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| Font swap (1.3)           | Layout shifts — Baloo Chettan has different metrics than Playfair Display | Visual QA all sections, especially hero/stat cards |
| Color adjustment (2.6)    | Contrast ratio failures on buttons/text                                    | Run WCAG contrast checks post-change               |
| Tailwind token swap (2.5) | OKLCH `bg-primary/15` may render differently than `bg-emerald-500/15`  | Preview each component after swap                  |
| Adding programs (1.2)     | Footer/form layout may shift with 7 items instead of 5                     | Check responsive layouts                           |
| Phone number (1.1)        | Updating wrong number could break client communications                    | **Confirm with client first**                |

---

## Files Affected (Complete List)

| File                                    | Phases                       |
| --------------------------------------- | ---------------------------- |
| `app/layout.tsx`                      | 1.1, 1.2, 1.3, 1.4, 2.1, 2.9 |
| `app/globals.css`                     | 1.3, 2.6, 3.3                |
| `components/sections/hero.tsx`        | 1.1, 1.4, 2.4, 2.8           |
| `components/sections/faq.tsx`         | 1.1, 1.4                     |
| `components/sections/contact.tsx`     | 1.1, 1.2                     |
| `components/sections/about.tsx`       | 2.4, 2.5                     |
| `components/sections/methodology.tsx` | 2.5                          |
| `components/sections/programs.tsx`    | 1.2, 2.2, 2.9                |
| `components/sections/cta.tsx`         | 1.1                          |
| `components/footer.tsx`               | 1.1, 1.2, 2.3                |
| `components/header.tsx`               | 1.1                          |
| `components/sections/team.tsx`        | 2.3                          |
| `components/neural-tree.tsx`          | 3.2                          |
| `styles/globals.css`                  | 2.7                          |
| `app/privacidade/page.tsx`            | 1.1                          |
| `app/termos/page.tsx`                 | 1.1                          |
