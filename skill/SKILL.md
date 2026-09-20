---
name: turnip-ui
description: >
  Build product UI in Turnip UI, the DeFi Summer farm language: cool-gray
  canvas, Nunito extra-bold, 3D mascot heroes, magenta pill CTAs, cream
  selection cards, whisper borders, centered 920px column. The look of
  SushiSwap dishes and Yam.finance. Use when the user says turnip-ui,
  /turnip-ui, DeFi Summer UI, Yam.finance, SushiSwap dishes, or "in the
  style of" this farm / turnip UI.
---

# Turnip UI

Self-contained. Do not look up DESIGN.md or any other spec. Everything needed to build is in this file.

DeFi Summer chrome, as seen on SushiSwap's dish picker and Yam.finance's farm and user pages. Centered mascot, extra-bold round sans, one magenta CTA, lots of air. Product screens, not marketing landers. Swap the mascot and the word, keep the chrome. Do not rebuild the Turnip farm unless the user asked for that product.

Density 5. Variance 3. Motion 4.

## Run

1. Restate the page in one line (what the user does on it).
2. Pick a recipe below (picker / work / account / list / form) or compose two.
3. One 3D mascot PNG per primary screen, knocked-out, never an emoji glyph.
4. Same `--bg` on every route.
5. Empty values render `--`. Loading is in-place copy, not a spinner.
6. Verify in the browser if the work is visual.

Do not invent a second accent, put cream on the page background, use Inter, crop mascots, ship emoji in the DOM, or write DeFi nouns unless the page is actually that.

## Canvas

Cool light gray. Never cream, never pure white, never pure black.

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
| `--accent` | `#d4416a` | same | Primary fill, big metrics, live pills |
| `--accent-hover` | `#c0365e` | same | Primary hover |
| `--orange` | `#e07022` | same | Select labels on cream cards |
| `--nav` | `#9a9a9a` | `#9a9490` | Inactive nav |
| `--nav-active` | `#4c6ef5` | same | Active nav outline |
| `--line` | `#eceaea` | `#332e32` | 1px borders |
| `--shadow` | `0 10px 28px rgba(40, 24, 32, 0.05)` | `0 10px 28px rgba(0, 0, 0, 0.28)` | Cards, sheets, toasts |
| `--ease` | `cubic-bezier(0.32, 0.72, 0, 1)` | same | All motion |

Magenta is the only filled color. Blue is outline-only for nav. Orange is cream-card actions only. No teal, no purple fills, no gradient type.

Dark: swap tokens only. Do not invert a single section. Accent, orange, and nav-active stay put.

## Type

- UI: Nunito 400 / 600 / 700 / 800. `ui-rounded` fallback. Never Inter.
- Optional playful display, at most one per page: Pacifico 400, brown, `clamp(28px, 4vw, 42px)`, centered.
- Page titles: Nunito 800, `clamp(36px, 5vw, 52px)`, tracking `-0.035em`, centered.
- Lede: 16-18px, weight 600, muted or soft, one line.
- Card titles: 20px, weight 800.
- Card body: 13.5px, weight 600, soft, line-height 1.45.
- Values: 34px, weight 800, tracking `-0.03em`. Empty is `--`, never `0` or `0.00`.
- Hero metric: 36-56px, weight 800, accent.
- Buttons: 15-16px, weight 800.
- Footer / meta: 13-15px, weight 700, muted.
- No serif. Mono only for id strings.

## Layout

- Shell column: header, main, footer. Same `--bg` on every route.
- Main: `width: min(920px, calc(100% - 32px))`, centered. No wider.
- Content is centered, not a left-rail dashboard.
- Header: 3-column grid, brand left, nav center, utilities right, max ~72px.
- Footer: centered muted text links, 22px gaps, no icons.
- Stack: mascot, title, lede, then 28px before the first block.
- Below 860px: one column, nav scrolls horizontally, brand stays one line.

## Header

