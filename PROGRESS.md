# Build Progress Log

A running log of incremental daily work on the CUS Solution website & AI assistant.

## Day 10 — 2026-08-27
- **SEO & social-sharing polish across the whole site:** added a consistent metadata block to the `<head>` of all 12 pages — `og:site_name`, per-page `og:url`, `og:image` (with width/height/alt), Twitter `summary_large_image` card tags (title/description/image), a self-referencing `<link rel="canonical">`, `robots` index/follow, and a `theme-color` — layered on top of the existing title/description/og:title/og:description without disturbing them.
- **Open Graph share image:** generated a branded 1200×630 `assets/og-image.png` (navy gradient, CUS Solution wordmark, headline, accent) and wired it as the og/twitter image on every page so link previews render properly on LinkedIn, Slack, iMessage, X, etc.
- **Structured data:** added an Organization JSON-LD block to index.html (name, url, logo, description, email, phone, LinkedIn/Instagram sameAs, and a contactPoint) for richer search results.
- **Crawl files:** added `sitemap.xml` (all 12 pages, with lastmod/changefreq/priority) and `robots.txt` (allow-all + Sitemap reference). Fixed the stale live-site URL in README to the correct GitHub Pages base (`https://snehithreyya.github.io/CUS_AI_Website/`), matching the canonical/sitemap URLs.
- Verified: node --check on js/main.js; sitemap.xml and the JSON-LD both parse; confirmed all 12 pages carry canonical + og:image + twitter:card; HTML well-formedness passed on every page.

### Next up
- WCAG 2.1 AA accessibility pass (color contrast, focus states, aria labels, landmark/heading order, alt text).
- Performance polish (defer/async scripts, image sizing, reduce layout shift, Lighthouse pass).
- Wire the booking scheduler placeholder to a real Calendly/Cal.com embed when an account URL is available.
- Expand the assistant KB in js/main.js with lead-capture + booking intents (route users to booking.html); add RAG backend hook.

## Day 9 — 2026-08-25
- **Consultation booking flow built (booking.html):** page hero with Home / Contact / Book a Consultation breadcrumb + 3 stat highlights (30-min focused call, <1 business day to confirm, $0 / no obligation); a two-column "Pick a time" layout pairing a scheduler placeholder with a validated "Request your slot" form. The scheduler is a styled drop-in target (`#scheduler-embed` with `data-embed`/`data-embed-url` hooks) ready for a future Calendly/Cal.com embed, with a clear "coming soon" state and a jump link to the request form. Four meeting-type cards (Intro call, Project scoping, Staffing consult, Technical deep-dive) and a "What to expect" 4-step section — all reusing the shared header, footer, and AI chat widget.
- **Booking request form:** vanilla-JS inline validation (required-field, email + phone regex, consultation type, preferred date with a past-date guard via `min`, time window, and time zone) with per-field error messages, `.is-invalid` styling, focus management, and an aria-live status line; on valid submit it composes a prefilled `mailto:info@cussolution.com` capturing name, email, company, phone, consultation type, preferred date/window/timezone, and notes (no data stored on the site — noted in the UI). Added a "Book a Call" primary CTA to the header (desktop + mobile).
- **Footer nav normalized + booking link added across all 11 existing pages:** the Company column had drifted — several pages were missing the Industries link, carried a duplicate "Students" entry, and labeled the contact link "Inquiries." Rewrote the column to a single canonical block (About Us, Industries, Careers, Students & New Grads, Contact, Book a Consultation) on every page. Repointed contact.html's "Prefer to talk it through?" card from the on-page `#form` anchor to booking.html.
- Verified: node --check on js/main.js and the extracted inline booking-form script; HTML well-formedness + local link/asset existence checks passed on all 12 pages.

### Next up
- SEO polish: sitemap.xml (now including booking.html), robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Wire the booking scheduler placeholder to a real Calendly/Cal.com embed when an account URL is available.
- Expand the assistant KB in js/main.js with lead-capture + booking intents (route users to booking.html); add RAG backend hook.

