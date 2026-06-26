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
  {
    id: "installments_3",
    mode: "subscription",
    label: "3 monthly payments",
    selectorPrice: "$1,866/mo",
    selectorNote: "3 payments · $5,598 total",
    heroAmount: "$1,866",
    heroUnit: "USD /mo",
    heroCadence:
      "3 monthly payments of $1,866 ($5,598). Cancels automatically after the 3rd payment.",
    dueTodayLabel: "$1,866",
    dueTodayNote: "First of 3 monthly payments",
    buttonLabel: "Start plan — $1,866 today",
    unitAmount: 186600,
    currency: "usd",
    interval: "month",
    installments: 3,
  },
] as const

export type PaymentPlan = (typeof paymentPlans)[number]
export type PaymentPlanId = PaymentPlan["id"]

export function getPaymentPlan(planId: unknown) {
  return paymentPlans.find((plan) => plan.id === planId) ?? null
}
