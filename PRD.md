# Product Requirements Document (PRD)

# Journey to the Soul — A Janmashtami Quest

> **Version:** 2.0  
> **Document Status:** Living Document  
> **Last Updated:** September 2026  
> **Product Owner:** Vrindavan Quest Team  
> **Category:** Interactive Spiritual Experience / Educational Web Game  

---

| Layer               | Technology                       | Why                                                |
| ------------------- | -------------------------------- | -------------------------------------------------- |
| Application         | **Next.js**                      | Production-grade structure, routing, optimization  |
| UI                  | **React + TypeScript**           | Component-based interactive experience             |
| Styling             | **Tailwind CSS**                 | Precise responsive UI                              |
| UI Animation        | **Motion**                       | Smooth transitions, gestures, layout animation     |
| Advanced animation  | **GSAP**                         | Complex cinematic sequences/timelines              |
| Game/visual layer   | **PixiJS**                       | High-performance 2D ocean/boat/particle experience |
| Icons               | **Lucide React**                 | Clean icons without emojis                         |
| Audio               | **Howler.js**                    | Reliable music/SFX management                      |
| 3D — only if needed | **Three.js / React Three Fiber** | Optional immersive 3D scenes                       |
| Deployment          | **Vercel**                       | Natural fit with Next.js                           |

-------------------------------------------------

| Requirement      | Use                        |
| ---------------- | -------------------------- |
| Button hover     | CSS / Motion               |
| Card transition  | Motion                     |
| Page transition  | Motion / GSAP              |
| Complex timeline | GSAP                       |
| Ocean            | PixiJS                     |
| Boat             | PixiJS/SVG                 |
| Particles        | PixiJS                     |
| Text             | React                      |
| Progress         | React + Motion             |
| Audio            | Howler                     |
| 3D               | Only if genuinely required |

