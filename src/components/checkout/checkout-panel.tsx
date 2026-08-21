"use client"

import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck"

import { CheckoutForm } from "@/components/checkout/checkout-form"
import { paymentPlans } from "@/lib/checkout"

export function CheckoutPanel() {
  const plan = paymentPlans[0]

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-2xl font-extrabold leading-tight">
          Secure enrollment to the Caslin Partner Program
        </h2>
        <div className="mt-5 flex items-end gap-3">
          <div className="font-heading text-[clamp(3rem,7vw,4.4rem)] font-black leading-none">
            {plan.heroAmount}
          </div>
          <div className="pb-2 text-lg font-bold uppercase text-slate-500">
            {plan.heroUnit}
          </div>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500">
          {plan.heroCadence}
        </p>
      </div>

      <CheckoutForm plan={plan} />

      <div className="flex flex-col items-center gap-2 border-t border-slate-200 pt-5 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
          <ShieldCheck
            weight="fill"
            className="text-[var(--program-success)]"
            aria-hidden="true"
          />
          Encrypted &amp; secured by Stripe
        </div>
        <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Visa · Mastercard · Amex · Discover
        </div>
      </div>
    </div>
  )
}
