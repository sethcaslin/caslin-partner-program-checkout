import { NextResponse } from "next/server"
import type Stripe from "stripe"

import {
  getInstallmentCancelAt,
  getInstallmentPlanFromMetadata,
} from "@/lib/installments"
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

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch {
    return NextResponse.json(
      { error: "Invalid Stripe signature." },
      { status: 400 }
    )
  }

  try {
    if (event.type === "checkout.session.completed") {
      await capCheckoutSessionSubscription(stripe, event.data.object)
    }

    if (event.type === "customer.subscription.created") {
      await capInstallmentSubscription(stripe, event.data.object)
    }

    if (event.type === "invoice.payment_failed") {
      logInstallmentInvoiceFailure(event.data.object)
    }
  } catch (error) {
    console.error("Stripe webhook handler failed", error)
    return NextResponse.json({ error: "Handler error." }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function capCheckoutSessionSubscription(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  if (session.mode !== "subscription" || !session.subscription) {
    return
  }

  const plan = getInstallmentPlanFromMetadata(session.metadata)

  if (!plan) {
    return
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  await capInstallmentSubscription(stripe, subscription)
}

async function capInstallmentSubscription(
  stripe: Stripe,
  subscription: Stripe.Subscription
) {
  const plan = getInstallmentPlanFromMetadata(subscription.metadata)

  if (!plan) {
    return
  }

  if (subscription.cancel_at) {
    return
  }

  const cancelAt = getInstallmentCancelAt(
    subscription.start_date,
    plan.installments
  )

  await stripe.subscriptions.update(subscription.id, {
    cancel_at: cancelAt,
    metadata: {
      ...subscription.metadata,
      installments: String(plan.installments),
      installment_cap_applied: "true",
      installment_cancel_at: String(cancelAt),
    },
  })
}

function logInstallmentInvoiceFailure(invoice: Stripe.Invoice) {
  const subscriptionDetails = invoice.parent?.subscription_details
  const plan = getInstallmentPlanFromMetadata(subscriptionDetails?.metadata)

  if (!plan) {
    return
  }

  const subscription = subscriptionDetails?.subscription
  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription?.id

  console.error(
    `Installment payment failed for invoice ${invoice.id} on subscription ${
      subscriptionId ?? "unknown"
    }.`
  )
}