-------------------------------------------------

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & North Star](#2-product-vision--north-star)
3. [Target Audience](#3-target-audience)
4. [Product Goals & Success Metrics](#4-product-goals--success-metrics)
5. [High-Level User Journey](#5-high-level-user-journey)
6. [Application Architecture Overview](#6-application-architecture-overview)
7. [Design System & Visual Identity](#7-design-system--visual-identity)
8. [Animation & Motion Design System](#8-animation--motion-design-system)
9. [Audio Engine](#9-audio-engine)
10. [Particle System](#10-particle-system)
11. [Progression & Navigation System](#11-progression--navigation-system)
12. [Station 1 — Who Am I? (Remove the Layers)](#12-station-1--who-am-i-remove-the-layers)
13. [Station 2 — Why Is Life Special? (5 Mystery Boxes)](#13-station-2--why-is-life-special-5-mystery-boxes)
14. [Station 3 — What Really Makes Me Happy? (Ocean Journey)](#14-station-3--what-really-makes-me-happy-ocean-journey)
15. [Final Station — The Mirror & Soul Card Keepsake](#15-final-station--the-mirror--soul-card-keepsake)
16. [Global Header & Navigation](#16-global-header--navigation)
17. [Accessibility Requirements](#17-accessibility-requirements)
18. [Responsive Design Requirements](#18-responsive-design-requirements)
19. [Performance Requirements](#19-performance-requirements)
20. [File Structure & Technical Architecture](#20-file-structure--technical-architecture)
21. [JavaScript Module API Reference](#21-javascript-module-api-reference)
22. [CSS Architecture & Token System](#22-css-architecture--token-system)
23. [SEO & Metadata](#23-seo--metadata)
24. [Known Issues & Technical Debt](#24-known-issues--technical-debt)
25. [Roadmap & Future Enhancements](#25-roadmap--future-enhancements)
26. [Philosophical & Spiritual Content Framework](#26-philosophical--spiritual-content-framework)
27. [Glossary](#27-glossary)

---

## 1. Executive Summary

**Journey to the Soul — A Janmashtami Quest** (internally called "Vrindavan Quest") is a premium, interactive, browser-based spiritual experience designed to be presented as a guided activity station at Janmashtami celebrations. It takes participants through a structured philosophical journey — drawn from Vedic wisdom, the Bhagavad Gita, and the Vedanta-sutra — in a deeply engaging, visually stunning, and emotionally resonant format.

The product is a **single-page application (SPA)** built with vanilla HTML5, CSS3, and JavaScript — with GSAP as the sole animation dependency. It requires no server, no build tool, no framework, and no database. It runs entirely from the local filesystem or a simple static file host, making it suitable for kiosk deployment, event booths, or direct sharing via URL.

The experience is divided into **four progressive stations**, each exploring a distinct philosophical question:

| Station | Question | Mechanic |
| --------- | ---------- | ---------- |
| Station I | **Who Am I?** | Peel back 6 identity layers from an avatar |
| Station II | **Why Is Life Special?** | Open 5 mystery boxes revealing life's pursuits |
| Station III | **What Really Makes Me Happy?** | Navigate a happiness journey across an ocean |
| Final Station | **Meet Your Soul** | Mirror reveal + personalized Soul Card keepsake |

The application is designed to be experienced as a **one-sitting, 10-20 minute journey** for an individual or small group. It is deeply narrative-driven, with each station building on insights from the last, culminating in a downloadable, shareable, personalized "Soul Card" — a Hallmark-grade spiritual keepsake rendered on a high-DPI canvas.

---

## 2. Product Vision & North Star

### Vision Statement

> *To create the most moving, beautiful, and philosophically meaningful digital experience ever presented at a Janmashtami celebration — one that every participant remembers years later as the moment they genuinely questioned who they are.*

### North Star Principle

Every design decision — layout, color, animation, copy, sound, pacing — must serve a single question:

> **"Does this make the participant feel something real?"**

The product is not meant to inform. It is meant to *transform*. It should leave participants with a genuine sense of wonder about the soul, a moment of true self-inquiry, and a beautiful physical memento of that experience.

### Design Inspirations

The product takes visual and UX inspiration from:

- **Linear** — spatial precision, motion choreography, dark aesthetic depth
- **Stripe** — typography hierarchy, premium feel, micro-interaction polish
- **Apple** — intentional animation timing, breathing space, emotional resonance
- **Framer** — 3D transforms, holographic visual effects, GPU-accelerated smooth animations
- **Vercel** — dark-mode-first design, glassmorphism, glowing accents
- **Airbnb** — warm storytelling, emotional journey, human-centered narrative

The aesthetic is specifically **dark, cosmic, warm, and sacred** — the deep navy-peacock palette of Krishna's midnight blue, the warm gold of a diya flame, the teal of the Yamuna river, and the ivory warmth of temple lanterns.

---

## 3. Target Audience

### Primary Audience

**Janmashtami celebration attendees** — anyone walking up to a physical activity booth at a Krishna-conscious event, temple celebration, or community gathering. The experience must be:

- Immediately approachable and non-intimidating
- Meaningful to someone with zero prior knowledge of Vedic philosophy
- Equally rich for a practiced devotee who knows the Gita by heart
- Functional on a shared tablet or kiosk device
- Completable in a single 10-20 minute sitting

**Age Range:** 12 to 70+  
**Technical literacy:** No technical knowledge required  
**Prior spiritual knowledge:** None required — all content is self-explanatory

### Secondary Audience

**Online sharers** — participants who complete the experience and share their Soul Card on social media, WhatsApp, or via URL. The shareable keepsake is a key distribution mechanism.

### Tertiary Audience

**Experience designers & Vaishnava educators** — those deploying and customizing the experience for new events, new contexts, or new cultural settings. The codebase should be clean, readable, and well-documented enough for a skilled developer to adapt.

---

## 4. Product Goals & Success Metrics

### Primary Goals

| Goal | Metric | Target |
| ------ | -------- | -------- |
| Emotional engagement | % of users who reach Final Station | > 80% |
| Keepsake creation | % of Final Station visitors who generate a Soul Card | > 70% |
| Social sharing | % of keepsake creators who use Share/Download | > 50% |
| Time on experience | Average session duration | 12-20 min |
| Station completion | % of users who complete Station 1 | > 95% |
| Zero confusion UX | Users who advance without needing help | > 90% |

### Secondary Goals

- Zero loading spinners — the experience must feel instant
- Zero crashes or JavaScript errors on modern browsers
- Fully functional without internet (local filesystem mode)
- Works on mobile, tablet, and desktop in portrait and landscape
- Passes WCAG 2.1 AA accessibility audit

---

## 5. High-Level User Journey

```
ARRIVAL & ORIENTATION
User lands on page → Beautiful header with animations →
River navigation visible → Station 1 active

          ↓

STATION I — WHO AM I?
Read intro → See meditating avatar with 6 glowing shells →
Tap layer chips (Body, Emotions, Profession, Name, Identity, Thoughts) →
Each layer dissolves off the avatar →
Avatar glows brighter with each removal → All 6 removed →
Soul Reveal card appears with BG 2.13 verse →
Tap "Continue to Station II"

          ↓

STATION II — WHY IS LIFE SPECIAL?
Read intro → See 5 mystery boxes (Box I ready, II-V locked)
Open Box I (Money) → Insight card → Continue to II →
Open Box II (Career) → Insight card → Continue to III →
Open Box III (Relationships) → Insight card → Continue →
Open Box IV (Experiences) → Insight card → Continue to V →
Open Box V (Purpose) → Divine reveal with gold burst →
Station 2 Reveal card appears with Vedanta-sutra 1.1.1 →
Tap "Continue the Journey"

          ↓

STATION III — WHAT REALLY MAKES ME HAPPY?
Read intro → See Ocean Stage with boat, waves, moon, stars →
Tap "START THE RIDE" →
Journey through 13 emotional moments across 5 chapters →
Phase 1 (Temporary Highs): Shopping, Likes, Money, Success, Love →
Phase 2 (Life Changes): Phone breaks, Job setback, Heartbreak, Financial drop →
Phase 3 (Pause): "Life has ups and downs..." →
Phase 4 (Inner Peace): "There's a happiness that begins inside you..." →
Phase 5 (Spiritual Connection): Golden calm overlays ocean →
Final Reveal card → BG 6.22 verse →
"Continue to Final Station"

          ↓

FINAL STATION — THE MIRROR & SOUL CARD
See sacred mirror with dancing emblem →
Tap "Look Within" → Mirror reveal animation → Realizations →
"I am more than what I own..." → "I am the soul." declaration →
Life's True Purpose revealed → BG 6.22 verse displayed →
Soul Card Form: Enter name → Choose foil theme → Choose verse →
Tap "Generate Keepsake Soul Card" →
High-DPI 1200x1600 canvas renders with chosen theme & verse →
Interactive 3D holographic tilt effect with glare sheen →
Actions: Download PNG / Copy Verse / Share / Customize Again
```

---

## 6. Application Architecture Overview

### Technology Stack

| Layer | Technology | Notes |
| ------- | ----------- | ------- |
| HTML | HTML5 Semantic | Single file, `index.html` |
| CSS | Vanilla CSS3 | CSS Custom Properties, `styles.css` |
| JavaScript | ES2020 Vanilla | Module pattern (IIFE), no bundler |
| Animations | GSAP 3.12.5 | CDN, graceful fallback to CSS |
| Fonts | Google Fonts | Cinzel, Cormorant Garamond, Mukta |
| Audio | Web Audio API | Pure JS synthesis, no audio files |
| Canvas | HTML5 Canvas | 2D context, high-DPI (devicePixelRatio) |
| Particles | Custom Canvas | Dual-canvas layer system |

### Architecture Pattern

The application uses an **IIFE (Immediately Invoked Function Expression) Module Pattern** throughout. Each major feature is encapsulated in its own JavaScript file, exposing a minimal public API. There is no bundler, no transpilation, and no module system — scripts are loaded sequentially in `index.html` via `<script>` tags.

```
index.html
├── particles.js     → ParticleEngine (global)
├── audio.js         → AudioEngine (global)
├── station1.js      → Station1 / Station1Layers (global)
├── station2.js      → Station2 (global)
├── station3.js      → Station3 (global)
├── final.js         → (IIFE, no export; auto-init)
└── app.js           → VrindavanQuest (global, coordinates all)
```

### State Management

State is managed locally within each module. The global coordinator `VrindavanQuest` (in `app.js`) holds:

- `activeStation` — which panel is currently visible
- `completed` — a `Set<string>` of completed station IDs
- `soundOn` — boolean for audio toggle state

Station modules communicate with the coordinator via:

```javascript
VrindavanQuest.markComplete("1");   // Station tells coordinator it's done
VrindavanQuest.goToStation("2");    // Navigation request
```

### Script Loading Order

Scripts must load in this exact order:

1. `gsap.min.js` (CDN) — must load first; all other scripts guard `window.gsap`
2. `particles.js` — standalone, no dependencies
3. `audio.js` — standalone, no dependencies
4. `station1.js` — depends on `ParticleEngine`, `AudioEngine`, `VrindavanQuest`
5. `station2.js` — depends on `ParticleEngine`, `AudioEngine`, `VrindavanQuest`
6. `station3.js` — depends on `ParticleEngine`, `AudioEngine`, `VrindavanQuest`
7. `final.js` — depends on `ParticleEngine`, `AudioEngine`, `VrindavanQuest`
8. `app.js` — coordinates all; `DOMContentLoaded` fires `VrindavanQuest.init()`

---

## 7. Design System & Visual Identity

### Color Palette

The palette is drawn from the imagery of Krishna's midnight forest, the golden glow of diyas, and the teal-turquoise of the Yamuna river. Every color carries semantic and spiritual weight.

#### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Deep Peacock Blue */
  --peacock-950: #061024;   /* Deepest — body background base */
  --peacock-900: #081a33;   /* Dark panel backgrounds */
  --peacock-800: #0d2847;   /* Borders, overlays, elevated surfaces */
  --peacock-700: #123a63;   /* Active border states, highlights */

  /* Teal / Yamuna */
  --teal-700: #00695c;      /* Deep teal for completed states */
  --teal-500: #0d9488;      /* Mid teal */
  --teal-400: #14b8a6;      /* Bright teal — Krishna's feather, accents */

  /* Gold / Diya flame */
  --gold-600: #b45309;      /* Deep amber — shadows, dark gold */
  --gold-500: #f59e0b;      /* Primary gold — borders, icons */
  --gold-300: #fbbf24;      /* Bright gold — interactive highlights */
  --gold-100: #fef08a;      /* Pale gold — radiant glow tips */

  /* Saffron */
  --saffron-500: #ff7a4d;   /* Accent saffron — dev panel, flags */

  /* Ivory */
  --ivory: #f6f1e4;         /* Body text, primary text */
  --ivory-dim: rgba(246, 241, 228, 0.72); /* Secondary text */
}
```

#### Semantic Color Usage

| Token | Use Case |
| ------- | ---------- |
| `--peacock-950` | HTML body background base |
| `--peacock-800` | Card/panel surface color |
| `--peacock-700` | Interactive border, node border |
| `--teal-400` | Feather glyph, active particle accents |
| `--gold-500` | Primary interactive gold (borders, icons, CTA highlights) |
| `--gold-300` | Hover states, active nav labels, focus rings |
| `--gold-100` | Glow tips, radiance, the soul's inner light |
| `--ivory` | All body copy |
| `--ivory-dim` | Subtext, secondary labels, inactive states |

### Typography

Three typefaces create a sacred hierarchy:

| Variable | Font | Role | Weights |
| ---------- | ------ | ------ | --------- |
| `--font-display` | Cinzel | Headlines (h1, h2, h3), station titles | 500, 600 |
| `--font-quote` | Cormorant Garamond | Sanskrit verses, kickers, italic captions | 500, 500i, 600i |
| `--font-body` | Mukta | All body copy, buttons, labels, counters | 400, 500, 600 |

**Type Scale:**

| Element | Size | Notes |
| --------- | ------ | ------- |
| h1 (hero title) | `clamp(1.7rem, 4.5vw, 2.6rem)` | Fluid, gradient text |
| h2 (station title) | ~1.8-2.4rem via `.panel__title` | Cinzel, gradient |
| h3 (soul reveal title) | 1.6rem | Cinzel, gold gradient |
| Body | 1rem / 16px base | Mukta |
| Kicker | Cormorant Garamond, italic | Station labels, phase labels |
| Counter | 0.92rem | Mukta, ivory-dim |
| Node label | 0.95rem | Mukta 500 |

### Spacing Scale

```css
--space-1: 0.5rem;    /* 8px */
--space-2: 0.875rem;  /* 14px */
--space-3: 1.5rem;    /* 24px */
--space-4: 2.5rem;    /* 40px */
--space-5: 4rem;      /* 64px */
```

### Borders, Radius & Easing

- `--niche-radius: 68px 68px 14px 14px` — panel niche shapes
- `--ease-soft: cubic-bezier(0.22, 1, 0.36, 1)` — Apple-style spring ease
- Cards: `border-radius: 18px`
- Buttons: `border-radius: 999px` (pill shape)
- Focus ring: `2px solid var(--gold-300)`, `outline-offset: 3px`

### Background Gradient System

The body background uses a layered radial + linear gradient system:

```css
background:
  radial-gradient(ellipse 900px 500px at 50% -10%, rgba(20, 184, 166, 0.16), transparent 60%),
  radial-gradient(ellipse 700px 500px at 90% 30%, rgba(245, 158, 11, 0.08), transparent 55%),
  linear-gradient(180deg, var(--peacock-950) 0%, var(--peacock-900) 45%, var(--peacock-950) 100%);
```

Creates a subtle teal aurora at the top, warm golden shimmer to the right, and deep midnight blue overall.

---

## 8. Animation & Motion Design System

### Animation Philosophy

All animations must feel **intentional, springy, and sacred** — never mechanical or purely decorative.

| Category | Duration | Ease |
| ---------- | ---------- | ------ |
| Micro-interaction (button press) | 150-200ms | `power1.out` |
| Standard transition (panel entrance) | 400-600ms | `power2.out` |
| Reveal / emotional moment | 600-900ms | `back.out(1.7)` |
| Stagger sequences | 100ms per item | `power2.out` |
| Spring magnetic button return | 400ms | `elastic.out(1, 0.4)` |

### GSAP Integration

GSAP 3.12.5 loaded from CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**All GSAP usage is guarded** with `if (window.gsap) { ... }` followed by a CSS-fallback else branch.

### Animation Catalogue

#### Panel Entrance Stagger

Fires when any station panel becomes active:

```javascript
gsap.fromTo(
  panel.querySelectorAll(".panel__kicker, .panel__title, .panel__intro, .panel__body"),
  { opacity: 0, y: 18 },
  { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
);
```

#### Magnetic Button Effect

All `.btn-primary` and `.btn-outline` elements respond to pointer proximity:

```javascript
btn.addEventListener("pointermove", (e) => {
  const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
  const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
  gsap.to(btn, { x, y, duration: 0.2, ease: "power1.out" });
});
btn.addEventListener("pointerleave", () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
});
```

#### Layer Shell 3D Dissolve (Station 1)

```javascript
gsap.to(shell, {
  scale: 1.55,
  rotation: (Math.random() - 0.5) * 40,
  opacity: 0,
  filter: "blur(12px)",
  duration: 0.65,
  ease: "power2.out",
});
```

#### Holographic 3D Card Tilt (Final Station)

```javascript
gsap.to(card, {
  rotateX: tiltX,
  rotateY: tiltY,
  transformPerspective: 1000,
  duration: 0.25,
  ease: "power1.out"
});
```

### CSS Animation Catalogue

| Animation | Keyframe | Usage |
| ----------- | ---------- | ------- |
| `@keyframes sway` | rotate -3deg to 3deg | Feather glyph in header |
| `@keyframes rise` | opacity 0 to 1, y 20px to 0 | Soul reveal panels |
| `@keyframes pulse-glow` | box-shadow intensity cycling | Avatar aura |
| `@keyframes wave-flow` | translate X | Ocean wave SVG paths |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
  html { scroll-behavior: auto; }
}
```

---

## 9. Audio Engine

### Overview

`AudioEngine` (in `audio.js`) provides complete **procedural audio synthesis** using the **Web Audio API**. There are **zero audio file dependencies** — all sounds are generated mathematically in real time.

### Public API

```javascript
AudioEngine.playFluteNote(frequency, options)
// Synthesized bansuri/flute note
// frequency: Hz (e.g., 440)
// options: { duration, volume }

AudioEngine.playChime(options)
// Temple bell — metallic, reverberant
// options: { volume }

AudioEngine.playTick(options)
// Soft UI tick
// options: { volume }

AudioEngine.playWhoosh(options)
// Atmospheric whoosh for layer removal
// options: { rising, duration, volume }

AudioEngine.playClick(options)
// Crisp UI click for button presses
// options: { volume }

AudioEngine.playCelebration()
// Full celebration fanfare

AudioEngine.toggle()
// Toggles ambient sound loop. Returns: true = now ON

AudioEngine.debugInfo()
// Returns current engine state object
```

### Sound Design Specification

| Sound | Trigger | Synthesis |
| ------- | --------- | ----------- |
| Flute note | Station transitions, reveals | Sine wave + slight detune, exponential decay |
| Temple chime | Box open events, confirmations | Triangle wave, harmonic overtones, long reverb |
| Tick | Toast notification, minor actions | Short sine pulse |
| Whoosh | Layer removal | Frequency sweep, noise |
| UI click | Button presses, navigation | Short square wave click |
| Celebration | Station completions | Chord arpeggio + chime cascade |

---

## 10. Particle System

### Overview

`ParticleEngine` (in `particles.js`) manages a **dual-canvas particle rendering system**:

- `#particle-canvas` (z-index: 0) — ambient floating particles
- `#celebration-canvas` (z-index: 5) — burst/celebration particles

Both canvases are fixed-positioned, cover the full viewport, and use `pointer-events: none`.

### Public API

```javascript
ParticleEngine.burst(xRatio, yRatio, options)
// Spawns a particle burst at the given viewport-normalized position
// xRatio, yRatio: 0-1 (normalized to viewport dimensions)
// options: {
//   count: 32,
//   colors: [...],    // defaults to gold/teal palette
//   speed: 1,
//   size: [3, 6],     // [min, max] pixel radius
//   lifetime: 800,
// }
```

### Integration Points

| Event | Count |
| ------- | ------- |
| Layer removed (Station 1) | 32 |
| All layers removed — Station 1 reveal | 75 |
| Box opened (Station 2) | 40 |
| All boxes opened — Station 2 reveal | 100 |
| Mirror reveal (Final Station) | 60 |
| Final station complete | 120 |

---

## 11. Progression & Navigation System

### River Journey Navigation

The left-side navigation renders as a **winding river path** — an SVG curve connecting four station nodes. The metaphor: the user journeys through Vrindavan's sacred rivers.

### Station Node States

| State | Class | Visual |
| ------- | ------- | -------- |
| Default (locked) | `.is-locked` | 55% opacity, `cursor: not-allowed` |
| Unlocked | (none) | Standard ivory text, dim gold border |
| Active (current) | `[aria-current="step"]` | Bright gold dot with glow |
| Complete | `.is-complete` | Teal dot with teal glow |

### Progression Lock System

| Station | Requirement |
| --------- | ------------ |
| Station 1 | Free access |
| Station 2 | Free access |
| Station 3 | `completed.has("2")` |
| Final Station | `completed.has("3")` |

If a user attempts a locked station, the **Quest Toast Notification** appears.

### Deep Link URL Parameters

| Parameter | Values | Behavior |
| ----------- | -------- | ---------- |
| `?station=N` | 1, 2, 3, final | Jumps directly to station |
| `?debug=true` | true | Shows dev audio panel |
| `?station=3` | 3 | Also marks 1 & 2 complete |
| `?station=final` | final | Marks 1, 2, & 3 complete |

### River Progress Animation

The glowing `#river-progress` SVG path fills as stations are completed:

```javascript
gsap.to(riverProgress, { strokeDashoffset: offset, duration: 0.8, ease: "power2.out" });
```

---

## 12. Station 1 — Who Am I? (Remove the Layers)

### Philosophical Premise

Vedic philosophy teaches that the self (Atman) is not the body, mind, emotions, profession, name, social identity, or thoughts. It is the unchanging conscious observer beneath all of these. Station 1 makes this experientially tangible by letting the user physically peel back each layer, watching the inner light of the soul grow brighter with each removal.

**Completing scripture (BG 2.13):** "As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change."

### Avatar Figure

A meditating human silhouette rendered in SVG (200x220 viewBox), filled with a radial gradient from pale gold at the center to deep amber at the edges.

Surrounded by **6 concentric `div.layer-shell` elements** — translucent shells representing layers of identity. Each shell:

- Has `--shell-scale` (1.02 to 1.55) controlling its size
- Has `--shell-hue` creating slight color variance
- Is clickable (same action as its corresponding chip)

### Avatar Glow System

The `div.avatar-glow` expands in radius and intensity as layers are removed:

```javascript
els.stage.style.setProperty("--glow-level", String(state.removed.size));
```

When all 6 layers are removed, `.avatar-stage--radiant` triggers a full golden radiance animation.

### Layer Chips

Six `button.layer-chip` elements, one per identity layer:

| Layer | Index | Icon | Label |
| ------- | ------- | ------ | ------- |
| Body | 0 | 👗 | Body |
| Emotions | 1 | 😊 | Emotions |
| Profession | 2 | 💼 | Profession |
| Name | 3 | 🪪 | Name |
| Identity | 4 | 📱 | Identity & Status |
| Thoughts | 5 | 🧠 | Thoughts & Ego |

Each chip shows an icon, label, and `◉` status indicator. Can be tapped in any order.

### Interaction Flow

1. User taps any chip or avatar shell
2. `removeLayer(index)` fires:
   - GSAP dissolves the shell (scale, rotate, blur, opacity 0)
   - Chip gets `layer-chip--removed` class + disabled
   - Particle burst fires at avatar center
   - `--glow-level` on avatar stage increments
   - Whoosh sound plays
   - Counter updates
3. When all 6 removed: `showReveal()` fires
   - `.avatar-stage--radiant` added
   - Soul reveal card shown with GSAP fade-in
   - Large particle burst (75 particles)
   - Celebration audio plays
   - `VrindavanQuest.markComplete("1")` called

### Soul Reveal Card

```
THE SOUL REVEAL
"If everything external is removed... who is still there?"
[Reflective passage about the unchanging observer]
"As the embodied soul continuously passes..." — BG 2.13
[ Continue to Station II → ]
```

### JavaScript API

```javascript
Station1.init()           // Auto-called on DOMContentLoaded
Station1.removeLayer(n)   // Remove layer 0-5 programmatically
const Station1Layers = Station1; // Backwards-compat alias
```

---

## 13. Station 2 — Why Is Life Special? (5 Mystery Boxes)

### Philosophical Premise

Human life is unique because only a human being can ask: "Who am I, and what is the purpose of my life?" Station 2 walks through everything humans typically pursue — Money, Career, Relationships, Experiences — and shows how each, after being gained, still leaves a quiet longing. The fifth box reveals this longing as pointing to spiritual purpose.

**Completing scripture (Vedanta-sutra 1.1.1):** "Athato brahma-jijnasa — Now, therefore, in the human form of life, one should inquire into the Absolute Truth."

### Mystery Box Grid

Five `div.box-card` elements in a responsive grid:

| Box | N | State | Icon | Label | Lock |
| ----- | --- | ------- | ------ | ------- | ------ |
| I | 1 | Ready (open first) | 🪙 | Money | 🔓 |
| II | 2 | Locked | 🏆 | Career | 🔒 |
| III | 3 | Locked | 🤝 | Relationships | 🔒 |
| IV | 4 | Locked | 🌟 | Experiences | 🔒 |
| V | 5 | Locked | 🦚 | ??? | ✨ |

Box 5 has special `.box-card--divine` class. Its label is "???" — intentionally mysterious.

### Sequential Opening System

Boxes must be opened in order (1 → 2 → 3 → 4 → 5). Only the next available box has an active button.

### Box Open Animation

1. GSAP rotates lid: `rotateX(-115deg)` with `back.out(1.4)` ease
2. Particle burst fires at box position
3. Chime audio plays
4. `data-state` changes to `"open"`
5. Box detail insight card slides in

### Box Content Insights

| Box | Title | Core Insight |
| ----- | ------- | ------------- |
| I | Money & Wealth | Comfort and security, but once needs are met, a deeper longing remains |
| II | Career & Status | Recognition and purpose, yet identity beyond title is revealed |
| III | Relationships & Bonds | Love is one of life's greatest joys — yet even the deepest bonds are impermanent |
| IV | Experiences & Adventures | A life fully lived — yet the mind always seeks the next peak |
| V | Purpose & The Question | Only a human being can ask: "What is the point of all this?" |

### Station 2 Reveal Card

After all 5 boxes opened:

```
THE QUESTION BEHIND EVERYTHING
"Who am I, and what is the purpose of my life?"
[Passage about how money, career, relationships, and experiences fell short]
"Athato brahma-jijnasa — Now, therefore, one should inquire into the Absolute Truth."
— Vedanta-sutra 1.1.1
[ Continue the Journey → ]
```

---

## 14. Station 3 — What Really Makes Me Happy? (Ocean Journey)

### Philosophical Premise

This station demonstrates the difference between external happiness (dependent on circumstances) and inner happiness from spiritual connection (Atma-rati). The metaphor: life's circumstances are ocean waves. External happiness rises and falls with those waves. Spiritual happiness is like the moon — unchanging, unaffected by the storm below.

**Completing scripture (BG 6.22):** "Upon gaining this, one considers no other gain greater, and standing in such a position, one is never shaken, even in the greatest difficulty."

### Key UX Principle

> Every step is **100% user-controlled**. There are NO automatic timers. The journey pauses completely between steps and advances only when the user explicitly taps "NEXT".

### Journey Structure: 13 Steps, 5 Chapters

#### Chapter 1: Temporary Happiness (Phase: Rise)

| Step | Icon | Title | Meter | Message |
| ------ | ------ | ------- | ------- | --------- |
| 0 | 🛍️ | Shopping & New Things | 65% | "A new thing can make us happy." |
| 1 | 📱 | Likes & Attention | 78% | "Being noticed can make us feel good." |
| 2 | 💰 | Money & Comfort | 88% | "Money can make life easier." |
| 3 | 🏆 | Success & Achievement | 92% | "Achieving something big feels great." |
| 4 | 💕 | Love & Connection | 96% | "Love is one of life's greatest gifts." |

#### Chapter 2: Life Changes (Phase: Drop)

| Step | Icon | Title | Meter | Message |
| ------ | ------ | ------- | ------- | --------- |
| 5 | 📵 | The Phone Breaks | 58% | "But what happens when things change?" |
| 6 | 📉 | Job Setback | 42% | "A setback can shake our sense of worth." |
| 7 | 💔 | Heartbreak | 28% | "Loss of love is one of life's deepest pains." |
| 8 | 😰 | Financial Difficulty | 18% | "Financial stress tests everything." |

#### Chapter 3: The Pause

| Step | Icon | Title | Meter | Message |
|------|------|-------|-------|---------|
| 9 | ⚖️ | Life Has Ups and Downs | 50% | "Is there something more stable?" |

#### Chapter 4: Inner Peace

| Step | Icon | Title | Meter | Message |
|------|------|-------|-------|---------|
| 10 | 🪷 | A Happiness That Starts Within | 68% | "A happiness that doesn't depend on circumstances." |

#### Chapter 5: Spiritual Connection

| Step | Icon | Title | Meter | Message |
|------|------|-------|-------|---------|
| 11 | 🌟 | Connected to Something Greater | 85% | "When we connect with our eternal nature..." |
| 12 | 🙏 | Atma-rati — The Joy of the Soul | 95% | "Joy from within. Joy that nothing can take." |

### Ocean Stage Visual Components

#### Sky Layer

- **Stars:** 5 CSS-animated `span.ocean-star` elements with pulse animations
- **Moon:** SVG crescent (golden circle minus dark offset circle), labeled "Spiritual Anchor"
- **Horizon Hills:** Silhouette hills via CSS `border-radius`

#### Wave System (3 Layers)

Three SVG wave layers with different speeds creating parallax ocean depth:

- Back wave (darkest, furthest) — slowest
- Mid wave — medium speed
- Front wave (brightest, nearest) + foam crest line — fastest

#### The Boat

Handcrafted wooden Vrindavan-style boat SVG (70x55 viewBox) with:

- Wooden hull (brown gradient)
- Gold gunwale rim
- Ornamental lotus prow
- Mast with rigging stay lines
- Saffron pennant/sail
- Golden diya lantern with radial gradient halo
- Boat shadow and CSS-animated wake ripple

#### Happiness Meter

```html
<div class="coaster-meter-track" role="progressbar"
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
  <div class="coaster-meter-fill" style="width: 50%;"></div>
</div>
```

Bar color changes:

- Rising (>60%): Gold/teal gradient
- Dropping (<40%): Muted slate-to-blue
- Stable/Inner (~50%): Balanced warm gradient

#### Journey Phase Track

Three-node horizontal progress indicator: Temporary Highs → Life Changes → Inner Peace

#### Golden Divine Calm Overlay

`div.ocean-golden-calm` — a translucent golden gradient that animates in during Phase 4-5, transforming the ocean from dark-blue to warm-golden, symbolizing spiritual illumination.

### Ocean Stage CSS Classes

| Phase | Class | Ocean Tone |
| ------- | ------- | ------------ |
| Start | `ocean-stage` | Default midnight blue |
| Rise | `ocean--rise` | Slight teal lift |
| Drop | `ocean--drop` | Darker, more stormy |
| Stable | `ocean--stable` | Soft warm blue |
| Transcendent | `ocean--golden` | Full golden glow |

---

## 15. Final Station — The Mirror & Soul Card Keepsake

### Philosophical Premise

The journey culminates with self-recognition. The participant stands before a sacred Vrindavan mirror and sees not their external layers but their eternal soul. The three realizations build to the declaration: **"I am the soul."**

### Phase Structure (7 Phases)

| Phase | Content | Trigger |
| ------- | --------- | --------- |
| 1 | Sacred mirror with emblem | Initial state |
| 2 | Mirror pulse animation | "Look Within →" button |
| 3 | Inner realization lines appear staggered | Automatic |
| 4 | "I am the soul." declaration | After sequence |
| 5 | Life's True Purpose paragraph | Brief delay |
| 6 | BG 6.22 verse + Soul Card form | After purpose |
| 7 | Generated card with 3D tilt + actions | "Generate" button |

### The Sacred Mirror

```html
<div class="mirror-frame">
  <div class="mirror-shimmer">   <!-- animated shimmer overlay -->
  <div class="mirror-surface">
    <svg class="mirror-emblem"> <!-- dashed circle + lotus flame -->
    <p class="mirror-prompt">Gaze into the mirror</p>
  </div>
</div>
<button id="mirror-reveal-btn">Look Within →</button>
```

On "Look Within": GSAP pulse → particle burst → chime audio → realization sequence.

### Inner Realization Sequence

```
"I am more than what I own."         (fade in)
"More than what I achieve."          (fade in)
"More than what others think of me." (fade in)
                    ↓
        "I am the soul."             (large declaration, celebration)
```

### Soul Card Customizer Form

**1. Sacred Name Input** — max 30 characters, rendered on card.

**2. Foil Theme Selector (3 options)**

| Theme | Key | Palette | Spirit |
| ------- | ----- | --------- | -------- |
| 🦚 Vrindavan Gold | `vrindavan` | Peacock navy + amber gold | Krishna's forest |
| 🪷 Lotus Crimson | `radha` | Deep crimson + rose pink | Radha's love |
| 🌊 Yamuna Sapphire | `yamuna` | Deep navy + sky blue | Sacred river |

Each theme has a complete color palette: `bgCenter`, `bgMid`, `bgEdge`, `primaryGold`, `lightGold`, `darkGold`, `accent`, `textIvory`, `auraColor`, `borderInner`, `boxBg`, `boxBorder`.

**3. Guiding Shloka Selector (4 options)**

| Key | Kicker | Sanskrit | Citation |
| ----- | -------- | --------- | ---------- |
| `gita6_22` | SACRED REVELATION | यं लब्ध्वा... | Bhagavad Gita 6.22 |
| `gita2_13` | ETERNAL REALIZATION | देहिनोऽस्मिन्... | Bhagavad Gita 2.13 |
| `gita2_20` | THE IMPERISHABLE SOUL | न जायते... | Bhagavad Gita 2.20 |
| `gita9_22` | DIVINE SANCTUARY | अनन्याश्चिन्त... | Bhagavad Gita 9.22 |

### High-DPI Canvas Rendering

Canvas element: `<canvas id="soul-card-canvas" width="1200" height="1600">`

```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = 1200 * dpr;
canvas.height = 1600 * dpr;
ctx.scale(dpr, dpr);
```

**Card visual layers (bottom to top):**

1. Background gradient (theme colors)
2. Cosmic aura (radial glow)
3. Outer border (dashed gold circle)
4. Inner filigree border (Vedic corner decorations)
5. Header block (kicker + "SOUL CARD" title)
6. Peacock feather SVG motif
7. Name box (glassmorphism rectangle)
8. Verse section (kicker + Sanskrit + English + citation)
9. Meaning line
10. Footer

### 3D Holographic Tilt Effect

The card reacts to pointer/device movement:

```javascript
// Max ±18 degrees rotation on both axes
const tiltX = (cy - e.clientY) / rect.height * 18;
const tiltY = (e.clientX - cx) / rect.width * 18;
gsap.to(card, { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 });
```

The glare overlay (`div.soul-card-glare`) moves with the pointer to simulate holographic foil.

### Action Toolbar

| Button | Action |
| -------- | -------- |
| 📥 Download Keepsake (PNG) | `canvas.toBlob()` → anchor download |
| 📋 Copy Verse | `navigator.clipboard.writeText()` |
| 🔗 Share Keepsake | `navigator.share()` with clipboard fallback |
| 🎨 Customize Again | Hides result, shows form |

**Download filename format:** `soul-card-[name]-[theme].png`

---

## 16. Global Header & Navigation

### Torana Header

The header (`header.torana`) draws from the concept of a *torana* — the ornamental arch gateway found at Indian temples.

**Structure:**

```
[SVG arch path — golden gradient curve]
[Peacock feather glyph] [Title block] [Flute glyph]
[Sound toggle button — top right]
```

**Title block:**

- Eyebrow: "Janmashtami" (Cormorant Garamond italic, gold)
- `h1`: "Journey to the Soul" (Cinzel, fluid gradient text)
- Subtitle: "A quest through Vrindavan" (Cormorant italic, ivory-dim)

**Glyphs:**

- **Feather** (`.glyph--feather`): Peacock feather SVG with teal/gold colors. Animated with `sway` keyframe (rotate ±3deg, 6s ease-in-out infinite).
- **Flute** (`.glyph--flute`): Horizontal bansuri SVG with 5 finger holes, gold gradient fill.

**Sound Toggle:**

```html
<button id="ambient-toggle" aria-pressed="false">
  <svg><!-- speaker/wave icon --></svg>
  <span class="ambient-toggle__label">Sound</span>
</button>
```

Glassmorphism pill button. Toggles `AudioEngine.toggle()`. Label: "Sound" / "Sound On".

---

## 17. Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
| ------------- | --------------- |
| Keyboard navigation | All interactive elements are `<button>`, fully tab-navigable |
| Focus management | Station panels receive focus on transition; reveals receive focus on show |
| Focus indicator | `2px solid var(--gold-300)` ring on all `:focus-visible` elements |
| Color contrast | All text on dark backgrounds meets 4.5:1 minimum ratio |
| Touch targets | All buttons minimum 44x44px |
| Screen reader support | `role`, `aria-label`, `aria-current`, `aria-pressed`, `aria-live`, `aria-hidden` used throughout |
| Reduced motion | Full `prefers-reduced-motion` support disables all animations |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, correct heading hierarchy |
| Live regions | Toast: `aria-live="polite"` |
| Canvas | `role="img"` + `aria-label` on all canvas elements |
| Hidden elements | `hidden` attribute used (proper AT hiding, not just CSS) |
| Disabled buttons | `disabled` attribute + `aria-disabled="true"` |

### ARIA Attributes by Element

| Element | ARIA |
| --------- | ------ |
| Nav river | `aria-label="Journey stations"` |
| Station buttons | `aria-current="step"` (active), `aria-disabled="true"` (locked) |
| Toast | `role="status"`, `aria-live="polite"` |
| Layer list | `role="list"`, `aria-label="Layers to remove"` |
| Box grid | `role="list"`, `aria-label="5 Mystery Boxes"` |
| Box cards | `role="listitem"` |
| Box buttons | Descriptive `aria-label` |
| Happiness meter | `role="progressbar"`, `aria-valuemin/max/now` |
| Foil selector | `role="radiogroup"` |
| Foil buttons | `role="radio"`, `aria-checked` |
| Soul card canvas | `role="img"`, `aria-label` |

---

## 18. Responsive Design Requirements

### Responsive Strategy

The application uses fluid, clamp-based typography and percentage-based layouts — no fixed breakpoints. This creates a naturally responsive experience across all screen sizes.

| Element | Mobile (<480px) | Tablet (480-900px) | Desktop (900px+) |
| --------- | ----------------- | --------------------- | ------------------ |
| App max-width | 100% | 100% | 1180px centered |
| Header h1 | ~1.7rem | ~2.1rem | 2.6rem |
| Avatar stage | 70vw max 210px | Same | Same |
| Box grid | 2 columns | 3 columns | 5 columns |
| Soul card wrap | 90% width | 70% width | 400px max |

### Touch Support

- All interactions respond to touch
- No hover-only interactions
- 3D card tilt uses `DeviceOrientationEvent` on mobile
- `viewport-fit=cover` for iOS notch support

---

## 19. Performance Requirements

### Core Web Vitals Targets

| Metric | Target |
| -------- | -------- |
| LCP (Largest Contentful Paint) | < 1.5s |
| INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.05 |

### Performance Strategies

| Strategy | Implementation |
| ---------- | --------------- |
| No framework overhead | Vanilla JS only |
| No build tool | Direct browser execution |
| Deferred audio context | Web Audio API context created lazily on user interaction |
| Canvas pooling | Particle engine reuses objects |
| GSAP core only | No ScrollTrigger, Draggable, etc. |
| Font preload | Google Fonts via `<link rel="preconnect">` |
| No images | All graphics are SVG or canvas-rendered |
| CSS animations for loops | CSS (not JS) handles waves, sway, pulse |

### File Sizes (Approximate)

| File | Size |
| ------ | ------ |
| `index.html` | ~42 KB |
| `styles.css` | ~54 KB |
| `app.js` | ~8 KB |
| `audio.js` | ~11 KB |
| `particles.js` | ~10 KB |
| `station1.js` | ~6 KB |
| `station2.js` | ~11 KB |
| `station3.js` | ~24 KB |
| `final.js` | ~26 KB |
| **Total (JS + CSS + HTML)** | **~192 KB** |
| GSAP (CDN, cached) | ~70 KB |
| Google Fonts (cached) | ~50 KB |
| **Total cold load** | **~312 KB** |

---

## 20. File Structure & Technical Architecture

### Project Directory

```
d:\janmastami\janmashtami-game\
├── index.html          # Single-page application entry point
├── styles.css          # Complete design system + all component styles
├── app.js              # VrindavanQuest coordinator module
├── audio.js            # AudioEngine (Web Audio API synthesis)
├── particles.js        # ParticleEngine (dual-canvas system)
├── station1.js         # Station 1: Remove the Layers
├── station2.js         # Station 2: 5 Mystery Boxes
├── station3.js         # Station 3: Ocean Happiness Journey
├── final.js            # Final Station: Mirror + Soul Card Keepsake
├── plan.md             # Development planning notes
├── README.md           # Developer documentation
├── PRD.md              # This document
├── powershell.cmd      # Quick-launch script
├── .gitignore          # Git ignore rules
└── .git/               # Git repository
```

### CSS File Organization

`styles.css` is organized in clearly named sections:

- DESIGN TOKENS, RESET & BASE
- TORANA HEADER
- RIVER JOURNEY NAV
- PROGRESSION LOCK TOAST
- BUTTONS
- STATION 1 — REMOVE THE LAYERS
- SOUL REVEAL, AVATAR STAGE & SHELLS, LAYER CHIPS
- STATION PANELS
- STATION 2 — MYSTERY BOXES, BOX DETAIL CARD
- STATION 3 — OCEAN JOURNEY, OCEAN STAGE, THE BOAT, HAPPINESS METER
- FINAL STATION — MIRROR, SOUL CARD FORM, FOIL/VERSE SELECTORS, 3D RESULT
- DEV AUDIO PANEL
- RESPONSIVE OVERRIDES

---

## 21. JavaScript Module API Reference

### `VrindavanQuest` (app.js)

```typescript
interface VrindavanQuestAPI {
  init(): void;
  // Called on DOMContentLoaded.

  goToStation(stationId: "1" | "2" | "3" | "final"): boolean;
  // Navigates to station. Returns false if progression lock prevents entry.

  markComplete(stationId: "1" | "2" | "3"): void;
  // Marks station complete, unlocks next station, updates nav node.

  state: {
    activeStation: string;
    completed: Set<string>;
    soundOn: boolean;
  };
}
```

### `AudioEngine` (audio.js)

```typescript
interface AudioEngineAPI {
  playFluteNote(frequency: number, options?: { duration?: number; volume?: number }): void;
  playChime(options?: { volume?: number }): void;
  playTick(options?: { volume?: number }): void;
  playWhoosh(options?: { rising?: boolean; duration?: number; volume?: number }): void;
  playClick(options?: { volume?: number }): void;
  playCelebration(): void;
  toggle(): boolean;
  debugInfo(): object;
}
```

### `ParticleEngine` (particles.js)

```typescript
interface ParticleEngineAPI {
  burst(
    xRatio: number,  // 0-1 normalized viewport width
    yRatio: number,  // 0-1 normalized viewport height
    options?: {
      count?: number;
      colors?: string[];
      speed?: number;
      size?: [number, number];
      lifetime?: number;
    }
  ): void;
}
```

### `Station1` (station1.js)

```typescript
interface Station1API {
  init(): void;
  removeLayer(n: number): void;  // n: 0-5
}
// Also exposed as: const Station1Layers = Station1;
```

---

## 22. CSS Architecture & Token System

### Component BEM Conventions

```css
.block {}              /* Component block */
.block__element {}     /* Child element */
.block--modifier {}    /* State modifier */
.block.is-state {}     /* JS-toggled state class */
```

### Key CSS Patterns

**Gradient text:**

```css
background: linear-gradient(180deg, var(--ivory) 20%, var(--gold-100) 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

**Glassmorphism card:**

```css
background: rgba(13, 40, 71, 0.6);
backdrop-filter: blur(6px);
border: 1px solid rgba(245, 158, 11, 0.35);
border-radius: 18px;
```

**Fluid sizing:**

```css
width: min(70vw, 210px);
font-size: clamp(1.7rem, 4.5vw, 2.6rem);
gap: clamp(1rem, 4vw, 3rem);
```

### Animation Custom Properties

| Property | Where Set | Consumer |
| ---------- | ----------- | ---------- |
| `--glow-level` | `#avatar-stage` via JS | `.avatar-glow` (station 1) |
| `--shell-scale` | Each `.layer-shell` HTML attr | CSS `transform: scale()` |
| `--shell-hue` | Each `.layer-shell` HTML attr | CSS `hue-rotate()` filter |

---

## 23. SEO & Metadata

### Current Metadata

```html
<title>Journey to the Soul — A Janmashtami Quest</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Recommended Future Additions

```html
<meta name="description" content="A beautiful interactive spiritual journey through Vedic wisdom. Explore identity, purpose, and happiness through 4 experiential stations. Create a personalized Soul Card keepsake.">
<meta property="og:title" content="Journey to the Soul — A Janmashtami Quest">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Semantic Heading Hierarchy

```
h1: "Journey to the Soul"                    (header.torana)
h2: "Who Am I?"                              (station-1)
h2: "Why Is Human Life Special?"             (station-2)
h2: "What Really Makes Me Happy?"            (station-3)
h2: "The Journey Within"                     (station-final)
  h3: "If everything external is removed..."  (soul-reveal S1)
  h3: "Who am I, and what is the purpose..."  (soul-reveal S2)
  h3: "Which happiness survives..."           (soul-reveal S3)
  h3: "Who am I?"                            (final realization)
  h3: "Janmashtami Soul Card"                (card result)
```

---

## 24. Known Issues & Technical Debt

### Active Issues

| ID | Severity | Description | Workaround |
| ---- | ---------- | ------------- | ------------ |
| T-001 | Low | Dev audio panel visible if `?debug=true` is shared | Only share clean URLs |
| T-002 | Low | Station 2 & 3 continue buttons use inline `onclick` | Refactor to JS event binding |
| T-003 | Medium | Canvas may look blurry on old browsers without `devicePixelRatio` | Acceptable degradation |
| T-004 | Low | `DeviceOrientationEvent` requires user permission on iOS 13+ | Shows static card on denial |
| T-005 | Low | Web Share API not available in all browsers | Clipboard fallback works |
| T-006 | Low | Google Fonts fail if CDN unavailable | System fonts are readable fallback |

### Technical Debt

| Item | Priority |
| ------ | ---------- |
| Inline `onclick` handlers on Station 2 & 3 continue buttons | Medium |
| Dev audio panel hardcoded in HTML | Low |
| No `package.json` or local dev server config | Low |
| No automated tests | Low |
| No offline PWA manifest | Low |

---

## 25. Roadmap & Future Enhancements

### Version 2.1 — Polish & Performance

- [ ] Remove dev audio panel from HTML; inject via JS only when `?debug=true`
- [ ] Convert inline `onclick` handlers to proper JS event binding
- [ ] Add OG meta tags for social sharing previews
- [ ] Add cross-station full-page transition (crossfade or slide)
- [ ] PWA manifest + Service Worker for full offline support
- [ ] Add `lang="sa"` attributes to Sanskrit text spans
- [ ] Add "restart from beginning" button on final station

### Version 2.2 — Content Expansion

- [ ] Add more Bhagavad Gita verses to Shloka selector (currently 4; target 12)
- [ ] Add 5th foil theme: "Vrindavan Night" (dark teal + silver)
- [ ] Station 1: Add contextual insight popover per layer explaining its philosophical meaning
- [ ] Station 2: Add richer philosophical insight text per box
- [ ] Station 3: Extend to 18 steps for a richer journey arc

### Version 2.3 — Multiplayer & Event Mode

- [ ] "Booth Mode" — facilitated group experience with projection and individual devices
- [ ] QR code integration for participants to load on their phones
- [ ] "Reflection Wall" — display Soul Card declarations from all participants
- [ ] WhatsApp deep link sharing for Soul Cards

### Version 3.0 — Platform Expansion

- [ ] Native mobile app (Capacitor wrapper)
- [ ] Multi-language support: Hindi, Gujarati, Bengali, Tamil, Telugu
- [ ] Station 3: Real video clips instead of CSS ocean animation
- [ ] Multi-session support via `localStorage`
- [ ] JSON config for non-developer content editing
- [ ] Firebase analytics for tracking event completion rates

---

## 26. Philosophical & Spiritual Content Framework

### Source Texts

| Scripture | Usage |
| ----------- | ------- |
| Bhagavad Gita As It Is (A.C. Bhaktivedanta Swami Prabhupada) | Primary source for all Gita verses |
| Vedanta-sutra (Badarayana) | Station 2 closing verse |
| Upanisads | Background for soul identity framework |
| Srimad-Bhagavatam | Narrative context for Krishna-consciousness |

### Philosophical Progression

The four stations follow classical Vedic inquiry:

```
Station 1: Atma-vicara (Self-inquiry)
  → "Who Am I?" — Neti, neti ("Not this, not this")
  → Removing all false identifications to find the real self

Station 2: Brahma-jijnasa (Inquiry into the Absolute)
  → "Why is life special?" — Human life is rare and precious
  → Only humans can ask the deepest question about existence

Station 3: Ananda-vicara (Inquiry into happiness)
  → "What makes me happy?" — External vs. spiritual joy
  → Introducing Atma-rati (joy of the soul)

Final Station: Atma-saksatkara (Self-realization)
  → "I am the soul." — Direct recognition of the eternal self
  → Connection to the Divine as the source of unending joy
```

### Vedic Verses Used

| Location | Verse | Translation |
| ---------- | ------- | ------------- |
| Station 1 Soul Reveal | BG 2.13 | "As the embodied soul passes through childhood, youth and old age..." |
| Station 2 Soul Reveal | Vedanta-sutra 1.1.1 | "Now, therefore, one should inquire into Brahman." |
| Station 3 Soul Reveal | BG 6.22 | "Having gained this, one considers no other gain greater..." |
| Final Station | BG 6.22 | Same |
| Soul Card Option 1 | BG 6.22 | Supreme Joy Beyond Circumstance |
| Soul Card Option 2 | BG 2.13 | The Unchanging Conscious Soul |
| Soul Card Option 3 | BG 2.20 | "For the soul there is neither birth nor death..." |
| Soul Card Option 4 | BG 9.22 | "For those who worship Me with devotion, I carry what they lack..." |

### Content Tone Guidelines

- **Non-preachy:** Present as discovery, not instruction
- **Universal:** Accessible to any faith or no faith
- **Warm, not clinical:** Personal and empathetic
- **Curious, not definitive:** Invites reflection, doesn't demand conclusion
- **Poetic, not flowery:** Precise language, not purple prose

---

## 27. Glossary

| Term | Definition |
| ------ | ----------- |
| **Atman** | The eternal individual soul; the conscious observer |
| **Atma-rati** | Happiness from connection to one's soul nature; not dependent on external circumstances |
| **Atma-vicara** | Self-inquiry; the practice of questioning "Who am I?" |
| **Bhagavad Gita** | A 700-verse Hindu scripture — a conversation between Arjuna and Krishna addressing the nature of the soul and devotion |
| **Bansuri** | A side-blown bamboo flute, closely associated with Krishna |
| **Brahma-jijnasa** | Inquiry into the nature of Brahman (the Absolute Truth) |
| **Diya** | A small oil lamp lit during Hindu festivals as an offering and symbol of inner light |
| **Foil Theme** | One of three visual themes for the Soul Card (Vrindavan Gold, Lotus Crimson, Yamuna Sapphire) |
| **GSAP** | GreenSock Animation Platform — professional JavaScript animation library |
| **Hallmark-grade** | Reference to the emotional warmth and high-quality presentation standards of Hallmark products |
| **IIFE** | Immediately Invoked Function Expression — JS pattern for creating private scope |
| **Keepsake** | The downloadable Soul Card generated at the Final Station |
| **Kicker** | A small eyebrow label above a title to give context (e.g., "STATION I") |
| **Layer Shell** | One of 6 concentric translucent visual shells around the avatar in Station 1 |
| **Panchakosha** | "Five sheaths" — Vedantic model of five layers covering the soul |
| **Torana** | The ornamental gateway arch at the entrance of a Hindu temple |
| **Vrindavan** | Sacred town in India associated with Krishna's childhood |
| **Web Audio API** | Browser API for synthesizing, processing, and playing audio in JavaScript |
| **Web Share API** | Browser API (`navigator.share()`) for native OS-level sharing |
| **Yamuna** | Sacred river in India flowing through Vrindavan, deeply associated with Krishna |

---

## Appendix A: Station Flow Diagrams

### Station 1 Complete Flow

```
DOMContentLoaded
└── Station1.init()
      ├── cacheEls()
      ├── bind() → chips & shells click handlers
      └── updateCounter()

User taps chip or shell
└── removeLayer(index)
      ├── [guard] already removed? → return
      ├── state.removed.add(index)
      ├── GSAP: shell dissolves (scale, rotate, blur, opacity 0)
      ├── chip.classList.add("layer-chip--removed"); chip.disabled = true
      ├── GSAP: chip bounce animation
      ├── ParticleEngine.burst(avatarCenter, { count: 32 })
      ├── AudioEngine.playWhoosh()
      ├── els.stage.dataset.removed = state.removed.size
      ├── els.stage.style.setProperty("--glow-level", N)
      ├── updateCounter()
      └── if (state.removed.size >= 6) → showReveal()

showReveal()
├── state.revealed = true
├── avatar-stage → .avatar-stage--radiant
├── soul-reveal-b → hidden = false; GSAP fade in from y:30
├── ParticleEngine.burst(0.5, 0.35, { count: 75 })
├── AudioEngine.playCelebration()
├── VrindavanQuest.markComplete("1")
└── soul-reveal-b.scrollIntoView() + .focus()
```

### Station 2 Complete Flow

```
DOMContentLoaded → Station2.init()
  └── bindBoxButtons() → click handlers on [data-box-action]

User clicks Open Box N
└── openBox(N)
      ├── [guard] already open? → return
      ├── GSAP: lid rotateX(-115deg)
      ├── box card data-state → "open", lock → "✨"
      ├── ParticleEngine.burst(boxCenter, { count: 40 })
      ├── AudioEngine.playChime()
      ├── unlock next box (data-state → "ready", button enabled)
      ├── showBoxDetail(N)
      └── updateCounter()

User clicks "Continue to Next Box"
└── if (openedCount >= 5) → showReveal()
   else → hide detail card

showReveal()
├── boxes-reveal → show
├── ParticleEngine.burst(0.5, 0.35, { count: 100 })
├── AudioEngine.playCelebration()
└── VrindavanQuest.markComplete("2")
```

### Station 3 Complete Flow

```
DOMContentLoaded → Station3.init()
  └── bindStartBtn()

User clicks "START THE RIDE"
└── currentStep = 0 → renderStep(0) → replace start btn with next btn

renderStep(N)
├── update ocean class
├── GSAP: animate boat position (left: %)
├── update ocean-event-banner text
├── update happiness meter fill, text, context (GSAP width animation)
├── update phase-node states
└── GSAP: fade in stage card content

User clicks "Next"
└── currentStep++
   ├── if (currentStep >= STEPS.length) → showReveal()
   └── else → renderStep(currentStep)

showReveal()
├── station3-reveal → show
├── VrindavanQuest.markComplete("3")
└── AudioEngine.playCelebration()
```

### Final Station Complete Flow

```
DOMContentLoaded → FinalStation.init()

User clicks "Look Within"
├── GSAP: mirror pulse animation
├── ParticleEngine.burst(mirrorCenter, { count: 60 })
├── AudioEngine.playChime()
└── showRealizationSequence()

showRealizationSequence()
├── GSAP stagger: reveal realization lines with y animation
├── Reveal soul-declaration ("I am the soul.")
├── ParticleEngine.burst(0.5, 0.35, { count: 120 })
├── AudioEngine.playCelebration()
├── Reveal purpose-section
└── Reveal verse-section + soul-card-form

User selects theme, verse, enters name → clicks "Generate"
├── Validate name (not empty)
├── renderSoulCardCanvas(theme, verse, name)
│   ├── Set canvas size × devicePixelRatio
│   ├── Draw all card layers (background → border → header → emblem → name → verse → footer)
│   └── Fade canvas in (GSAP)
└── Show soul-card-result + enable 3D tilt listeners

Download → canvas.toBlob() → link.download("soul-card-[name]-[theme].png")
Copy Verse → navigator.clipboard.writeText(Sanskrit + English + Citation)
Share → navigator.share() → fallback: clipboard copy of URL
Customize Again → hide result, show form
```

---

## Appendix B: Browser Compatibility

| Browser | Version | Support |
| --------- | --------- | --------- |
| Chrome | 90+ | Full |
| Safari | 15+ | Full |
| Firefox | 88+ | Full |
| Edge | 90+ | Full |
| Samsung Internet | 14+ | Full |
| Safari iOS | 15+ | Full (DeviceOrientation requires permission) |
| Chrome Android | 90+ | Full |
| IE 11 | Any | Not supported |

---

## Appendix C: Development & Deployment Guide

### Local Development

**Option 1: Python**

```bash
cd d:\janmastami\janmashtami-game
python -m http.server 8080
# Open http://localhost:8080
```

**Option 2: Node.js**

```bash
npx serve .
# Open http://localhost:3000
```

**Option 3: VS Code Live Server**
Right-click `index.html` → "Open with Live Server"

### Debug Mode

Append `?debug=true` to show the dev audio panel and enable console logging.

### Direct Station Testing

```
?station=1        # Station 1 (default)
?station=2        # Jump to Station 2
?station=3        # Jump to Station 3 (marks 1,2 complete)
?station=final    # Jump to Final (marks 1,2,3 complete)
?debug=true       # Show dev audio panel
```

### Event Kiosk Deployment

1. Copy entire directory to kiosk machine
2. Run local server (Python or Node.js)
3. Open browser in fullscreen/kiosk mode
4. Ensure WiFi for Google Fonts and GSAP CDN

**For fully offline deployments:** Download GSAP and Google Fonts and host them locally by replacing the CDN URLs in `index.html`.

---

*This document is the complete and authoritative reference for the Vrindavan Quest product. It reflects the application as of September 2026 and should be updated with each significant release.*

*— Vrindavan Quest Team*
