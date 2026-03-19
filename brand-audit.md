# Brand Alignment Audit — Intelekta

**Date:** 2025-07-18
**Revision:** 2 (updated with official presentation content)
**Scope:** Full visual identity, typography, color, and content audit against official brand materials
**Sources:**
- `Intelekta_materiais/Marca Intelekta/` — logo files, brand manual PDF, business card, letterhead
- `Intelekta_materiais/intelekta_apresentacao.txt` — official presentation content (33 pages, text-extracted)
- Logo image attachments (icon-only, vertical lockup, horizontal lockup)
- Task brief (canonical color palette and typography reference)

---

## 1. Brand Materials Inventory

### Files in `Intelekta_materiais/Marca Intelekta/`:

| File | Type | Status |
|---|---|---|
| `Logo principal.ai` | Vector source (Illustrator) | Not readable (binary) |
| `Logo principal png.png` | Raster logo (primary) | Available |
| `logo principal sem fundo.png` | Primary logo, transparent bg | Available |
| `Logo secundaria.ai` | Vector source (secondary logo) | Not readable (binary) |
| `Logo secundaria png.png` | Raster logo (secondary) | Available |
| `logo secundaria sem fundo.png` | Secondary logo, transparent bg | Available |
| `Icone png.png` | Icon-only mark | Available |
| `Icone sem fundo.png` | Icon-only mark, transparent bg | Available |
| `Manual da marca.pdf` | Brand manual / guidelines | **Not readable as text** (PDF binary) |
| `cartão de visita.pdf` | Business card design | **Not readable as text** (PDF binary) |
| `Papel timbrado pdf.pdf` | Letterhead design | **Not readable as text** (PDF binary) |

### Presentation document:
| File | Type | Status |
|---|---|---|
| `Intelekta_materiais/intelekta_apresentacao.txt` | Official presentation (text-extracted from 33-page PDF) | **Fully readable** ✅ |

### Logo variants (from attached images):
1. **Icon-only** — tree/brain symbol (standalone mark)
2. **Vertical lockup** — tree icon above "Intelekta" + tagline "Fortalecendo mentes e emoções"
3. **Horizontal lockup** — tree icon to the left of "Intelekta" + tagline

---

## 2. Official Brand Identity (from presentation document)

### 2.1 Institutional Facts

| Item | Official Value |
|---|---|
| **Nome** | Intelekta |
| **Slogan** | Fortalecendo mentes e emoções |
| **Descrição** | Empresa inovadora idealizada por psicólogos e psicopedagogas comprometidos com a excelência no desenvolvimento humano |
| **Foco** | Fortalecimento das habilidades cognitivas e socioemocionais |
| **Público-alvo** | Todas as idades — crianças em fase escolar até idosos |
| **Diferencial** | Aprendizado de forma lúdica, envolvente e significativa |
| **Endereço** | Rua Afonso Pena, 403, Praia da Costa, Vila Velha |
| **Telefone/WhatsApp** | **(27) 98877-3890** |
| **Instagram** | **@INTELEKTAMENTE** / @psicointelekta |
| **Site** | intelektamente.com |

### 2.2 Official Program List (7 programs)

| # | Programa | Resumo |
|---|---|---|
| 01 | **Neuroeducação** | Programa multidisciplinar 100% lúdico — jogos, brincadeiras, oficinas criativas, atividades sensório-motoras |
| 02 | **Xadrez** | Programa pedagógico baseado no xadrez para desenvolvimento mental e socioemocional |
| 03 | **Musicoterapia** | Programa terapêutico com música. **Inclui programa especial para mães e bebês** |
| 04 | **Cubo Mágico** | Programa focado no desenvolvimento cognitivo através do cubo mágico |
| 05 | **Reforço Escolar** | Programa de apoio escolar personalizado |
| 06 | **Neurolê** (Neuro Educa - Alfabetização Lúdica e Sensorial) | Programa de alfabetização inclusiva para crianças atípicas |
| 07 | **Psicopedagogia** | Atendimento especializado em dificuldades de aprendizagem |

### 2.3 Saturday Workshops (Oficinas)

Also mentioned: "Sábados na Intelekta" — oficinas divididas por faixa etária (Kids, Jovem, Adulto, Sênior) com jogos, trabalhos manuais e dinâmicas criativas.

---

## 3. Color Audit

### 3.1 Canonical Brand Palette (from brief)

| Token | Hex | Role |
|---|---|---|
| `brand-mint` | `#88c09d` | Light green / mint accent |
| `brand-green` | `#259e75` | Primary brand green |
| `brand-teal` | `#20807f` | Teal / secondary |
| `brand-navy` | `#24394a` | Dark / contrast |

