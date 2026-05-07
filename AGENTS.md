# AGENTS.md

Operating manual for AI agents working in `nextjs-css-agent-components`. Read this end-to-end before editing.

## What this repo is

A Next.js 16 + React 19 + vanilla-CSS starter from Internet Development Studio. It powers `wireframes.internet.dev` and acts as the studio's design-system reference. Everything is intentionally vanilla — no Tailwind, no SASS, no PostCSS plugins, no CSS-in-JS, no UI library, no test runner, no state manager. Styles are CSS Modules using **native CSS nesting** (the `&` selector is plain CSS, compiled by Next.js's built-in Lightning CSS — no preprocessor required). The look is a precise, monospace-leaning, low-chrome wireframe aesthetic, and the precision is the product. Pixel values, type tokens, and theme variables are deliberate and should not be paraphrased away.

> The package was previously named `nextjs-sass-starter`. SASS has never been a dependency in the current codebase — all styling is vanilla CSS. The package is now `nextjs-css-agent-components`.

## Run / build

- `npm install`
- `npm run dev` — Next dev server on port `10000`
- `npm run build` — production build (TypeScript build errors are NOT ignored; see `next.config.ts`)
- `npm run start` — production server on port `10000`
- `npm run format` — Prettier write across `**/*.{tsx,ts,js,css,json,md}`
- `npm run format:check` — Prettier check (reports unformatted files without writing)

There is no test runner and no linter configured. The only build-time gate is `next build` (which typechecks). Don't add a test runner or ESLint config without being asked.

## Top-level layout

```
app/                    Minimal app-router scaffolding (head, layout, manifest, robots, sitemap)
pages/                  Pages router — this is where routes live (pages/_app.tsx, pages/examples/**)
pages/api/              API routes (currently `index.ts`, `aes.ts`)
pages/examples/         Live demo gallery for every component (animations, components, empty, features, fonts, system)
components/             App-level shell (DefaultLayout, Page, Providers, DefaultMetaTags, logos)
elements/               TIER 1 — atoms. Files import zero other in-repo components.
elements/icons/         Inline SVG icons (currentColor, props-spread). Includes social/.
elements/type/          Typography (H1..H5, Lead, P, Title, Text, SubText, …) + form typography
elements/controls/      Input, TextArea, Loader (form controls with no deps)
elements/marks/         Tag, ActionItem, SmallButton, SignatureBox (small inline document UI)
elements/layouts/       Page/region layout shells (Thin, Wide, Grid, TwoColumn*, Dashboard*, …)
elements/sections/      Full-height / half-height / horizontal section wrappers
elements/scroll/        Scroll-driven containers
elements/charts/        D3 chart components
elements/visuals/       FlippableTiltCard, Isometric*, ImageBlock, Video, ToolbarControlsFixed, …
elements/motion/        TextSwapper (React-driven motion)
elements/diagrams/      ArrowLine and friends
elements/shells/        DefaultLayout, DefaultMetaTags, AnyTextHeader, ListItem, the two logos
components/             TIER 2 — molecules. Compose tier-1 atoms. Flat, 12 components.
                        (Button, Checkbox, Select, Table, Footer, FormUpload, MonospacePreview,
                         BlockFade, FadeManager, CheckmarkItem, FormChangePassword, FormSettingsPrivacy)
patterns/               TIER 3 — organisms. Page-level units composed from atoms + molecules.
patterns/chrome/        Navigation, KeyHeader, HamburgerMenuButton, Page, Providers
patterns/modals/        All concrete modal components (ModalAuthentication, ModalNavigationV2, …)
patterns/demos/         All Demo*.tsx — gallery showcases used by pages/examples/
runtime/                Non-component infrastructure. Not in the tier system.
runtime/modals/         ModalContext + GlobalModalManager (provider + renderer)
runtime/detectors/      OutsideElementEvent listener
runtime/testing/        GridTestOverlay (dev-only visual grid)
common/                 utilities.ts, hooks.ts, constants.ts, queries.ts, server.ts (shared client/server helpers)
modules/                Lower-level modules (aes, cookies, cors, vary, object-assign)
public/                 Static assets (favicons, app icon, skills/)
global.css              Reset, @font-face for ServerMono, all CSS custom properties (colors, themes, type, fonts)
animations.css          Global @keyframes (blur, fade, slideUp/Down/Left/Right)
```

## Three-tier component hierarchy — read before adding/moving anything

