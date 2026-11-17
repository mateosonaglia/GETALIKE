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

Netlify is the selected host. The production branch is `main`. Pull requests receive Deploy Previews once the repository is connected. Enable branch deploys for `design-lab` in Netlify's Branches and deploy contexts settings to keep a separate experiment URL. The custom domain belongs on the production deployment.

## Netlify

Import the existing `mateosonaglia/GETALIKE` GitHub repository into the user's Netlify account. Use the Free plan, repository root, production branch `main`, build command `npm run build`, and publish directory `dist`. The repository's `netlify.toml` contains the build settings, Node.js version and response headers. No new framework or form service is required.

The Netlify Free plan permits commercial projects and has a monthly usage limit. Do not enable a paid plan or paid add-on without the owner's decision. Account setup and GitHub authorization must be completed in the user's account.

Add `getalike.agency` and `www.getalike.agency` in Netlify's Domain management settings. Keep the domain registered at Namecheap and use external DNS. Copy the exact records shown for this Netlify project into Namecheap, replacing only conflicting website or parking records. Preserve email and verification records. Confirm both HTTPS addresses and their preferred-domain redirect after propagation.

## Previous Vercel preview

The existing Vercel project is a temporary review preview during the switch. Vercel is not required by this website or by the Netlify deployment. The retained `vercel.json` only applies if deployed to Vercel. After Netlify and the domain work, retire the previous Vercel project or disconnect its Git integration to avoid duplicate builds. No paid Vercel upgrade is needed for the Netlify setup.

## Content notes

The event signup milestone is attributed to City Impact's review and is an event total, not a claim that every signup came from GETALIKE. Kingsmen metrics refer to the documented individual reel. The Los Tanos figure comes from the previous case study and should be checked against its original reporting dates before final launch.

Testimonials use the supplied wording, with the requested punctuation changes. Brackets identify the contextual replacement in Josh Carsman's review.

All rights to the brand, original content, and client materials remain with their respective owners. No open-source license is granted by this repository.
