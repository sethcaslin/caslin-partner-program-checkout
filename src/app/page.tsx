import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { CreditCard } from "@phosphor-icons/react/dist/ssr/CreditCard"
import { LockKey } from "@phosphor-icons/react/dist/ssr/LockKey"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { Sparkle } from "@phosphor-icons/react/dist/ssr/Sparkle"

import { CheckoutForm } from "@/components/checkout/checkout-form"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { checkoutProduct, paymentPlans } from "@/lib/checkout"

const primaryPlan = paymentPlans[0]

const trainingPoints = [
  "Use the Caslin Lead System to find motivated sellers and start real conversations.",
  "Focus on identifying opportunities instead of funding deals yourself.",
  "When a deal is ready, the team brings funding, buyers, and closing support.",
]

const decisionPoints = [
  "Funding support",
  "Buyer support",
  "Onboarding after payment",
]

const proofPayments = [
  { date: "Feb 26, 2026", amount: "$98,902.04" },
  { date: "Mar 6, 2026", amount: "$67,518.00" },
  { date: "Mar 31, 2026", amount: "$60,000.00" },
  { date: "May 29, 2025", amount: "$19,816.49" },
]

const fitPoints = [
  "You are confident talking to people and building relationships.",
  "You want to make real money in real estate without funding deals yourself.",
  "You are coachable, driven, and ready to follow a proven system.",
  "You want freedom over your time, income, and lifestyle.",
]

const evenIfPoints = [
  "You are completely new to real estate and have never done a deal before.",
  "You have no idea where to find motivated sellers or how these opportunities work.",
  "You have never raised money, found buyers, or closed a transaction.",
  "You have a full-time job, are in school, or only have a few hours per week.",
]

const nextSteps = [
  "Enter your email and payment details in the secure form.",
  "Complete your enrollment without opening another checkout page.",
  "Use the same email you want for onboarding access.",
  "Watch for your next-step email after payment.",
]

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-3 text-[0.95rem] leading-6 text-slate-700">
      <CheckCircle
        weight="fill"
        className="mt-0.5 text-[var(--program-blue)]"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  )
}

