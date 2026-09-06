# Development Guide

This document is for anyone maintaining or extending the codebase. For a visitor-facing project overview, see [README.md](README.md).

## 1. Architecture Overview

This is a static, hand-built HTML/CSS/JavaScript site — no framework (React/Vue/etc.), no package manager, no build step or bundler. Pages are plain `.html` files linking directly to plain `.css`/`.js` files; there is nothing to compile or transpile.

- **25 HTML pages**: `index.html` (homepage) + 24 under `pages/` — 11 top-level pages (About, Skills, Projects, Blog, Certificates, Education, Experience, Contact, CV, Privacy Policy, and a hidden audio-host utility page), 12 project detail pages under `pages/projects/`, and 1 published post under `pages/blog/`.
- **Shared main-site design system**: 23 of the 25 pages (everything except `pages/cv.html` and `pages/audio-host.html`) load the same `assets/css/main.css`, `assets/js/navigation.js`, `assets/js/theme-switcher.js`, and `assets/js/main.js`, giving them a common sidebar, nav, theming, and i18n behavior.
- **Isolated CV page**: `pages/cv.html` intentionally does not use the shared design system. It has its own stylesheet (`assets/css/cv-tailwind.css`) and its own script (`assets/js/cv.js`), because it has a real print/PDF requirement — the only `@media print` block in the codebase lives in `cv-tailwind.css`. Do not fold it into the shared CSS/JS system without deliberately carrying that print behavior over.

## 2. Repository Structure

| Path | Purpose |
|---|---|
| `index.html` | Homepage, root of the site |
| `pages/` | Top-level pages sharing the main design system (About, Skills, Projects, Blog, Certificates, Education, Experience, Contact, Privacy Policy) plus the isolated `cv.html` and hidden `audio-host.html` |
| `pages/projects/` | One detail page per project, linked from the cards in `pages/projects.html` |
| `pages/blog/` | Individual blog post pages, linked from cards in `pages/blog.html` |
| `assets/css/` | All stylesheets — see §4 |
| `assets/js/` | All scripts — see §5 |
| `assets/img/` | Images, organized into `certificates/`, `icons/`, `placeholders/`, `profile/`, `projects/`, `social/` subfolders |
| `assets/audio/` | Two MP3 files (`coding-chillstep.mp3`, `shuangmian.mp3`). These belong to the **disabled** music widget — see §5. They are not referenced by any currently-loaded page functionality. |
| `assets/files/` | `Pich-Chanthorn-CV.pdf` — the downloadable CV file |
| `.github/workflows/static.yml` | GitHub Actions workflow that deploys the site to GitHub Pages — see §13 |
| `.vscode/` | Editor config; sets Live Server to port `5501` (`settings.json`) |
| `CNAME` | Custom domain for GitHub Pages (`pichchanthorn.me`) |
| `robots.txt`, `sitemap.xml` | Crawler directives and the indexable URL list — see §8 |
| `README.md` | Visitor/user-facing overview (features, tech stack, setup) |
| `LICENSE` | Project license |

**Not application functionality:** `.claude/` is a Claude Code session artifact (a lock file), not a feature of the site. Do not document or treat it as part of the app.

**Active vs. retained-but-disabled:** every file listed above is live and referenced by at least one page, **except** `assets/js/music-widget.js`, its associated CSS, and the two files in `assets/audio/` — see §5 and §14 for details on why they remain in the repo.

## 3. Running Locally

No dependency installation is required — there is no `package.json` and nothing to `npm install`.

The documented and configured method is the **VS Code Live Server extension** on **port `5501`** (set in `.vscode/settings.json`). Open the folder in VS Code, right-click `index.html`, and choose "Open with Live Server."

Any other static HTTP server that serves the repo root also works, since every asset path is relative (e.g. `assets/...` from root, `../assets/...` from `pages/`, `../../assets/...` from `pages/projects/` and `pages/blog/`) — for example `npx serve` or `python -m http.server`.

Use an HTTP server rather than opening `index.html` directly via `file://` — several features depend on it: relative fetches from JS (e.g. i18n/theme scripts running per-page), `localStorage`-based state, and any `fetch`/CORS-sensitive behavior. Opening files directly can produce silently broken behavior that isn't obvious from the page just "looking right."

## 4. CSS Architecture

`assets/css/main.css` is a pure `@import` orchestrator (11 lines, no rules of its own) that pulls in the shared stylesheets in order:

| File | Role |
|---|---|
| `base.css` | Reset, design tokens (`--clr-*`, `--space-*`, `--radius-*`, `--text-*`, `--font-*`, `--motion-*` custom properties on `:root`), global typography, Google Fonts `@import` |
| `layout.css` | Sidebar, topbar, nav, mobile menu structure |
| `components.css` | Reusable components — buttons, cards, forms, badges, widgets |
| `pages.css` | Page-specific rules for every page in the shared system (largest file) |
| `responsive.css` | All media queries for the shared system |
| `theme-switcher.css` | Light-theme token overrides (`html[data-theme="light"]`), `prefers-color-scheme` fallback, and the theme switcher UI itself |

