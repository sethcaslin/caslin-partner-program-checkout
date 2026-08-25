import type Stripe from "stripe"

import { checkoutProduct, getPaymentPlan } from "./checkout.ts"
import { getStripe } from "./stripe.ts"

type CheckoutSessionSnapshot = Pick<
  Stripe.Checkout.Session,
  | "id"
  | "mode"
  | "status"
  | "payment_status"
  | "amount_total"
  | "currency"
  | "metadata"
>

type CheckoutSessionRetriever = (
  sessionId: string
) => Promise<CheckoutSessionSnapshot>

export type CheckoutConfirmation =
  | {
      status: "confirmed"
      sessionId: string
      checkoutPath: "/" | "/partner-access"
    }
  | {
      status: "unconfirmed"
      sessionId: string
      checkoutPath: "/" | "/partner-access"
    }
  | { status: "unavailable" }

function isCheckoutSessionId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.startsWith("cs_") &&
    value.length <= 255
  )
}

export async function verifyCheckoutSession(
  sessionId: unknown,
  retrieve: CheckoutSessionRetriever
): Promise<CheckoutConfirmation> {
  if (!isCheckoutSessionId(sessionId)) {
    return { status: "unavailable" }
  }

  try {
    const session = await retrieve(sessionId)
    const plan = getPaymentPlan(session.metadata?.payment_plan)

    if (
      session.id !== sessionId ||
      session.mode !== "payment" ||
      session.metadata?.product !== checkoutProduct.slug ||
      !plan ||
      session.amount_total !== plan.unitAmount ||
      session.currency !== plan.currency
    ) {
      return { status: "unavailable" }
    }

    const checkoutPath =
      plan.id === "partner_access" ? "/partner-access" : "/"
    const status =
      session.status === "complete" && session.payment_status === "paid"
        ? "confirmed"
        : "unconfirmed"

    return { status, sessionId, checkoutPath }
  } catch {
    return { status: "unavailable" }
  }
}

export async function getCheckoutConfirmation(sessionId: unknown) {
  return verifyCheckoutSession(sessionId, async (validSessionId) => {
    const stripe = getStripe()

    if (!stripe) {
      throw new Error("Stripe is unavailable")
    }

    return stripe.checkout.sessions.retrieve(validSessionId)
  })
}
