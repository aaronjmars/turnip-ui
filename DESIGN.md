# Turnip UI

Standalone visual spec. Apply this file by itself.

DeFi Summer chrome, as seen on SushiSwap's dish picker and Yam.finance's farm and user pages. Centered mascot, extra-bold round sans, one magenta CTA, lots of air. Product screens, not marketing landers. Swap the mascot and the word, keep the chrome.

Density 5. Variance 3. Motion 4.

## Canvas

Cool light gray, never cream, never pure white, never pure black.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#f4f2f3` | `#171417` | Page and shell |
| `--surface` | `#ffffff` | `#221e22` | Cards, header pills, modals |
| `--dish` | `#f0e9e0` | `#2c241c` | Selection cards only |
| `--dish-btn` | `#e7ddd2` | `#3a3128` | In-card secondary button |
| `--text` | `#1c1c1c` | `#f4f1ee` | Titles, values, primary labels |
| `--muted` | `#8d8d8d` | `#9a9490` | Nav, lede, captions, footer |
| `--soft` | `#b7a99c` | `#a89888` | Card body copy |
| `--brown` | `#5c3a2a` | `#f0d2b8` | Script display titles |
| `--accent` | `#d4416a` | same | Primary fill, TVL, live pills |
| `--accent-hover` | `#c0365e` | same | Primary hover |
| `--orange` | `#e07022` | same | Select / choose labels on cream cards |
| `--nav` | `#9a9a9a` | `#9a9490` | Inactive nav |
| `--nav-active` | `#4c6ef5` | same | Active nav outline |
| `--line` | `#eceaea` | `#332e32` | 1px borders |
| `--shadow` | `0 10px 28px rgba(40, 24, 32, 0.05)` | `0 10px 28px rgba(0, 0, 0, 0.28)` | Cards, sheets, toasts |
| `--ease` | `cubic-bezier(0.32, 0.72, 0, 1)` | same | All motion |

One accent. Magenta is the only filled color. Blue is outline-only for nav. Orange is cream-card actions only. Do not introduce teal, purple fills, or gradients on type.

## Type

- **UI:** Nunito 400 / 600 / 700 / 800. `ui-rounded` fallback. Never Inter.
- **Playful display (optional, at most one per page):** Pacifico 400 for a centered script title, brown, `clamp(28px, 4vw, 42px)`.
- Page titles: Nunito 800, `clamp(36px, 5vw, 52px)`, tracking `-0.035em`, centered.
- Lede under title: 16-18px, weight 600, muted or soft, one line.
- Card titles: 20px, weight 800.
- Card body: 13.5px, weight 600, soft, line-height 1.45.
- Values: 34px, weight 800, tracking `-0.03em`. Empty is `--`, never `0` or `0.00`.
- Hero metric (TVL-style): 36-56px, weight 800, accent color.
- Buttons: 15-16px, weight 800.
- Footer / meta: 13-15px, weight 700, muted.
- No serif. No mono unless a chain of IDs needs it (proposal ids).

## Layout

- Shell is a column: header, main, footer. Same `--bg` on every route.
- Main column `width: min(920px, calc(100% - 32px))`, centered. Do not go wider.
- Page content is centered, not a left-rail dashboard.
- Header is a 3-column grid: brand left, nav center, utilities right. Max height ~72px.
- Footer is a single centered row of muted text links, 22px gaps, no icons.
- Vertical air: mascot, then title, then lede, then 28px before the first block.
- Collapse to one column below 860px. Nav becomes a horizontal scroller. Header brand stays one line.

## Header

- Brand: 32px 3D mark + 17px extra-bold word. No "Finance" suffix unless asked.
- Nav items: 16px, weight 700, muted, padding `8px 14px`, radius 10px.
- Active nav: text `--nav-active`, inset 1.5px outline of the same blue. No fill.
- Theme control: 46px white circle, 1px line border, 3D sun/moon mark inside. Not a glyph font.
- Status / wallet: 46px-tall white pill, 1px line, 18px identicon, extra-bold truncated id.
- Dropdowns: 14px radius surface, 1px line, whisper shadow, 6px pad, 10px item radius.

## Buttons

Three shapes only.

