# Seth Partner Program Checkout

Next.js checkout page for the Seth Partner Program.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The checkout creates embedded Stripe Checkout Sessions for a one-time $4,997 USD payment at `/` and a one-time $999 USD partner access offer at `/partner-access`. Both offers use Stripe's enabled dynamic payment methods and require acceptance of the purchase terms and refund policy before payment. Successful payments redirect to `/thank-you`.

Customer-facing policies are available at `/terms` and `/refund-policy`.

## Environment

`STRIPE_SECRET_KEY` is used only by server routes. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` loads the embedded Stripe payment form. `NEXT_PUBLIC_APP_URL` sets the production return URL.
