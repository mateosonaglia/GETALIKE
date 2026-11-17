# GETALIKE

Marketing and advertising website for GETALIKE. Built from the approved warm editorial direction with an owner-focused homepage, time and results benefits, client reviews, and a separate Work page.

## Edit the website

- `site/index.html`: homepage and its copy.
- `site/work/index.html`: case studies and full client reviews.
- `site/styles.css`: colors, typography, spacing, and responsive layout.
- `site/assets/`: supplied logos and original case study screenshots.

There are no framework dependencies or third-party scripts. Contact links open email. This version does not collect form submissions or include analytics trackers.

## Run locally

Use Node.js 20 or newer. Run `npm run dev`, then open the printed local address. Run `npm run build` to produce `dist/`.

## Branches and previews

`main` is the approved baseline. Use `design-lab` for experiments, or create a descriptive branch such as `design/homepage-copy`. Open a pull request to review changes before merging them into `main`.

Once this repository is connected to Vercel, pushes to development branches receive Preview Deployments. The production branch is `main`. The custom domain belongs on the production deployment.

## Vercel

Import `mateosonaglia/GETALIKE`. Use the repository root, framework preset Other, build command `npm run build`, and output directory `dist`. The repository's `vercel.json` contains these settings.

Use a Vercel plan suitable for a commercial agency website. Adding or upgrading a paid plan is an account-owner decision.

Add `getalike.agency` and, if wanted, `www.getalike.agency` in the project's Domains settings. Copy the exact DNS records Vercel provides into Namecheap. Keep any existing email DNS records. Do not guess the deployment-specific DNS targets.

## Content notes

The event signup milestone is attributed to City Impact's review and is an event total, not a claim that every signup came from GETALIKE. Kingsmen metrics refer to the documented individual reel. The Los Tanos figure comes from the previous case study and should be checked against its original reporting dates before final launch.

Testimonials use the supplied wording, with the requested punctuation changes. Brackets identify the contextual replacement in Josh Carsman's review.

All rights to the brand, original content, and client materials remain with their respective owners. No open-source license is granted by this repository.
