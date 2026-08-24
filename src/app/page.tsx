import { CheckoutPage } from "@/components/checkout/checkout-page"
import { payInFullPlan } from "@/lib/checkout"

export default function Home() {
  return <CheckoutPage plan={payInFullPlan} />
}
