# GETALIKE

Owner focused marketing agency website with original client stories and an inquiry form.

## Review branch

`redesign/owner-first` is a preview branch. Keep `main` and the production domain unchanged until the design is approved.

## Local preview

Use Node.js 24 or later. Run `npm ci`, `npm run dev`, and open http://127.0.0.1:4173. Run `npm test` to check inquiry validation and delivery failure handling. `npm run build` writes the static pages to `dist/`.

## Vercel

Vercel builds the static pages and the Node.js function at `/api/inquiry`. The Resend Marketplace resource is connected only to the Preview environment. The server requires `RESEND_API_KEY`. Never add credentials or `.env` files to GitHub.

The inquiry recipient is fixed to msonaglia@getalike.agency. Visitor email is used as Reply-To. Call requests are followed up by email; the form does not book a time. Provider failures keep the visitor's details and show a recovery message. Honeypot, origin checks, bounded input and provider idempotency are included. These checks do not replace a public site's dedicated anti-abuse service.

Before merging, review the layout, quotes and metric context, then connect the email resource to Production and verify delivery there. Preview builds are excluded from indexing. Preview access follows the project's existing Vercel protection.