## Day 8 — 2026-08-24
- **Contact page built (contact.html):** page hero with Home / Contact breadcrumb + 3 stat highlights (<1 business-day reply, US-based, 24/7 assistant); a two-column layout with a validated lead-capture form (full name, work email, company, phone, a topic <select> — project/consulting, hire talent/staffing, book a consultation, careers, partnership, general — and message) alongside a "Reach us directly" card (email, phone tel: link, location, LinkedIn/Instagram) and a "Prefer to talk it through?" consultation nudge; plus a 4-step "What happens next" flow (review → intro call → tailored plan → get moving) — all reusing the shared header, footer, and AI chat widget.
- **Static-friendly form handling:** vanilla-JS inline validation (required-field, email + phone regex, min-length message) with inline per-field error messages, `.is-invalid` styling, focus management, and an aria-live status line; on valid submit it composes a prefilled `mailto:info@cussolution.com` (no data stored on the site — noted in the UI). Added reusable `.form-input`, `select.form-input`, `.form-error`, and `.is-invalid` styles to css/styles.css using existing brand tokens.
- **Nav wired for consistency:** repointed every "Contact", "Hire Talent", and footer "Inquiries" link from the old `index.html#contact` anchor to the new contact.html across all 11 pages (desktop nav, mobile menu, hero CTAs, footer); fixed stale footer "Students" links to point to students.html; normalized the index.html footer Company column (About Us, Industries, Careers, Students & New Grads, Contact) and removed a duplicate entry.
- Verified: node --check on js/main.js and on the extracted inline contact-form script; HTML well-formedness + local link/asset existence checks passed on all 11 pages.

### Next up
- Consultation booking flow (form/calendar placeholder — e.g. Calendly embed or a scheduling-service hook).
- SEO polish: sitemap.xml, robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Expand the assistant KB in js/main.js with lead-capture + booking intents; add RAG backend hook.

## Day 7 — 2026-08-19
- **Students & New Graduates hub built (students.html):** page hero with Home / Careers / Students breadcrumb + 3 stat highlights (1:1 mentor from day one, live client projects, US-based), an "Early-career pathways" trio (Internships, New-grad rotation, Apprentice-style upskilling), a "What you'll gain" 6-card grid (mentored from day one, real client work, transferable skills, structured onboarding, cross-industry exposure, a path forward), a "Tracks open to students & new grads" 6-card grid (Software Development, Cloud & DevOps, Data & AI, Technology Consulting, QA & Cybersecurity, Engineering & Operations) linking back to all careers tracks, a 4-step "How to apply" process, a 4-item student FAQ, and an Apply CTA with a prefilled student mailto — all reusing the shared header, footer, and AI chat widget.
- **Nav wired for consistency:** added a "Students & New Grads" link to the footer Company column across all 9 existing pages (index, about, services, industries, careers, and the 4 service detail pages). Repointed the careers.html Students & New Graduates section from its "hub is on the way" placeholder to the live students.html hub (primary CTA + inline link).
- Verified: node --check on js/main.js; HTML well-formedness + local link/asset existence checks passed on all 10 pages.

### Next up
- contact.html with a validated lead form (mailto or form-service placeholder).
- Consultation booking flow (form/calendar placeholder).
- SEO polish: sitemap.xml, robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Expand the assistant KB in js/main.js with lead-capture + booking intents; add RAG backend hook.

## Day 6 — 2026-08-14
- **Careers page built (careers.html):** page hero with Home / Careers breadcrumb + 3 stat highlights (6+ talent tracks, US-based, 1:1 mentorship), a "Why CUS" culture grid (6 cards: meaningful work, mentorship, growth paths, flexibility, cross-industry exposure, always learning), a "Talent areas we're hiring for" grid (6 tracks: Software Development, Cloud & DevOps, Data & AI, Technology Consulting, Engineering & Operations, QA & Cybersecurity), a 4-step "How We Hire" process (Apply → Intro call → Skills interview → Offer & onboarding), an 8-item Benefits & Perks grid, a Students & New Graduates section (placeholder for a future students.html hub), and an Apply CTA with a prefilled mailto résumé link — all reusing the shared header, footer, and AI chat widget.
- **Nav wired for consistency:** added a "Careers" link to the desktop nav and mobile menu across all 8 existing pages (index, about, services, industries, and the 4 service detail pages); repointed the header "Explore Careers" button, the mobile "Careers" button, and the footer "Careers" link from index.html#contact to careers.html.
- Verified: node --check on js/main.js; HTML well-formedness + local link/asset existence checks passed on all 9 pages.

### Next up
- students.html — dedicated students & new-grad hub (internships, early-career pathways) linked from the careers page.
- contact.html with a validated lead form (mailto or form-service placeholder).
- SEO polish: sitemap.xml, robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Expand the assistant KB in js/main.js with lead-capture + booking intents; add RAG backend hook.

