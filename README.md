# Seth Partner Program Checkout

Next.js checkout page for the Seth Partner Program.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The checkout creates Stripe Checkout Sessions for a one-time $4,997 USD payment at `/` and a one-time $999 USD partner access offer at `/partner-access`. Successful payments redirect to `/thank-you`.

## Environment

`STRIPE_SECRET_KEY` is only used by the server route. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is available for future embedded checkout work, but the current flow redirects through the Stripe-hosted checkout URL.
