# Pich Chanthorn — Personal Portfolio

Personal portfolio website of **Pich Chanthorn**, an Information Technology student and aspiring full-stack web developer. It showcases projects, technical skills, certificates, education, and work experience, and includes a contact form for internship and collaboration inquiries.

**Live site:** [https://pichchanthorn.me](https://pichchanthorn.me)

---

## Features

- Multi-page static site: Home, About, Skills, Projects (with individual project detail pages), Blog, Certificates, Education, Experience, Contact, CV, and Privacy Policy
- Light / dark / system **theme switcher**, persisted per visitor via `localStorage`
- **English / Khmer language switcher**, persisted per visitor via `localStorage`
- Responsive layout with dedicated breakpoints for tablet and mobile
- Contact form powered by **EmailJS** (no backend server required)
- Certificates page with category filters and a click-to-zoom lightbox for credential images
- Background music widget with play/pause controls
- Downloadable CV (PDF) and a dedicated CV page
- SEO metadata (Open Graph, Twitter Card, JSON-LD `Person` schema, canonical URLs, `sitemap.xml`, `robots.txt`)
- Google Analytics (GA4) integration
- Scroll-reveal animations and animated stat counters

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, modular — no framework) |
| Scripting | Vanilla JavaScript (ES6+, no build step) |
| Icons | [Lucide Icons](https://lucide.dev/) (CDN) |
| Fonts | Google Fonts — Sora, Manrope, Kantumruy Pro, JetBrains Mono |
| Contact form | [EmailJS](https://www.emailjs.com/) |
| Analytics | Google Analytics (gtag.js) |
| Hosting | GitHub Pages (custom domain via `CNAME`) |
| CI/CD | GitHub Actions (`actions/deploy-pages`) |

There is no package manager, bundler, or build step — the site runs as-is from static files.

---

## Project Structure

```text
pich-chanthorn-portfolio/
├── assets/
│   ├── audio/       # Background music tracks
│   ├── css/         # Modular stylesheets (base, layout, components, pages, responsive, theme)
│   ├── files/       # Downloadable CV (PDF)
│   ├── img/         # Profile, project, certificate, and icon images
│   └── js/          # Navigation/i18n, theme switcher, contact form, music widget, page-specific scripts
├── pages/
│   ├── projects/    # Individual project detail pages
│   └── *.html       # About, Skills, Projects, Blog, Certificates, Education, Experience, Contact, CV, Privacy Policy
├── index.html       # Home page
├── robots.txt
├── sitemap.xml
├── CNAME            # Custom domain (pichchanthorn.me)
├── LICENSE
└── README.md
```

---

## Local Setup

This is a static site — no installation or build step is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/pichchanthorn/pich-chanthorn-portfolio.git
   cd pich-chanthorn-portfolio
   ```
2. Open the folder in your editor of choice.
3. Serve it locally (see below) and open it in a browser.

### Run with VS Code Live Server

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.
2. Open this repository folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5501` (port pre-configured in `.vscode/settings.json`).

Any other static file server (e.g. `npx serve`, `python -m http.server`) also works, since all asset paths are relative.

---

## Deployment

The site deploys automatically to **GitHub Pages** on every push to `main`, via the GitHub Actions workflow in [`.github/workflows/static.yml`](.github/workflows/static.yml). The custom domain `pichchanthorn.me` is configured through the [`CNAME`](CNAME) file and GitHub Pages' DNS settings.

---

## Accessibility, SEO & Performance Notes

- **Accessibility:** semantic HTML landmarks, `aria-label` / `aria-live` / `role` attributes on interactive components (navigation, language switcher, lightbox, form status messages), and keyboard support (Enter/Space/Escape) on custom controls such as the certificate lightbox.
- **Responsive design:** dedicated CSS breakpoints for desktop, tablet, and mobile viewports across the whole site.
- **SEO:** per-page `<title>` and meta description, Open Graph and Twitter Card tags, canonical URLs, JSON-LD structured data, `sitemap.xml`, and `robots.txt`.
- **Performance:** no JavaScript framework or bundler — plain HTML/CSS/JS keeps payload size small; select images use `loading="lazy"`.
- **Security:** no server-side backend or database (static hosting only), served over HTTPS via GitHub Pages, and the EmailJS integration uses a public client-side key by design (EmailJS enforces sending limits and domain restrictions on their end).

These are implementation notes, not third-party audit results (e.g. no Lighthouse/axe scores are published here).

---

## Privacy Policy

This site uses Google Analytics and an EmailJS-powered contact form. Full details on what data is collected and how it's used are documented on the [Privacy Policy page](https://pichchanthorn.me/pages/privacy-policy.html).

---

## Contact

**Pich Chanthorn**
IT Student, Build Bright University — Aspiring Full-Stack Developer

- Portfolio: [pichchanthorn.me](https://pichchanthorn.me)
- GitHub: [github.com/pichchanthorn](https://github.com/pichchanthorn)
- LinkedIn: [linkedin.com/in/pichchanthorn](https://www.linkedin.com/in/pichchanthorn/)
- Or use the [contact form](https://pichchanthorn.me/pages/contact.html) on the site

---

## Contribution Policy

This is a personal portfolio, not an open-source project seeking contributions. It is public for **viewing, reference, and evaluation purposes only** (e.g. recruiters, collaborators reviewing code style). Pull requests are not accepted, and the source code, design, and personal content (photos, CV, certificates) may not be reused without permission — see [License](#license).

If you spot a bug or broken link, feel free to open an issue or reach out via the contact channels above.

---

## License

Copyright (c) 2025–2026 Pich Chanthorn. All rights reserved.

This repository is source-available for portfolio, demonstration, evaluation, and reference purposes only. Copying, modifying, redistributing, or reusing any part of this project — code, design, or personal content — requires prior written permission from the author.

See the [LICENSE](LICENSE) file for full terms.
