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
import {
  buildTermsAcceptanceMetadata,
  purchaseTerms,
  sessionCanAcceptTerms,
} from "../src/lib/legal.ts"

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
  assert.equal(original.metadata?.terms_version, purchaseTerms.termsVersion)
  assert.equal(
    original.metadata?.refund_policy_version,
    purchaseTerms.refundPolicyVersion
  )
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

test("builds a versioned server-side terms acceptance record", () => {
  const acceptedAt = new Date("2026-08-24T21:30:00.000Z")

  assert.deepEqual(buildTermsAcceptanceMetadata(acceptedAt), {
    terms_accepted: "true",
    terms_accepted_at: "2026-08-24T21:30:00.000Z",
    terms_version: "2026-08-24",
    refund_policy_version: "2026-08-24",
  })
})

test("accepts terms only for the matching program and offer", () => {
  const metadata = {
    product: "caslin-partner-program",
    payment_plan: "partner_access",
  }

  assert.equal(
    sessionCanAcceptTerms(
      metadata,
      "caslin-partner-program",
      "partner_access"
    ),
    true
  )
  assert.equal(
    sessionCanAcceptTerms(metadata, "caslin-partner-program", "pay_in_full"),
    false
  )
  assert.equal(
    sessionCanAcceptTerms(metadata, "different-product", "partner_access"),
    false
  )
})

test("lets Stripe select the enabled payment methods", async () => {
  const route = await readFile(
    new URL("../src/app/api/checkout/route.ts", import.meta.url),
    "utf8"
  )

  assert.doesNotMatch(route, /payment_method_types/)
})

test("requires versioned purchase terms on the checkout form", async () => {
  const form = await readFile(
    new URL(
      "../src/components/checkout/checkout-form.tsx",
      import.meta.url
    ),
    "utf8"
  )

  assert.match(form, /type="checkbox"/)
  assert.match(form, /required/)
  assert.match(form, /\/api\/checkout\/accept-terms/)
  assert.match(form, /\/terms/)
  assert.match(form, /\/refund-policy/)
  assert.match(form, /paymentMethodOrder/)
  assert.match(form, /"klarna"/)
  assert.match(form, /Pay over time, if eligible/)
  assert.match(form, /country: "US"/)
})

test("publishes the purchase terms and refund policy routes", async () => {
  const [terms, refundPolicy] = await Promise.all([
    readFile(new URL("../src/app/terms/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../src/app/refund-policy/page.tsx", import.meta.url),
      "utf8"
    ),
  ])

  assert.match(terms, /Purchase Terms/)
  assert.match(terms, /USD\s+4,997 or USD 999/)
  assert.match(refundPolicy, /200 calls per week/)
  assert.match(refundPolicy, /four consecutive weeks/)
  assert.match(refundPolicy, /USD 10,000/)
})

test("uses the Seth SC mark for browser and Apple icons", async () => {
  const [icon, favicon, appleIcon] = await Promise.all([
    readFile(new URL("../src/app/icon.svg", import.meta.url), "utf8"),
    readFile(new URL("../src/app/favicon.ico", import.meta.url)),
    readFile(new URL("../src/app/apple-icon.png", import.meta.url)),
  ])

  assert.match(icon, />SC<\/text>/)
  assert.match(icon, /fill="#2f5bea"/)
  assert.ok(favicon.byteLength > 1_000)
  assert.ok(appleIcon.byteLength > 1_000)
})