`assets/css/cv-tailwind.css` is a **separate, self-contained stylesheet** used only by `pages/cv.html`. Despite the filename, it is hand-written CSS, not compiled Tailwind output. It defines its own token set (`--cv-bg`, `--cv-ink`, `--cv-accent`, etc.) independent of `base.css`'s tokens, and contains the codebase's only `@media print` block. Do not merge it into the shared system without preserving that print behavior — this is stated explicitly in a comment at the top of the file.

Design tokens (colors, spacing, radii, shadows) are defined once in `base.css` and consumed throughout `components.css`/`pages.css`/`responsive.css`; `theme-switcher.css` overrides the same token names for the light theme rather than introducing a parallel set.

## 5. JavaScript Architecture

**Global scripts** (loaded on all 23 shared-design-system pages, in this order): `navigation.js` → `theme-switcher.js` → `main.js`.

- `navigation.js` — nav/mobile-menu behavior and the entire i18n engine (see §6).
- `theme-switcher.js` — light/dark/system theme toggling, persisted via `localStorage`.
- `main.js` — the single site-wide initialization point. It registers one `DOMContentLoaded` listener that calls into the other modules through an optional-chained `window.__*` namespace (e.g. `window.__navigation?.initializeMobileMenu(dom)`, `window.__contactForm?.initializeEmailJs(dom)`, `window.__education?.initializeEducationAnimations()`). This namespace pattern is how page-specific modules plug into the shared startup sequence without `main.js` needing to know whether they're present.

**Page-specific scripts** (loaded only on the page that needs them):
- `contact-form.js` — only on `pages/contact.html` (EmailJS integration).
- `education.js` — only on `pages/education.html` (timeline/animation logic).
- `cv.js` — only on `pages/cv.html`.

**Browser APIs in use**: `IntersectionObserver` (scroll-reveal and skill-bar fill animations), `localStorage` (theme, language, and disabled-widget state), `matchMedia` (`prefers-reduced-motion`, `prefers-color-scheme`).

**Disabled feature — music widget**: `assets/js/music-widget.js` (and its related CSS and the two files under `assets/audio/`) still exist in the repo, but **no HTML page currently references `music-widget.js`** — it is not loaded anywhere, so `window.__musicWidget` is never populated and the corresponding call in `main.js` is a no-op. Treat it as retained-but-inactive code, not a working feature. Do not describe it as live in any documentation or UI copy.

## 6. Internationalization (EN/KM)

The site supports English and Khmer entirely client-side, driven by `assets/js/navigation.js`.

- **Persistence**: current language is stored in `localStorage` under the key `portfolio_language`.
- **Explicit translation**: elements tagged with `data-i18n="key"` (and variants `data-i18n-html`, `data-i18n-aria-label`, `data-i18n-placeholder`, `data-i18n-title`) look up `key` in the `TRANSLATIONS` object, which has parallel `en` and `km` dictionaries. `data-i18n`, `data-i18n-html`, and `data-i18n-aria-label` are the variants currently used in HTML; `data-i18n-placeholder`/`data-i18n-title` are supported by the same lookup logic but not currently used anywhere.
- **Auto-binding**: elements matched by a fixed selector list (`main h1/h2/h3/p/li`, sidebar/footer/contact/stat text, etc.) that are *not* explicitly tagged get picked up automatically by `bindAutoTextNodes()`/`bindAutoAttributes()`. Each is auto-keyed from its normalized English text, and the Khmer string is looked up in `AUTO_PHRASE_KM` — a flat dictionary keyed by the exact literal English phrase.
- **Static English fallback**: every translatable element's literal HTML content is complete, real English text (not a placeholder) — the page is fully correct if JavaScript never runs.

**Adding a new translated string**:
1. For an element you're explicitly tagging: add `data-i18n="your.key"` to the HTML, then add `"your.key": "..."` to both `TRANSLATIONS.en` and `TRANSLATIONS.km` in `navigation.js`.
2. For text that should be picked up automatically (matches the existing auto-bind selectors): add an entry to `AUTO_PHRASE_KM` keyed by the *exact* normalized English string — mismatched whitespace/punctuation will miss the lookup.
3. If you add a new nav item, also add its label to the `navKeyMap` object inside `attachI18nAttributes()` — this is a separate manual step from the `TRANSLATIONS` dictionary and is easy to forget.

