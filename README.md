# CUS Solution — Website & AI Assistant

Rebuilt marketing site for [CUS Solution](https://cussolution.com/), a US-based technology
consulting and staffing company, with an integrated AI career assistant. Built as a fast,
responsive static site (HTML + Tailwind CSS) so it hosts free on GitHub Pages and can be
iterated on daily.

## Live site
Once GitHub Pages is enabled, the site publishes at:
`https://snehithreyya.github.io/CUS_AI_Website/`

## Structure
```
index.html          Home page (hero, about, services, industries, why-CUS, FAQ, contact)
css/styles.css      Design system — brand tokens, cards, buttons, chat widget
css/fonts.css       @font-face rules for the self-hosted Inter + Sora fonts
fonts/              Variable woff2 files (latin + latin-ext) and their OFL licenses
css/tailwind.css    Precompiled, minified Tailwind utilities (generated — do not edit by hand)
src/tailwind.css    Tailwind entry point; tailwind.config.js holds the brand theme
js/main.js          Nav, scroll reveal, and the AI assistant (RAG-ready client stub)
.github/workflows/  deploy.yml publishes to Pages on push; lighthouse.yml runs the quality gate
lighthouserc.json   Lighthouse CI pages, score thresholds and page-weight budgets (desktop)
lighthouserc.mobile.json  Same gate with Lighthouse's mobile emulation + throttling
PROGRESS.md         Running log of daily incremental work
```

## AI assistant
The chat widget (bottom-right) is grounded in CUS Solution's real services, industries, and
FAQ content — the client-side stub mirrors the Retrieval-Augmented Generation (RAG) design in
the project plan. It answers service, career, hiring, and contact questions, with suggested
prompts and a graceful fallback to the team's contact details. In a later phase this stub is
swapped for a live RAG service call without changing the UI.

## Styling build
Tailwind is precompiled instead of loaded from the Play CDN, so pages ship ~18 KB of CSS
rather than a ~400 KB runtime compiler and render styled on first paint. After adding or
changing Tailwind classes in any HTML/JS file, regenerate the stylesheet:

```
npm install        # once
npm run build:css  # or: npm run watch:css while editing
```

The deploy workflow also rebuilds `css/tailwind.css` before publishing, so a forgotten local
rebuild never ships stale styles.

## Quality gate (Lighthouse CI)
`.github/workflows/lighthouse.yml` audits every page of the site (all 25, including the 404)
on every push and pull request, twice: once with the desktop preset (`lighthouserc.json`) and
once with Lighthouse's default mobile emulation and simulated slow-4G throttling
(`lighthouserc.mobile.json`). The two form factors run as parallel matrix jobs, so a phone-only
regression fails its own visible check. Thresholds: performance at least 90, accessibility and
SEO 100, best practices at least 95, layout shift under 0.1, and each page within its weight
budget (total under 450 KB, JS under 60 KB, CSS under 40 KB, fonts under 160 KB, images under
200 KB, zero third-party requests). LCP and total blocking time are reported as warnings.
The 404 page is intentionally `noindex`, so its SEO category score is replaced by the
individual SEO audits other than "is crawlable". Reports are attached to each run as the
`lighthouse-reports-desktop` / `lighthouse-reports-mobile` artifacts. Run locally (needs
Chrome) with `npm run lighthouse`, `npm run lighthouse:mobile`, or `npm run lighthouse:all`.

## Deployment
Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the site to
GitHub Pages. To enable: repo **Settings → Pages → Source: GitHub Actions**.

## Roadmap (per the six-month plan)
Marketing pages → CMS-ready content model → forms & booking API → RAG assistant service →
QA + chatbot evaluation → production launch. This repo is delivered incrementally, with a
new chunk committed each weekday.

---
_Maintained with incremental daily builds. See `PROGRESS.md` for the log._