## Day 5 — 2026-08-12
- **Industries page built (industries.html):** page hero with Home / Industries breadcrumb, intro + 3 stat highlights (11+ industries, US-based, 24/7 assistant), a "Sectors we empower" grid of 11 industries (Information Technology, Healthcare, Finance & Banking, Insurance, Manufacturing, Retail, Supply Chain & Logistics, Telecommunications, Engineering Services, Pharmaceuticals, Biotechnology) each with an icon + description, plus a "Don't see your sector?" cross-industry card, a "How We Serve" trio (compliance-aware, domain-fluent teams, outcome-focused), and CTA — all reusing the shared header, footer, and AI chat widget.
- **Nav wired for consistency:** the "Industries" link in the desktop nav and mobile menu across all pages (index, about, services, and the 4 service detail pages) now points to industries.html instead of the index.html#industries on-page anchor. Footer "Company" column now includes an Industries link.
- Verified: node --check on js/main.js; HTML well-formedness + local link/asset existence checks passed on all 8 pages.

### Next up
- careers.html + students.html.
- contact.html with a validated lead form (mailto or form-service placeholder).
- SEO polish: sitemap.xml, robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Expand the assistant KB in js/main.js with lead-capture + booking intents; add RAG backend hook.

## Day 4 — 2026-08-11
- **Service detail pages built (4):** technology-consulting.html, software-development.html, cloud-solutions.html, engineering-services.html. Each has a hero with Home / Services / <page> breadcrumb, a "What we deliver" capabilities grid (6 items), a 4-step engagement model, a Tools & Technologies chip strip, a Related practice areas cross-link grid, and CTA — all reusing the shared header, footer, and AI chat widget.
- **Nav wired for consistency:** each services.html core-practice card now has a "Learn more" link to its detail page; footer "Verticals" links across index.html, about.html, and services.html now point to the four detail pages instead of the generic services.html.
- Verified: node --check on js/main.js; HTML well-formedness + local link/asset existence checks passed on all 7 pages.

### Next up
- industries.html (verticals overview).
- careers.html + students.html.
- contact.html with a validated lead form (mailto or form-service placeholder).
- SEO polish: sitemap.xml, robots.txt, Open Graph across all pages; WCAG 2.1 AA pass.
- Expand the assistant KB in js/main.js with lead-capture + booking intents; add RAG backend hook.

## Day 3 — 2026-08-10
- **Services overview page (services.html)** built end-to-end: page hero with breadcrumb, four core practice cards (Technology Consulting, Software Development, Cloud Solutions, Engineering Services) each with a capability list, a Specialized Capabilities strip (Cybersecurity, Data & AI, Staffing & Workforce), a 4-step engagement model (Discover → Design → Deliver → Scale), and CTA — reusing the shared header, footer, and AI chat widget.
- Nav made consistent across all pages: "Services" now links to services.html (desktop nav, mobile menu) on index.html and about.html. Footer "Verticals" links now point to services.html.
- Verified: node --check on JS, HTML well-formedness + asset-existence checks passed on all pages.

### Next up
- Service detail pages: technology-consulting, software-development, cloud-solutions, engineering-services (link them from the services.html cards).
- Industries, Careers/Students, Contact page with validated lead form.
- Replace assistant stub with a live RAG backend call.

## Day 2 — 2026-08-04
- **About page (about.html)** built end-to-end: page hero with breadcrumb, Our Story, Mission & Vision, Our Approach (6 principles), and CTA — reusing the shared header, footer, and AI chat widget.
- Nav updated across all pages: "About" now links to the dedicated about.html (desktop nav, mobile menu, footer). Cross-page links point back to index.html section anchors.
- Verified: node --check on JS, HTML well-formedness + asset-existence checks passed.

### Next up
- Services overview page (services.html) linking the four core practices.
- Service detail pages: technology-consulting, software-development, cloud-solutions, engineering-services.
- Industries, Careers/Students, Contact page with validated lead form.
- Replace assistant stub with a live RAG backend call.

## Day 1 — 2026-08-03
- Project scaffolded: static site (HTML + Tailwind CSS), design system with CUS brand tokens (navy/blue).
- **Home page** built end-to-end: sticky nav, hero, About, Services (4 core practices + 3 capabilities), Industries marquee, Why CUS, FAQ, Contact/CTA, footer.
- **AI Career Assistant** widget added — grounded client-side stub over CUS services/industries/FAQ, suggested prompts, typing indicator, graceful fallback to contact details.
- GitHub Actions workflow added to auto-deploy to GitHub Pages on push.
- Responsive across mobile/tablet/desktop; scroll-reveal animations; accessible nav.

### Next up
- Dedicated pages: About, Services detail, Industries, Careers, Contact (with real form).
- Contact/lead form with validation.
- Replace assistant stub with a live RAG backend call.
