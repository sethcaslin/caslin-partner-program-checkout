import { NextResponse } from "next/server"

import { checkoutProduct, getPaymentPlan } from "@/lib/checkout"
import { getStripe } from "@/lib/stripe"

export const runtime = "nodejs"

type CheckoutRequest = {
  paymentPlan?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as CheckoutRequest
    const paymentPlan = getPaymentPlan(body.paymentPlan ?? "pay_in_full")

    if (!paymentPlan) {
      return NextResponse.json(
        { error: "This payment option is not available." },
        { status: 400 }
      )
    }

    const stripe = getStripe()

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 500 }
      )
    }

    const requestOrigin = new URL(request.url).origin
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? requestOrigin).replace(
      /\/$/,
      ""
    )

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "elements",
      adaptive_pricing: {
        enabled: false,
      },
      return_url: `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "auto",
      customer_creation: "if_required",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: paymentPlan.currency,
            unit_amount: paymentPlan.unitAmount,
            product_data: {
              name: checkoutProduct.name,
              description: checkoutProduct.shortDescription,
            },
          },
        },
      ],
      metadata: {
        product: checkoutProduct.slug,
        payment_plan: paymentPlan.id,
      },
      payment_intent_data: {
        metadata: {
          product: checkoutProduct.slug,
          payment_plan: paymentPlan.id,
        },
      },
    })

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout client secret." },
        { status: 500 }
      )
    }

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Checkout could not be started." },
      { status: 500 }
    )
  }
}