1. **Primary pill.** Height 44px, `border-radius: 999px`, fill accent, white 800 text. Disabled opacity 0.45.
2. **Ghost pill.** Same height and radius, surface fill, 1px line, ink text. Default for Vote / Delegate / Claim / Unstake / Harvest / Cancel.
3. **Card select.** Full width of a cream card, height 44px, radius 12px (not pill), dish-btn fill, orange 800 text.

Active press: `scale(0.98)`. No drop shadows on buttons. No arrows in CTAs.

## Cards

Two families. Do not mix on the same row.

**Selection card (picker).** Cream `--dish`, radius 18px, padding 22px 18px 14px, min-height ~292px, no shadow. Circular 72px icon well. Title, two-line body, select button, then a white APY/meta bar (radius 10px). Selected state is the only rainbow in the system: 2px gradient border (`#7a5cff` / `#4aa8ff` / `#5ee7c2`) plus a soft violet-cyan glow. Hover may preview selection. 3-up grid, 18px gap.

**Surface card (work).** White `--surface`, 1px line, whisper shadow. Radius 24-28px. Used for notices, hero metrics, stat pairs, proposals, redeem forms.

**Stat pair.** Two surface cards. Centered 72px mascot, then `--` or a big value, then a muted caption, then pills pinned to the bottom. Unstake + primary on the left card, one wide ghost on the right.

**Notice strip.** Surface, radius 22px, 14-16px pad. Icon 32px, muted 15px 700 copy, accent text action, quiet X. Not a banner gradient.

**Hero metric.** Surface, radius 24px, centered. Giant accent number (or "Loading TVL..."), muted subtitle.

## Numbers and loading

- Missing or zero: `--`
- After a short wait, replace loading copy in place. No spinners.
- Loading copy is the same type as the final value (giant accent for TVL, muted for APR).
- Toasts: bottom-center, full-pill, ink fill / surface text, 13px 800.

## Mascots and pictures

This language is mascot-led. Every primary screen gets one 3D Apple-emoji-style object or character, isolated, knocked-out PNG, sitting above the title.

- Size: ~96-220px, `object-fit: contain`, no crop, no rounded clip on heroes.
- Padding in the asset so nothing is sliced at the frame.
- Brand mark in the header is the same object at 32px.
- Never emoji glyphs. They render as empty boxes here. Generate a 3D still, knock out the studio backdrop, ship PNG.
- Circular wells (72px) are for picker icons only, not heroes.
- Dark mode: keep the PNG. Do not recolor it.

## Motion

- Page enter: 700ms `--ease`, fade + `translateY(18px)`.
- Respect `prefers-reduced-motion`.
- Animate transform and opacity only.
- No marquees, no scroll hijack, no custom cursors, no button glows except the selection-card rainbow.

## Modal / sheet

Dim overlay `rgba(20, 12, 16, 0.32)`. Sheet max 420px, radius 24px, 24px pad, surface. Title 22px 800. Actions right-aligned ghost + primary. Amount field: 48px, radius 14px, bg `--bg`, Max is a tiny accent pill.

## Dark

Same structure. Swap tokens only. Do not invert a single section. Accent, orange, and nav-active stay put.

## Anti-patterns

- Inter, Roboto, system-ui as the face
- Emoji characters in the DOM
- Cream page background (that was the old picker skin)
- Pure `#000` / `#fff` as page fill
- Neon outer glows on buttons
- AI purple fills
- Three equal marketing feature cards with icons and lorem
- Eyebrow chips (`01 / FARM`, `BETA`)
- Em dashes
- Fake 99.9% stats
- Wide 1200px+ content
- Sticky docks, sidebars, command palettes
- Serif display mixed into UI type

## Page recipes

Use these skeletons for any domain (settings, inventory, profile, voting, redeem). Swap nouns.

**Picker.** Mascot, optional script title, one-line lede, 3-up selection cards.

**Work.** Smaller mascot, page title, lede, optional notice, optional hero metric, then a 2-up stat pair with pills.

**Account.** Mascot, "Your Page"-style title, two-column value rows (icon + big number + caption), hairline, another pair, then ghost pills (left cluster + one right).

**List.** Title, lede, stacked surface cards with a status pill, a short heading, a thin accent bar, meta row, optional primary.

**Form.** One surface card, labeled field above input, from/to rows with 40px marks, one wide primary.
