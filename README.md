# NEXTJS-CSS-AGENT-COMPONENTS

**[Live Demo](https://wireframes.internet.dev)**

A Next.js + TypeScript + vanilla-CSS component library from the [Internet Development Studio Company](https://internet.dev). It's a precise wireframe system — every pixel, token, and transition is deliberate — and it's built to be a comfortable place for AI coding agents to work alongside you. See [`AGENTS.md`](./AGENTS.md) for the operating manual.

Why use this?

- **Readable everything** → No SASS, no Tailwind, no CSS-in-JS. Just CSS Modules with native nesting and a small set of theme tokens.
- **Three-tier architecture** → `elements/` (atoms) → `components/` (molecules) → `patterns/` (organisms), with `runtime/` for non-visual infrastructure. Path aliases declare the tier on every import.
- **Five themes out of the box** → `light`, `dark`, `daybreak`, `blue`, `neon-green`, all driven by CSS custom properties on `body`.
- **Agent-friendly** → [`AGENTS.md`](./AGENTS.md) documents the conventions; [`public/skills/`](./public/skills/) holds reusable how-tos (porting components to other repos, building new app pages from scratch).
- **Learning friendly** → A great starting point for web dev, especially alongside [@wwwjim](https://x.com/wwwjim).

### Working with an AI agent

The repo is structured so an agent can take a one-line prompt and land a working page on the first pass. Two skills live under [`public/skills/`](./public/skills/):

- [`build-app-page`](./public/skills/build-app-page/SKILL.md) — scaffold a new route under `pages/` using the right `Page` shell, layout, chrome, and modal wiring.
- [`export-component-to-other-repo`](./public/skills/export-component-to-other-repo/SKILL.md) — lift a component into a different codebase without losing the design-system precision (theme tokens, type scale, transitions, breakpoints).

For example, the prompt _"Take a few of these components and make a stock trading application example for me"_ runs through `build-app-page` like this:

1. **Pre-flight** — the skill asks four questions: purpose (authenticated app screen), session (yes, `KeyHeader` + `Server.setup`), modals (yes, confirm-trade), gallery (yes, register in `common/constants.ts`).
2. **Pick a shape** — Shape E (`ThreeColumnAppLayout`: watchlist sidebar | ticker detail | chart canvas), modeled on the existing `pages/examples/features/statement-of-work/index.tsx`.
3. **Pull components by tier** — atoms (`LineChart` / `CandlestickChart` from `@elements/charts/`, `Input` from `@elements/controls/`, `Tag` from `@elements/marks/`), molecules (`Button`, `Table`, `Select` from `@components/`), patterns (`KeyHeader`, `Page`, `Navigation` from `@patterns/chrome/`, `ModalError` from `@patterns/modals/`).
4. **Wire it up** — `<Page>` for chrome and metadata, `<GlobalModalManager />` for modals, `getServerSideProps` for the session, typography from `@elements/type` and `@elements/type/forms`, spacing on the multiples-of-4 grid.
5. **Register** — add an entry to `TEMPLATE_EXAMPLES_FEATURES` in `common/constants.ts` so it shows up in the gallery.
6. **Verify** — `npm run dev` on port 10000, then `npm run build` to typecheck.

That's the full loop. Both skills are plain markdown — read them top-to-bottom to see exactly what an agent will do before it writes any code.

### Setup

```sh
npm install
npm run dev
```

Open `http://localhost:10000`. We use port `10000` for compatibility with [Render.com](https://render.com).

### Formatting

We use [Prettier](https://prettier.io) with the config in [`.prettierrc`](./.prettierrc) (single quotes, 2-space, trailing commas, `printWidth: 9999` — long lines are intentional).

```sh
npm run format         # format all files in place
npm run format:check   # report unformatted files without writing
```

### Contact

Ping [@wwwjim](https://www.twitter.com/wwwjim) or [@internetxstudio](https://x.com/internetxstudio).
