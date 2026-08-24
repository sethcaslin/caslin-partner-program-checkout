# Partner Access Checkout Design

Date: 2026-08-24
Status: Approved

## Goal

Add a separate checkout at `/partner-access` for the same Caslin Partner Program, benefits, funding eligibility, and guarantee as the existing offer. The new offer charges a one-time payment of USD 999 and supports a social experiment for visitors who do not accept the original price.

## Chosen approach

Keep both offers in the existing application and reuse one checkout page implementation. The original page at `/` remains a one-time USD 4,997 offer. The new `/partner-access` page uses the same presentation and payment experience with a one-time USD 999 offer.

This avoids duplicating the application and its Stripe configuration while giving the experiment a stable, discreet URL.

## Offer model

The application will define two server-recognized offers:

- `pay_in_full`: USD 4,997 at `/`
- `partner_access`: USD 999 at `/partner-access`

Each route chooses its offer by its fixed identifier. The browser sends only that identifier to the checkout endpoint. The server looks up the identifier in its allowlist and supplies the amount to Stripe, so a visitor cannot choose an arbitrary amount in the request.

## Page structure

The program information and checkout card will move into a reusable page component. Each public route passes its approved offer into that component. All program copy, benefits, guarantee language, security messaging, responsive layout, and payment fields remain consistent between the two routes.

The checkout panel will display the amount and payment language belonging to the selected offer. No visible label will describe the USD 999 page as a downsell or experiment.

## Payment flow and measurement

Both pages will continue using Stripe's embedded Checkout flow for a one-time payment. Checkout Session and PaymentIntent metadata will include the selected offer identifier, allowing the USD 999 experiment to be distinguished in Stripe without changing the customer's experience.

Both offers will return successful payments to the existing thank-you page. No installment option or recurring billing will be introduced.

## Error handling

Unknown offer identifiers will be rejected before a Stripe session is created. Missing Stripe configuration, missing client secrets, loading failures, and payment confirmation errors will continue using the existing customer-facing error states and retry behavior.

## Verification

Completion requires all of the following:

- `/` still displays USD 4,997 and requests the original offer.
- `/partner-access` displays USD 999 and requests the experiment offer.
- The server maps the two identifiers to 499700 and 99900 cents respectively.
- Unknown and removed offer identifiers are rejected.
- Stripe receives the correct amount and offer metadata for both choices.
- Automated tests, linting, and the production build pass.
- Both routes render correctly at desktop and mobile sizes without submitting a payment.
