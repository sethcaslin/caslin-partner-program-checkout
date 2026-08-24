import { NextResponse } from "next/server"

import { checkoutProduct, getPaymentPlan } from "@/lib/checkout"
import {
  buildTermsAcceptanceMetadata,
  sessionCanAcceptTerms,
} from "@/lib/legal"
import { getStripe } from "@/lib/stripe"

export const runtime = "nodejs"

type AcceptTermsRequest = {
  sessionId?: string
  paymentPlan?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as AcceptTermsRequest
    const sessionId = body.sessionId
    const plan = getPaymentPlan(body.paymentPlan)

    if (
      !plan ||
      typeof sessionId !== "string" ||
      !sessionId.startsWith("cs_") ||
      sessionId.length > 255
    ) {
      return NextResponse.json(
        { error: "This checkout session is not valid." },
        { status: 400 }
      )
    }

    const stripe = getStripe()

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 500 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (
      session.status !== "open" ||
      !sessionCanAcceptTerms(
        session.metadata,
        checkoutProduct.slug,
        plan.id
      )
    ) {
      return NextResponse.json(
        { error: "This checkout session cannot accept these terms." },
        { status: 409 }
      )
    }

    const metadata = buildTermsAcceptanceMetadata(new Date())

    await stripe.checkout.sessions.update(session.id, { metadata })

    return NextResponse.json({ accepted: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "We could not save your agreement. Please try again." },
      { status: 500 }
    )
  }
}
