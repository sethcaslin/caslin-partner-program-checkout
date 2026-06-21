import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const steps = [
  "Watch the email address used at checkout.",
  "Review your onboarding details and access instructions.",
  "Use the support contact in that email if you need help.",
]

export default function ThankYouPage() {
  return (
    <main className="min-h-[100dvh] bg-[var(--program-bg)] px-4 py-8 text-slate-950 sm:px-6 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[1120px] items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-[620px]">
          <Badge className="mb-6 rounded-full bg-white px-3 py-1 text-[0.68rem] font-extrabold uppercase text-[var(--program-blue)] ring-1 ring-slate-200">
            Payment complete
          </Badge>
          <h1 className="font-heading text-[clamp(3.2rem,8vw,7rem)] font-black leading-[0.92]">
            You&apos;re in.
          </h1>
          <p className="mt-7 max-w-[620px] text-lg leading-8 text-slate-600 sm:text-xl">
            Your enrollment payment was completed. Check your email for the
            next steps and onboarding details for the Caslin Partner Program.
          </p>
        </div>

        <Card className="rounded-[22px] border-slate-200/90 bg-white shadow-[0_36px_90px_-48px_rgba(15,23,42,0.65)]">
          <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
            <div className="grid size-16 place-items-center rounded-full bg-[var(--program-blue)] text-white shadow-[0_18px_40px_-24px_rgba(37,87,230,0.85)]">
              <CheckCircle weight="fill" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="font-heading text-3xl font-extrabold">
                Check your email for next steps
              </CardTitle>
              <CardDescription className="mt-2 text-base leading-7 text-slate-600">
                We will send everything you need to get started.
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
                {steps.map((step, index) => (
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
                Your payment was processed securely by Stripe.
              </div>
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
      </section>
    </main>
  )
}