### 3.2 Current Website Color System

The site uses OKLCH color space in CSS custom properties. Approximate hex equivalents:

| CSS Variable | OKLCH Value | Approx. Hex | Closest Brand Token | Match? |
|---|---|---|---|---|
| `--primary` | `oklch(0.545 0.115 162)` | ~`#2F8F78` | `brand-green` (`#259e75`) | **Close but shifted** — more teal/forest, less pure green |
| `--secondary` | `oklch(0.720 0.090 162)` | ~`#7BC4A8` | `brand-mint` (`#88c09d`) | **Close** — slightly more saturated |
| `--accent` | `oklch(0.440 0.090 168)` | ~`#1D6B5F` | `brand-teal` (`#20807f`) | **Close** — slightly greener hue |
| `--dark-section` | `oklch(0.215 0.025 240)` | ~`#1E2A3B` | `brand-navy` (`#24394a`) | **Close** — slightly more blue |
| `themeColor` (viewport) | — | `#2F8F78` | `brand-green` | Same as --primary |

### 3.3 Divergence Assessment

The site's OKLCH palette is a _reasonable interpretation_ of the brand palette, but not an exact match. The hue channel (162–168) leans slightly more teal than the brand greens which tend toward purer green hues. This is a **recommended** correction, not critical — the visual impression is cohesive.

### 3.4 Hardcoded Colors Outside the Token System

| Location | Color | Issue | Severity |
|---|---|---|---|
| `components/sections/about.tsx` | `emerald-500/15`, `emerald-600`, `teal-500/15`, `teal-600`, `cyan-500/15`, `cyan-600`, `green-500/15`, `green-600` | Tailwind utility colors for value card indicators — bypass brand token system | **Recommended** |
| `components/sections/methodology.tsx` | `from-emerald-500/20 to-teal-500/10`, `from-teal-500/20 to-cyan-500/10`, `from-cyan-500/20 to-emerald-500/10` | Pillar card gradients use Tailwind defaults instead of brand tokens | **Recommended** |
| `components/sections/contact.tsx` | `bg-green-500/10`, `text-green-600`, `bg-green-600`, `hover:bg-green-700` | WhatsApp button — arguably intentional for WhatsApp brand color | **Optional** |
| `components/neural-tree.tsx` | `rgb(55,155,130)`, `rgb(100,200,168)`, `rgb(160,235,205)` | Canvas neurons use raw RGB, don't map to brand tokens | **Optional** |
| `app/globals.css` (cta-pulse) | `oklch(0.545 0.115 162 / 0.4)` | Literal OKLCH instead of `var(--primary)` | **Optional** |
| `app/globals.css` (selection) | `oklch(0.545 0.115 162 / 0.2)` | Same value as --primary but hardcoded | **Optional** |
| `styles/globals.css` | Entire file | Legacy grayscale design system — appears unused (superseded by `app/globals.css`) | **Recommended** (remove or verify) |

### 3.5 `amber-400` for Stars

`testimonials.tsx` uses `text-amber-400 fill-amber-400` for star ratings. Standard pattern — not a brand color issue.

---

## 4. Typography Audit

### 4.1 Canonical Brand Typography (from brief)

| Role | Font | Character |
|---|---|---|
| Display / Headings | **Baloo Chettan** | Warm, round, playful |
| Body | **Open Sans** | Clean, legible, neutral |

**Important nuance from brief:** These fonts define the Instagram/social media identity. The website may use typographic variations if they serve readability/hierarchy — but choices must feel like they belong to the same family.

### 4.2 Current Website Typography

| Role | Font | Declaration |
|---|---|---|
| Display / Headings | **Playfair Display** | `next/font/google` in `app/layout.tsx`, CSS var `--font-serif` |
| Body / UI | **Inter** | `next/font/google` in `app/layout.tsx`, CSS var `--font-sans` |
| Mono | **Geist Mono** | CSS var only (not imported via next/font) |

### 4.3 Divergence Assessment

| Aspect | Brand Standard | Current Site | Match? | Severity |
|---|---|---|---|---|
| Heading font | Baloo Chettan (rounded, playful) | Playfair Display (elegant serif) | **MISMATCH** | **Critical** |
| Body font | Open Sans (clean sans-serif) | Inter (clean sans-serif) | **Acceptable alternative** | **Optional** |
| Visual cohesion | Warm, approachable, child-friendly | Sophisticated, editorial, magazine-like | **Tone mismatch** | **Critical** |

