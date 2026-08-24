export const purchaseTerms = {
  termsVersion: "2026-08-24-v2",
  refundPolicyVersion: "2026-08-24-v2",
  termsPath: "/terms",
  refundPolicyPath: "/refund-policy",
} as const

export function buildTermsAcceptanceMetadata(acceptedAt: Date) {
  return {
    terms_accepted: "true",
    terms_accepted_at: acceptedAt.toISOString(),
    terms_version: purchaseTerms.termsVersion,
    refund_policy_version: purchaseTerms.refundPolicyVersion,
  }
}

export function sessionCanAcceptTerms(
  metadata: Record<string, string> | null,
  productSlug: string,
  paymentPlanId: string
) {
  return (
    metadata?.product === productSlug &&
    metadata.payment_plan === paymentPlanId
  )
}
