---
name: build-app-page
description: Construct a new app page from scratch using this repo's component system. Use when the user says "build a new page for X", "create a settings page", "add a dashboard for Y", "scaffold an app screen", or otherwise wants a Next.js page assembled from the project's elements/components/patterns. Produces a route under pages/, picks the right Page shell + chrome + layout, wires up modals if needed, and (if it's a gallery showcase) registers it in common/constants.ts.
---

# Build an app page

This skill walks an empty `.tsx` file to a working app page that uses this repo's three-tier system correctly. The end state: a page that boots in `npm run dev`, renders with the right chrome and layout, has the right SEO metadata, and follows the import-tier rules from `AGENTS.md`.

## When to use

- "Build a settings page for X"
- "Create a new dashboard for Y"
- "Add a documents page for Z"
- "Scaffold a new authenticated app screen"
- "Make a marketing landing page using our components"
- Any time the user wants a new route under `pages/` that uses the design system

## When NOT to use

- The user just wants to modify an existing page (use direct edits).
- The user wants a non-page React component (use the component conventions in `AGENTS.md` instead).
- The user wants App Router (`app/`) page work — this repo's routes live under Pages Router (`pages/`). Stop and ask before introducing App Router.

## Pre-flight: pin down what you're building

Before writing anything, ask yourself (or the user) four questions:

1. **What's the page's purpose?** Marketing/landing, authenticated app screen, document viewer, dashboard, form, or gallery showcase? Each has a canonical layout pattern below.
2. **Does it need a session/API key?** If yes, use `KeyHeader` and the `getServerSideProps` → `Server.setup(context)` pattern (see "Authenticated app pages" below). If no, plain `Navigation` + `getServerSideProps` returning `{ props: {} }` is enough.
3. **Does it open modals?** If yes, you must render `<GlobalModalManager />` and import `useModals` from `@runtime/modals/ModalContext`.
4. **Is it a gallery showcase?** If yes, you'll register it in `common/constants.ts` after writing.

## Pick the page shape

Match the page to one of these canonical shapes. Each is taken straight from a working file in `pages/examples/`.

### Shape A — Marketing / showcase page (Navigation + content + Footer)

Use when: landing pages, "show off this component" pages, content pages.

Reference: `pages/examples/components/application-site.tsx`.

```tsx
import * as React from 'react';

import Footer from '@components/Footer';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleMarketingPage(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ <something>"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/<slug>"
    >
      <Navigation />
      {/* page body — Demo*, sections, charts, etc. */}
      <Footer />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}

export default ExampleMarketingPage;
```

### Shape B — Form page (Navigation + GridLayout + ThinAppLayout)

Use when: a single-purpose form, settings pane, sign-up flow.

Reference: `pages/examples/components/forms.tsx`.

```tsx
import * as React from 'react';

import Button from '@components/Button';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import GridLayout from '@elements/layouts/GridLayout';
import Input from '@elements/controls/Input';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';
import ThinAppLayout from '@elements/layouts/ThinAppLayout';

import { FormHeading, FormParagraph, InputLabel } from '@elements/type/forms';

function ExampleFormPage(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ <area> ➝ <name>"
      description="..."
      url="https://wireframes.internet.dev/examples/<area>/<slug>"
    >
      <Navigation />
      <GridLayout>
        <ThinAppLayout style={{ background: `var(--theme-background)`, borderTop: `1px solid var(--theme-border)` }}>
          <FormHeading>...</FormHeading>
          <FormParagraph>...</FormParagraph>
          <InputLabel style={{ marginTop: 24 }}>Field</InputLabel>
          <Input style={{ marginTop: 8 }} />
          <Button style={{ marginTop: 48, width: '100%' }}>Submit</Button>
        </ThinAppLayout>
      </GridLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}

export default ExampleFormPage;
```

### Shape C — Dashboard (Navigation + DashboardWithSidebarLayout)

Use when: an app dashboard with a left sidebar of nav and a main canvas.

Reference: `pages/examples/components/dashboard.tsx`.

```tsx
import * as React from 'react';

import DashboardWithSidebarLayout from '@elements/layouts/DashboardWithSidebarLayout';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleDashboardPage(props) {
  const sidebarElement = <div>{/* nav items */}</div>;

  return (
    <Page title="..." description="..." url="...">
      <Navigation />
      <DashboardWithSidebarLayout sidebar={sidebarElement}>
        {/* main canvas */}
      </DashboardWithSidebarLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}

export default ExampleDashboardPage;
```

### Shape D — Authenticated app page (KeyHeader + ThinAppLayout, with session key)

Use when: the page needs the user's API key / session to function (settings, document editors, anything that talks to `@common/queries`).

Reference: `pages/examples/empty/application-template-page.tsx`.

```tsx
import * as React from 'react';
import * as Server from '@common/server';
import * as Utilities from '@common/utilities';

import Cookies from '@modules/cookies';
import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import KeyHeader from '@patterns/chrome/KeyHeader';
import Page from '@patterns/chrome/Page';
import ThinAppLayout from '@elements/layouts/ThinAppLayout';
import ThinAppLayoutHeader from '@elements/layouts/ThinAppLayoutHeader';

function ExampleAppPage(props) {
  const [key, setKey] = React.useState<string>(props.sessionKey);

  return (
    <Page title="..." description="..." url="...">
      <KeyHeader onInputChange={setKey} value={key} viewer={props.viewer} />
      <ThinAppLayout>
        <ThinAppLayoutHeader
          token={key}
          onSignOut={() => {
            const confirm = window.confirm('Are you sure you want to sign out?');
            if (!confirm) return;
            setKey('');
            Cookies.remove('sitekey');
            window.location.reload();
          }}
        />
        {/* page body */}
      </ThinAppLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);
  return { props: { sessionKey, viewer } };
}

export default ExampleAppPage;
```

### Shape E — Three-column document workspace (sidebar + details list + editor canvas)

Use when: an app where a sidebar drives a list, the list drives a detail view (e.g. statement-of-work editor, invoice editor).

Reference: `pages/examples/features/statement-of-work/index.tsx`.

```tsx
import KeyHeader from '@patterns/chrome/KeyHeader';
import ThreeColumnAppLayout from '@elements/layouts/ThreeColumnAppLayout';
// ...
<ThreeColumnAppLayout sidebar={sidebar} details={details}>
  {/* main editor */}
</ThreeColumnAppLayout>
```

## Step-by-step procedure

### Step 1 — pick the file path

Routes live under `pages/`. Match the existing groupings:
- `pages/examples/components/<slug>.tsx` — UI showcase (marketing, components, layouts)
- `pages/examples/empty/<slug>.tsx` — blank starter templates
- `pages/examples/features/<slug>.tsx` — feature demos with backend (auth, files, documents)
- `pages/examples/system/<slug>.tsx` — design-system reference (typography, colors)
- `pages/examples/animations/<slug>.tsx` — motion/animation demos
- `pages/examples/fonts/<slug>.tsx` — font specimens

For dynamic routes use `[id].tsx`. For new top-level areas, ask the user before creating.

### Step 2 — drop in the right shape

Copy the matching shape from above (A–E). Replace the placeholder title/description/url with real values. The `url` should be the absolute URL on `wireframes.internet.dev` matching the file path.

### Step 3 — apply the import-tier rules

From `AGENTS.md`:
- Import atoms from `@elements/<bucket>/Foo` (icons, type, controls, marks, layouts, sections, scroll, charts, visuals, motion, diagrams, shells)
- Import molecules from `@components/Foo` (Button, Checkbox, Select, Table, Footer, FormUpload, MonospacePreview, BlockFade, FadeManager, CheckmarkItem, FormChangePassword, FormSettingsPrivacy)
- Import patterns from `@patterns/<bucket>/Foo` (chrome, modals, demos)
- Import runtime from `@runtime/<bucket>/Foo` (modals, detectors, testing)
- Never use `../../` across top-level dirs. Use `./Foo` only for siblings in the same folder.
- Group imports: styles → React → utilities (`@common`, `@root`) → in-repo components (lowest tier first) → typography from `@elements/type`.

### Step 4 — choose layouts deliberately

Layouts live in `@elements/layouts/`:

| Layout | Width | Use for |
|---|---|---|
| `AppLayout` | 768px | Standard app body with side borders |
| `ThinAppLayout` | 512px | Forms, document editors, narrow flows |
| `WideAppLayout` | wider than 768 | Marketing canvas with breathing room |
| `GridLayout` | full width | Wireframe-grid background; usually wraps another layout |
| `Content` | constrained | Documentation/text content |
| `TwoColumnLayout` / `TwoColumnLayoutFull` / `TwoColumnLayoutSidebar` | full width | Asymmetric two-column splits |
| `ThreeColumnAppLayout` | full width | Sidebar + details + canvas (Shape E) |
| `DashboardWithSidebarLayout` | full width | Dashboards (Shape C) |
| `IsometricGridLayout` | full width | Decorative isometric grid |
| `CardHandLayout` | full width | Fanned-card display |
| `InvoiceLayout` | document-shaped | Invoice/SOW print layout |

All full-height layouts use `min-height: calc(100dvh - 48px)` (the 48 accounts for the Navigation row). If your page has no `<Navigation />`, override with `style={{ minHeight: '100dvh' }}` on the layout.

### Step 5 — sections (for vertical rhythm)

If your page has multiple stacked "screens" of content (landing-page hero, features, CTA, etc.), wrap each in:
- `@elements/sections/SectionFullHeight` — fills the viewport
- `@elements/sections/SectionHalfHeight` — half-viewport
- `@elements/sections/SectionHorizontalStack` — horizontal panels

### Step 6 — wire modals (only if needed)

If the page opens any modal (auth flow, error popup, color picker, navigation menu, etc.):

```tsx
import { useModals } from '@runtime/modals/ModalContext';
import ModalError from '@patterns/modals/ModalError';

const modals = useModals();
modals.open(ModalError, { message: '...' });
```

You **must** render `<GlobalModalManager />` somewhere in the page tree (typically just before `</Page>`). Without it, modals open in state but never render. Already included in shapes A–E above.

The modal context is provided globally by `<Providers>` in `pages/_app.tsx` — you don't wrap the page yourself.

### Step 7 — typography

- Marketing/large copy: `H1, H2, H3, H4, H5, Lead, SubLead, P` from `@elements/type` (modular `rem` scale, shrinks on mobile).
- Form labels and form copy: `FormHeading, FormSubHeading, FormParagraph, InputLabel` from `@elements/type/forms`.
- UI chrome (table cells, button labels, tooltips): `Title, Text, SubTitle, SubText, UnitLabel` from `@elements/type` (fixed `px` scale, doesn't shrink).

Don't use raw `<h1>`/`<p>` tags — they get the global reset (zero margin, no scale).

### Step 8 — spacing

Use inline `style={{ marginTop: 16 }}` for one-off spacing. Stick to multiples of 4 (`4, 8, 12, 16, 24, 32, 48, 64`). Don't add new CSS rules in the page file — pages are composition, not styling.

### Step 9 — `getServerSideProps`

Every page in this repo exports `getServerSideProps`, even when no data is fetched. The empty form is `{ props: {} }`. Match the convention.

For authenticated pages, use:
```tsx
export async function getServerSideProps(context) {
  const { sessionKey, viewer } = await Server.setup(context);
  return { props: { sessionKey, viewer } };
}
```

### Step 10 — register in `common/constants.ts` (if it's a gallery page)

If the page belongs in the example gallery on `/examples`, add an entry to the matching `TEMPLATE_EXAMPLES_*` array in `common/constants.ts`:

- `TEMPLATE_EXAMPLES_ANIMATIONS` — for `pages/examples/animations/*`
- `TEMPLATE_EXAMPLES_COMPONENTS` — for `pages/examples/components/*`
- `TEMPLATE_EXAMPLES_EMPTY` — for `pages/examples/empty/*`
- `TEMPLATE_EXAMPLES_FEATURES` — for `pages/examples/features/*`
- `TEMPLATE_EXAMPLES_SYSTEM` — for `pages/examples/system/*`

Entry shape:
```ts
{
  name: 'Components ➝ navigation, <thing>',
  href: '/examples/components/<slug>',
  label: '<short label>',
  // optional: isWIP: true, internal: true
}
```

The `name` uses ` ➝ ` (Unicode arrow) as a category separator — match existing entries exactly. `internal: true` hides it from public view; `isWIP: true` flags it as work-in-progress.

### Step 11 — verify

1. Boot `npm run dev`. The dev server runs on port 10000.
2. Open `http://localhost:10000/examples/<area>/<slug>`.
3. Check: page renders, theme switching works (click "Theme" in `Navigation`), no console errors, layout doesn't shift on hover/focus.
4. Run `npm run build` before declaring done — Next 16 with Turbopack typechecks the build, which catches missing imports and bad prop types that the dev server may tolerate.

## Anti-patterns

- **Don't import a page from another page.** Pages are leaves of the dependency tree. If you find yourself wanting to share UI across pages, factor it into `@patterns/<bucket>/Foo` instead.
- **Don't add new CSS rules in the page file.** Pages compose, components style. If a layout doesn't fit, choose a different layout — don't override its CSS via `style={{}}` beyond simple spacing/colors.
- **Don't skip `<GlobalModalManager />` "because this page doesn't open modals yet."** Including it is free and prevents a regression when a modal gets added later. Every shape above includes it.
- **Don't add a `<head>` block manually.** `<Page>` already wires `<Head>` with the right meta tags, OG/Twitter cards, and favicons. Pass title/description/url and you're done.
- **Don't introduce a new top-level alias.** Use `@elements`, `@components`, `@patterns`, `@runtime`, `@common`, `@modules`, `@root`, `@pages` — that's it.
- **Don't add a Props interface** unless the file you're matching has one. The codebase convention is loose props (`function Foo(props) { ... }`).
- **Don't introduce a UI library, Tailwind, or styled-components.** This is a vanilla-CSS repo. See `AGENTS.md` § "What NOT to do".
- **Don't write tests for the page.** This repo has no test runner; testing is visual via `npm run dev`.

## Quick reference: minimum viable page

If the user just wants the smallest possible working page, this is it (Shape A, no Footer):

```tsx
import * as React from 'react';

import GlobalModalManager from '@runtime/modals/GlobalModalManager';
import Navigation from '@patterns/chrome/Navigation';
import Page from '@patterns/chrome/Page';

function ExampleMyNewPage(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ <area> ➝ <name>"
      description="A lightweight website template to test our design system."
      url="https://wireframes.internet.dev/examples/<area>/<slug>"
    >
      <Navigation />
      {/* your content */}
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}

export default ExampleMyNewPage;
```

Then add the entry to `common/constants.ts` and verify in browser.
