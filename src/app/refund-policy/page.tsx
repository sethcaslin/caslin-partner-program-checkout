import type { Metadata } from "next"

import { PolicyPage } from "@/components/legal/policy-page"

export const metadata: Metadata = {
  title: "Refund Policy | Caslin Partner Program",
  description: "The Caslin Partner Program four-month refund promise.",
}

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      description="We want the Program to work for you, and we stand behind one clear, specific promise."
    >
      <section className="legal-summary">
        <h2>Our approach</h2>
        <p>
          Because you receive access to our education, systems, and proprietary
          data, Program purchases are final once payment is completed or access
          begins, whichever happens first. The exception is our limited
          four-month performance promise below, plus any right that applicable
          law does not allow you to waive.
        </p>
      </section>

      <section>
        <h2>1. The four-month promise</h2>
        <p>
          If you do the required work during your first four months and do not
          generate at least USD 10,000, you may request a refund of the Program
          enrollment amount you paid to SETH CASLIN LLC.
        </p>
        <p>
          Your first four months begin on the date we first provide your Program
          access.
        </p>
      </section>

      <section>
        <h2>2. What you need to complete</h2>
        <p>To qualify, you must reasonably show all of the following:</p>
        <ul>
          <li>You followed the Program as instructed.</li>
          <li>You used leads generated through the Program process.</li>
          <li>
            You completed at least 200 calls per week for four consecutive weeks
            during your first four months.
          </li>
          <li>
            You did not generate at least USD 10,000 during your first four
            months.
          </li>
          <li>
            You did not copy, record, scrape, share, resell, publish, distribute,
            or otherwise misuse the Program&apos;s education, systems, materials,
            or proprietary data.
          </li>
        </ul>
        <p>
          This is a performance-based promise, not a general cancellation or
          change-of-mind policy. If every requirement is not met, the purchase
          remains final.
        </p>
      </section>

      <section>
        <h2>3. How to request a review</h2>
        <p>
          Send your request within 30 days after the end of your fourth month.
          Use the contact form at{" "}
          <a href="https://caslinpartnerprogram.com/">
            caslinpartnerprogram.com
          </a>{" "}
          or call (973) 356-7881 so we can help route it correctly.
        </p>
        <p>Please include:</p>
        <ul>
          <li>The name and email used for your purchase.</li>
          <li>Call logs or CRM records showing the required calls.</li>
          <li>Records showing the leads came through the Program process.</li>
          <li>
            Reasonable revenue, contract, assignment, or closing records for the
            four-month period.
          </li>
          <li>A short explanation of how you followed the Program.</li>
        </ul>
      </section>

      <section>
        <h2>4. A fair review</h2>
        <p>
          We will review complete requests in good faith. We may ask reasonable
          follow-up questions or request missing records needed to confirm the
          requirements. We will explain the outcome after the review.
        </p>
      </section>

      <section>
        <h2>5. What an approved refund covers</h2>
        <p>
          An approved refund covers the Program enrollment amount actually paid
          to SETH CASLIN LLC and is sent through the original payment method. It
          does not cover interest, financing charges, bank fees, software,
          advertising, leads bought elsewhere, travel, professional services,
          or other outside costs.
        </p>
        <p>
          If you used Klarna, keep making payments until Klarna confirms that our
          refund has adjusted or closed your payment plan. Klarna controls the
          timing and treatment of its financing plan.
        </p>
      </section>

      <section>
        <h2>6. Rights that cannot be waived</h2>
        <p>
          Nothing in this policy limits a refund, cancellation, or other right
          that applicable law does not allow you to waive.
        </p>
      </section>

      <section>
        <h2>Questions?</h2>
        <p>
          We are happy to clarify the policy before you buy. Contact SETH CASLIN
          LLC through{" "}
          <a href="https://caslinpartnerprogram.com/">
            caslinpartnerprogram.com
          </a>{" "}
          or call (973) 356-7881. Our mailing address is 30 N Gould St, Ste N,
          Sheridan, WY 82801.
        </p>
      </section>
    </PolicyPage>
  )
}
