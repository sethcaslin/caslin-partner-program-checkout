# Merchant Contact and Legal Footer Design

Date: 2026-08-24
Status: Approved

## Goal

Add clear merchant contact, seller identity, physical address, statement descriptor, and legal links to both Caslin Partner Program checkouts without changing the offer copy, payment behavior, Stripe Elements, form validation, or existing customer-facing text.

## Chosen approach

Add the support line and merchant footer to the existing shared checkout components. Both `/` and `/partner-access` already use the same checkout form and page structure, so one implementation will keep the USD 4,997 and USD 999 experiences identical.

This is preferred over duplicating markup in both routes, which could drift, or placing the footer in the global application layout, which would also expose it on policy and thank-you pages.

## Support line

Place the supplied `cpp-support` content immediately after the enrollment button in the shared checkout form. It will remain centered and visually secondary. The provided email address, one-business-day response statement, and uppercase `CASLINPARTNERPROGRAM` descriptor will be preserved exactly.

The existing payment security and onboarding messages will remain unchanged and continue below the new support line.

## Merchant footer

Place the supplied `cpp-footer` content after the shared two-column checkout section and before the closing page container. This makes it span the page beneath both the sales column and checkout card.

The footer will contain:

- Ben and Seth contact email links.
- The merchant phone number.
- Seth Caslin LLC as seller of record.
- The Sheridan, Wyoming mailing address.
- Enrollment, billing, onboarding, and access support language.
- Payment processing attribution to Stripe.

## Legal links

Use the existing internal checkout policy routes for purchase and refund terms:

- `/terms`
- `/refund-policy`

Use the approved public funnel page for privacy:

- `https://caslinpartnerprogram.com/privacy-policy`

All legal destinations must resolve successfully.

## Styling and responsive behavior

Move the supplied `cpp-` styles into the shared stylesheet rather than using an inline style block. Preserve the `cpp-` prefix on every class.

The footer will remain two columns when space allows and stack cleanly on narrow screens. At mobile width, the Stripe processing note will occupy its own line. The layout must not create horizontal scrolling, text overlap, or sticky-card obstruction.

## Payment boundary

This is presentation-only work. Do not alter Checkout Session creation, Stripe Elements, accepted payment methods, email synchronization, terms acceptance, form validation, payment confirmation, success routing, or error handling.

## Verification

Completion requires:

- Both `/` and `/partner-access` show the support line directly below their enrollment button.
- Both routes show the full-width footer beneath both checkout columns.
- The layout works without overflow or overlap at 1440, 768, and 375 pixel widths.
- Both email links, the telephone link, and all three legal links have the correct destinations.
- Existing page copy remains unchanged.
- Stripe fields still accept test input and one Stripe test-mode transaction completes end to end.
- Automated tests, linting, and the production build pass.
- Browser console output contains no new errors or warnings.

