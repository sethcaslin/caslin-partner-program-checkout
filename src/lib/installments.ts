import { checkoutProduct, getPaymentPlan } from "@/lib/checkout"

type Metadata = Record<string, string> | null | undefined

export function getInstallmentPlanFromMetadata(metadata: Metadata) {
  if (metadata?.product !== checkoutProduct.slug) {
    return null
  }

  const plan = getPaymentPlan(metadata.payment_plan)

  if (!plan || plan.mode !== "subscription") {
    return null
  }

  return plan
}

export function getInstallmentCancelAt(
  subscriptionStartDate: number,
  installments: number
) {
  const cancelAt = new Date(subscriptionStartDate * 1000)
  cancelAt.setUTCMonth(cancelAt.getUTCMonth() + installments - 1)
  cancelAt.setUTCDate(cancelAt.getUTCDate() + 15)

  return Math.floor(cancelAt.getTime() / 1000)
}
