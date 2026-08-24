# Klarna and Friendly Purchase Terms Design

Date: 2026-08-24
Status: Approved

## Goal

Make Klarna available to eligible customers on both the USD 4,997 and USD 999 checkouts, and require customers to accept concise purchase terms and a conditional refund policy before payment.

The customer-facing language should be warm, direct, and written in simple English. It must also protect the Program's education, systems, and proprietary data from being consumed, copied, or shared before a general refund request.

## Klarna

Keep Stripe dynamic payment methods. Klarna will be enabled in the Stripe Dashboard for the configuration used by both one-time Checkout Sessions. Stripe will decide whether to show Klarna and which Klarna product is available based on the customer, location, currency, amount, and approval criteria.

The checkout will say that flexible payment options may include Klarna for eligible customers. It will not promise a specific installment schedule or approval. The USD 999 offer may qualify for Pay in 4 or financing. The USD 4,997 offer exceeds Klarna's USD Pay in 4 limit but may qualify for Klarna financing.

## Purchase terms

Add a `Friendly Purchase Terms` page at `/terms`. It will supplement the website Terms of Service and control only where it states more specific purchase or refund terms.

The page will explain in plain English:

- What the customer is buying and when access begins.
- The amount shown at checkout and how third-party financing works.
- Personal use of the Program, training, systems, and proprietary data.
- A prohibition on copying, sharing, reselling, publishing, or using the materials to create a competing product.
- The participant's responsibility for calls, legal compliance, decisions, and expenses.
- Deal review, funding, and profit participation are subject to separate written approval for each transaction.
- Enrollment does not create employment, agency, brokerage, fiduciary, joint-venture, or general-partnership relationships.
- Results vary and no general income or deal result is promised.
- The only voluntary refund promise is the limited policy described below.
- Privacy, third-party services, respectful community participation, suspension for serious misuse, changes, and contact information.

## Refund policy

Add a `Refund Policy` page at `/refund-policy`. All sales are final after access begins except where non-waivable law applies or the customer qualifies for the limited four-month performance promise.

To qualify, the customer must reasonably document all of the following:

- They followed the Program as instructed.
- They used leads generated through the Program's process.
- They completed at least 200 calls per week for four consecutive weeks during their first four months.
- They did not generate at least USD 10,000 during their first four months.
- They did not copy, share, resell, publish, or misuse the Program's education, systems, or proprietary data.

The customer must submit the request within 30 days after the end of their fourth month and provide reasonable supporting records, such as call logs, CRM records, lead records, and revenue or closing records. SETH CASLIN LLC will review the request in good faith and may ask reasonable follow-up questions.

Approved refunds will cover the Program enrollment amount paid to SETH CASLIN LLC and return through the original payment method. A Klarna customer remains responsible for the Klarna plan until Klarna confirms that the merchant refund has adjusted or closed it. External costs are not refunded.

## Acceptance and evidence

Both checkout routes will show an unchecked, required checkbox immediately before the payment button. Its label will link directly to the Friendly Purchase Terms and Refund Policy.

The checkout will not confirm payment until the box is checked. Before confirmation, the server will record the accepted terms version, refund-policy version, acceptance time, and offer identifier in Stripe Checkout Session metadata. The acceptance endpoint will validate that the session belongs to this Program and remains open before updating it.

## Customer experience

The checkout card will include a short Klarna eligibility note and legal links without changing the existing offer, guarantee, or price. Policy pages will use the same visual language as the checkout, with short sections, comfortable spacing, a concise summary, and an easy path back to checkout.

The refund explanation displayed near payment will be clear enough to notice before purchase and will not rely on a hidden legal paragraph.

## Error handling

If terms acceptance cannot be recorded, payment confirmation will stop and the customer will see a retryable message. Existing Checkout Session, Stripe loading, and payment-confirmation errors will continue to use the current customer-facing error state.

Klarna availability will never be presented as guaranteed. If Stripe determines the method is unavailable, eligible alternatives remain available.

## Verification

Completion requires:

- Both checkout routes retain their correct fixed prices.
- Both routes require the terms checkbox before payment can be confirmed.
- Terms acceptance metadata is generated and validated for the correct Stripe session.
- `/terms` and `/refund-policy` render correctly on desktop and mobile.
- Legal links are visible and usable from both checkouts.
- Klarna is enabled in the relevant Stripe Dashboard configuration and appears for representative eligible test sessions at both prices when Stripe allows it.
- Unsupported or ineligible buyers see the remaining Stripe methods without a broken checkout.
- Automated tests, linting, and the production build pass.
- No real payment is submitted during verification.

## Compliance boundary

These customer-facing drafts are based on the approved business terms and current offer. They are not a substitute for legal advice. The funnel's earnings claims and business-opportunity positioning should receive separate review by qualified US counsel because additional pre-sale disclosures or substantiation may be required.
