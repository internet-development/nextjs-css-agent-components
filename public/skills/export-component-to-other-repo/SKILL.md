---
name: export-component-to-other-repo
description: Port a component from nextjs-sass-starter into a different repo without losing the design-system precision. Use when the user says "copy this component to <repo>", "lift Button into <repo>", "bring the Thin layout over", or otherwise wants a faithful transplant of one or more components from this codebase. Carries over the CSS Module, the theme tokens it depends on, the typography scale, the spacing/transition conventions, and the path-alias plumbing required for it to compile.
---

# Export a component to another repo

This skill exports a component (or a set of components) from `nextjs-sass-starter` into a target repo while preserving every value that makes it look right: pixel measurements, type tokens, theme variables, transition timing, breakpoint, and z-index. The starter is a precision wireframe system — paraphrasing values is the failure mode this skill exists to prevent.

**Heads-up on the name:** despite the repo being called `nextjs-sass-starter`, SASS is **not** a dependency. All styling is vanilla CSS Modules (`.module.css`) using **native CSS nesting** (the `&` selector). Next.js compiles this via Lightning CSS with no preprocessor or PostCSS plugins. Don't introduce a SASS dependency in the target.

## When to use

- "Copy `<Component>` into `<other-repo>`"
- "Bring the Thin layout / Button / Input / Navigation / Footer over to `<repo>`"
- "Port the modal system into `<repo>`"
- "Lift the typography scale into `<repo>`"

## When NOT to use

