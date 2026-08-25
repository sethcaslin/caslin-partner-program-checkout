import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import type Stripe from "stripe"

import { verifyCheckoutSession } from "../src/lib/checkout-confirmation.ts"

type SessionFixture = Pick<
  Stripe.Checkout.Session,
  | "id"
  | "mode"
  | "status"
  | "payment_status"
  | "amount_total"
  | "currency"
  | "metadata"
>

function checkoutSession(
  overrides: Partial<SessionFixture> = {}
): SessionFixture {
  return {
    id: "cs_test_confirmed",
    mode: "payment",
    status: "complete",
    payment_status: "paid",
    amount_total: 499700,
    currency: "usd",
    metadata: {
      product: "caslin-partner-program",
      payment_plan: "pay_in_full",
    },
    ...overrides,
  }
}

test("confirms only a matching complete and paid checkout session", async () => {
  const result = await verifyCheckoutSession(
    "cs_test_confirmed",
    async () => checkoutSession()
  )

  assert.deepEqual(result, {
    status: "confirmed",
    sessionId: "cs_test_confirmed",
    checkoutPath: "/",
  })
})

test("recognizes the paid partner access offer", async () => {
  const result = await verifyCheckoutSession(
    "cs_test_partner",
    async () =>
      checkoutSession({
        id: "cs_test_partner",
        amount_total: 99900,
        metadata: {
          product: "caslin-partner-program",
          payment_plan: "partner_access",
        },
      })
  )

  assert.deepEqual(result, {
    status: "confirmed",
    sessionId: "cs_test_partner",
    checkoutPath: "/partner-access",
  })
})

test("keeps a matching unpaid session out of the success state", async () => {
  const result = await verifyCheckoutSession(
    "cs_test_unpaid",
    async () =>
      checkoutSession({
        id: "cs_test_unpaid",
        status: "open",
        payment_status: "unpaid",
      })
  )

  assert.deepEqual(result, {
    status: "unconfirmed",
    sessionId: "cs_test_unpaid",
    checkoutPath: "/",
  })
})

test("rejects a session with an unexpected amount", async () => {
  const result = await verifyCheckoutSession(
    "cs_test_wrong_amount",
    async () =>
      checkoutSession({
        id: "cs_test_wrong_amount",
        amount_total: 1,
      })
  )

  assert.deepEqual(result, { status: "unavailable" })
})

test("rejects a session that does not match the exact Caslin offer", async () => {
  const mismatches = [
    checkoutSession({ id: "cs_test_other" }),
    checkoutSession({ mode: "subscription" }),
    checkoutSession({ currency: "cad" }),
    checkoutSession({
      metadata: {
        product: "another-product",
        payment_plan: "pay_in_full",
      },
    }),
  ]

  for (const session of mismatches) {
    const result = await verifyCheckoutSession(
      "cs_test_confirmed",
      async () => session
    )

    assert.deepEqual(result, { status: "unavailable" })
  }
})

test("does not call Stripe for a missing or malformed session ID", async () => {
  let retrieveCalls = 0
  const retrieve = async () => {
    retrieveCalls += 1
    return checkoutSession()
  }

  assert.deepEqual(await verifyCheckoutSession(undefined, retrieve), {
    status: "unavailable",
  })
  assert.deepEqual(await verifyCheckoutSession(["cs_test_one"], retrieve), {
    status: "unavailable",
  })
  assert.deepEqual(await verifyCheckoutSession("not_a_session", retrieve), {
    status: "unavailable",
  })
  assert.equal(retrieveCalls, 0)
})

test("returns a safe state when Stripe cannot retrieve the session", async () => {
  const result = await verifyCheckoutSession(
    "cs_test_unavailable",
    async () => {
      throw new Error("Stripe detail that must not reach the customer")
    }
  )

  assert.deepEqual(result, { status: "unavailable" })
})

test("renders success only after server-side confirmation", async () => {
  const page = await readFile(
    new URL("../src/app/thank-you/page.tsx", import.meta.url),
    "utf8"
  )

  assert.match(page, /getCheckoutConfirmation/)
  assert.match(page, /await searchParams/)
  assert.match(page, /confirmation\.status === "confirmed"/)
  assert.match(page, /Payment not confirmed/)
  assert.match(page, /Payment not verified/)
})
