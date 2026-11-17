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

Vercel is the selected host. The production branch is `main`, and the custom domain belongs on that deployment. Pushes to `design-lab` and other development branches receive separate Vercel preview deployments. Review changes in a pull request before merging them into `main`.

## Vercel

Project: `getalike-agency` in the `mateo-sonaglia` workspace, connected to the existing `mateosonaglia/GETALIKE` GitHub repository. Use the repository root, framework preset Other, build command `npm run build`, and output directory `dist`. The repository's `vercel.json` contains these settings.

Keep `getalike.agency` and `www.getalike.agency` attached to this project. The www address redirects to the apex domain. The domain remains registered at Namecheap with external DNS. Use the exact records Vercel recommends for this project, preserve email and verification records, and confirm both HTTPS addresses after changes propagate.

Account plans and paid upgrades are managed separately by the account owner. Hosting configuration does not determine eligibility for any provider's plan.

## Alternate Netlify deployment

The previous Netlify deployment is retained as a fallback. The portable `netlify.toml` configuration uses Node.js 24, `npm run build`, and publish directory `dist`. It has no effect on Vercel deployments. Netlify's Free plan currently injects a Powered by Netlify badge into public pages; the owner selected Vercel for the current review website.

## Content notes

The event signup milestone is attributed to City Impact's review and is an event total, not a claim that every signup came from GETALIKE. Kingsmen metrics refer to the documented individual reel. The Los Tanos figure comes from the previous case study and should be checked against its original reporting dates before final launch.

Testimonials use the supplied wording, with the requested punctuation changes. Brackets identify the contextual replacement in Josh Carsman's review.

All rights to the brand, original content, and client materials remain with their respective owners. No open-source license is granted by this repository.

