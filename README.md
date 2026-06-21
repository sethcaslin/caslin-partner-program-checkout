# Seth Partner Program Checkout

Next.js checkout page for the Seth Partner Program.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The checkout creates a Stripe Checkout Session for a one-time $4,999 USD payment and redirects successful payments to `/thank-you`.

## Environment

`STRIPE_SECRET_KEY` is only used by the server route. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is available for future embedded checkout work, but the current flow redirects through the Stripe-hosted checkout URL.