**Analysis:**
- **Playfair Display** is an elegant, high-contrast serif creating a premium editorial aesthetic. **Baloo Chettan** is a rounded display font communicating warmth and approachability — aligned with the brand's "lúdica, envolvente e significativa" philosophy.
- The brief allows typographic variation, but Playfair Display does not "feel like it belongs" to the same family as Baloo Chettan — they represent fundamentally different design philosophies.
- **Inter vs Open Sans**: Both neutral, highly legible sans-serif families. Inter is arguably a more modern equivalent. Acceptable substitution.

---

## 5. Content Audit (cross-referenced against official presentation)

### 5.1 CRITICAL: Phone Number Mismatch

| Source | Phone Number |
|---|---|
| **Official presentation** | **(27) 98877-3890** |
| **Site** (13+ occurrences) | (27) 99619-4455 |

The site uses a **different phone number** from the official brand materials. This is present in:

| File | Occurrences |
|---|---|
| `app/layout.tsx` (Schema.org) | 1 |
| `components/footer.tsx` | 2 (display + WhatsApp link) |
| `components/header.tsx` | 2 (desktop + mobile WhatsApp links) |
| `components/sections/hero.tsx` | 1 (WhatsApp CTA) |
| `components/sections/contact.tsx` | 3 (form submission + display + tel: link) |
| `components/sections/cta.tsx` | 1 (WhatsApp link) |
| `components/sections/faq.tsx` | 1 (WhatsApp link) |
| `app/privacidade/page.tsx` | 2 (display + WhatsApp link) |
| `app/termos/page.tsx` | 1 (WhatsApp link) |

**Severity: Critical** — **requires human confirmation** before changing. Either the presentation uses an old number and the site is correct, or vice versa.

### 5.2 CRITICAL: Missing Programs

The official presentation lists **7 programs**. The site only shows **5**:

| Program | On Site? | Notes |
|---|---|---|
| Neuroeducação | ✅ | Present in footer, contact form, Schema.org |
| Xadrez | ✅ | Present |
| Musicoterapia | ✅ | Present, but **missing "mães e bebês" sub-program** |
| Cubo Mágico | ✅ | Present |
| Reforço Escolar | ✅ | Present |
| **Neurolê** (Alfabetização Lúdica e Sensorial) | ❌ **MISSING** | Not in footer, contact form, Schema.org, or any section |
| **Psicopedagogia** | ❌ **MISSING** | Only appears as Fabiana's expertise tag, not as a program offering |

**Severity: Critical** — two official programs are entirely absent from the site.

### 5.3 CRITICAL: Age Range Inconsistency

| Section | Children | Adolescents | Adults | Seniors |
|---|---|---|---|---|
| **Hero** (pills) | 5–12 anos | 13–17 anos | 18–59 anos | 60+ anos |
| **FAQ** (Q1 answer) | 5–10 anos | 11–17 anos | 18–59 anos | 60+ anos |
| **Official presentation** | "crianças em fase escolar" | — | — | "idosos" |

The presentation does **not** specify exact age brackets — it uses general terms. However, the site internally contradicts itself between Hero and FAQ. **Must be unified and confirmed with the client.**

### 5.4 Instagram Handle

| Source | Handle(s) |
|---|---|
| **Official presentation** | **@INTELEKTAMENTE** / @psicointelekta (two handles) |
| **Site** | @psicointelekta only |

The site links only to `@psicointelekta`. The presentation lists `@INTELEKTAMENTE` as the primary handle. The site should reference both or use the primary.

**Severity: Recommended**

### 5.5 Institutional Description Mismatch

| Aspect | Official Presentation | Site |
|---|---|---|
| **What it is** | "Empresa inovadora idealizada por **psicólogos e psicopedagogas** comprometidos com a excelência no desenvolvimento humano" | "Centro de educação complementar dedicado a estimular o potencial cognitivo e emocional" |
| **Diferencial** | "Promover o aprendizado de forma **lúdica, envolvente e significativa**, garantindo que cada participante tenha uma **experiência única, prazerosa e enriquecedora**" | "Fundamentado em **neurociência**" (emphasis on science over playfulness) |

**Assessment:** The site positions Intelekta more as a scientific center. The presentation emphasizes the **ludic, engaging, and meaningful** nature. Both are valid facets, but the site underrepresents the playful/experiential side.

**Severity: Recommended** — tone adjustment, not factual error.

### 5.6 Missing Content: Saturday Workshops

The presentation describes "Sábados na Intelekta: Oficinas" — workshops divided by age group (Kids, Jovem, Adulto, Sênior) with games, crafts, and creative dynamics.

**The site has zero mention of Saturday workshops.** No component references "oficina" or "sábado".

