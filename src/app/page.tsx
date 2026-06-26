import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { LockKey } from "@phosphor-icons/react/dist/ssr/LockKey"
import { Package } from "@phosphor-icons/react/dist/ssr/Package"
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck"

import { CheckoutPanel } from "@/components/checkout/checkout-panel"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const programIntro =
  "The Caslin Partner Program gives you access to Seth Caslin's real estate acquisition system, including distressed lead generation training, seller call frameworks, scripts, SOPs, deal support, buyer access, and backend infrastructure."

const fundingIntro =
  "Every qualified project you bring into the Caslin Partner Network is 100% eligible to be funded through the Caslin Funding Engine, so you don't have to worry about funds at any point of time."

const guaranteeCopy =
  "Follow the program exactly as instructed, use leads generated through our process, complete 200 calls per week for 4 consecutive weeks and if you don't make at least $10,000 in the first 4 months, we'll refund 100% of your investment."

const whatsIncluded = [
  "Distressed lead generation system",
  "Seller call framework",
  "Scripts, SOPs, and acquisition playbooks",
  "Personalized onboarding and market strategy",
  "Weekly deal war rooms",
  "Direct support from Seth's team",
  "Buyer access and backend infrastructure",
  "Private partner community",
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

export default function Home() {
  return (
    <main className="program-surface min-h-[100dvh] overflow-hidden text-slate-950">
      <section className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.78fr)] lg:px-10 lg:py-10">
        <div className="flex flex-col gap-10 lg:pr-4">
          <div>
            <div className="mb-8 text-sm font-extrabold uppercase tracking-wide text-[var(--program-blue)]">
              Seth Caslin
            </div>

            <div className="max-w-[760px]">
              <h1 className="text-[clamp(2.4rem,4.8vw,4.4rem)] font-black leading-[1.04] text-slate-950">
                The{" "}
                <span className="text-[var(--program-blue)]">
                  Caslin Partner Program
                </span>
              </h1>
              <p className="mt-6 max-w-[640px] text-lg leading-8 text-slate-600">
                {programIntro}
              </p>
              <p className="mt-4 max-w-[640px] text-lg leading-8 text-slate-600">
                {fundingIntro}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[var(--program-blue)]">
              <Package weight="fill" aria-hidden="true" />
              What&apos;s Included
            </div>
            <ul className="grid max-w-[720px] gap-4 sm:grid-cols-2">
              {whatsIncluded.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <Card className="rounded-[18px] border-[var(--program-blue-soft)] bg-white/90 shadow-[0_26px_70px_-40px_rgba(15,23,42,0.42)]">
            <CardContent className="flex items-start gap-4 p-6 sm:p-7">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--program-blue-soft)] text-[var(--program-blue)]">
                <ShieldCheck weight="fill" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-extrabold">
                  Caslin Partner Guarantee
                </h2>
                <p className="mt-2 text-[0.95rem] leading-7 text-slate-600">
                  {guaranteeCopy}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:self-start">
          <Card className="checkout-card overflow-hidden rounded-[22px] border-slate-200/90 bg-white">
            <CardHeader className="gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-[var(--program-blue-soft)] text-[var(--program-blue)]">
                    <LockKey weight="fill" aria-hidden="true" />
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
                <Badge className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-wide text-[var(--program-success)] ring-1 ring-emerald-100">
                  Secure enrollment
                </Badge>
              </div>
              <Separator />
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <CheckoutPanel />
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}