function ProofSlip({
  date,
  amount,
  index,
}: {
  date: string
  amount: string
  index: number
}) {
  return (
    <div
      className="animate-rise rounded-[10px] border border-slate-200/80 bg-white p-3 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.45)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-2 text-[0.62rem] font-bold uppercase text-slate-500">
        {date}
      </div>
      <div className="h-4 rounded bg-slate-950" />
      <div className="mt-3 flex items-center justify-between gap-4 text-[0.72rem] font-bold">
        <span className="text-slate-500">$8,135.79</span>
        <span className="text-[var(--program-blue)]">{amount}</span>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[var(--program-bg)] text-slate-950">
      <section className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.78fr)] lg:px-10 lg:py-10">
        <div className="flex min-h-[calc(100dvh-5rem)] flex-col justify-between gap-10 rounded-none lg:pr-4">
          <div>
            <div className="mb-14 flex items-center justify-between gap-4">
              <div className="text-sm font-extrabold uppercase text-[var(--program-blue)]">
                Caslin Partner Program
              </div>
              <Badge className="hidden rounded-full bg-white px-3 py-1 text-[0.68rem] font-extrabold uppercase text-[var(--program-success)] ring-1 ring-emerald-100 sm:inline-flex">
                Secure enrollment
              </Badge>
            </div>

            <div className="max-w-[760px]">
              <p className="mb-5 text-xs font-extrabold uppercase text-[var(--program-blue)]">
                One-time enrollment
              </p>
              <h1 className="text-[clamp(2.7rem,6vw,5.85rem)] font-black leading-[0.97] text-slate-950">
                Start finding real estate opportunities.{" "}
                <span className="text-[var(--program-blue)]">
                  We help you close them.
                </span>
              </h1>
              <p className="mt-7 max-w-[650px] text-lg leading-8 text-slate-600 sm:text-xl">
                Enroll in the Caslin Partner Program, learn the phone-first
                lead system, and move into onboarding right after payment.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {decisionPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-[0_14px_35px_-30px_rgba(15,23,42,0.75)]"
                >
                  {point}
                </div>
              ))}
            </div>

            <ul className="mt-9 grid max-w-[720px] gap-4">
              {trainingPoints.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="grid gap-7">
            <div>
              <div className="mb-4 text-xs font-extrabold uppercase text-[var(--program-blue)]">
                Documented partner payouts
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {proofPayments.map((payment, index) => (
                  <ProofSlip
                    key={payment.date}
                    date={payment.date}
                    amount={payment.amount}
                    index={index}
                  />
                ))}
              </div>
              <p className="mt-3 text-[0.72rem] font-semibold text-[var(--program-blue)]">
                Results vary. Your results depend on your effort, market
                conditions, and execution.
              </p>
            </div>

            <Card className="rounded-[18px] border-slate-200/80 bg-white/90 shadow-[0_26px_70px_-40px_rgba(15,23,42,0.42)]">
              <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
                <div>
                  <h2 className="font-heading text-lg font-extrabold">
                    This is for you if:
                  </h2>
                  <ul className="mt-4 grid gap-3">
                    {fitPoints.map((point) => (
                      <CheckItem key={point}>{point}</CheckItem>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-extrabold">
                    This works even if:
                  </h2>
                  <ul className="mt-4 grid gap-3">
                    {evenIfPoints.map((point) => (
                      <CheckItem key={point}>{point}</CheckItem>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="lg:self-start">
          <Card className="rounded-[22px] border-slate-200/90 bg-white shadow-[0_36px_90px_-48px_rgba(15,23,42,0.65)]">
            <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
              <div className="flex items-start gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-700">
                  <LockKey aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="font-heading text-xl font-extrabold">
                    Secure checkout
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-500">
                    Your information is protected by Stripe.
                  </CardDescription>
                </div>
              </div>
              <Separator />
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-7">
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-heading text-2xl font-extrabold">
                      {checkoutProduct.name}
                    </h2>
                    <Badge className="rounded-full bg-[var(--program-blue-soft)] px-3 py-1 text-[var(--program-blue)]">
                      {primaryPlan.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {checkoutProduct.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="flex items-end gap-3">
                    <div className="font-heading text-[clamp(3.4rem,7vw,5rem)] font-black leading-none">
                      {primaryPlan.displayAmount}
                    </div>
                    <div className="pb-2 text-lg font-bold uppercase text-slate-500">
                      USD
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    One-time payment for program enrollment.
                  </p>
                </div>

                <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-extrabold text-[var(--program-blue)]">
                    <Sparkle weight="fill" aria-hidden="true" />
                    What happens after payment
                  </div>
                  <ul className="grid gap-3">
                    {nextSteps.map((step) => (
                      <CheckItem key={step}>{step}</CheckItem>
                    ))}
                  </ul>
                </div>

                <CheckoutForm
                  paymentPlanId={primaryPlan.id}
                  amountLabel={primaryPlan.displayAmount}
                />

                <div className="grid gap-5">
                  <div className="flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs font-bold uppercase text-slate-400">
                      We accept
                    </span>
                    <Separator className="flex-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-extrabold uppercase text-slate-600 sm:grid-cols-4">
                    {["Visa", "Mastercard", "Amex", "Discover"].map((method) => (
                      <div
                        key={method}
                        className="rounded-md border border-slate-200 bg-white px-3 py-2"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      weight="fill"
                      className="text-[var(--program-blue)]"
                      aria-hidden="true"
                    />
                    Encrypted payment
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard
                      weight="fill"
                      className="text-[var(--program-blue)]"
                      aria-hidden="true"
                    />
                    Card entry here
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight
                      weight="bold"
                      className="text-[var(--program-blue)]"
                      aria-hidden="true"
                    />
                    Onboarding email
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}
