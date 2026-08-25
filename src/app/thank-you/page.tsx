import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowClockwise } from "@phosphor-icons/react/dist/ssr/ArrowClockwise"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr/ClockCountdown"
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { WarningCircle } from "@phosphor-icons/react/dist/ssr/WarningCircle"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getCheckoutConfirmation,
  type CheckoutConfirmation,
} from "@/lib/checkout-confirmation"

type ThankYouPageProps = {
  searchParams: Promise<{
    session_id?: string | string[]
  }>
}

type StateShellProps = {
  badge: string
  title: string
  description: string
  children: ReactNode
}

const purchaseConfirmationSteps = [
  "Check the email address used at checkout for your purchase confirmation.",
  "Keep the confirmation email for your records.",
  "Contact support if the confirmation does not arrive.",
]

function StateShell({ badge, title, description, children }: StateShellProps) {
  return (
    <main className="min-h-[100dvh] bg-[var(--program-bg)] px-4 py-8 text-slate-950 sm:px-6 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[1120px] items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-[620px]">
          <Badge className="mb-6 rounded-full bg-white px-3 py-1 text-[0.68rem] font-extrabold uppercase text-[var(--program-blue)] ring-1 ring-slate-200">
            {badge}
          </Badge>
          <h1 className="font-heading text-[clamp(3.2rem,8vw,7rem)] font-black leading-[0.92]">
            {title}
          </h1>
          <p className="mt-7 max-w-[620px] text-lg leading-8 text-slate-600 sm:text-xl">
            {description}
          </p>
        </div>
        {children}
      </section>
    </main>
  )
}

function ConfirmedPayment({
  confirmation,
}: {
  confirmation: Extract<CheckoutConfirmation, { status: "confirmed" }>
}) {
  return (
    <StateShell
      badge="Payment complete"
      title="You're in."
      description="Stripe confirmed your enrollment payment. Check the email address used at checkout for your purchase confirmation."
    >
      <Card className="rounded-[22px] border-slate-200/90 bg-white shadow-[0_36px_90px_-48px_rgba(15,23,42,0.65)]">
        <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
          <div className="grid size-16 place-items-center rounded-full bg-[var(--program-blue)] text-white shadow-[0_18px_40px_-24px_rgba(37,87,230,0.85)]">
            <CheckCircle weight="fill" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="font-heading text-3xl font-extrabold">
              Check your email for confirmation
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-7 text-slate-600">
              Your purchase confirmation will be sent to the email used at
              checkout.
            </CardDescription>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-[var(--program-blue)]">
              <EnvelopeSimple weight="fill" aria-hidden="true" />
              What&apos;s next
            </div>
            <ol className="grid gap-3">
              {purchaseConfirmationSteps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[1.75rem_1fr] gap-3 text-[0.95rem] leading-6 text-slate-700"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-[var(--program-blue)] text-xs font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ShieldCheck
                weight="fill"
                className="text-[var(--program-blue)]"
                aria-hidden="true"
              />
              Your payment was confirmed securely by Stripe.
            </div>
            <Link
              href={confirmation.checkoutPath}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-950 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              Back to checkout
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </StateShell>
  )
}

function UnconfirmedPayment({
  confirmation,
}: {
  confirmation: Extract<CheckoutConfirmation, { status: "unconfirmed" }>
}) {
  const refreshHref = `/thank-you?session_id=${encodeURIComponent(
    confirmation.sessionId
  )}`

  return (
    <StateShell
      badge="Payment not confirmed"
      title="We're checking."
      description="Stripe has not confirmed this payment yet. If you just completed checkout, wait a moment and check the status again."
    >
      <Card className="rounded-[22px] border-slate-200/90 bg-white shadow-[0_36px_90px_-48px_rgba(15,23,42,0.65)]">
        <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
          <div className="grid size-16 place-items-center rounded-full bg-amber-100 text-amber-700">
            <ClockCountdown weight="fill" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="font-heading text-3xl font-extrabold">
              No need to pay again
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-7 text-slate-600">
              Checking again only asks Stripe for the current status. It cannot
              create another charge.
            </CardDescription>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-5 text-[0.95rem] leading-6 text-amber-950">
            If your bank or Stripe shows a pending or completed charge, contact
            support before submitting another payment.
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={refreshHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[var(--program-blue)] px-4 text-sm font-extrabold text-white transition hover:brightness-95 active:scale-[0.98]"
            >
              Check payment again
              <ArrowClockwise weight="bold" aria-hidden="true" />
            </Link>
            <a
              href="mailto:ben@gochrz.com"
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-950 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              Contact support
            </a>
          </div>
          <Link
            href={confirmation.checkoutPath}
            className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--program-blue)]"
          >
            Back to checkout
            <ArrowRight weight="bold" aria-hidden="true" />
          </Link>
        </CardContent>
      </Card>
    </StateShell>
  )
}

function UnavailablePayment() {
  return (
    <StateShell
      badge="Payment not verified"
      title="We couldn't verify this payment."
      description="This page did not receive a valid confirmation from Stripe. This does not by itself mean that a payment was declined or completed."
    >
      <Card className="rounded-[22px] border-slate-200/90 bg-white shadow-[0_36px_90px_-48px_rgba(15,23,42,0.65)]">
        <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
          <div className="grid size-16 place-items-center rounded-full bg-slate-100 text-slate-700">
            <WarningCircle weight="fill" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="font-heading text-3xl font-extrabold">
              Before trying again
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-7 text-slate-600">
              If you believe you completed payment, contact support before
              submitting another payment.
            </CardDescription>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5 text-[0.95rem] leading-6 text-slate-700">
            Support can help confirm the payment status without risking a
            duplicate purchase.
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:ben@gochrz.com"
              className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[var(--program-blue)] px-4 text-sm font-extrabold text-white transition hover:brightness-95 active:scale-[0.98]"
            >
              Contact support
            </a>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-950 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              Back to checkout
              <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </StateShell>
  )
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const { session_id: sessionId } = await searchParams
  const confirmation = await getCheckoutConfirmation(sessionId)

  if (confirmation.status === "confirmed") {
    return <ConfirmedPayment confirmation={confirmation} />
  }

  if (confirmation.status === "unconfirmed") {
    return <UnconfirmedPayment confirmation={confirmation} />
  }

  return <UnavailablePayment />
}