**Known limitation**: Khmer content is rendered entirely client-side, after JavaScript executes and reads the stored language preference. The raw HTML shipped by the server is always English — there is no static `/km/`-prefixed page structure and no `hreflang` markup. Search engines and no-JS clients only ever see English. This is an accepted architectural limitation, not a bug, but any documentation or SEO change should account for it. Do not propose migrating this to a framework-based i18n system — it is out of scope for this static site.

## 7. Accessibility Conventions

- **Skip link**: `<a class="skip-link" href="#mainContent">` is present as the first focusable element on all 23 shared-layout pages (correctly absent from `cv.html` and `audio-host.html`, which have no sidebar/nav to skip).
- **Main landmark**: `<main id="mainContent" tabindex="-1">` is the skip link's target on the same 23 pages.
- **Keyboard focus behavior**: activating the skip link must actually move keyboard focus to `<main>`, not just scroll to it. This is handled explicitly in `main.js`'s smooth-scroll handler: `if (link.classList.contains("skip-link")) { target.focus({ preventScroll: true }); }`. If you rework smooth-scroll or the skip link, preserve this explicit `.focus()` call — the generic same-page-anchor handler only scrolls by default and will silently break keyboard accessibility if this branch is removed.
- **Reduced motion**: `prefers-reduced-motion` is respected in `components.css`, `pages.css`, `theme-switcher.css`, and in `education.js`/`main.js` — new animations should check/respect it the same way.
- **Landmarks**: pages consistently use `<aside class="sidebar">`, `<nav class="nav" aria-label="Main navigation">`, `<main class="main">`, `<footer class="site-footer">`. Keep new pages consistent with this structure.
- **Alt text**: use descriptive, content-specific alt text (not filenames) — this is the existing convention throughout `assets/img`. Purely decorative images use `alt=""` with `aria-hidden="true"`.

## 8. SEO & Metadata

Every page follows the same `<head>` metadata pattern — copy it from a sibling page at the same directory depth when adding a new one:

