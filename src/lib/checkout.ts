export const checkoutProduct = {
  name: "Caslin Partner Program",
  slug: "caslin-partner-program",
  shortDescription:
    "Partner program enrollment for the Caslin real estate acquisition system.",
}

export const paymentPlans = [
  {
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
  },
] as const

export type PaymentPlan = (typeof paymentPlans)[number]
export type PaymentPlanId = PaymentPlan["id"]

export function getPaymentPlan(planId: unknown) {
  return paymentPlans.find((plan) => plan.id === planId) ?? null
}
