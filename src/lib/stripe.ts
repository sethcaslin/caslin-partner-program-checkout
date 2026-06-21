import Stripe from "stripe"

let stripeClient: Stripe | null = null

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return null
  }

  stripeClient ??= new Stripe(secretKey, {
    apiVersion: "2026-05-27.dahlia",
    appInfo: {
      name: "Caslin Partner Program Checkout",
    },
  })

  return stripeClient
}
