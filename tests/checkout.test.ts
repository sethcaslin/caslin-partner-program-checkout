import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import {
  buildCheckoutSessionParams,
  getPaymentPlan,
  partnerAccessPlan,
  payInFullPlan,
  paymentPlans,
} from "../src/lib/checkout.ts"

test("offers the original and partner access prices", () => {
  assert.deepEqual(
    paymentPlans.map((plan) => plan.id),
    ["pay_in_full", "partner_access"]
  )
  assert.equal(payInFullPlan.unitAmount, 499700)
  assert.equal(partnerAccessPlan.unitAmount, 99900)
  assert.equal(partnerAccessPlan.heroAmount, "$999")
  assert.equal(partnerAccessPlan.buttonLabel, "Complete enrollment — $999")
})

test("resolves only approved payment plans", () => {
  assert.equal(getPaymentPlan("pay_in_full"), payInFullPlan)
  assert.equal(getPaymentPlan("partner_access"), partnerAccessPlan)
  assert.equal(getPaymentPlan("installments_3"), null)
  assert.equal(getPaymentPlan("unknown"), null)
})

test("uses the partner access offer on its dedicated route", async () => {
  const page = await readFile(
    new URL("../src/app/partner-access/page.tsx", import.meta.url),
    "utf8"
  )

  assert.match(page, /partnerAccessPlan/)
  assert.doesNotMatch(page, /payInFullPlan/)
})

test("sends each fixed price and offer identifier to Stripe", () => {
  const returnUrl = "https://checkout.example/thank-you"
  const original = buildCheckoutSessionParams(payInFullPlan, returnUrl)
  const partnerAccess = buildCheckoutSessionParams(partnerAccessPlan, returnUrl)

  assert.equal(original.line_items?.[0]?.price_data?.unit_amount, 499700)
  assert.equal(original.metadata?.payment_plan, "pay_in_full")
  assert.equal(
    original.payment_intent_data?.metadata?.payment_plan,
    "pay_in_full"
  )
  assert.equal(partnerAccess.line_items?.[0]?.price_data?.unit_amount, 99900)
  assert.equal(partnerAccess.metadata?.payment_plan, "partner_access")
  assert.equal(
    partnerAccess.payment_intent_data?.metadata?.payment_plan,
    "partner_access"
  )
})

test("lets Stripe select the enabled payment methods", async () => {
  const route = await readFile(
    new URL("../src/app/api/checkout/route.ts", import.meta.url),
    "utf8"
  )

  assert.doesNotMatch(route, /payment_method_types/)
})