- Unique `<title>`
- Unique `<meta name="description">`
- `<link rel="canonical" href="https://pichchanthorn.me/...">`
- Open Graph tags (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- JSON-LD (`application/ld+json`) — `Person` schema on most pages, `CreativeWork` on project detail pages
- Favicon: `<link rel="icon" type="image/png" href="...profile.png">` — must be `image/png`, not `image/x-icon`

**Adding an indexable page requires updating `sitemap.xml`** — add a `<url>` entry with the page's canonical URL. `sitemap.xml` currently lists 24 URLs, deliberately excluding the hidden `pages/audio-host.html` utility page. `robots.txt` allows all crawling and points to the sitemap.

**Khmer SEO limitation**: since Khmer content only exists after JavaScript runs (see §6), none of the above metadata or the sitemap has any Khmer-language equivalent — search engines only ever index the English content.

## 9. Third-Party Resources

| Resource | Where | Version | SRI |
|---|---|---|---|
| Lucide Icons | All 25 pages | `1.41.0` (unpkg) | Yes |
| EmailJS | `pages/contact.html` only | `3.2.0` | Yes |
| Devicon (Canva icon) | `pages/about.html` (`<img>` tags) | `2.17.0` | N/A — SRI doesn't apply to `<img>` |
| Google Fonts | `base.css` (`@import`, site-wide); separate `<link>` in `pages/cv.html` | — | N/A — not meaningfully pinnable/hashable |
| Google Analytics (gtag.js) | 24 of 25 pages (all but `audio-host.html`) | — | No — Google updates this script without notice; SRI would break it |
| SimpleIcons | `pages/about.html` tech-pill marquee (`<img>` tags) | — | N/A (`<img>`) |

**Verification rule for any versioned/pinned resource** (Lucide, EmailJS, Devicon): when bumping a version, fetch the exact resource bytes for that version yourself, compute the SRI hash (SHA-384 or SHA-256) from those actual downloaded bytes, and use that hash — never copy a hash quoted by a third party or guess one. Update the reference consistently across every file that loads it (Lucide's `<script>` tag appears on all 25 pages and must stay identical across all of them).

Do not add SRI to Google Fonts or Google Analytics — both are deliberately excluded because their served content is per-request negotiated or unversioned, and SRI would break them.

## 10. Common Development Tasks

### Add a new page
1. Create the `.html` file at the correct depth (root, `pages/`, `pages/projects/`, or `pages/blog/`) — this determines the relative path prefix for every asset reference (`assets/...`, `../assets/...`, or `../../assets/...`).
2. Copy the `<head>` boilerplate from a sibling page at the same depth (title, description, canonical, OG, Twitter, JSON-LD, favicon — see §8).
3. Copy the sidebar/nav markup from a sibling page, keeping relative paths correct for the new page's depth.
4. Add the standard script block (`navigation.js`, `theme-switcher.js`, `main.js`) plus any page-specific script the new page needs.
5. Add a `<url>` entry to `sitemap.xml` if the page should be indexed.

### Add a navigation item
There is no shared nav template or include system — the `<nav class="nav">` block is duplicated in every page's HTML. Adding a nav item means manually editing that block in **every** page that shares the main layout (23 files). Also add the item's label to `navKeyMap` in `navigation.js` and to `TRANSLATIONS.en`/`TRANSLATIONS.km` if it needs a Khmer translation (see §6).

### Add a project
1. Create a new detail page under `pages/projects/`.
2. Add a matching `<article class="project-card">` to the grid in `pages/projects.html`, including a `data-category` attribute for the filter system.
3. Set source/demo links only if they are real and currently live — verify any demo URL actually resolves before linking it (a previously-linked demo went dead and had to be removed after being caught by manual review, not automation).
4. Add project images under `assets/img/projects/` and reference them with correct relative paths.
5. Keep all claims about the project (tech stack, live status, outcomes) accurate to what was actually built and deployed.

### Add a blog post
1. Create the new post file under `pages/blog/`.
2. Add a corresponding card to the grid in `pages/blog.html`.
3. Give the new post page the standard metadata block (§8).
4. Add it to `sitemap.xml`.

### Add localized content
- Explicitly tagged text: add `data-i18n="key"` to the element, then add the key to both `TRANSLATIONS.en` and `TRANSLATIONS.km` in `navigation.js`.
- Text matched by the existing auto-bind selectors: add an entry to `AUTO_PHRASE_KM` keyed by the exact English phrase — no `data-i18n` attribute needed.
- See §6 for full detail on when each approach applies.

### Add page-specific JavaScript/CSS
Follow the existing scoping convention: only include the `<script>`/`<link>` tag on the pages that actually need it (as `contact-form.js` and `education.js` already do), rather than adding it to the globally-loaded set or to `main.css`'s `@import` list. Keep page-specific logic out of the global `window.__*` namespace unless another module genuinely needs to call into it from `main.js`.

## 11. Testing & QA

**Automated tests**: none currently exist in this repository, and there is no automated test gate in CI — `.github/workflows/static.yml` deploys directly with no test/lint/build step.

**Manual QA** — recommended checks to run before considering a change complete (not automated, must be done by hand or with ad hoc tooling):
- Page loads without errors.
- No new browser console errors.
- No broken images or other 404'd resources.
- Behavior on both desktop and mobile viewport widths.
- EN/KM toggle behavior, where the change touches any translated text.
- Keyboard focus behavior, where the change touches navigation or interactive elements.
- Theme switching (light/dark/system), where the change touches styling.

These are recommended practices based on how changes have been verified in this repository's history — they are not enforced by any existing script or CI job.

## 12. Git Conventions

- `main` is the stable branch that GitHub Pages deploys from.
- Developer work should be reviewed before it becomes part of stable `main`.
- Commit messages follow Conventional Commits style: `feat:`, `fix:`, `content:`, `docs:`, `refactor:`, `perf:`, `chore:`, `style:`, `ci:` prefixes are all in active use in this repository's history.

This repository's history also contains a number of merged pull requests from `feature/*` branches, but PR-based branching is not a documented or required workflow for every change — treat the Conventional Commits message style as the binding convention, not any particular branch structure.

## 13. Deployment

- Hosted on **GitHub Pages**, deployed by the workflow at `.github/workflows/static.yml`.
- Triggers on every push to `main`, and can also be run manually via `workflow_dispatch`.
- The workflow uploads the entire repository root as the Pages artifact (`path: '.'`) — there is no build/filter step, so anything committed to the repo (including non-site files) is technically publicly fetchable at its repo-relative path on the live domain. Keep this in mind before committing anything that shouldn't be public.
- Custom domain is set via the root `CNAME` file (`pichchanthorn.me`), matching every canonical URL, OG URL, and `sitemap.xml` entry.
- `sitemap.xml` and `robots.txt` both reference the production domain directly — if the domain ever changes, update `CNAME`, `sitemap.xml`, and every canonical/OG URL together.

## 14. Known Architectural Limitations

- **Khmer localization is client-side only** — no static Khmer HTML, no `hreflang`, no SEO reach for Khmer-language queries (§6, §8).
- **Music widget is disabled but retained** — `assets/js/music-widget.js`, its CSS, and `assets/audio/*` remain in the repo with zero active HTML references (§5).
- **CV page is architecturally isolated** from the shared design system, nav, and i18n, by design, for print/PDF correctness (§1, §4).
- **i18n coverage is uneven** — not every page/section has Khmer translations; some project detail pages and subtitles currently fall back to English-only.
- **No automated tests or CI test gate** — all verification is manual (§11).
- **The GitHub Pages deploy artifact is the whole repo root**, not a filtered build output (§13).
