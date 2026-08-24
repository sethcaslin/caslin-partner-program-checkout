import { CheckoutPage } from "@/components/checkout/checkout-page"
import { partnerAccessPlan } from "@/lib/checkout"

export default function PartnerAccessPage() {
  return <CheckoutPage plan={partnerAccessPlan} />
}
