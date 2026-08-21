import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import { getPaymentPlan, paymentPlans } from "../src/lib/checkout.ts"

test("offers only the pay-in-full option", () => {
  assert.deepEqual(
    paymentPlans.map((plan) => plan.id),
    ["pay_in_full"]
  )
})

test("rejects the removed three-month plan", () => {
  assert.equal(getPaymentPlan("installments_3"), null)
})

test("lets Stripe select the enabled payment methods", async () => {
  const route = await readFile(
    new URL("../src/app/api/checkout/route.ts", import.meta.url),
    "utf8"
  )

  assert.doesNotMatch(route, /payment_method_types/)
})
