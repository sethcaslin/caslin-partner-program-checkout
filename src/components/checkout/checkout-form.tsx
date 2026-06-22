"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout"
import { loadStripe } from "@stripe/stripe-js"
import type { StripeCheckoutElementsSdkOptions } from "@stripe/stripe-js"
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey"
import { SpinnerGap } from "@phosphor-icons/react/dist/csr/SpinnerGap"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type CheckoutFormProps = {
  paymentPlanId: string
  amountLabel: string
}

type CheckoutResponse = {
  clientSecret?: string
  error?: string
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function createCheckoutSession(paymentPlanId: string) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentPlan: paymentPlanId }),
  })

  const data = (await response.json()) as CheckoutResponse

  if (!response.ok || !data.clientSecret) {
    throw new Error(data.error ?? "Checkout could not be started.")
  }

  return data.clientSecret
}

function CheckoutPaymentFields({ amountLabel }: { amountLabel: string }) {
  const checkoutState = useCheckoutElements()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const syncedEmail = useRef("")

  const checkout =
    checkoutState.type === "success" ? checkoutState.checkout : null
  const displayAmount = checkout?.total.total.amount ?? amountLabel
  const trimmedEmail = email.trim()
  const hasValidEmail = emailPattern.test(trimmedEmail)
  const canSubmit = Boolean(checkout?.canConfirm) && hasValidEmail && !isSubmitting
  const checkoutError =
    checkoutState.type === "error"
      ? checkoutState.error.message
      : checkout?.lastPaymentError?.message

  useEffect(() => {
    if (!checkout || !hasValidEmail || syncedEmail.current === trimmedEmail) {
      return
    }

    let isActive = true

    checkout.updateEmail(trimmedEmail).then((result) => {
      if (!isActive) {
        return
      }

      if (result.type === "error") {
        setError(result.error.message)
        return
      }

      syncedEmail.current = trimmedEmail
      setError(null)
    })

    return () => {
      isActive = false
    }
  }, [checkout, hasValidEmail, trimmedEmail])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (checkoutState.type !== "success") {
      setError("The payment form is still loading.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const result = await checkoutState.checkout.confirm({
      returnUrl: `${window.location.origin}/thank-you?session_id=${checkoutState.checkout.id}`,
      email: trimmedEmail,
    })

    if (result.type === "error") {
      setError(result.error.message)
      setIsSubmitting(false)
      return
    }

    window.location.assign(`/thank-you?session_id=${result.session.id}`)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label
            htmlFor="checkout-email"
            className="text-sm font-extrabold text-slate-800"
          >
            Email for onboarding
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-[10px] border border-slate-200 bg-white px-3 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[var(--program-blue)] focus:ring-3 focus:ring-[var(--program-blue)]/15"
          />
          <p className="text-[0.8rem] font-medium text-slate-500">
            Use the email where you want to receive onboarding access.
          </p>
        </div>

        <div className="grid gap-2">
          <div className="text-sm font-extrabold text-slate-800">
            Payment details
          </div>
          <PaymentElement
            className="embedded-payment-element rounded-[10px]"
            options={{
              layout: {
                type: "accordion",
                defaultCollapsed: false,
                radios: "if_multiple",
              },
              fields: {
                billingDetails: {
                  address: {
                    country: "never",
                    postalCode: "auto",
                  },
                },
              },
              wallets: {
                link: "never",
              },
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5">
        <div>
          <div className="text-sm font-extrabold text-slate-800">
            Total due today
          </div>
          <div className="text-xs font-medium text-slate-500">
            One-time enrollment payment
          </div>
        </div>
        <div className="font-heading text-2xl font-black text-slate-950">
          {displayAmount}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!canSubmit}
        className="h-13 w-full rounded-[12px] bg-[var(--program-blue)] text-base font-extrabold text-white shadow-[0_20px_45px_-20px_rgba(37,87,230,0.9)] transition-transform hover:bg-[var(--program-blue-strong)] active:scale-[0.98] disabled:bg-[var(--program-blue-soft)] disabled:text-[var(--program-blue)]/55 disabled:opacity-100! disabled:shadow-none"
      >
        {isSubmitting ? (
          <>
            <SpinnerGap data-icon="inline-start" className="animate-spin" />
            Processing payment
          </>
        ) : (
          <>
            <LockKey data-icon="inline-start" weight="fill" />
            Complete enrollment — {amountLabel}
          </>
        )}
      </Button>

      <div className="grid gap-1 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-600">
          <LockKey
            weight="fill"
            className="text-[var(--program-success)]"
            aria-hidden="true"
          />
          One-time payment · Securely processed by Stripe
        </p>
        <p className="text-sm text-slate-500">
          After payment, check your inbox for your onboarding instructions.
        </p>
      </div>

      {error || checkoutError ? (
        <Alert variant="destructive" aria-live="polite">
          <AlertTitle>Payment needs attention</AlertTitle>
          <AlertDescription>{error ?? checkoutError}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  )
}

export function CheckoutForm({ paymentPlanId, amountLabel }: CheckoutFormProps) {
  const [sessionState, setSessionState] = useState<
    | { status: "loading" }
    | { status: "ready"; clientSecret: string }
    | { status: "error"; error: string }
  >({ status: "loading" })
  const [requestAttempt, setRequestAttempt] = useState(0)

  useEffect(() => {
    let isActive = true

    createCheckoutSession(paymentPlanId)
      .then((secret) => {
        if (isActive) {
          setSessionState({ status: "ready", clientSecret: secret })
        }
      })
      .catch((sessionError) => {
        if (isActive) {
          setSessionState({
            status: "error",
            error:
              sessionError instanceof Error
                ? sessionError.message
                : "Checkout could not be started.",
          })
        }
      })

    return () => {
      isActive = false
    }
  }, [paymentPlanId, requestAttempt])

  const checkoutOptions = useMemo<StripeCheckoutElementsSdkOptions | null>(
    () =>
      sessionState.status === "ready"
        ? {
            clientSecret: sessionState.clientSecret,
            adaptivePricing: {
              allowed: false,
            },
            elementsOptions: {
              loader: "auto",
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#2557e6",
                  colorText: "#101522",
                  colorTextSecondary: "#5b6678",
                  colorBackground: "#ffffff",
                  colorDanger: "#b42318",
                  borderRadius: "10px",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  spacingUnit: "4px",
                },
                rules: {
                  ".Input": {
                    border: "1px solid #d9e0ea",
                    boxShadow: "none",
                  },
                  ".Input:focus": {
                    border: "1px solid #2557e6",
                    boxShadow: "0 0 0 3px rgba(37,87,230,0.16)",
                  },
                  ".Label": {
                    fontWeight: "700",
                  },
                },
              },
            },
          }
        : null,
    [sessionState]
  )

  if (!stripePromise) {
    return (
      <Alert variant="destructive" aria-live="polite">
        <AlertTitle>Checkout is not ready</AlertTitle>
        <AlertDescription>
          Stripe publishable key is missing from the app configuration.
        </AlertDescription>
      </Alert>
    )
  }

  if (sessionState.status === "loading") {
    return (
      <div className="grid gap-5">
        <div className="grid gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-12 animate-pulse rounded-[10px] bg-slate-100" />
        </div>
        <div className="grid gap-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-36 animate-pulse rounded-[10px] bg-slate-100" />
        </div>
        <div className="h-16 animate-pulse rounded-[14px] bg-slate-100" />
        <div className="h-13 animate-pulse rounded-[12px] bg-[var(--program-blue)]/15" />
      </div>
    )
  }

  if (sessionState.status === "error" || !checkoutOptions) {
    return (
      <div className="grid gap-3">
        <Alert variant="destructive" aria-live="polite">
          <AlertTitle>Checkout is not ready</AlertTitle>
          <AlertDescription>
            {sessionState.status === "error"
              ? sessionState.error
              : "Checkout could not be started."}
          </AlertDescription>
        </Alert>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSessionState({ status: "loading" })
            setRequestAttempt((attempt) => attempt + 1)
          }}
          className="h-11 rounded-[10px] font-extrabold"
        >
          Try again
        </Button>
      </div>
    )
  }

  return (
    <CheckoutElementsProvider stripe={stripePromise} options={checkoutOptions}>
      <CheckoutPaymentFields amountLabel={amountLabel} />
    </CheckoutElementsProvider>
  )
}
