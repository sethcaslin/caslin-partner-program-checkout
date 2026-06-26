"use client"

import { useState } from "react"
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck"

import { CheckoutForm } from "@/components/checkout/checkout-form"
import { paymentPlans, type PaymentPlanId } from "@/lib/checkout"
import { cn } from "@/lib/utils"

export function CheckoutPanel() {
  const [planId, setPlanId] = useState<PaymentPlanId>(paymentPlans[0].id)
  const plan = paymentPlans.find((item) => item.id === planId) ?? paymentPlans[0]

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

      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Choose how to pay</legend>
        {paymentPlans.map((item) => {
          const isSelected = item.id === planId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPlanId(item.id)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start gap-1 rounded-[14px] border p-4 text-left transition",
                isSelected
                  ? "border-[var(--program-blue)] bg-[var(--program-blue-soft)]/40 ring-2 ring-[var(--program-blue)]/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-full border",
                    isSelected
                      ? "border-[var(--program-blue)]"
                      : "border-slate-300"
                  )}
                >
                  {isSelected ? (
                    <span className="size-2 rounded-full bg-[var(--program-blue)]" />
                  ) : null}
                </span>
              </div>
              <span className="text-base font-black text-slate-900">
                {item.selectorPrice}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {item.selectorNote}
              </span>
            </button>
          )
        })}
      </fieldset>

      <CheckoutForm key={plan.id} plan={plan} />

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