The component model is **Elements → Components → Patterns** (the standard design-system vocabulary used by Polaris, Material, Carbon, Atlassian). Tier is determined by _deepest dependency_, not by where a component "feels like" it belongs.

| Tier | Folder        | Rule                                                                                   | Example                                                                                                  |
| ---- | ------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1    | `elements/`   | Imports **zero** other in-repo components. Pure markup + CSS Module + maybe a utility. | `Input`, `SmallButton`, `AppLayout`, `LineChart`, `Caret`                                                |
| 2    | `components/` | Imports only Tier-1 atoms. Reusable building block.                                    | `Button` (uses `Loader`), `Checkbox` (uses `icons/Checkmark`), `Footer` (uses `Button`, `Input`, `type`) |
| 3    | `patterns/`   | Imports Tier-1 and/or Tier-2. Page-level unit, often rendered once per page.           | `Navigation`, `Page`, `ModalAuthentication`, `DemoApplicationSite`                                       |
| —    | `runtime/`    | Non-visual infrastructure (providers, detectors, dev tools). Outside the tier system.  | `ModalContext`, `OutsideElementEvent`, `GridTestOverlay`                                                 |

**Implications:**

- A Tier-1 file may **never** import from `@components/`, `@patterns/`, or another Tier-1 component file. It may import from `@common/`, `@modules/`, `@runtime/`, and pure utilities/hooks. (Importing from `@runtime/` is allowed but rare.)
- A Tier-2 file may import from `@elements/`, `@common/`, `@modules/`, `@runtime/`. Not from `@components/` siblings or `@patterns/`.
- A Tier-3 file may import from `@elements/`, `@components/`, `@patterns/` siblings, `@common/`, `@modules/`, `@runtime/`.
- If you find yourself wanting a Tier-1 file to import a Tier-2 (or higher), the file is misplaced — promote it to the right tier.

## Path aliases (tsconfig.json)

Always import via these — never relative `../../` across top-level dirs. **The alias declares the dependency tier**, so a stray `@elements/Foo` import inside a Tier-1 file is an immediate code-review red flag.

```
@root/*       ./*
@elements/*   ./elements/*
@components/* ./components/*
@patterns/*   ./patterns/*
@runtime/*    ./runtime/*
@common/*     ./common/*
@modules/*    ./modules/*
@pages/*      ./pages/*
```

Use `./Foo` and `./Foo.module.css` for siblings inside the same folder (CSS Modules colocated with their TSX). Cross-folder always goes through an alias.

## Routing model

- The active router is the **Pages Router** (`pages/_app.tsx`, `pages/_document.tsx`, `pages/examples/**`). New routes go under `pages/`.
- `app/` exists for metadata/manifest/sitemap/robots only. Don't migrate routes into it unless explicitly asked.
- `pages/_app.tsx` imports `global.css` and `animations.css` and wraps everything in `<Providers>` (which wraps `<ModalProvider>`).
- `pages/_document.tsx` ships with `<body className="theme-light">` — the theme is set on `body`.
- Most example pages export `getServerSideProps` even when no data is fetched. Match this convention.

## The `<Page>` shell

`patterns/chrome/Page.tsx` renders the document `<Head>`, OG/Twitter metadata, favicons, the tracking pixel, and a fixed "View source" prompt that links back to GitHub. Every example page starts with:

```tsx
<Page title="..." description="..." url="https://wireframes.internet.dev/...">
  <Navigation />
  <SomeLayout> ... </SomeLayout>
  <GlobalModalManager />
</Page>
```

`isNotOpenSourceExample` hides the "View source" prompt. Pages must include `<GlobalModalManager />` themselves if they want modals to render — `Providers` only supplies the context.

## Theming — read this carefully

Themes are CSS custom properties scoped to `body.theme-*` selectors in `global.css`. The five themes are:

- `theme-light` (default, set in `_document.tsx`)
- `theme-dark`
- `theme-daybreak` (orange/black)
- `theme-blue`
- `theme-neon-green`

Switching is done by toggling the body class — see `Utilities.onHandleThemeChange()` in `common/utilities.ts`. The Navigation component wires it to a "Theme" link.

**Two layers of variables:**