**Severity: Recommended** — new content section or addition to Programs.

### 5.7 Missing Content: Musicoterapia for Mothers and Babies

The Musicoterapia program officially "inclui programa especial para mães e bebês." The site's Schema.org description of Musicoterapia does not mention this. No section references it.

**Severity: Recommended** — add to Musicoterapia description.

### 5.8 Program Descriptions Cross-Reference

| Program | Official Description | Site Description | Aligned? |
|---|---|---|---|
| **Neuroeducação** | "Programa multidisciplinar 100% lúdico voltado para desenvolver, estimular e reabilitar a mente em todas as idades. Utiliza jogos, brincadeiras, oficinas criativas e atividades sensório-motoras" | Schema.org: "Programa multidisciplinar 100% lúdico que estimula, desenvolve e fortalece a mente em todas as idades" | ✅ Close — site omits "reabilitar" and "sensório-motoras" |
| **Xadrez** | "Programa pedagógico baseado no xadrez para desenvolvimento mental e socioemocional" | Schema.org: "utiliza o xadrez para desenvolver atenção, memória, raciocínio lógico, planejamento e autorregulação emocional" | ✅ Good — site expands with specifics |
| **Musicoterapia** | "Programa terapêutico com música. Inclui programa especial para mães e bebês" | Schema.org: "utiliza instrumentos, canto, ritmo, escuta guiada e movimento corporal" | ⚠️ Site expands well but **omits mães e bebês** |
| **Cubo Mágico** | "Programa focado no desenvolvimento cognitivo através do cubo mágico" | Schema.org: "trabalha atenção, foco, raciocínio lógico e espacial, planejamento, memória e persistência" | ✅ Good — site expands |
| **Reforço Escolar** | "Programa de apoio escolar personalizado" | Schema.org: "voltado da Educação Infantil ao Ensino Médio, com foco no desenvolvimento acadêmico e socioemocional" | ✅ Good — site adds age range |
| **Neurolê** | "Programa de alfabetização inclusiva para crianças atípicas" | **NOT PRESENT** | ❌ Missing |
| **Psicopedagogia** | "Atendimento especializado em dificuldades de aprendizagem" | **NOT PRESENT** (only as team expertise tag) | ❌ Missing |

### 5.9 Program Benefits Accuracy (Neuroeducação by age group)

| Official (by age group) | Site equivalent |
|---|---|
| Crianças: desenvolvimento cognitivo, linguagem e coordenação | "Estimulamos atenção, memória e raciocínio de forma lúdica" — ⚠️ omits linguagem e coordenação |
| Adolescentes: funções executivas e controle emocional | "Foco em habilidades socioemocionais, organização e autonomia nos estudos" — ✅ close |
| Adultos: produtividade e gestão do estresse | "Reforçamos a produtividade, resolução de problemas e tomada de decisão" — ⚠️ omits "gestão do estresse" |
| Idosos: memória e autonomia | "Prevenção do declínio cognitivo com foco em autonomia e qualidade de vida" — ✅ close |

### 5.10 Contact Information

| Detail | Official | Site | Match? |
|---|---|---|---|
| **Phone** | **(27) 98877-3890** | (27) 99619-4455 | **❌ DIFFERENT** |
| Address | Rua Afonso Pena, 403, Praia da Costa, Vila Velha | Same | ✅ |
| Instagram | @INTELEKTAMENTE / @psicointelekta | @psicointelekta only | ⚠️ Partial |
| Email | Not in presentation | contato@intelektamente.com | N/A |
| Domain | intelektamente.com | Same | ✅ |
| Hours | Not in presentation | Seg-Sex: 9h-18h, Sáb: 9h-12h | Cannot verify |

### 5.11 Trust Metrics

| Metric | Verifiable from materials? |
|---|---|
| "5.0/5" rating (Schema.org: 200 ratings) | ❌ Not in presentation |
| "+200 famílias atendidas" | ❌ Not in presentation |
| "30+ anos de experiência na equipe" | Plausible (24 + 12 = 36) but not stated |
| "93% melhora relatada em 60 dias" | ❌ Not in presentation — **unverified claim** |

### 5.12 FAQ Accuracy Check

| FAQ Question | Aligned with presentation? |
|---|---|
| Age ranges | ⚠️ Presentation doesn't specify brackets — cannot confirm 5-10 vs 5-12 |
| Methodology (3 pillars) | ⚠️ Presentation mentions "integra estímulo cognitivo e habilidades socioemocionais" — the 3-pillar framework is a site-original formulation |
| "Centro de educação complementar" | ⚠️ Presentation says "empresa inovadora idealizada por psicólogos e psicopedagogas" — different framing |
| Session duration (1h30, semanal) | Cannot verify — not in presentation |
| Address | ✅ Matches exactly |
| Free trial class | Cannot verify — not in presentation |

