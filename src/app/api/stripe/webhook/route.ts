import { NextResponse } from "next/server"

import { getStripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 }
    )
  }

  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    )
  }

  const payload = await request.text()

  try {
    stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch {
    return NextResponse.json(
      { error: "Invalid Stripe signature." },
      { status: 400 }
    )
  }

  return NextResponse.json({ received: true })
}