- Brand: 32px 3D mark + 17px extra-bold word. No "Finance" suffix unless asked.
- Nav: 16px, weight 700, muted, padding `8px 14px`, radius 10px.
- Active nav: `--nav-active` text, inset 1.5px outline of the same blue. No fill.
- Theme: 46px white circle, 1px line, 3D sun/moon mark. Not a glyph font.
- Status / wallet: 46px-tall white pill, 1px line, 18px identicon, extra-bold truncated id.
- Dropdowns: 14px radius surface, 1px line, whisper shadow, 6px pad, 10px item radius.

## Buttons

Three shapes only. Press: `scale(0.98)`. No button shadows. No arrows in CTAs.

1. Primary pill. Height 44px, radius 999px, accent fill, white 800. Disabled opacity 0.45.
2. Ghost pill. Same size, surface fill, 1px line, ink text. Default secondary.
3. Card select. Full width of a cream card, height 44px, radius 12px, dish-btn fill, orange 800.

## Cards

Two families. Do not mix on the same row.

**Selection card.** Cream `--dish`, radius 18px, padding 22px 18px 14px, min-height ~292px, no shadow. 72px circular icon well. Title, two-line body, select button, white meta bar (radius 10px). Selected: 2px gradient border `#7a5cff` / `#4aa8ff` / `#5ee7c2` plus a soft violet-cyan glow. Hover may preview selection. 3-up grid, 18px gap.

**Surface card.** `--surface`, 1px line, whisper shadow, radius 24-28px. Notices, metrics, stat pairs, lists, forms.

**Stat pair.** Two surface cards. Centered 72px mascot, `--` or a big value, muted caption, pills at the bottom. Left: ghost + primary. Right: one wide ghost.

**Notice strip.** Surface, radius 22px, 14-16px pad. 32px icon, muted 15px 700 copy, accent text action, quiet X.

**Hero metric.** Surface, radius 24px, centered. Giant accent number or loading copy, muted subtitle.

## Numbers, loading, sheets

- Missing or zero: `--`
- Loading replaces copy in place. No spinners. Same type as the final value.
- Toasts: bottom-center, full-pill, ink fill / surface text, 13px 800.
- Modal: overlay `rgba(20, 12, 16, 0.32)`. Sheet max 420px, radius 24px, 24px pad. Title 22px 800. Ghost + primary right-aligned. Amount field 48px, radius 14px, bg `--bg`, Max is a tiny accent pill.

## Mascots

Mascot-led. Every primary screen gets one 3D Apple-emoji-style object or character above the title.

- Generate a 3D still on a flat studio fill, generous padding, no crop. Knock out the fill to PNG alpha.
- Size ~96-220px, `object-fit: contain`. No rounded clip on heroes.
- Header mark is the same object at 32px.
- Never emoji glyphs. They render as empty boxes.
- 72px circular wells are for picker icons only.
- Dark mode keeps the PNG. Do not recolor it.

## Motion

Page enter: 700ms `--ease`, fade + `translateY(18px)`. Honor `prefers-reduced-motion`. Transform and opacity only. No marquees, scroll hijack, or custom cursors. No button glow except the selection-card rainbow.

## Recipes

Swap nouns. Any domain.

- **Picker.** Mascot, optional script title, one-line lede, 3-up selection cards.
- **Work.** Smaller mascot, page title, lede, optional notice, optional hero metric, 2-up stat pair with pills.
- **Account.** Mascot, "Your Page"-style title, two-column value rows (icon + big number + caption), hairline, another pair, ghost pills (left cluster + one right).
- **List.** Title, lede, stacked surface cards with a status pill, short heading, thin accent bar, meta row, optional primary.
- **Form.** One surface card, label above input, from/to rows with 40px marks, one wide primary.

## Never

Inter or Roboto as the face. Emoji in the DOM. Cream page background. Pure `#000` / `#fff` as page fill. Neon glows on buttons. AI purple fills. Three equal marketing feature cards. Eyebrow chips (`01 / FARM`, `BETA`). Em dashes. Fake 99.9% stats. Content wider than 920px. Sidebars, sticky docks, command palettes. Serif display mixed into UI type.

## Done when

Tokens, radii, and type match this file. Shell chrome matches if the page is in an app. Dark tokens exist. One column below 860px. No emoji glyphs, no Inter, no cream canvas.
