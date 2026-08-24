import type { Metadata } from "next"

import { PolicyPage } from "@/components/legal/policy-page"

export const metadata: Metadata = {
  title: "Purchase Terms | Caslin Partner Program",
  description: "Simple purchase terms for the Caslin Partner Program.",
}

export default function TermsPage() {
  return (
    <PolicyPage
      title="Purchase Terms"
      description="We wrote these terms in plain English so you know what to expect from us and what we ask from you."
    >
      <section className="legal-summary">
        <h2>The short version</h2>
        <p>
          We provide training, systems, proprietary data, tools, and support to
          help you pursue real estate opportunities. You agree to use them
          responsibly and keep our protected material private. Results vary,
          and our only voluntary refund promise is the specific four-month
          promise in the Refund Policy.
        </p>
      </section>

      <section>
        <h2>1. A simple agreement</h2>
        <p>
          These Purchase Terms apply when you buy access to the Caslin
          Partner Program from SETH CASLIN LLC. By checking the agreement box
          and completing your purchase, you agree to these terms and our Refund
          Policy.
        </p>
        <p>
          These purchase terms work together with our website{" "}
          <a href="https://caslinpartnerprogram.com/terms-of-service">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="https://caslinpartnerprogram.com/privacy-policy">
            Privacy Policy
          </a>
          . If there is a conflict about your purchase or refund, these more
          specific purchase terms and the Refund Policy control.
        </p>
      </section>

      <section>
        <h2>2. What you are buying</h2>
        <p>
          Your purchase gives you personal access to the Caslin Partner Program
          described at checkout. This may include education, lead-generation
          methods, scripts, call frameworks, systems, standard operating
          procedures, proprietary data, community access, group sessions, deal
          support, and related resources.
        </p>
        <p>
          Access normally begins after a successful payment and onboarding. We
          may improve, update, replace, or reorganize parts of the Program as
          long as the overall purpose of the Program remains the same.
        </p>
      </section>

      <section>
        <h2>3. Price and payment options</h2>
        <p>
          You agree to pay the amount shown on the checkout you use: either USD
          4,997 or USD 999, unless a different written arrangement is shown and
          accepted at checkout. Your enrollment is one purchase from us.
        </p>
        <p>
          Stripe processes the payment. Klarna or another provider may offer an
          eligible customer a separate payment plan. Approval, schedule, fees,
          and availability are decided by that provider and are subject to its
          terms. A financing plan does not change these purchase terms or the
          Refund Policy.
        </p>
      </section>

      <section>
        <h2>4. Your access is personal</h2>
        <p>
          We trust you with valuable education, systems, and proprietary data.
          Your access is for your own participation in the Program. You may not
          copy, record, scrape, publish, share, sell, sublicense, give away, or
          distribute Program materials or data, or use them to build a competing
          product or service.
        </p>
        <p>
          Please protect your login details and tell us promptly if you believe
          someone else has accessed your account. Unauthorized use may lead to
          suspended or ended access and may disqualify a refund request.
        </p>
      </section>

      <section>
        <h2>5. What we ask from you</h2>
        <p>
          You are responsible for your decisions, calls, communications,
          business conduct, legal compliance, records, and expenses. Please use
          the Program honestly, treat the community respectfully, and follow
          applicable real estate, marketing, privacy, calling, and consumer
          protection laws.
        </p>
        <p>
          The Program provides education and business support. It is not legal,
          tax, accounting, investment, or licensed brokerage advice. Use your
          own qualified advisers when needed.
        </p>
      </section>

      <section>
        <h2>6. Deals, funding, and business relationship</h2>
        <p>
          We may review opportunities and may offer funding, buyer access, or
          backend support. Every deal remains subject to review and separate
          written approval. Submitting a deal does not guarantee that it will be
          accepted, funded, sold, or closed. Any profit split or deal-specific
          responsibilities must be stated in a separate written agreement.
        </p>
        <p>
          Buying the Program does not create employment, agency, brokerage,
          fiduciary, joint-venture, or general-partnership relationships between
          you and SETH CASLIN LLC.
        </p>
      </section>

      <section>
        <h2>7. Results and our refund promise</h2>
        <p>
          Your results depend on factors such as your effort, skill, market,
          timing, leads, follow-through, and decisions. Examples and
          testimonials are not promises that you will earn income, close a
          deal, obtain funding, or reach a particular result.
        </p>
        <p>
          Except for rights that applicable law does not allow you to waive,
          Program purchases are final once payment is completed or access
          begins, whichever happens first. We do stand behind one specific
          promise: follow the Program as instructed, use leads generated through
          our process, and complete at least 200 calls per week for four
          consecutive weeks during your first month. If you do not put at least
          one deal under a signed contract by the end of your fourth month, you
          may request a refund of your Program enrollment payment. The deal does
          not need to close by then. The full requirements and request process
          are in our{" "}
          <a href="/refund-policy">Refund Policy</a>.
        </p>
      </section>

      <section>
        <h2>8. Access and community safety</h2>
        <p>
          We may pause or end access for fraud, unlawful conduct, harassment,
          threats, serious community disruption, nonpayment, or misuse of
          Program materials or data. When practical, we will try to explain the
          concern and give you a reasonable chance to correct it.
        </p>
      </section>

      <section>
        <h2>9. Privacy and outside services</h2>
        <p>
          Our Privacy Policy explains how we handle personal information. The
          Program may also use services operated by Stripe, Klarna, Skool, and
          other providers. Their own terms and privacy practices apply when you
          use their services.
        </p>
      </section>

      <section>
        <h2>10. If something goes wrong</h2>
        <p>
          Please contact us first. We want a fair chance to understand the issue
          and help. To the fullest extent allowed by law, the Program is
          provided as available, and SETH CASLIN LLC is not responsible for
          indirect, special, or consequential losses. Nothing here removes a
          right that applicable law does not allow you to waive.
        </p>
      </section>

      <section>
        <h2>11. Contact and legal basics</h2>
        <p>
          You must be at least 18 and able to enter a binding agreement. If one
          part of these terms cannot be enforced, the rest still applies. A
          delay in enforcing a term does not waive it.
        </p>
        <p>
          Questions are welcome. Email SETH CASLIN LLC at{" "}
          <a href="mailto:seth@gochrz.com">seth@gochrz.com</a> or call (973)
          356-7881. Our mailing address is SETH CASLIN LLC, 30 N Gould St, Ste
          N, Sheridan, WY 82801.
        </p>
      </section>
    </PolicyPage>
  )
}
