import type Stripe from "stripe"

import { purchaseTerms } from "./legal.ts"

export const checkoutProduct = {
  name: "Caslin Partner Program",
  slug: "caslin-partner-program",
  shortDescription:
    "Partner program enrollment for the Caslin real estate acquisition system.",
}

export const payInFullPlan = {
  id: "pay_in_full",
  mode: "payment",
  label: "Pay in full",
  selectorPrice: "$4,997",
  selectorNote: "Billed once",
  heroAmount: "$4,997",
  heroUnit: "USD",
  heroCadence: "One-time payment for program enrollment.",
  dueTodayLabel: "$4,997",
  dueTodayNote: "One-time enrollment payment",
  buttonLabel: "Complete enrollment — $4,997",
  unitAmount: 499700,
  currency: "usd",
} as const

export const partnerAccessPlan = {
  id: "partner_access",
  mode: "payment",
  label: "Partner access",
  selectorPrice: "$999",
  selectorNote: "Billed once",
  heroAmount: "$999",
  heroUnit: "USD",
  heroCadence: "One-time payment for program enrollment.",
  dueTodayLabel: "$999",
  dueTodayNote: "One-time enrollment payment",
  buttonLabel: "Complete enrollment — $999",
  unitAmount: 99900,
  currency: "usd",
} as const

export const paymentPlans = [payInFullPlan, partnerAccessPlan] as const

export type PaymentPlan = (typeof paymentPlans)[number]
export type PaymentPlanId = PaymentPlan["id"]

export function getPaymentPlan(planId: unknown) {
  return paymentPlans.find((plan) => plan.id === planId) ?? null
}

export function buildCheckoutSessionParams(
  plan: PaymentPlan,
  returnUrl: string
): Stripe.Checkout.SessionCreateParams {
  const metadata = {
    product: checkoutProduct.slug,
    payment_plan: plan.id,
    terms_version: purchaseTerms.termsVersion,
    refund_policy_version: purchaseTerms.refundPolicyVersion,
  }

  return {
    mode: "payment",
    ui_mode: "elements",
    adaptive_pricing: {
      enabled: false,
    },
    return_url: returnUrl,
    billing_address_collection: "auto",
    customer_creation: "if_required",
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
