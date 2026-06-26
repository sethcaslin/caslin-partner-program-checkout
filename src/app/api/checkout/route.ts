import { NextResponse } from "next/server"
import type Stripe from "stripe"

import { checkoutProduct, getPaymentPlan } from "@/lib/checkout"
import { getStripe } from "@/lib/stripe"

export const runtime = "nodejs"

type CheckoutRequest = {
  paymentPlan?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as CheckoutRequest
    const plan = getPaymentPlan(body.paymentPlan ?? "pay_in_full")

    if (!plan) {
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
    const returnUrl = `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`
    const metadata = {
      product: checkoutProduct.slug,
      payment_plan: plan.id,
    }

    let params: Stripe.Checkout.SessionCreateParams

    if (plan.mode === "subscription") {
      params = {
        mode: "subscription",
        ui_mode: "elements",
        return_url: returnUrl,
        billing_address_collection: "auto",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: plan.currency,
              unit_amount: plan.unitAmount,
              recurring: {
                interval: plan.interval,
              },
              product_data: {
                name: checkoutProduct.name,
                description: checkoutProduct.shortDescription,
              },
            },
          },
        ],
        subscription_data: {
          metadata: {
            ...metadata,
            installments: String(plan.installments),
          },
        },
        metadata,
      }
    } else {
      params = {
        mode: "payment",
        ui_mode: "elements",
        adaptive_pricing: {
          enabled: false,
        },
        return_url: returnUrl,
        billing_address_collection: "auto",
        customer_creation: "if_required",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: plan.currency,
              unit_amount: plan.unitAmount,
              product_data: {
                name: checkoutProduct.name,
                description: checkoutProduct.shortDescription,
              },
            },
          },
        ],
        metadata,
        payment_intent_data: {
          metadata,
        },
      }
    }

    const session = await stripe.checkout.sessions.create(params)

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
