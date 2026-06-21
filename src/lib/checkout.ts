export const checkoutProduct = {
  name: "Caslin Partner Program",
  slug: "caslin-partner-program",
  shortDescription:
    "Partner program enrollment for the Caslin real estate deal system.",
}

export const paymentPlans = [
  {
    id: "pay_in_full",
    label: "Pay in full",
    displayAmount: "$4,999",
    unitAmount: 499900,
    currency: "usd",
  },
] as const

export type PaymentPlanId = (typeof paymentPlans)[number]["id"]

export function getPaymentPlan(planId: unknown) {
  return paymentPlans.find((plan) => plan.id === planId) ?? null
}