---

## 6. Visual/Aesthetic Alignment

### 6.1 Brand Aesthetic

The presentation emphasizes: **"lúdica, envolvente e significativa"** and **"experiência única, prazerosa e enriquecedora"**.

| Aspect | Current Site | Alignment |
|---|---|---|
| **Lúdica (playful)** | Editorial/premium tone from Playfair serif. Nino mascot adds warmth but overall feel is sophisticated | ⚠️ Misaligned |
| **Envolvente (engaging)** | Excellent animations, neural tree, scroll interactions | ✅ Good |
| **Significativa (meaningful)** | Deep content, well-structured sections, clear value propositions | ✅ Good |
| **Prazerosa (pleasurable)** | Clean layouts, generous whitespace | ✅ Good |

### 6.2 Specific Concerns

1. **Serif headings (Playfair Display)** create luxury/editorial feel vs. brand's "lúdica" personality
2. **Color temperature**: OKLCH palette skews cool/teal vs. brand's warmer greens
3. **Dark sections** feel corporate — the brand's "prazerosa" might favor lighter treatments
4. **Neural tree animation**: Impressive but potentially too clinical for a center emphasizing playfulness

---

## 7. Summary of Divergences

### Critical

| # | Issue | Location | Action Required |
|---|---|---|---|
| C1 | **Phone number mismatch**: site uses (27) 99619-4455, document says (27) 98877-3890 | 13+ occurrences across 8 files | **Confirm with client** which is correct, then update all |
| C2 | **2 missing programs**: Neurolê and Psicopedagogia not on site | Footer, contact form, Schema.org, programs section | Add to program list and Schema.org |
| C3 | **Heading font mismatch**: Playfair Display vs. Baloo Chettan | `app/layout.tsx`, `app/globals.css` | Replace font |
| C4 | **Age range inconsistency**: Hero (5-12/13-17) vs FAQ (5-10/11-17) | `hero.tsx`, `faq.tsx`, `layout.tsx` | **Confirm with client**, then unify |

### Recommended

| # | Issue | Location |
|---|---|---|
| R1 | Musicoterapia missing "mães e bebês" sub-program | Schema.org in `layout.tsx`, Programs section |
| R2 | Saturday workshops ("Sábados na Intelekta") not on site | No file — new content needed |
| R3 | Instagram: missing primary handle @INTELEKTAMENTE | `footer.tsx`, `team.tsx` |
| R4 | Institutional description underrepresents "lúdica/envolvente" personality | `about.tsx`, `hero.tsx` eyebrow |
| R5 | Tailwind utility colors bypass brand token system | `about.tsx`, `methodology.tsx` |
| R6 | Primary color hue slightly more teal than brand green #259e75 | `app/globals.css` |
| R7 | Legacy `styles/globals.css` with unused grayscale system | `styles/globals.css` |
| R8 | "93% melhora em 60 dias" — unverifiable stat | `hero.tsx` |
| R9 | Neuroeducação description omits "reabilitar", "linguagem", "coordenação", "sensório-motoras" | Schema.org in `layout.tsx`, `programs.tsx` |

### Optional

| # | Issue | Location |
|---|---|---|
| O1 | Body font Inter vs. Open Sans | `app/layout.tsx` |
| O2 | Neural tree canvas hardcoded RGB values | `neural-tree.tsx` |
| O3 | CSS selection/cta-pulse use hardcoded OKLCH | `app/globals.css` |
| O4 | WhatsApp button uses Tailwind `green-600` | `contact.tsx` |
| O5 | Dark sections may feel too corporate for brand personality | `team.tsx`, `testimonials.tsx` |
| O6 | Session duration (1h30) and free trial claim unverifiable | `faq.tsx` |

---

## 8. Remaining Unresolved Items

| Item | Status |
|---|---|
| **Manual da marca.pdf** | Not readable — may contain color codes, logo spacing rules, forbidden usage |
| **cartão de visita.pdf** | Not readable — may contain secondary palette treatments |
| **Papel timbrado pdf.pdf** | Not readable — may contain typographic treatments |
| **Phone number** | Must be confirmed by client — presentation says 98877-3890, site says 99619-4455 |
| **Exact age ranges** | Not in presentation — must be confirmed by client |
| **Session duration** | Not in presentation — must be confirmed |
| **Free trial class** | Not in presentation — must be confirmed |
| **Trust metrics** (200+ famílias, 93%) | Not in presentation — must be sourced |
