# Stripe Payment Confirmation Design

Date: 2026-08-24
Status: Approved

## Goal

Show payment success only after the server verifies the returned Checkout Session with Stripe. Give customers clear, transparent guidance when payment is not yet confirmed or cannot be verified.

This applies to both the USD 4,997 checkout at `/` and the USD 999 checkout at `/partner-access` because both offers return to the shared `/thank-you` route.

## Chosen approach

Convert the thank-you page into a request-time server page that reads the returned `session_id`, retrieves that Checkout Session with the server-side Stripe client, validates that it belongs to a recognized Caslin Partner Program offer, and renders one of three explicit states.

This is preferred over automatic polling, which adds background requests and an unclear waiting experience, and over adding a webhook-backed database, which is stronger for automated fulfillment but unnecessary while access remains manual.

## Confirmed state

Show the existing success experience only when all of the following are true:

- Stripe returns the requested Checkout Session.
- The session belongs to the Caslin Partner Program.
- The payment plan is one of the two configured offers.
- The amount and currency match that configured offer.
- The Checkout Session status is `complete`.
- The Stripe payment status is `paid`.

The purchase-confirmation email and manual access process remain outside this change.

## Not-confirmed state

When Stripe returns a recognized Caslin checkout session but does not report it as complete and paid, show a neutral payment-not-confirmed message. Do not say that enrollment or payment is complete.

Tell the customer that Stripe has not confirmed the payment, that checking again cannot create another charge, and provide a `Check payment again` action that reloads the same session URL. Also provide a route back to the checkout and the existing support contact.

## Unable-to-verify state

Use a separate neutral state when the session ID is missing or malformed, Stripe is unavailable, Stripe rejects the lookup, or the returned session does not match a configured Caslin offer.

Do not expose Stripe errors or internal identifiers in the page. Tell the customer that the payment could not be verified and ask them to contact support before attempting another payment.

## Security and data flow

Run all verification on the server so the Stripe secret remains private. The browser provides only the Checkout Session ID already present in the return URL.

Do not trust the session ID by itself. Validate the product metadata, recognized payment plan, expected amount, expected currency, Checkout Session status, and payment status before rendering success.

## Testing

Completion requires automated checks for:

- A matching complete and paid session returns the confirmed state.
- A matching but unpaid or incomplete session returns the not-confirmed state.
- An unknown offer, incorrect amount, or incorrect currency returns the unable-to-verify state.
- A missing or malformed session ID returns the unable-to-verify state without calling Stripe.
- A Stripe lookup failure returns the unable-to-verify state without exposing the Stripe error.
- The success message appears only in the confirmed state.
- Tests, linting, TypeScript, and the production build pass.
- Read-only browser checks confirm that direct access without a session no longer shows payment success.