- The user wants a *redesign* of the component for the new repo. (Use a normal task; this skill preserves, it doesn't reinterpret.)
- The user wants to publish a shared package. (That is a different procedure — this skill copies source.)
- The target repo already uses Tailwind / styled-components / Emotion. Stop and ask the user how they want the styling reconciled before continuing.

## Pre-flight: profile the source

Before touching the target repo, build a manifest of what the component actually depends on. For each component you are exporting:

1. **Read the `.tsx` and `.module.css` together.** They are colocated in this repo and must move together.
2. **List the imports.** Anything from `@elements`, `@components`, `@patterns`, `@runtime`, `@common`, `@root`, `@modules` is a transitive dependency that has to either come along or be re-pointed. Note the **tier** of each — Tier-1 (`@elements/`) deps are usually free to copy, Tier-2 (`@components/`) deps pull in their own atoms, Tier-3 (`@patterns/`) deps are page-level and rarely worth porting on their own.
3. **Grep the CSS for `var(--...)`.** Every `--theme-*`, `--color-*`, `--type-scale-*`, `--font-family*`, `--theme-graph-*`, `--theme-box-shadow-*` token referenced is a global it depends on. Note all of them.
4. **Grep the CSS for `@media`, `transition:`, `animation:`, `@keyframes`, `100dvh`, and `&` (native nesting).** These are the precision-sensitive surfaces. If the target's CSS pipeline doesn't support native nesting, you'll have to flatten `&:hover { ... }` into `.foo:hover { ... }`.
5. **Note the spacing values used** (`24`, `48`, `64`, `4`, `8`, `12`, `16`, `32`) and any radii (`4px`, `8px`).
6. **Check for body/document assumptions** — does the component assume `body.theme-light` exists? Does it use `document.body.classList` (e.g. theme switcher)? Does it require a React context (modals, providers)?

Write the manifest down before editing the target. Do not skip this step — the failure mode of this skill is "I copied the TSX and the styles broke."

## What you must carry over (the precision payload)

These are non-negotiable. If the target repo doesn't already have them, copy them in.

### 1. The full theme token system (from `global.css`)

Even if you only want one component, you usually need to copy the whole `:root` palette + every `body.theme-*` block, because the component's `var(--theme-*)` references resolve through them. Specifically:

- The raw color palette under `html, body { ... }`:
  - Black/white/gray: `--color-black-100`, `--color-black-100-{1,2,4}`, `--color-gray-{100,90,80,70,60,50,40,30,20,10}` (with `-3`, `-6`, `-2` opacity variants where defined), `--color-white`, `--color-white-{1,2,4}`.
  - Status: `--color-red-60`, `--color-red-60-3`, `--color-green-60`, `--color-green-60-3`, `--color-gold-30`.
  - Daybreak orange ramp: `--color-daybreak`, `--color-daybreak-{10..100}` plus opacity variants.
  - Neon green ramp: `--color-neon-green-{10..100}` plus opacity variants.
  - Blue ramp: `--color-blue-{10..100}` plus `-1`, `-2`, `-5` opacity variants.
  - Black-daybreak: `--color-black-daybreak-100`, `--color-black-daybreak-100-4`.
  - Graph tokens: `--theme-graph-positive`, `--theme-graph-positive-subdued`, `--theme-graph-netural` (yes, that spelling — preserve it), `--theme-graph-negative`, `--theme-graph-negative-subdued`.
- All five `body.theme-*` blocks: `theme-light`, `theme-dark`, `theme-daybreak`, `theme-blue`, `theme-neon-green`. Each redefines the semantic tokens (`--theme-background`, `--theme-background-overlay`, `--theme-background-box-{top,front,side}`, `--theme-foreground`, `--theme-foreground-secondary`, `--theme-text`, `--theme-border`, `--theme-border-box`, `--theme-border-subdued`, `--theme-button`, `--theme-button-text`, `--theme-primary`, `--theme-input-active`, `--theme-success`, `--theme-success-subdued`, `--theme-error`, `--theme-error-subdued`, `--theme-box-shadow-modal`, `--theme-box-shadow-button`, `--theme-box-shadow-button-hover`) and the matching `::-webkit-scrollbar` rules.
- The `<body>` in the target's document/html shell must get `className="theme-light"` (or whichever theme is the default) so the tokens resolve. In Next Pages Router, this lives in `pages/_document.tsx` (`<body className="theme-light">`). In App Router, set it on `<body>` in `app/layout.tsx`.

If the target only ever needs one theme, you can copy just that one `body.theme-*` block — but copy the full raw palette regardless, because the semantic tokens reference it.

### 2. The typography scale

Even a Button references `var(--type-scale-fixed-small)`. Copy the full set into the target's globals:

```css
--type-scale-1: 3.815rem;
--type-scale-2: 3.052rem;
--type-scale-3: 2.441rem;
--type-scale-4: 1.953rem;
--type-scale-5: 1.563rem;
--type-scale-6: 1.25rem;
--type-scale-7: 1rem;

--type-scale-fixed-large:  20px;
--type-scale-fixed-medium: 16px;
--type-scale-fixed-small:  14px;
--type-scale-fixed-tiny:   12px;
--type-scale-fixed-label:  10px;
```

Plus the responsive root font-size shift (this is what makes the modular `rem`-based scale shrink on mobile):

```css
html, body {
  font-family: var(--font-family);
  font-variant-numeric: tabular-nums;
  font-size: 16px;
  @media (max-width: 768px) { font-size: 12px; }
}
```

If you skip the `font-size: 12px` mobile override, every `--type-scale-1..7` value silently changes scale on mobile vs. the source repo.

### 3. The font stack (and ServerMono if the component uses mono)

```css
--font-family:       -apple-system, BlinkMacSystemFont, helvetica neue, helvetica, sans-serif;
--font-family-mono:  'ServerMono', Consolas, monaco, monospace;
--font-family-serif: Georgia, Times New Roman, serif;
```

If the component (or anything under it) uses `var(--font-family-mono)`, copy the two `@font-face` declarations for `ServerMono` from the top of `global.css` verbatim — they reference S3-hosted woff2/woff/otf files at `intdev-global.s3.us-west-2.amazonaws.com`. Don't re-host or rename; the URLs are stable.

### 4. The CSS reset

The reset block in `global.css` (the giant comma-separated selector list ending in `box-sizing: border-box; vertical-align: baseline; margin: 0; padding: 0; border: 0;`, plus the `display: block` block for HTML5 elements). Components rely on `box-sizing: border-box` being the default. If the target has its own reset (e.g. Tailwind's preflight, `normalize.css`, `modern-normalize`), verify it sets `box-sizing: border-box` globally — if not, copy this reset.

### 5. The global animations (only if needed)

If the exported component (or its CSS) references `animation: blur ...`, `fade`, `slideUp`, `slideDown`, `slideLeft`, or `slideRight`, copy the matching `@keyframes` block from `animations.css` into the target's globals. All five share the 0% / 25% / 75% / 100% timing — preserve the keyframe percentages exactly.

### 6. Helpers from `common/utilities.ts`

If the TSX imports anything from `@common/utilities`, copy just those functions. Do not pull the whole file unless the component uses most of it. Inventory: `noop`, `pluralize`, `getOrdinalNumber`, `getDomainFromEmailWithoutAnySubdomain`, `onHandleThemeChange`, `formatDollars`, `calculatePositionWithGutter[ById]`, `leftPad`, `toDateISOString`, `elide`, `bytesToSize`, `isEmpty`, `createSlug`, `isUrl`, `debounce`, `timeAgo`, `classNames`, `generateNonce`, `filterUndefined`. `classNames` is the most commonly needed.

### 7. The modal system (only if the component opens or is a modal)

If the component calls `useModals()` or is registered via `modals.open(...)`, you must port:
- `runtime/modals/ModalContext.tsx` (the `ModalProvider`, `useModals` hook, `ModalContext`, types)
- `runtime/modals/GlobalModalManager.tsx` (the renderer)
- `runtime/modals/GlobalModalManager.module.css`
- The concrete modal component itself, from `patterns/modals/Modal*.tsx`

Wrap the target's app root in `<ModalProvider>` and place exactly one `<GlobalModalManager />` somewhere it will always be mounted (typically inside the page shell, after the main content).

## Step-by-step procedure

### Step 1 — confirm the target

Ask the user (or read from context) the absolute path of the target repo. Confirm:
- Framework (Next.js Pages, Next.js App, Vite + React, CRA, Remix, etc.).
- Existing styling approach (CSS Modules, Tailwind, styled-components, plain CSS).
- Whether path aliases (`@/`, `~/`, etc.) are configured in its `tsconfig.json`.
- Whether a global stylesheet exists where you can paste tokens.
- **Whether the target's CSS pipeline supports native CSS nesting** (the `&` selector). Next.js 13.4+, Vite 5+, and any pipeline using Lightning CSS or PostCSS ≥ 8.4 with `postcss-nesting` (or modern browsers via the unprefixed CSS Nesting Module) all support it. If unsure, write a one-line `.test:hover { color: red; }` nested in `.test { ... }` and check whether it applies.

If the target uses Tailwind or CSS-in-JS, **stop and ask** how the user wants to reconcile — pasting `.module.css` files into a Tailwind project is a decision, not a default. If the target does **not** support native nesting, you must flatten every `&:hover`, `&:focus`, `&:visited`, `&::before`, `& .child`, etc. into the explicit selector form before pasting.

### Step 2 — write the dependency manifest

Per the pre-flight section, list every transitive `.tsx`, `.module.css`, theme token, type-scale token, keyframe, and utility the export touches. Show this list to the user before copying so they can confirm scope.

### Step 3 — choose a destination layout in the target

Default mapping when the target has no existing convention:

```
<target>/components/<original-bucket>/   (mirror elements/, components/, patterns/, runtime/)
<target>/styles/tokens.css               (the palette + theme blocks + type scale + fonts + reset)
<target>/styles/animations.css           (only if keyframes are needed)
```

If the target already has its own convention (e.g. `src/ui/`, `app/_components/`), match it. The folder name is less important than the colocation rule: `Foo.tsx` and `Foo.module.css` must live in the same directory.

### Step 4 — copy globals first, components second

In this order:

1. Copy/merge the theme tokens, type scale, fonts, reset into the target's global stylesheet. Import it once at the app entry.
2. Copy the keyframes file if needed and import it once at the app entry.
3. Set the default theme class on `<body>` (`theme-light` unless the user says otherwise).
4. Copy the component `.tsx` + `.module.css` files. Preserve every `var(--theme-*)` reference and every nested `&` selector (or flatten them if the target doesn't support native nesting — see Step 1). Do not "simplify" `box-shadow: 0 0 0 1px var(--theme-border)` to `border: 1px solid` — the no-layout-shift behavior is intentional.
5. Copy any transitive component dependencies you identified.
6. Copy any utilities (`classNames`, etc.) the TSX imports.

### Step 5 — re-point imports

Replace the source aliases with whatever the target uses:

| Source                | Replace with                        |
| --------------------- | ----------------------------------- |
| `@elements/<bucket>/Foo`   | target equivalent (e.g. `@/components/ui/Foo` or relative `../Foo`) |
| `@elements/<bucket>/Foo.module.css` | same path with `.module.css`   |
| `@components/Foo`     | target equivalent for tier-2 molecules |
| `@patterns/<bucket>/Foo` | rarely exported; if so, mirror under the target's page-level folder |
| `@runtime/modals/...` | target's provider/renderer location (must wrap target's app root) |
| `@common/utilities`   | target's utilities path             |
| `@root/global.css`    | target's global stylesheet path     |

If the target has no path aliases, prefer relative imports rather than introducing them — adding aliases is a separate decision.

### Step 6 — preserve every measurement verbatim

When pasting the CSS, do not "tidy" any of these:

- `min-height: calc(100dvh - 48px)` — the 48 is the Navigation row height; keep it (or remove the `- 48px` only if the target has no top nav).
- `padding: 64px 24px 64px 24px` (ThinAppLayout/AppLayout) — keep both axes explicit.
- `max-width: 512px` (ThinAppLayout) and `max-width: 768px` (AppLayout) — the breakpoint and the layout width are the same number on purpose.
- `min-height: 48px`, `padding: 4px 24px 4px 24px`, `border-radius: 8px`, `font-weight: 600`, `letter-spacing: 0.2px` (Button).
- `height: 48px`, `padding: 0 16px 0 16px`, `border-radius: 4px`, `box-shadow: 0 0 0 1px var(--theme-border)` and the focus ring `box-shadow: 0 0 0 1px var(--theme-border), 0 0 0 4px var(--theme-input-active)` (Input).
- `font-size: var(--type-scale-fixed-label)` (10px), `padding: 4px 8px 2px 8px`, `text-transform: uppercase` (SmallButton — note the asymmetric vertical padding, that is intentional).
- `transition: 200ms ease all` (universal) — do not change duration or easing.
- `@media (max-width: 768px)` — the only breakpoint. Don't substitute `max-width: 767px` or `min-width: 769px` flips.
- 48px Navigation row, `box-shadow: 0 1px 0 0 var(--theme-border)` underline, `min-width: 240px` left/right cells (collapsing to 128px at 960px and to `auto` at 768px).
- `transform: scale(1)` baseline on buttons — present so hover/active transforms compose correctly.

### Step 7 — verify

Boot the target's dev server and verify in a browser:

1. The component renders.
2. Switching `body` className across `theme-light`/`theme-dark`/`theme-daybreak`/`theme-blue`/`theme-neon-green` recolors it correctly. (Even if the target only intends to ship one theme, this proves the token wiring is intact.)
3. The page narrows correctly across the `768px` breakpoint — chrome typography stays fixed-px, body typography shifts.
4. Hover/focus transitions feel identical to the source.
5. If the component is a button or input, check the box-shadow ring isn't doubled by a target reset that adds borders.

If anything looks "almost right but off by a few pixels," the cause is almost always a missing `--theme-*` token or a global reset difference. Don't tweak the component values to compensate — fix the token / reset gap.

### Step 8 — leave breadcrumbs

In the target repo, drop a short note in the component's directory (only if the user is okay with new files) explaining:
- Which commit/path it came from in `nextjs-sass-starter`.
- Which globals (tokens, fonts, keyframes) it depends on.
- That values are intentional and should not be tweaked without coordinating with the source.

Do this as a comment block at the top of the component if the user doesn't want a separate file.

## Anti-patterns

- **Adding SASS to the target "because the source repo is called `nextjs-sass-starter`."** It isn't using SASS. Every file is vanilla `.module.css`. Don't introduce a preprocessor the source doesn't have.
- **Pasting only the TSX and re-styling with Tailwind/inline styles.** This loses the precision payload and defeats the point of the export. If that's what the user wants, do it explicitly and call it out.
- **"Inlining" CSS variables to literal values.** (`var(--theme-text)` → `#000`.) The whole theme system breaks. Keep the variables; copy the tokens that resolve them.
- **Renaming tokens** to fit the target's naming convention on the way in. Do that as a follow-up refactor, not during the transplant — otherwise you can't diff against the source if something looks off.
- **Skipping the `font-size: 12px` mobile override.** Modular type scale will silently render larger on mobile in the target than in the source.
- **Omitting `box-sizing: border-box`** because the target has "a reset already." Verify it actually sets border-box globally; many resets don't.
- **Adding a Props interface** on the way in when the source file has none. Keep the loose typing; the source file's `strict: false`-friendly shape is part of the surface area.
- **Adding tests** as part of the export. Out of scope unless the user asks.

## Quick reference: minimum globals payload

If the user wants the tightest possible export of one component, the minimum global payload is:

1. Reset (border-box + margin/padding zero).
2. The semantic theme tokens for *one* theme (the default), and the raw color tokens it references.
3. The type-scale variables the component uses (a Button needs `--type-scale-fixed-small`; a Lead needs `--type-scale-5`).
4. The font-family variables the component uses, plus the matching `@font-face` if it uses ServerMono.
5. The 16px / 12px responsive root font-size if the component uses any modular `--type-scale-1..7`.
6. `body className="theme-light"` on the document.

Everything beyond that (other themes, other type scales, animations, modals) is opt-in based on the manifest from Step 2.