1. **Raw color palette** under `html, body { ... }` — `--color-black-100`, `--color-gray-90`, `--color-blue-60`, `--color-daybreak-70`, `--color-neon-green-80`, etc., with opacity variants suffixed `-1`, `-2`, `-3`, `-4` (= 0.1, 0.2, 0.3, 0.4 alpha) and `-5` (= 0.5).
2. **Semantic theme tokens** redefined inside each `body.theme-*` block — `--theme-background`, `--theme-background-overlay`, `--theme-background-box-{top,front,side}`, `--theme-foreground`, `--theme-foreground-secondary`, `--theme-text`, `--theme-border`, `--theme-border-box`, `--theme-border-subdued`, `--theme-button`, `--theme-button-text`, `--theme-primary`, `--theme-input-active`, `--theme-success`, `--theme-success-subdued`, `--theme-error`, `--theme-error-subdued`, `--theme-box-shadow-modal`, `--theme-box-shadow-button`, `--theme-box-shadow-button-hover`, plus graph tokens (`--theme-graph-positive`, `--theme-graph-negative`, etc.).

**Rule:** components reference semantic tokens (`var(--theme-text)`, `var(--theme-border)`), never raw colors directly. Raw colors only get used inside the theme-token redefinitions in `global.css`. If you need a new semantic token, add it to **all five** theme blocks.

## Typography scale

Defined as CSS variables in `global.css`:

```
--type-scale-1: 3.815rem
--type-scale-2: 3.052rem
--type-scale-3: 2.441rem
--type-scale-4: 1.953rem
--type-scale-5: 1.563rem
--type-scale-6: 1.25rem
--type-scale-7: 1rem

--type-scale-fixed-large:  20px
--type-scale-fixed-medium: 16px
--type-scale-fixed-small:  14px
--type-scale-fixed-tiny:   12px
--type-scale-fixed-label:  10px
```

Modular (`--type-scale-1..7`, in `rem`) for body/marketing typography that should respond to the root font-size shift at `max-width: 768px` (`16px` → `12px`). Fixed (`--type-scale-fixed-*`, in `px`) for UI chrome that must stay constant across breakpoints (buttons, inputs, labels, table cells).

`html, body` set `font-size: 16px` (12px under 768px), `font-variant-numeric: tabular-nums`, and `font-family: var(--font-family)` (Apple system stack). The custom font is **ServerMono** (`var(--font-family-mono)`), loaded via `@font-face` from `intdev-global.s3.us-west-2.amazonaws.com`. Serif fallback is `var(--font-family-serif)`.

Typography components live in `elements/type/`:

- `index.tsx` exports `H1, H2, H3, H4, H5, Lead, SubLead, Title, P, Text, SubTitle, SubText, UnitLabel`. Import as `@elements/type`. Sizes map directly to the scale variables (`H1` = `--type-scale-1`, `Lead` = `--type-scale-5`, `Title` = `--type-scale-fixed-large`, etc. — see `Typography.module.css` for the full mapping).
- `forms.tsx` exports `FormHeading, FormSubHeading, FormParagraph, InputLabel`. Import as `@elements/type/forms`. Use these inside forms instead of raw H tags.

## Component conventions

Read several files in the relevant tier before adding one. The patterns are:

1. **One TSX + one `.module.css` per component**, colocated, same name. Example: `components/Button.tsx` ↔ `components/Button.module.css`.
2. **Imports go at the top in this order**, separated by blank lines: styles import first, then `import * as React from 'react'`, then `@common`/`@root` utilities, then in-repo components grouped by tier (atoms → molecules → patterns), then typography. See `components/Footer.tsx` and `pages/examples/components/forms.tsx` for canonical examples.
3. **Default-export functional components**, untyped or loosely-typed props. The codebase mostly uses `function Foo(props) { ... }` with no Props interface. `tsconfig.json` has `strict: false` (but `strictNullChecks: true`). Don't add full Prop typings unless the surrounding file has them — match the file you are in.
4. **Style classes read from the CSS module**: `import styles from './Foo.module.css'` (sibling), then `<div className={styles.root}>`. The conventional outer class is `.root`. Variants are sibling classes (`.visual`, `.loader`, `.left`, `.right`, `.stretch`, `.item`, `.column`, `.subColumn`, `.subTitle`, `.subItem`).
5. **Spread `{...props}` onto the underlying element** when the component is a thin wrapper (typography, `Input`). Pass `style`, `onClick`, `disabled`, `href` through explicitly when the component branches on them (`Button`, `SmallButton`).
6. **Anchors vs buttons**: components like `Button`, `SmallButton`, `P`, `Text`, `SubText` switch to `<a>` when `props.href` is present. Replicate this pattern.
7. **Inline `style` prop is the spacing escape hatch.** `marginTop: 16/24/48`, `width: '100%'` etc. are passed inline rather than added as new CSS rules. See `pages/examples/components/forms.tsx`. Prefer this over creating one-off classes.
8. **No emojis in code or comments** unless the user asks. (The example constants file uses `➝` arrows — that's content, not commentary.)
9. **`classNames(...)` helper** lives in `common/utilities.ts`. Use it instead of pulling in `clsx`/`classnames`.

## CSS conventions

- **Vanilla CSS only — no preprocessor.** SASS is intentionally not a dependency. Use **native CSS nesting** (the `&` selector) for hover/focus/visited/media-nested rules; Next.js compiles it via Lightning CSS without any plugins. SCSS-only syntax (`$vars`, `@import`, `@mixin`, `@include`, `@extend`, `//` comments, `#{}` interpolation) must not be reintroduced. Use `var(--token)` for variables and `/* ... */` for comments.
- **Modules only** for component styles (`.module.css`). Globals live in `global.css` and `animations.css`.
- **`box-sizing: border-box` everywhere.** The reset block in `global.css` already sets it on every element.
- **Spacing grid is multiples of 4.** Common values: `4, 8, 12, 16, 24, 32, 48, 64`. Don't introduce odd numbers without reason.
- **Border radii** are typically `4px` (chips, inputs, small buttons, modal frames) or `8px` (buttons). Match the surrounding component.
- **Borders** are 1px and use `var(--theme-border)` or `var(--theme-border-subdued)`. Some components use `box-shadow: 0 0 0 1px var(--theme-border)` instead of `border: 1px solid` so the border doesn't change layout — both are in use; match the file you are editing.
- **Transitions**: `transition: 200ms ease all`. This shows up on Button, Navigation items, Input focus, Footer items, etc. Use this exact value unless you have a reason.
- **Breakpoints**: the only breakpoint in active use is `@media (max-width: 768px)`. Some Navigation also uses `max-width: 960px`. Don't invent new breakpoints.
- **Layouts use `100dvh`**: full-height shells use `min-height: calc(100dvh - 48px)` (the 48 accounts for the Navigation row). See `elements/layouts/AppLayout.module.css`, `ThinAppLayout.module.css`, `GridLayout.module.css`.
- **`AppLayout`** is `max-width: 768px`, `padding: 64px 24px`, side borders that disappear under 768px.
- **`ThinAppLayout`** is the same shape with `max-width: 512px`. The "thin" form factor is the canonical form layout.
- **Buttons**: `min-height: 48px`, `padding: 4px 24px`, `border-radius: 8px`, `font-size: var(--type-scale-fixed-small)`, `font-weight: 600`, `letter-spacing: 0.2px`, `transition: 200ms ease all`. See `components/Button.module.css`.
- **Inputs**: `height: 48px`, `padding: 0 16px`, `border-radius: 4px`, `font-size: var(--type-scale-fixed-medium)`, `box-shadow: 0 0 0 1px var(--theme-border)`, focus adds an extra `0 0 0 4px var(--theme-input-active)` ring. See `elements/controls/Input.module.css`.
- **Small buttons**: `font-size: var(--type-scale-fixed-label)` (10px), `padding: 4px 8px 2px 8px`, uppercase, `border-radius: 4px`, `border: 1px solid var(--theme-border)`. See `elements/marks/SmallButton.module.css`.
- **Navigation**: 48px row, `box-shadow: 0 1px 0 0 var(--theme-border)` underline, left/right cells `min-width: 240px`, items uppercase with `letter-spacing: 0.2px`, `font-weight: 600`, `font-size: var(--type-scale-fixed-tiny)`.

## Animations

Two systems coexist:

1. **Global keyframes** in `animations.css`: `blur, fade, slideDown, slideUp, slideRight, slideLeft`. All five share the 0%/25%/75%/100% timing — they enter, hold, exit. Reference them by name from any module CSS: `animation: fade 4s linear infinite;`.
2. **React-driven motion**: `TextSwapper` (rotating phrases) lives at `@elements/motion/TextSwapper` (Tier 1, no deps). `BlockFade` (cross-fade between children keyed by index) and `FadeManager` (timed cycle) live at `@components/BlockFade` and `@components/FadeManager` (Tier 2). Use these when you need orchestration; use the keyframes when CSS suffices.

## Modal system

The plumbing lives in `runtime/modals/` (provider + renderer). The concrete modal _components_ live in `patterns/modals/`. Mutually exclusive — opening a new modal closes the previous one. Pattern:

```tsx
import { useModals } from '@runtime/modals/ModalContext';
import ModalThing from '@patterns/modals/ModalThing';

const modals = useModals();
modals.open(ModalThing, { parentId: 'trigger-button-id' });
```

A modal component receives `{ isClosing, onClose, ...props }` and may forward a ref exposing `getUnmountDelayMS()` for timed exits. Put concrete modals under `patterns/modals/`. Pages that use modals must render `<GlobalModalManager />` (from `@runtime/modals/GlobalModalManager`) once, typically at the bottom of `<Page>`.

## SVG icons

Inline functional components in `elements/icons/` (with `social/` for brand marks). Each takes `props` and spreads them onto the `<svg>`. Fills use `currentColor` so they pick up `color` from the parent. Sizing is done via `style={{ width, height }}` from the call site. Don't import SVG files as assets — add a new component instead.

## Common utilities (`common/utilities.ts`)

Inventory: `noop`, `pluralize`, `getOrdinalNumber`, `getDomainFromEmailWithoutAnySubdomain`, `onHandleThemeChange`, `formatDollars`, `calculatePositionWithGutter` / `calculatePositionWithGutterById`, `leftPad`, `toDateISOString`, `elide`, `bytesToSize`, `isEmpty`, `createSlug`, `isUrl`, `debounce`, `timeAgo`, `classNames`, `generateNonce`, `filterUndefined`. Prefer these over npm equivalents.

`common/hooks.ts` exposes `useDebouncedCallback(ms, fn, deps)`. `common/constants.ts` holds `API` (defaults to `https://api.internet.dev/api`), the `TEMPLATE_EXAMPLES_*` arrays that drive the gallery, and tier/payment constants.

## When you add a new component

1. **Determine the tier first**, then the sub-bucket:
   - Tier 1 (`elements/`) if it imports zero in-repo components → pick the right sub-bucket: `icons/` (SVG icon), `type/` (text), `controls/` (form input/loader), `marks/` (small inline UI), `layouts/` (page shell), `sections/` (full/half-height region), `scroll/`, `charts/` (D3), `visuals/` (decorative), `motion/`, `diagrams/`, `shells/` (app-level wrapper).
   - Tier 2 (`components/`) if it composes one or more atoms — sits flat at `components/Foo.tsx`.
   - Tier 3 (`patterns/`) if it composes molecules and is page-level — pick `chrome/` (site UI like nav/header), `modals/` (concrete modal component), or `demos/` (gallery showcase prefixed `Demo*`).
   - `runtime/` only if it's non-visual infrastructure (provider, detector, dev tool).
2. Create `Foo.tsx` and `Foo.module.css` colocated.
3. Reference only semantic theme tokens (`var(--theme-*)`) and the type-scale variables. No hard-coded hex colors, no hard-coded `rem`/`px` sizes that should be tokens.
4. Use the spacing grid (multiples of 4), `200ms ease all`, the `768px` breakpoint, and the existing radius/border conventions.
5. If it's a route-worthy demo, add a `pages/examples/components/<slug>.tsx` page using `<Page>` + `<Navigation>` + a layout shell + `<GlobalModalManager />`, then register the entry in the appropriate `TEMPLATE_EXAMPLES_*` array in `common/constants.ts`.
6. Don't write new tests — there is no harness. Don't add documentation files unless asked.

## What NOT to do

- Don't introduce Tailwind, styled-components, Emotion, CSS-in-JS, or any UI library.
- Don't reintroduce SASS / SCSS or any other CSS preprocessor. Vanilla CSS with native nesting is the standard.
- Don't replace the Pages Router with the App Router.
- Don't bypass the theme tokens by hard-coding colors. Don't redefine the type scale locally.
- Don't add ESLint/Prettier overrides — the existing `.prettierrc` (`printWidth: 9999`, single quotes, 2-space, semicolons) is intentional. Long lines are expected.
- Don't add JSX prop type interfaces to files that don't already have them.
- Don't bump dependencies as part of an unrelated task.
- Don't add unit tests, story files, or doc files unless the user asks.
- Don't create new top-level directories. The four component buckets are `elements/`, `components/`, `patterns/`, `runtime/` — that's it.
- Don't import across tiers in the wrong direction. A Tier-1 file importing from `@components/` or `@patterns/` is a misplacement, not a feature.

## Skills

Reusable how-tos for this repo live under `public/skills/<slug>/SKILL.md`. Each skill is a self-contained markdown file with a YAML frontmatter (name, description) followed by the procedure. When a task matches a skill's purpose, follow that skill verbatim before improvising.
